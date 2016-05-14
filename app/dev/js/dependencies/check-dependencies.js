const require = window.require
// const exec = require('child_process').exec
const childProcess = require('child_process')
const exec = childProcess.exec
const spawn = childProcess.spawn
import Promise from 'bluebird'

import {dependencyStatusUpdate, installingDependencyUpdate, dependencyProgressUpdate} from 'js/app'
import {DependencyActions} from 'js/dependencies/dependencies-redux'


const execAsync = Promise.promisify(exec)
const {INSTALLING_DEPENDENCIES, DEPENDENCIES_INSTALLED, INTERNET_IS_DISCONNECTED} = DependencyActions

let cmd = {
		ping: 'ping -c1 google.com',

    	checkRvm: 'rvm -v',
    	checkBrew: 'brew -v',
    	checkTaglib: 'brew ls',
    	checkTaglibRuby: 'gem list taglib-ruby',

    	installRvmPublicKey: 'gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3',
    	installRvmAndRuby: '\curl -sSL https://get.rvm.io | bash -s stable --ruby',
    	installHomebrew: '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"',
    	installTaglib: 'brew install taglib',
    	installTaglibRuby: 'gem install taglib-ruby',

    	sourceRvm: 'source ~/.rvm/scripts/rvm',
    },
    errorAlert = 'Whoa, something went wrong when trying to install the required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues',
    rvmInstalled,
    homebrewInstalled,
    taglibInstalled,
    taglibRubyInstalled

export default function checkDependencies(callback) {
	let finalResult = {}

	Promise.all([
		execAsync(cmd.checkRvm).reflect(),
		execAsync(cmd.checkBrew).reflect(),
		execAsync(cmd.checkTaglib).reflect(),
		execAsync(cmd.checkTaglibRuby).reflect(),
	])
	.then(results => {
		rvmInstalled = checkRvm(results[0]._settledValueField)
		homebrewInstalled = checkHomebrew(results[1]._settledValueField)
		taglibRubyInstalled = checkTaglibRuby(results[3]._settledValueField)

		// Since the version of taglib we're looking for would have been installed with
		// the `brew` command, only check for it if Homebrew is already installed.
		if (homebrewInstalled) {
			taglibInstalled = checkTaglib(results[2]._settledValueField)
		}

		if (!rvmInstalled || !taglibInstalled || !taglibRubyInstalled) {
			dependencyStatusUpdate(INSTALLING_DEPENDENCIES)
			return execAsync(cmd.ping)
		} else {
			return true
		}
	})
	.then(() => {
		if (!rvmInstalled) {
			installRvmAndRuby()
		}
		else if (!taglibInstalled) {
			installTaglibOrHomebrew()
		}
		else if (!taglibRubyInstalled) {
			installTaglibRuby()
		}
		else {
			dependencyStatusUpdate(DEPENDENCIES_INSTALLED)
		}

		return null
	})
	.catch(error => {
		console.log(error)
		
		if (error.cmd === cmd.ping) {
			dependencyStatusUpdate(INTERNET_IS_DISCONNECTED)
		} else {
			alert('Whoaaa, something went wrong when checking for required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues')
		}
	})
}


// CHECK IF INSTALLED

function checkRvm(scriptResult) {
	console.log(`RVM dependency check result:\n\n${scriptResult}`)
	return checkIfCommandExists(scriptResult)
}

function checkHomebrew(scriptResult) {
	console.log(`Homebrew dependency check result:\n\n${scriptResult}`)
	return checkIfCommandExists(scriptResult)
}

function checkTaglib(scriptResult) {
	console.log(`Taglib dependency check result:\n\n${scriptResult}`)
	return scriptResult.indexOf('taglib') > -1
}

function checkTaglibRuby(scriptResult) {
	console.log(`taglib-ruby dependency check result:\n\n${scriptResult}`)
	return scriptResult.indexOf('taglib-ruby') > -1
}

function checkIfCommandExists(scriptResult) {
	if (typeof scriptResult === 'string') return true

	// Only return false if the command failed for the right reason.
	if (scriptResult.message.indexOf('command not found') > -1) return false
	throw(new Error(`'${cmd.checkBrew}' command failed with message:\n\n${scriptResult.message}.`))
}


// INSTALLATION
// return null in all methods since they provide their own promise error handling.
// We don't need to pass the promise result back up the promise chain.

function installRvmAndRuby() {
	let fullCommand = cmd.installRvmPublicKey + ' && ' + cmd.installRvmAndRuby + ' && ' + cmd.sourceRvm

	installScript(fullCommand, 'Installing RVM & Ruby', installTaglibOrHomebrew, error => (
		error.indexOf('shell_session_update: command not found') === -1
	))
}

function installTaglibOrHomebrew() {
	if (homebrewInstalled) {
		installTaglib()
	} else {
		installHomebrew()
	}

	return null
}

function installHomebrew() {
	installScript(cmd.installTaglibRuby, 'Installing Homebrew', installTaglib)
}

function installTaglib() {
	installScript(cmd.installTaglib, 'Installing Taglib', installTaglibRuby)
}

function installTaglibRuby() {
	if (taglibRubyInstalled) {
		dependencyStatusUpdate(DEPENDENCIES_INSTALLED)
		return
	}

	installScript(cmd.installTaglibRuby, 'Installing gem taglib-ruby', () => {
		dependencyStatusUpdate(DEPENDENCIES_INSTALLED)
	})
}

function installScript(command, message, successCallback, customErrorChecker) {
	installingDependencyUpdate(message)
	console.log(message)

	let hasError,
	    script = spawn('/bin/sh', ['-c', command])

	script.stdout.on('data', function(data){
		dependencyProgressUpdate(data.toString())
	})

	script.stdout.on('close', function(){
		if (hasError) {
			alert(errorAlert)
			return
		}

		successCallback()
	})

	script.stderr.on('data', function(data){
		let error = data.toString()
		hasError = customErrorChecker ? customErrorChecker(error) : true
		console.log(error)
	})
}