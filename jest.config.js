const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
  testEnvironment: 'node',
  // Scoped to __tests__ dirs only - test/indicators.test.js predates this
  // config and was never wired up to a runner; it stays excluded here.
  testMatch: ['**/__tests__/**/*.test.js'],
});
