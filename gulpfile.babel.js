import gulp from 'gulp'
import runSequence from 'run-sequence'

import {runTask, browserSync} from './gulp/run'
import {stylesTask, stylesTaskWatch} from './gulp/styles'
import jsTask from './gulp/javascript'
import {htmlTask, htmlTaskWatch} from './gulp/html'


// INDIVIDUAL TASKS

gulp.task('run', runTask)

gulp.task('styles', stylesTask())
gulp.task('styles:w', stylesTaskWatch)

gulp.task('js', jsTask()) // handles watch task as well

gulp.task('html', htmlTask)
gulp.task('html:w', htmlTaskWatch)


// BUILD & RUN

gulp.task('default', () => runSequence(
	['styles:w', 'html:w'], 'js', 'run'
))