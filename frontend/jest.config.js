module.exports = {
  // The root directory that Jest should scan for tests and modules
  roots: ['<rootDir>/src'],
  
  // A list of paths to directories that Jest should use to search for files in
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],
  
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text', 'lcov'],
  
  // A map from regular expressions to module names or to arrays of module names
  // that allow to stub out resources with a single module
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js'
  },

  // An array of regexp pattern strings that are matched against all test paths before executing the test
  testPathIgnorePatterns: ['/node_modules/'],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
}; 