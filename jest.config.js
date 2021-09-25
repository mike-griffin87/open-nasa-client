module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.vue",
    "src/modals/*.vue",
    "!**/node_modules/**",
  ],
  coverageDirectory: "./coverage",
  coverageReporters: ["html", "text", "text-summary"],
  testMatch: ["**/src/**/*.spec.[jt]s?(x)"],
  setupFiles: ["jest-canvas-mock", "./vutifyTestSetup.js"],
  transformIgnorePatterns: ["/node_modules/(?!vuetify/)"],
};
