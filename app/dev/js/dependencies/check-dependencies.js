const require = window.require
const childProcess = require('child_process')
const exec = childProcess.exec
const spawn = childProcess.spawn
import Promise from 'bluebird'

import {DependencyActions, updateDependencyStatus} from 'js/dependencies/dependencies-redux'


const execAsync = Promise.promisify(exec)
const {	INSTALL_DEPENDENCIES, INSTALL_DEPENDENCY, UPDATE_DEPENDENCY_INSTALL_PROGRESS, 
	    FINISHED_INSTALLING_DEPENDENCIES, INTERNET_IS_DISCONNECTED } = DependencyActions

let cmd = {
		ping: 'ping -c1 google.com',

    	checkBrew: 'brew -v',
    	checkTaglib: 'brew ls taglib',
    	checkGpg: 'brew ls gpg',
    	checkRvm: 'rvm -v',
    	checkTaglibRuby: 'gem list taglib-ruby',

    	installRvmPublicKey: 'gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3',
    	installRvmAndRuby: '\curl -sSL https://get.rvm.io | bash -s stable --ruby',
    	installHomebrew: '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"',
    	installTaglib: 'brew install taglib',
    	installTaglibRuby: 'gem install taglib-ruby',

    	sourceRvm: 'source ~/.rvm/scripts/rvm',
    },
    errorAlert = 'Whoa, something went wrong when trying to install the required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues',
    homebrewInstalled,
    taglibInstalled,
    gpgInstalled,
    rvmInstalled,
    taglibRubyInstalled

export default function checkDependencies(callback) {
	let finalResult = {}

	Promise.all([
		execAsync(cmd.checkBrew).reflect(),
		execAsync(cmd.checkTaglib).reflect(),
		execAsync(cmd.checkGpg).reflect(),
		execAsync(cmd.checkRvm).reflect(),
		execAsync(cmd.checkTaglibRuby).reflect(),
	])
	.then(results => {
		homebrewInstalled = checkHomebrew(results[0]._settledValueField)
		rvmInstalled = checkRvm(results[3]._settledValueField)
		taglibRubyInstalled = checkTaglibRuby(results[4]._settledValueField)

		// taglib & gpg checking are dependent on homebrew being installed
		if (homebrewInstalled) {
			taglibInstalled = checkTaglib(results[1]._settledValueField)
			gpgInstalled = checkGpg(results[2]._settledValueField)
		}

		// Taglib & taglib-ruby are the only true dependences, so only kick off the
		// full depdency installation chain if these are missing
		if (!taglibInstalled || !taglibRubyInstalled) {
			updateDependencyStatus(INSTALL_DEPENDENCIES)
			return execAsync(cmd.ping)
		} else {
			return true
		}
	})
	.then(() => {
		installHomebrew()
		return null
	})
	.catch(error => {
		console.log(error)
		
		if (error.cmd === cmd.ping) {
			updateDependencyStatus(INTERNET_IS_DISCONNECTED)
		} else {
			alert('Whoaaa, something went wrong when checking for required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues')
		}
	})
}


// CHECK IF INSTALLED

function checkHomebrew(scriptResult) {
	console.log(`Homebrew dependency check result:\n\n${scriptResult}`)
	return checkIfCommandExists(scriptResult)
}

function checkTaglib(scriptResult) {
	console.log(`Taglib dependency check result:\n\n${scriptResult}`)
	return checkIfBrewPackageExists(scriptResult)
}

function checkGpg(scriptResult) {
	console.log(`gpg dependency check result:\n\n${scriptResult}`)
	return checkIfBrewPackageExists(scriptResult)
}

function checkRvm(scriptResult) {
	console.log(`RVM dependency check result:\n\n${scriptResult}`)
	return checkIfCommandExists(scriptResult)
}

function checkTaglibRuby(scriptResult) {
	console.log(`taglib-ruby dependency check result:\n\n${scriptResult}`)
	return scriptResult.indexOf('taglib-ruby') > -1
}

function checkIfBrewPackageExists(scriptResult) {
	return scriptResult.indexOf('No such keg') === -1
}

function checkIfCommandExists(scriptResult) {
	if (typeof scriptResult === 'string') return true

	// Only return false if the command failed for the right reason.
	if (scriptResult.message.indexOf('command not found') > -1) return false
	throw(new Error(`'${cmd.checkBrew}' command failed with message:\n\n${scriptResult.message}.`))
}


/**
 * INSTALLATION ORDER
 * 
 * Each of the below items is dependent on the previous one
 *   - Homebrew
 *   - gpg / Taglib
 *   - RVM & Ruby
 *   - taglib-ruby
 */

function installHomebrew() {
	installScript(homebrewInstalled, cmd.installHomebrew, 'Installing Homebrew', installTaglib)
}

function installTaglib() {
	installScript(taglibInstalled, cmd.installTaglib, 'Installing Taglib', installGpg)
}

function installGpg() {
	installScript(gpgInstalled, cmd.installGpg, 'Installing Taglib', installRvmAndRuby)
}

function installRvmAndRuby() {
	let fullCommand = cmd.installRvmPublicKey + ' && ' + cmd.installRvmAndRuby + ' && ' + cmd.sourceRvm

	installScript(rvmInstalled, fullCommand, 'Installing RVM & Ruby', installTaglibRuby, error => (
		// Ignore this error
		error.indexOf('shell_session_update: command not found') === -1
	))
}

function installTaglibRuby() {
	installScript(taglibRubyInstalled, cmd.installTaglibRuby, 'Installing gem taglib-ruby', () => {
		updateDependencyStatus(FINISHED_INSTALLING_DEPENDENCIES)
	})
}

function installScript(isInstalled, command, message, successCallback, customErrorChecker) {
	if (isInstalled) {
		successCallback()
		return
	}

	updateDependencyStatus(INSTALL_DEPENDENCY, message)
	console.log(message)

	let script = spawn('/bin/sh', ['-c', command]),
	    hasError

	script.stdout.on('data', data => {
		updateDependencyStatus(UPDATE_DEPENDENCY_INSTALL_PROGRESS, data.toString())
	})

	script.stdout.on('close', function(){
		if (hasError) {
			alert(errorAlert)
			return
		}

		successCallback()
	})

	script.stderr.on('data', data => {
		let error = data.toString()
		hasError = customErrorChecker ? customErrorChecker(error) : true
		console.log(error)
	})
}