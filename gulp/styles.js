import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sourcemaps from 'gulp-sourcemaps'
import {dialog} from './_helpers.js'
import {paths} from './_settings.js'
import {browserSync} from './serve.js'


export function stylesTask() {
	gulp.src(paths.client.css.dev)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', function(error){
			console.log(error.formatted)
			dialog.emit(
				'SASS ERROR',
				dialog.getLineAndColumnString(error),
				error.message.replace('Error:', '\nError:')
			);
		}))
		.pipe(postcss([ 
			autoprefixer({ browsers: ['last 2 versions'] }),
			cssnano
		]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.client.css.build))
		.pipe(browserSync.stream())
}

export function stylesTaskWatch() {
	gulp.watch('./**/*.scss', stylesTask)
}