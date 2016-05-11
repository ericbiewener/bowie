export const paths = {
  main: './main.js',
  browserifyImportRoot: './app/dev/',

  client: {
    js: {dev: './app/dev/js/app.js', build: './app/build/js/'},
    css: {dev: './app/dev/scss/app.scss', build: './app/build/css/'},
    html: './app/build/index.html',
    rb: './app/rb/**/*'
  },
}

export const settings = {
  isStartup: true
}