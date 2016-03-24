/**
 * Created by user on 23.03.16.
 */
module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        },
        transform: ['babelify']
      },
      app: {
        src: ['app/*.js', 'app/**/*.js'],
        dest: 'static/app.js'
      }
    },
    "babel": {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          'build/module.js': ['app/**/*.js']
          //"static/app.js": "build/module.js"
        }
      }
    },

    watch: {
      scripts:{
        files: ['app/*.js', 'app/**/*.js'],
        tasks: ['browserify'],

        options: {
          dateFormat: function(time) {
            grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
            grunt.log.writeln('Waiting for more changes...');
          }
        }
      }
    },

    jshint: {
      options:{
        "esnext": true
      },
      all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js', 'test/*.js', 'test/**/*.js']
    },

    karma: {
      options: {
        // Configuration options that tell Karma how to run
        configFile: 'karma.conf.js'
        //files: [ 'test/*.js', 'test/**/*.js' ]
      },

      dev: {
        // On our local environment we want to test all the things!
        browsers: ['Chrome']//'Firefox', 'PhantomJS'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['tests/*.js', 'tests/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask("babelify", ["babel"]);
  grunt.registerTask("browserify_", ["browserify"]);
  grunt.registerTask("jshint_", ["jshint"]);
  grunt.registerTask('test', 'mochaTest');


  grunt.registerTask('karma_', ['karma']);


};
