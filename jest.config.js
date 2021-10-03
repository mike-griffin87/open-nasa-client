module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.vue",
    "src/views/*.vue",
    "!**/node_modules/**",
  ],
  coverageDirectory: "./coverage",
  coverageReporters: ["html", "text", "text-summary"],
  testMatch: ["**/src/**/*.spec.[jt]s?(x)"],
  setupFiles: ["./tests/vuetifyTestSetup.js"],
  transformIgnorePatterns: ["/node_modules/(?!vuetify/)"],
};
