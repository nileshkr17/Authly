# Testing and Coverage

Our CI expects `npm run test:cov` to generate an LCOV report at `coverage/lcov.info`. The PR validation workflow verifies this file exists and only uploads coverage when present.

## Expected Commands and Output

### Running Tests with Coverage

```bash
npm run test:cov
```

This command runs Jest with coverage enabled and generates:
- `coverage/lcov.info` - LCOV format coverage report (required for Codecov)
- `coverage/coverage-final.json` - JSON format coverage data
- `coverage/clover.xml` - Clover format coverage report
- `coverage/lcov-report/` - HTML coverage report for local viewing

### Jest Configuration

The project uses Jest for testing, configured in `jest.config.js`:

```javascript
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
```

### Coverage Output Requirements

For CI to pass:
1. All tests must pass
2. The `coverage/lcov.info` file must be generated
3. Jest must be configured with `coverageDirectory: '../coverage'` (relative to `rootDir: 'src'`)

By default, Jest includes multiple reporters including `lcov`, so no additional configuration is needed for coverage reporting.

## CI Workflow

The PR validation workflow (`.github/workflows/pr-validation.yml`) includes:

1. **Coverage Generation**: Runs `npm run test:cov`
2. **Coverage Verification**: Checks that `coverage/lcov.info` exists
3. **Codecov Upload**: Conditionally uploads coverage only when the file is present

This ensures that contributors understand coverage expectations and provides clear error messages when coverage generation fails.
