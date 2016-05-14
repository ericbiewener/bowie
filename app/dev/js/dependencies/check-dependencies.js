const require = window.require
const exec = require('child_process').exec
import Promise from 'bluebird'

import {dependencyStatusUpdate, installingDependencyUpdate} from 'js/app'
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
	let step = 'Installing RVM & Ruby'
	installingDependencyUpdate(step)
	console.log(step)

	cmd = cmd.installRvmPublicKey + ' && ' + cmd.installRvmAndRuby + ' && ' + cmd.sourceRvm

	execAsync(cmd)
		.then(installTaglibOrHomebrew)
		.catch(error => {
			// We can ignore the error 'shell_session_update: command not found'
			if (error.message.indexOf('shell_session_update: command not found') === -1) {
				handleError(error, step)
				return
			}
			
			installTaglibOrHomebrew()
		})

	return null
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
	let step = 'Installing Homebrew'
	installingDependencyUpdate(step)
	console.log(step)

	execAsync(cmd.installHomebrew)
		.then(installTaglib)
		.catch(error => handleError(error, step))

	return null
}

function installTaglib() {
	let step = 'Installing Taglib'
	installingDependencyUpdate(step)
	console.log(step)

	execAsync(cmd.installTaglib)
		.then(installTaglibRuby)
		.catch(error => handleError(error, step))

	return null
}

function installTaglibRuby() {
	if (taglibRubyInstalled) {
		dependencyStatusUpdate(DEPENDENCIES_INSTALLED)
		return
	}

	let step = 'Installing gem taglib-ruby'
	installingDependencyUpdate(step)
	console.log(step)

	execAsync(cmd.installTaglibRuby)
		.then(() => dependencyStatusUpdate(DEPENDENCIES_INSTALLED))
		.catch(error => handleError(error, step))

	return null
}

// INSTALLATION ERROR HANDLING

function handleError(error, step) {
	console.error(JSON.stringify(error), error)
	alert('Whoa, something went wrong when trying to install the required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues')
}