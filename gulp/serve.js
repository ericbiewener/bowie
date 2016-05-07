import {spawn} from 'child_process'
import BrowserSync from 'browser-sync'
import {paths} from './_settings'


export const browserSync = BrowserSync.create()

export function serveTask(cb) {

	function runElectronApp(path, env={}) {
	  const electron = require('electron-prebuilt')
	  const options = {
	    env: Object.assign({NODE_ENV: 'development'}, env, process.env),
	    stdio: 'inherit'
	  }
	  return spawn(electron, [path], options)
	}

	function getRootUrl(options) {
	  const port = options.get('port')
	  return 'http://localhost:' + port
	}

	function getClientUrl(options) {
	  const connectUtils = require('browser-sync/lib/connect-utils')
	  const pathname = connectUtils.clientScript(options)
	  return getRootUrl(options) + pathname
	}

	const options = {
		ui: false,
		// Port 35829 = LiveReload's default port 35729 + 100.
		// If the port is occupied, Browsersync uses next free port automatically.
		port: 35829,
		ghostMode: false,
		open: false,
		notify: false,
		logSnippet: false,
		socket: {
			// Use the actual port here.
			domain: getRootUrl
		}
	}

	browserSync.init(options, (err, bs) => {
		if (err) return cb(err)

		runElectronApp(paths.main, {
			BROWSER_SYNC_CLIENT_URL: getClientUrl(bs.options)
		})

		cb()
	})
}