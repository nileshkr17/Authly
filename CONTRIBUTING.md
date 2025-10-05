# Contributing to Authly

Thank you for considering contributing to Authly! This document outlines the process and requirements for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Authly.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Pull Request Requirements

Before submitting a Pull Request, ensure that:

### ✅ Code Quality
- [ ] **Linting passes**: Run `npm run lint` to check code style
- [ ] **Build succeeds**: Run `npm run build` to ensure no compilation errors
- [ ] **All tests pass**: Run `npm run test` to verify all existing tests pass

### ✅ Testing Requirements
- [ ] **Add unit tests**: If you implement new functionality, you **must** add corresponding unit tests
- [ ] **Test coverage**: Aim for at least 80% code coverage for new code
- [ ] **Test your changes**: Run `npm run test:cov` to check coverage

### 📝 Test Guidelines

When adding unit tests:
1. Place test files next to the file being tested with `.spec.ts` extension
2. Follow the existing test patterns in the codebase (see `src/users/users.service.spec.ts` as an example)
3. Mock external dependencies
4. Test both success and error cases
5. Use descriptive test names

Example test structure:
```typescript
describe('YourService', () => {
  let service: YourService;
  
  beforeEach(async () => {
    // Setup
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

## Automated PR Validation

When you open a Pull Request, our CI/CD pipeline will automatically:
1. Run linting checks
2. Build the project
3. Execute all unit tests
4. Generate a coverage report
5. Comment the coverage report on your PR

**Your PR will not be merged unless all checks pass.**

## Development Workflow

### Install Dependencies
```bash
npm ci
```

### Run Development Server
```bash
npm run start:dev
```

### Run Linting
```bash
npm run lint
```

### Run Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov
```

### Build Project
```bash
npm run build
```

## Code Style

- Follow the existing code style
- Use TypeScript types properly
- Write clear, self-documenting code
- Add comments only when necessary to explain complex logic

## Commit Messages

Write clear and meaningful commit messages:
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Start with a capital letter
- Keep the first line under 72 characters
- Reference issues and pull requests when relevant

## Questions?

If you have questions or need help, feel free to:
- Open an issue
- Ask in the pull request discussion
- Reach out to the maintainers

## License

By contributing, you agree that your contributions will be licensed under the ISC License.
