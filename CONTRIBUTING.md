# Contributing to Authly

Thank you for your interest in contributing to Authly! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

```bash
# Clone your fork
git clone https://github.com/your-username/Authly.git
cd Authly

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure your .env file with necessary credentials
```

### Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov
```

### Writing Tests

- Place test files next to the files they test with the `.spec.ts` extension
- Follow the existing test patterns in the codebase
- Ensure all new features include appropriate test coverage

## Code Quality

### Linting

```bash
# Run ESLint
npm run lint
```

### Formatting

```bash
# Format code with Prettier
npm run format
```

## Coverage

See [Testing and Coverage](./docs/testing-and-coverage.md) for how CI validates and uploads coverage reports.

## Pull Request Guidelines

- Keep pull requests focused on a single feature or bug fix
- Update documentation as needed
- Ensure all tests pass
- Follow the existing code style
- Write clear commit messages
- Reference any related issues in your PR description

## Code of Conduct

Please be respectful and constructive in all interactions with the community. We aim to maintain a welcoming and inclusive environment for all contributors.

## Questions?

If you have questions or need help, feel free to:
- Open an issue
- Reach out to the maintainers
- Check existing documentation and issues

Thank you for contributing to Authly! 🚀
