import gulp from 'gulp'
import {browserSync} from './serve'
import {paths} from './_settings'


export function htmlTask() {
	gulp.src(paths.client.html)
		.pipe(browserSync.stream())
}

export function htmlTaskWatch() {
	gulp.watch(paths.client.html, htmlTask);
}