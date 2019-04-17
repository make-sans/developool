module.exports = {
    setupFilesAfterEnv: [
        "<rootDir>/src/__tests__/setup/setupTest.js"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/src/__tests__/setup/"
    ]
};