const PATHS = {
  main: './main.js',
  browserifyImportRoot: './app/dev/',

  client: {
    js: {dev: './app/dev/js/app.js', build: './app/compiled/js/'},
    css: {dev: './app/dev/scss/app.scss', build: './app/compiled/css/'},
    html: './app/compiled/index.html',
    rb: './app/rb/**/*'
  },
}

export default PATHS
