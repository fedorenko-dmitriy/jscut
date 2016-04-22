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
        src: [
          'app/*.js',
          'app/**/*.js'
        ],
        dest: 'static/app.js'
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          'build/module.js': ['app/**/*.js']
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
      unit: {
        configFile: 'karma_unit.conf.js'
      },

      integration: {
        configFile: 'karma_integration.conf.js'
      },

      dev: {
        // On our local environment we want to test all the things!
        browsers: ['Chrome']//'Firefox', 'PhantomJS'
         //browsers: ['PhantomJS']//'Firefox', 'PhantomJS'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          require: 'babel-register'
        },
        src: ['tests/*.js', 'tests/**/*.js']
      }
    },

    mocha_phantomjs: {
      options: {
        //reporter: 'spec',
        //quiet: false, // Optionally suppress output to standard out (defaults to false)
        //clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
        require: 'babel-register'
      },
      all: ['tests/*.js', 'tests/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask("babelify", ["babel"]);
  grunt.registerTask("deploy", ["browserify"]);
  grunt.registerTask("jshint_", ["jshint"]);
  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('test_', 'mocha_phantomjs');



  grunt.registerTask('karma-unit', ['karma']);
};
