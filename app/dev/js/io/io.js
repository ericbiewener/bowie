require = window.require;
const {spawn, execFile} = require('child_process');
import path from 'path'

import {APP_ROOT} from 'js/io/io-constants'
import {IoActionCreators} from 'js/io/io-redux'
import store from 'js/redux/store'


const TAG_READER_FILEPATH = path.join(APP_ROOT, 'rb', 'read_tags.rb')
const TAG_WRITER_FILEPATH = path.join(APP_ROOT, 'rb', 'write_tags.rb')

export function readFiles(files) {
	// Must use `spawn` to stream the output because the total output may be too 
	// large for execFile, thus throwing an error when trying to JSON.parse it
	let tagParser = spawn(TAG_READER_FILEPATH, files.map(f => f.path)),
	    dataArray = []
	
	tagParser.stdout.on('data', data => dataArray = [...dataArray, data]) 

	tagParser.stdout.on('close', () => {
		let songs = JSON.parse(dataArray.toString())
		songs.forEach((song, i) => {
			if (!song.Title) song.Title = files[i].name
		})
		store.dispatch(IoActionCreators.replaceSongs(songs))
	})

	tagParser.stderr.on('data', data => {
		alert('Whoaaa whoaa whoa.\n\nCouldn\'t read those files!')
		console.error(`stderr: ${data}`)
	})
}

export function saveTags(songs) {
	let tagParser = execFile(TAG_WRITER_FILEPATH, [JSON.stringify(songs)])

	tagParser.stderr.on('error', data => {
		alert('Whoaaa whoaa whoa.\n\nSomething went wrong while saving your changes!')
		console.error(`stderr: ${data}`)
	})
}