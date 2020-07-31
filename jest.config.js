module.exports = {
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/backpack/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
  ],
  moduleDirectories: ['node_modules', './'],
  testRegex: '.*\\.test\\.js$',
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest-dom-extend-expect'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$':
      '<rootDir>/config/jest/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/mocks/image.js',
  },
};
