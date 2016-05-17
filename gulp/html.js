import gulp from 'gulp'
import {browserSync} from './run'
import PATHS from './_paths'


export function htmlTask() {
	gulp.src(PATHS.client.html)
		.pipe(browserSync.stream())
}

export function htmlTaskWatch() {
	gulp.watch(PATHS.client.html, htmlTask);
}