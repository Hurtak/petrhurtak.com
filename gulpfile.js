const gulp = require('gulp')
const execa = require('execa')

gulp.task('compile', function () {
  return execa('node', ['src/server/index.js']).then(result => {
    console.log(result.stdout)
  })
})

gulp.task('default', gulp.series('compile'))

// gulp.watch('')
