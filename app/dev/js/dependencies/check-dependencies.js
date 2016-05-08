const require = window.require
const exec = require('child_process').exec
import Promise from 'bluebird'

import {dependencyStatusUpdate} from 'js/app'
import {DependencyActions} from 'js/dependencies/dependencies-redux'


const execAsync = Promise.promisify(exec)
const {INSTALLING_DEPENDENCIES, DEPENDENCIES_INSTALLED, INTERNET_IS_DISCONNECTED} = DependencyActions

let cmdPing = 'ping -c1 google.com',
    cmdBrew = 'which brew',
    cmdTaglib = 'brew ls',
    cmdTaglibRuby = 'gem list taglib-ruby',
    homebrewInstalled,
    taglibInstalled,
    taglibRubyInstalled

export function checkDependencies(callback) {
	let finalResult = {}

	Promise.all([
		execAsync(cmdBrew),
		execAsync(cmdTaglib),
		execAsync(cmdTaglibRuby),
	])
	.then(results => {
		homebrewInstalled = checkForHomebrew(results[0])
		taglibInstalled = checkForTaglib(results[1])
		taglibRubyInstalled = checkForTaglibRuby(results[2])

		if (!taglibInstalled || !taglibRubyInstalled) {
			return execAsync('ping -c1 google.com')
		} else {
			return true
		}
	})
	.then(() => {
		if (!taglibInstalled) {
			dependencyStatusUpdate(INSTALLING_DEPENDENCIES)
			if (homebrewInstalled) {
				installTaglib()
			} else {
				installHomebrew()
			}
		}
		else if (!taglibRubyInstalled) {
			dependencyStatusUpdate(INSTALLING_DEPENDENCIES)
			installTaglibRuby()
		}
		else {
			dependencyStatusUpdate(DEPENDENCIES_INSTALLED)
		}
	})
	.catch((error) => {
		console.debug(error)
		
		if (error.cmd === cmdPing) {
			dependencyStatusUpdate(INTERNET_IS_DISCONNECTED)
		} else {
			alert('Whoaaa, something went wrong when checking for required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues')
		}
	})
}


// CHECK IF INSTALLED

function checkForHomebrew(scriptResult) {
	console.debug(`Homebrew dependency check result:\n\n${scriptResult}`)
	return Boolean(scriptResult)
}

function checkForTaglib(scriptResult) {
	console.debug(`Taglib dependency check result:\n\n${scriptResult}`)
	return scriptResult.indexOf('taglib') > -1
}

function checkForTaglibRuby(scriptResult) {
	console.debug(`taglib-ruby dependency check result:\n\n${scriptResult}`)
	return scriptResult.indexOf('taglib-ruby') > -1
}


// INSTALLATION

function installHomebrew() {
	let step = 'Installing Homebrew'
	console.log(step)

	exec('/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"', function(error, stdout, stderr) {
		if (handleError(arguments, step)) return
		installTaglib()
	})
}

function installTaglib() {
	let step = 'Installing Taglib'
	console.log(step)

	exec('brew install taglib', function(error, stdout, stderr) {
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

		exec('gem install taglib-ruby', function(error, stdout, stderr) {
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
		let errorJSON = JSON.stringify({
			error: error,
			stdout: stdout,
			stderr: stderr,
			step: step
		})

		console.log(errorJSON)
		alert('Whoa, something went wrong when trying to install the required dependencies. Please open an issue on this app\'s Github page:\n\nhttps://github.com/ericbiewener/bowie/issues')

		return true
	}
}