// Karma configuration
// Generated on Sat Aug 24 2019 15:20:59 GMT+1000 (Australian Eastern Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'esm'],

    esm: {
      // if you are using 'bare module imports' you will need this option
      nodeResolve: true,
      // set compatibility mode to all
      compatibility: 'none',

      coverage: true
    },


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'compiled/spec/unit/**/*.spec.js', type: 'module'}
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      // 'compiled/src/**/*.js': ['coverage']
    },


    plugins: [
      require.resolve('@open-wc/karma-esm'),
      require.resolve('karma-jasmine'),
      require.resolve('karma-chrome-launcher'),
      // require.resolve('karma-coverage'),
      require.resolve('karma-coverage-istanbul-reporter')
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'progress',
      // 'coverage'
      'coverage-istanbul'
    ],

    // // optionally, configure the reporter
    // coverageReporter: {
    //   dir: require('path').join(__dirname, 'spec', 'coverage'),
    //   includeAllSources: true,
    //   reporters: [
    //     // reporters not supporting the `file` property
    //     { type: 'html', subdir: 'report-html' },
    //     // { type: 'lcov', subdir: 'report-lcov' },
    //     // reporters supporting the `file` property, use `subdir` to directly
    //     // output them in the `dir` directory
    //     // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
    //     // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
    //     // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
    //     // { type: 'text', subdir: '.', file: 'text.txt' },
    //     { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
    //   ]
    // },

    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'spec', 'coverage'),
      reports: ['html', 'text-summary', 'json'],
      combineBrowserReports: true,
      skipFilesWithNoCoverage: false,
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 80,
        functions: 80
      },
      instrumentation: {
        all: true,
        include: [
          require('path').join(__dirname, 'compiled', 'src', '**', '*.js')
        ],
      }
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
