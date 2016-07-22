module.exports = function(config) {
  config.set({
    frameworks: ['mocha-debug', 'mocha', 'browserify', 'sinon-chai'],
    files: [
      //'./app/*.js',
      //'./app/**/*.js',
      './tests/unit/*.js',
      './tests/unit/**/*.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['dots'],
    //reporters: ['coverage'],
    //reporters: ['progress'],

    // web server port
    port: 9877,

    preprocessors: {
      //'./app/*.js' : ["browserify"],
      //'./app/**/*.js' : ["browserify"],
      './tests/unit/*.js' : ["browserify"],
      './tests/unit/**/*.js' : ["browserify"]
    },

    browserify: {
      debug: true,
      transform: ['babelify']
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    client: {
      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'tdd'
      }
    }
  });
};
