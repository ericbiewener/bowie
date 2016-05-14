const require = window.require
const exec = require('child_process').exec
import Promise from 'bluebird'

import {dependencyStatusUpdate} from 'js/app'
import {DependencyActions} from 'js/dependencies/dependencies-redux'


const execAsync = Promise.promisify(exec)
const {INSTALLING_DEPENDENCIES, DEPENDENCIES_INSTALLED, INTERNET_IS_DISCONNECTED} = DependencyActions

let cmd = {
		ping: 'ping -c1 google.com',

		path: 'echo $PATH',

    	checkRvm: 'rvm -v',
    	checkBrew: 'brew -v',
    	checkTaglib: 'brew ls',
    	checkTaglibRuby: 'gem list taglib-ruby',

    	installRvmPublicKey: 'gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3',
    	installRvmAndRuby: '\curl -sSL https://get.rvm.io | bash -s stable --ruby',
    	installHomebrew: '/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"',
    	installTaglib: 'brew install taglib',
    	installTaglibRuby: 'gem install taglib-ruby',
    },
    rvmInstalled,
    homebrewInstalled,
    taglibInstalled,
    taglibRubyInstalled

export function checkDependencies(callback) {
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
			return execAsync('ping -c1 google.com')
		} else {
			return true
		}
	})
	.then(() => {
		if (!rvmInstalled || !taglibInstalled || !taglibRubyInstalled) {
			dependencyStatusUpdate(INSTALLING_DEPENDENCIES)
		}

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
	})
	.catch((error) => {
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

function installRvmAndRuby() {
	let step = 'Installing key, RVM & Ruby'
	console.log(step)

	exec(`${cmd.installRvmPublicKey} && ${cmd.installRvmAndRuby}`, function(error, stdout, stderr) {
		// We can ignore the error 'shell_session_update: command not found'
		if (error && error.message.indexOf('shell_session_update: command not found') === -1) {
			handleError(arguments, step)
			return
		}
		installTaglibOrHomebrew()
	})
}

function installTaglibOrHomebrew() {
	if (homebrewInstalled) {
		installTaglib()
	} else {
		installHomebrew()
	}
}

function installHomebrew() {
	let step = 'Installing Homebrew'
	console.log(step)

	exec(cmd.installHomebrew, function(error, stdout, stderr) {
		if (handleError(arguments, step)) return
		installTaglib()
	})
}

function installTaglib() {
	let step = 'Installing Taglib'
	console.log(step)

	exec(cmd.installTaglib, function(error, stdout, stderr) {
		if (handleError(arguments, step)) return
		installTaglibRuby()
	})
}

function installTaglibRuby() {
	if (taglibRubyInstalled) {
		dependencyStatusUpdate(DEPENDENCIES_INSTALLED)
	}
	else {
		let step = 'Installing taglib-ruby'
		console.log(step)

		exec(cmd.installTaglibRuby, function(error, stdout, stderr) {
			if (handleError(arguments, step)) return
			dependencyStatusUpdate(DEPENDENCIES_INSTALLED)
		})
	}
}

// INSTALLATION ERROR HANDLING

function handleError(scriptOutput, step) {
	let error = scriptOutput[0],
	    stdout = scriptOutput[1],
	    stderr = scriptOutput[2]
	
	if (error) {
		let errorObj = {
			error: error,
			stdout: stdout,
			stderr: stderr,
			step: step
		}
		let errorJSON = JSON.stringify(errorObj)

		console.log(errorJSON, errorObj)
		alert('Whoa, something went wrong when trying to install the required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues')

		return true
	}
}