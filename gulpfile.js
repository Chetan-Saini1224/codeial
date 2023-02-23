const {series,src,dest, task} = require("gulp"); //gulp create task like minifed css
const sass = require("gulp-sass")(require('sass'));
const postcss = require('gulp-postcss')

const uglify = require("gulp-uglifyes"); // to minify the js 
const imagemin = require("gulp-imagemin");

const cssnano = require("gulp-cssnano");

//rev is used to provide unique name so file wont cache
const rev = require('gulp-rev');

const del = require('del');

task('css',function(done) {
    src('./assets/sass/**/*.scss', {sourcemaps:true})
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('./assets.css'))

    src('./assets/**/*.css')
    .pipe(rev())
    .pipe(dest("./public/assets"))
    .pipe(rev.manifest({           
        cwd: 'public',
        merge:true
    }))
    .pipe(dest('./public/assets'))
    done(); // in any casee error pass over here
}) 
 //manifest file store correspong path to each file
 //so whenever file ask for css/home.css it will pick file 
 //corresponding to (css/home.css) : value(return this path)

 task('js',function(done) {
    src('./assets/**/*.js')
    .pipe(uglify({ 
        mangle: false, 
        ecma: 6 
     }))
    .pipe(rev())
    .pipe(dest("./public/assets"))
    .pipe(rev.manifest({           
        cwd: 'public',
        merge:true
    }))
    .pipe(dest('./public/assets'))
    done(); 
}) 


task('images',function(done) 
{
    src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(dest("./public/assets"))
    .pipe(rev.manifest({           
        cwd: 'public',
        merge:true
    }))
    .pipe(dest('./public/assets'))
    done(); 
}) 



//empty the public assets directory
task('clean:assets',function(done){
    del.sync("./public/assets");
    done();
})


task('build', series('clean:assets','css','js','images'), function(done){
    done();
})








