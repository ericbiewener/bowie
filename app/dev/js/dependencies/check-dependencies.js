const require = window.require
const {spawn, execFile} = require('child_process');
import path from 'path'
import Promise from 'bluebird'
import {APP_ROOT} from 'js/io/io-constants'

import {DependencyActions, updateDependencyStatus} from 'js/dependencies/dependencies-redux'


const execFilePromise = Promise.promisify(execFile)
const {	INSTALL_DEPENDENCIES, INSTALL_DEPENDENCY, UPDATE_DEPENDENCY_INSTALL_PROGRESS, 
	    FINISHED_INSTALLING_DEPENDENCIES, INTERNET_IS_DISCONNECTED } = DependencyActions

const BASH_PATH = path.join(APP_ROOT, 'bash')

let errorAlert = 'Whoa, something went wrong when trying to install the required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues',
    homebrewInstalled,
    taglibInstalled,
    gpgInstalled,
    rvmInstalled,
    taglibRubyInstalled

const bash = {
	CHECK_HOMEBREW: path.join(BASH_PATH, 'check-homebrew.sh'),
	CHECK_TAGLIB: path.join(BASH_PATH, 'check-taglib.sh'),
	CHECK_GPG: path.join(BASH_PATH, 'check-gpg.sh'),
	CHECK_RVM: path.join(BASH_PATH, 'check-rvm.sh'),
	CHECK_TAGLIB_RUBY: path.join(BASH_PATH, 'check-taglib-ruby.sh'),

	INSTALL_TAGLIB: path.join(BASH_PATH, 'install-taglib.sh'),
	INSTALL_GPG: path.join(BASH_PATH, 'install-gpg.sh'),
	INSTALL_RVM_AND_RUBY: path.join(BASH_PATH, 'install-rvm-and-ruby.sh'),
	INSTALL_TAGLIB_RUBY: path.join(BASH_PATH, 'install-taglib-ruby.sh'),

	PING: path.join(BASH_PATH, 'ping.sh'),
}


export default function checkDependencies(callback) {
	let finalResult = {}

	Promise.all([
		execFilePromise(bash.CHECK_HOMEBREW).reflect(),
		execFilePromise(bash.CHECK_TAGLIB).reflect(),
		execFilePromise(bash.CHECK_GPG).reflect(),
		execFilePromise(bash.CHECK_RVM).reflect(),
		execFilePromise(bash.CHECK_TAGLIB_RUBY).reflect(),
	])
	.then(results => {
		homebrewInstalled = checkHomebrew(results[0])
		rvmInstalled = checkRvm(results[3])
		taglibRubyInstalled = checkTaglibRuby(results[4])

		// taglib & gpg checking are dependent on homebrew being installed
		if (homebrewInstalled) {
			taglibInstalled = checkTaglib(results[1])
			gpgInstalled = checkGpg(results[2])
		}


		// Taglib & taglib-ruby are the only true dependences, so only kick off the
		// full depdency installation chain if these are missing
		if (!taglibInstalled || !taglibRubyInstalled || true) {
			updateDependencyStatus(INSTALL_DEPENDENCIES)
			return execFilePromise(bash.PING)
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
		
		if (error.message.indexOf('ping.sh') > -1) {
			updateDependencyStatus(INTERNET_IS_DISCONNECTED)
		} else {
			alert('Whoaaa, something went wrong when checking for required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues')
		}
	})
}


// CHECK IF INSTALLED

function checkHomebrew(scriptResult) {
	return checkIfCommandExists(scriptResult)
}

function checkTaglib(scriptResult) {
	return checkIfBrewPackageExists(scriptResult)
}

function checkGpg(scriptResult) {
	return checkIfBrewPackageExists(scriptResult)
}

function checkRvm(scriptResult) {
	return checkIfCommandExists(scriptResult)
}

function checkTaglibRuby(scriptResult) {
	return scriptResult._settledValueField.indexOf('taglib-ruby') > -1
}

function checkIfBrewPackageExists(scriptResult) {
	return checkIfInstalled(scriptResult, 'No such keg')
}

function checkIfCommandExists(scriptResult) {
	return checkIfInstalled(scriptResult, 'command not found')
}

function checkIfInstalled(scriptResult, stringToCheck) {
	let result = scriptResult._settledValueField
	
	console.log('Script Result:\n\n' + result)
	if (typeof result === 'string') return true

	if (scriptResult.message.indexOf(stringToCheck) > -1) return false
	throw(new Error('Command failed with message:\n\n' + scriptResult.message))
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
	installTaglib()
	// installScript(homebrewInstalled, bash.installHomebrew, 'Installing Homebrew', installTaglib)
}

function installTaglib() {
	installScript(taglibInstalled, bash.INSTALL_TAGLIB, 'Installing Taglib', installGpg)
}

function installGpg() {
	installScript(gpgInstalled, bash.INSTALL_GPG, 'Installing gpg', installRvmAndRuby)
}

// function installAllRuby() {
// 	let fullCommand = [
// 		// cmd.installRvmPublicKey,
// 		// cmd.installRvmAndRuby,
// 		// cmd.sourceRvm,
// 		// cmd.installTaglibRuby,
// 	]
// 	.join(';') // using semi-colon to allow commands to proceed even if there is an error

// 	installScript(
// 		taglibRubyInstalled,
// 		fullCommand,
// 		'Installing RVM, Ruby, and taglib-ruby',
// 		() => updateDependencyStatus(FINISHED_INSTALLING_DEPENDENCIES),
// 		error => error.indexOf('shell_session_update: command not found') === -1 // Ignore this error
// 	)
// }

function installRvmAndRuby() {
	installScript(false, bash.INSTALL_RVM_AND_RUBY, 'Installing RVM & Ruby', installTaglibRuby,
		error => error.indexOf('shell_session_update: command not found') === -1)
}

function installTaglibRuby() {
	let message = 'Installing taglib-ruby'
	updateDependencyStatus(INSTALL_DEPENDENCY, message)
	console.log(message)

	let script = spawn(INSTALL_PATH),
	    hasError

	script.stdout.on('data', data => {
		updateDependencyStatus(UPDATE_DEPENDENCY_INSTALL_PROGRESS, data.toString())
	})

	script.stdout.on('close', function(){
		if (hasError) {
			alert(errorAlert)
			return
		}

		updateDependencyStatus(FINISHED_INSTALLING_DEPENDENCIES)
	})

	script.stderr.on('data', data => {
		let error = data.toString()
		// hasError = customErrorChecker ? customErrorChecker(error) : true
		console.log(error)
	})
}

function installScript(isInstalled, scriptPath, message, successCallback, customErrorChecker) {
	if (isInstalled) {
		successCallback()
		return
	}

	updateDependencyStatus(INSTALL_DEPENDENCY, message)
	console.log(message)

	let script = spawn(scriptPath),
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