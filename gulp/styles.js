import gulp from 'gulp'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sourcemaps from 'gulp-sourcemaps'
import {dialog} from './_helpers'
import PATHS from './_paths'
import {browserSync} from './run'


export function stylesTask() {
	function compile() {
		gulp.src(PATHS.client.css.dev)
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
			.pipe(gulp.dest(PATHS.client.css.build))
			.pipe(browserSync.stream())
	}

	compile()
	return compile
}

export function stylesTaskWatch() {
	gulp.watch('./**/*.scss', stylesTask)
}
