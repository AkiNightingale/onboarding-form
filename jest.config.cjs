/** @type {import('jest').Config} */
module.exports = {
  // Set the test environment to jsdom for React components
  testEnvironment: 'jsdom',

  // Define the file extensions Jest should look for
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Transform TypeScript and JSX files using ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // Setup files to run after the environment is set up
  setupFilesAfterEnv: ['@testing-library/jest-dom'],

  // Map module aliases to match Vite's resolve.alias configuration
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Directories where Jest should look for tests
  testMatch: ['<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)'],

  // Ignore certain directories
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Coverage configuration (optional)
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
};