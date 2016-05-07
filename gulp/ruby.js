import gulp from 'gulp'
import {browserSync} from './serve'
import {paths} from './_settings'


export function rubyTask() {
	gulp.src(paths.client.rb)
		.pipe(browserSync.stream())
}

export function rubyTaskWatch() {
	gulp.watch(paths.client.rb, rubyTask);
}