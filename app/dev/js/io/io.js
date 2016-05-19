require = window.require
const {spawn, execFile} = require('child_process')
import path from 'path'

import {APP_ROOT} from 'js/io/io-constants'
import {IoActionCreators} from 'js/io/io-redux'
import store from 'js/store/store'


const RUBY_LAUNCHER_FILEPATH = path.join(APP_ROOT, 'bash', 'ruby-launcher.sh')
const TAG_READER_FILEPATH = path.join(APP_ROOT, 'rb', 'read_tags.rb')
const TAG_WRITER_FILEPATH = path.join(APP_ROOT, 'rb', 'write_tags.rb')

export function readFiles(files) {
	// Stream stdout with `spawn` so that we don't have to worry about
	// exceeding the max buffer size with execFile
	let filepaths = JSON.stringify(files.map(f => f.path)),
		tagParser = spawn(RUBY_LAUNCHER_FILEPATH, [TAG_READER_FILEPATH, filepaths]),
	    stdout = []
	
	// Don't bother with `stderr` or `on.('error')`. The sourcing of RVM in ruby-launcher.sh
	// will often throw an error even though it gets the job done. At the end of the day,
	// we only care if we can parse the stdout, so just catch errors at that point.
	tagParser.stdout.on('data', data => stdout = [...stdout, data]) 
	tagParser.on('close', () => {
		try {
			let songs = JSON.parse(stdout.toString())
			songs.forEach((song, i) => {
				if (!song.Title) song.Title = files[i].name
			})
			store.dispatch(IoActionCreators.replaceSongs(songs))
		}
		catch (e) {
			console.error(e)
			console.error(stdout.toString())
			alert('Whoaaa whoaa whoa.\n\nCouldn\'t read those files!')
		}
	})
}

export function saveTags(songs) {
	execFile(
		RUBY_LAUNCHER_FILEPATH, 
		[TAG_WRITER_FILEPATH, JSON.stringify(songs)], 
		(error, stdout, stderr) => {
			if (error) alert('Whoaaa whoaa whoa.\n\nSomething went wrong while saving your changes!')
		}
	)
}