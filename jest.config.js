export default {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
}
