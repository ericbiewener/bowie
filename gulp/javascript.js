import {exec} from 'child_process'
import gulp from 'gulp'
import source from 'vinyl-source-stream'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import {dialog} from './_helpers'
import PATHS from './_paths'
import {browserSync} from './run'


export default function jsTask() {
	function bundle() {
		return Browserify.bundle()
			.on('error', emitError)
			.pipe(source('app.js'))
			.pipe(gulp.dest(PATHS.client.js.build))
			.pipe(browserSync.stream())
	}

	const Browserify = browserify({
		cache: {},
		packageCache: {},
		entries: PATHS.client.js.dev,
		debug: true,
		plugin: [watchify],
		paths: ['./node_modules', PATHS.browserifyImportRoot]
	})
	.transform(babelify, {
		presets: ['es2015', 'react'],
		plugins: ['transform-object-rest-spread']
	})

	Browserify.on('update', bundle)
	Browserify.on('log', console.log)

	return bundle
}

function emitError(error) {
	console.log(error)
	dialog.emit(
		'JS ERROR',
		error.filename,
		dialog.getLineAndColumnString(error),
		error
	)
}