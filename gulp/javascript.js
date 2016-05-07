import {exec} from 'child_process'
import gulp from 'gulp'
import gulpif from 'gulp-if'
import source from 'vinyl-source-stream'
import gutil from 'gulp-util'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import {dialog} from './_helpers'
import {paths, settings} from './_settings'
import {browserSync} from './serve'


const Browserify = browserify({
	cache: {},
	packageCache: {},
	entries: paths.client.js.dev,
	debug: true,
	plugin: [watchify],
	paths: ['./node_modules', paths.browserifyImportRoot]
})
.transform(babelify, {
	presets: ['es2015', 'react'],
	plugins: ['transform-object-rest-spread']
})

Browserify.on('update', jsTask)
Browserify.on('log', gutil.log)

export function jsTask() {
	Browserify.bundle()
		.on('error', function(error){
			gutil.log(error)
			dialog.emit(
				'JS ERROR',
				error.filename,
				dialog.getLineAndColumnString(error),
				error
			)
		})
		.pipe(source('app.js'))
		.pipe(gulp.dest(paths.client.js.build))
		.pipe(gulpif(!settings.isStartup, browserSync.stream()))
}