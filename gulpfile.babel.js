import {exec} from 'child_process'

import gulp from 'gulp'
import runSequence from 'run-sequence'
import gulpif from 'gulp-if'
import source from 'vinyl-source-stream'
import gutil from 'gulp-util'

import {settings} from './gulp/_settings'
import {serveTask, browserSync} from './gulp/serve'
import {stylesTask, stylesTaskWatch} from './gulp/styles'
import {jsTask, jsTaskWatch} from './gulp/javascript'
import {htmlTask, htmlTaskWatch} from './gulp/html'
import {rubyTask, rubyTaskWatch} from './gulp/ruby'

// INDIVIDUAL TASKS

gulp.task('serve', serveTask)

gulp.task('styles', stylesTask)
gulp.task('styles:w', stylesTaskWatch)

gulp.task('js', jsTask) // handles watch task as well

gulp.task('html', htmlTask)
gulp.task('html:w', htmlTaskWatch)

gulp.task('ruby', rubyTask)
gulp.task('ruby:w', rubyTaskWatch)

// BUILD & RUN
gulp.task('default', () => runSequence(
	['styles:w', 'html:w'], 'js', 'serve', 
	() => settings.isStartup = false)
)