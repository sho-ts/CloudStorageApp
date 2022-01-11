const gulp = require('gulp');

/** 共通ファイルをディレクトリにコピーする */
const copy = (done) => {
  gulp
    .src('./common/types/*')
    .pipe(gulp.dest('./frontend/src/types'))
    .pipe(gulp.dest('./backend/src/types'))

  gulp
    .src('./common/utils/*')
    .pipe(gulp.dest('./frontend/src/utils'))
    .pipe(gulp.dest('./backend/src/utils'))

  done();
}

exports.default = () => gulp.watch('./common/**/*.ts', copy)