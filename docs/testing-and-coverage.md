# Testing and Coverage Documentation

This document explains the testing setup, coverage generation, and CI workflow requirements for the Authly project.

## Overview

Authly uses Jest for testing and generating code coverage reports. The CI pipeline validates that all tests pass and that coverage reports are properly generated before code can be merged.

## Running Tests

### Unit Tests

Run all unit tests:
```bash
npm run test
```

### Tests with Coverage

Generate coverage reports:
```bash
npm run test:cov
```

### Watch Mode

Run tests in watch mode for development:
```bash
npm run test:watch
```

## Coverage Output

When you run `npm run test:cov`, Jest generates several coverage files in the `coverage/` directory:

### Generated Files

1. **`coverage/lcov.info`** - LCOV format coverage data (required for Codecov)
2. **`coverage/coverage-final.json`** - JSON format coverage data
3. **`coverage/clover.xml`** - Clover XML format coverage data
4. **`coverage/lcov-report/`** - HTML coverage report for local viewing

### Required Output

The CI workflow specifically requires:
- **`coverage/lcov.info`** - This file must exist for the Codecov upload to succeed

## Jest Configuration

The project's `jest.config.js` configures coverage generation:

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

### Key Configuration Points

- **`collectCoverageFrom`**: Collects coverage from all TypeScript and JavaScript files in `src/`
- **`coverageDirectory`**: Outputs coverage reports to the `coverage/` directory at the project root
- **Coverage Reporters**: Jest uses default reporters which include `lcov`, `json`, `text`, and `clover`

## CI Workflow Coverage Validation

The PR validation workflow (`.github/workflows/pr-validation.yml`) includes the following steps:

### 1. Run Tests with Coverage
```yaml
- name: Run tests with coverage
  run: npm run test:cov
```

### 2. Verify Coverage File Exists
```yaml
- name: Verify coverage file exists
  run: |
    if [ ! -f "./coverage/lcov.info" ]; then
      echo "❌ Error: coverage/lcov.info not found."
      echo "Ensure Jest outputs 'lcov' and that 'npm run test:cov' generates coverage."
      exit 1
    fi
    echo "✅ Coverage file found: coverage/lcov.info"
```

This verification step:
- Checks that `coverage/lcov.info` exists after running tests
- Provides a clear error message if the file is missing
- Fails the CI build if coverage generation didn't work correctly

### 3. Upload to Codecov
```yaml
- name: Upload coverage reports
  uses: codecov/codecov-action@v4
  if: success()
  with:
    files: ./coverage/lcov.info
    flags: unittests
    name: codecov-umbrella
    fail_ci_if_error: false
  env:
    CODECOV_TOKEN: ${{ secrets.CODECOV_TOKEN }}
```

The Codecov upload:
- Only runs if the previous steps succeeded
- Uses the verified `coverage/lcov.info` file
- Won't fail the CI even if Codecov upload fails (`fail_ci_if_error: false`)

### 4. Comment Coverage on PR
The workflow also posts a coverage summary as a comment on pull requests, showing:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

## Troubleshooting

### Coverage File Not Generated

If `coverage/lcov.info` is not generated:

1. **Check Jest is installed**: Run `npm ci` to ensure all dependencies are installed
2. **Verify Jest configuration**: Ensure `jest.config.js` has `coverageDirectory: '../coverage'`
3. **Run tests locally**: Execute `npm run test:cov` and check the output
4. **Check coverage directory**: Verify the `coverage/` directory is created with `lcov.info` inside

### Low Coverage Warning

If your PR shows coverage below 80%, you'll see a warning:
```
⚠️ Coverage is below 80%. Please add more unit tests.
```

To improve coverage:
1. Add unit tests for untested code paths
2. Follow the test patterns in existing `*.spec.ts` files
3. Mock external dependencies appropriately
4. Test both success and error cases

## Writing Tests

### Test File Naming

Place test files next to the file being tested with `.spec.ts` extension:
```
src/users/
  users.service.ts
  users.service.spec.ts
```

### Test Structure

Follow the existing test patterns in the codebase:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { YourService } from './your.service';

describe('YourService', () => {
  let service: YourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YourService],
    }).compile();

    service = module.get<YourService>(YourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('yourMethod', () => {
    it('should handle success case', async () => {
      // Test implementation
    });

    it('should handle error case', async () => {
      // Test implementation
    });
  });
});
```

## Coverage Goals

- **Minimum**: 80% coverage for new code
- **Target**: Maintain or improve overall project coverage
- **Focus**: Prioritize testing business logic and critical paths

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines including testing requirements
- [Jest Documentation](https://jestjs.io/docs/getting-started) - Official Jest documentation
- [Codecov Documentation](https://docs.codecov.com/) - Codecov integration details
