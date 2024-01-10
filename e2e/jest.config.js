module.exports = {
  maxWorkers: 1,
  testRunner: 'jest-circus/runner',
  testTimeout: 240000,
  testMatch: ['<rootDir>/e2e/**/*.js'],
  reporters: [
    'detox/runners/jest/streamlineReporter',
    // [
    //     "jest-junit",
    //     {
    //         "suiteName": "Loop UI",
    //         "outputDirectory": "./artifacts",
    //         "outputName": "loopUITests.xml",
    //         "ancestorSeparator": " › ",
    //         "suiteNameTemplate": "{filename}",
    //         "classNameTemplate": "{classname}",
    //         "titleTemplate": "{title}"
    //     }
    // ],
    // [
    //     "jest-html-reporters",
    //     {
    //         "publicPath": "./artifacts",
    //         "filename": "loopUITests.html",
    //         "expand": true
    //     }
    // ]
  ],
  verbose: true,
};
