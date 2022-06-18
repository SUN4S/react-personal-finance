module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest/setUpTests.js"],
  transform: {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  snapshotResolver: "<rootDir>/jest/snapshotResolver.js",
};
