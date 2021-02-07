const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const postcss = require('gulp-postcss');
const px2rem = require('postcss-px2rem');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const spritesmith = require('gulp.spritesmith');
const { env } = require('../webpack/module.config');

const processors = [
    px2rem({
        baseDpr: 2, // base device pixel ratio (default: 2)
        // threeVersion: true, // whether to generate @1x, @2x and @3x version (default: false)
        // remVersion: true, // whether to generate rem version (default: true)
        remUnit: 64, // rem unit value (default: 75)
        remPrecision: 6 // rem precision (default: 6)
    })
];
// gulp.task('imagemin', (done) => {
//     gulp.src(`${env.rootPath}${env.rootName}/**/*`)
//         .pipe(
//             cache(
//                 imagemin({
//                     progressive: true, // 无损压缩jpg图片，默认：false
//                     interlaced: true, // 隔行扫描gif进行渲染，默认：false
//                     multipass: true // 多次优化svg直到完全优化，默认：false
//                 })
//             )
//         )
//         .pipe(gulp.dest('app/assets'));
//     done();
// });

gulp.task('cssSprite', (done) => {
    const prefixs = [{ path: '', name: '', spritePath: '' }];
    for (const prefix of prefixs) {
        gulp.src(`${env.rootPath}static/${prefix.path}/assets/sprite/${prefix.spritePath}/*.png`)
            .pipe(
                spritesmith({
                    imgName: `${env.rootPath}static/${prefix.path}/assets/${prefix.name}.png`,
                    cssName: `${env.rootPath}static/${prefix.path}/scss/${prefix.name}.scss`,
                    cssFormat: 'scss',
                    cssTemplate: 'scss.handlebars',
                    cssOpts: 'sprite'
                })
            )
            .pipe(gulp.dest('./'));
    }
    done();
});

gulp.task('scssPC', (done) => {
    const prefixs = [{ name: '', path: '' }];
    for (const prefix of prefixs) {
        gulp.src(`${env.rootPath}static/${prefix.path}/scss/${prefix.name}.scss`)
            .pipe(sass().on('error', sass.logError))
            .pipe(
                autoprefixer({
                    cascade: false
                })
            )
            .pipe(gulp.dest(`${env.rootPath}static/${prefixs.name}/css`));
    }
    done();
});

gulp.task('scssWap', (done) => {
    const prefixs = [{ name: '', path: '' }];
    for (const prefix of prefixs) {
        gulp.src(`${env.rootPath}static/${prefix.path}/scss/wap${prefix.name}.scss`)
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss(processors))
            .pipe(
                autoprefixer({
                    cascade: false
                })
            )
            .pipe(gulp.dest(`${env.rootPath}static/${prefix.path}/css`));
    }
    done();
});

gulp.task('watch-scssPC', () => {
    gulp.watch([`${env.rootPath}static/test/scss/test.scss`], gulp.series('scssPC'));
});

gulp.task('watch-scssWap', () => {
    gulp.watch([`${env.rootPath}static/test/scss/waptest.scss`], gulp.series('scssWap'));
});
