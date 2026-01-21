// jest.config.js
export default {
  testEnvironment: "jsdom",
  transform: {},
  testMatch: ["**/__tests__/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverageFrom: [
    "views/**/*.ejs",
    "!**/node_modules/**",
  ],
};