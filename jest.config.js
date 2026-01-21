export default {
  testEnvironment: 'jsdom',
  transform: {},
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'views/**/*.ejs',
    '!**/node_modules/**',
  ],
  // gérer les modules ES
  transformIgnorePatterns: [
    'node_modules/(?!(@exodus/bytes|html-encoding-sniffer)/)'
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};