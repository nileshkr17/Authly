# Authly 🔐

A modern, production-ready authentication microservice built with TypeScript, NestJS, and PostgreSQL. Authly provides JWT-based authentication, OAuth integration (Google & GitHub), and magic link login functionality.

## Features

- **JWT Authentication**: Secure token-based authentication with configurable expiration
- **OAuth Integration**: Sign in with Google and GitHub
- **Magic Link Login**: Passwordless authentication via email
- **TypeScript**: Full type safety and modern JavaScript features
- **PostgreSQL**: Robust relational database with TypeORM
- **Docker Support**: Easy deployment with Docker and Docker Compose
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks configured

## Project Structure

```
src/
├── auth/          # JWT authentication logic
├── users/         # User management
├── oauth/         # OAuth providers (Google, GitHub)
├── magiclink/     # Magic link authentication
├── common/        # Shared utilities, guards, interceptors
├── app.module.ts  # Root application module
└── main.ts        # Application entry point

tests/             # Integration and E2E tests
```

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for local development)
- PostgreSQL (if not using Docker)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nileshkr17/Authly.git
cd Authly
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and update it with your configuration:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# OAuth - Google (Get from https://console.cloud.google.com/)
OAUTH_GOOGLE_CLIENT_ID=your-google-client-id
OAUTH_GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth - GitHub (Get from https://github.com/settings/developers)
OAUTH_GITHUB_CLIENT_ID=your-github-client-id
OAUTH_GITHUB_CLIENT_SECRET=your-github-client-secret

# Magic Link
MAGIC_LINK_SECRET=your-magic-link-secret-key-change-this
```

### 4. Run with Docker Compose (Recommended)

Start both the backend and PostgreSQL database:

```bash
docker compose up
```

> **Note**: If you have Docker Compose v1, use `docker-compose up` instead.

The API will be available at `http://localhost:3000`

### 5. Run Locally (Without Docker)

If you prefer to run without Docker, ensure PostgreSQL is running locally, then:

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## Available Scripts

```bash
# Development
npm run start          # Start the application
npm run start:dev      # Start with hot reload
npm run start:debug    # Start in debug mode

# Building
npm run build          # Build the application

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Generate test coverage report
npm run test:e2e       # Run end-to-end tests

# Code Quality
npm run lint           # Lint and fix code
npm run format         # Format code with Prettier
```

## API Endpoints (Planned)

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login with email and password
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### OAuth

- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/github` - Initiate GitHub OAuth flow
- `GET /auth/github/callback` - GitHub OAuth callback

### Magic Link

- `POST /auth/magiclink/request` - Request a magic link
- `GET /auth/magiclink/verify` - Verify and login with magic link

### Users

- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update user profile
- `DELETE /users/me` - Delete user account

## Docker Commands

```bash
# Start services
docker compose up

# Start in detached mode
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f

# Rebuild containers
docker compose up --build

# Remove volumes (caution: deletes database data)
docker compose down -v
```

> **Note**: If you have Docker Compose v1, use `docker-compose` instead of `docker compose`.

## Development Guidelines

### Code Style

- The project uses ESLint and Prettier for code formatting
- Pre-commit hooks automatically format and lint staged files
- Run `npm run lint` to check for linting errors
- Run `npm run format` to format all files

### Testing

- Write unit tests for all services and controllers
- Place unit tests alongside source files (`*.spec.ts`)
- Write E2E tests in the `tests/` directory
- Aim for high test coverage

## Environment Variables

| Variable                     | Description                          | Default       |
| ---------------------------- | ------------------------------------ | ------------- |
| `PORT`                       | Application port                     | `3000`        |
| `NODE_ENV`                   | Environment (development/production) | `development` |
| `DATABASE_URL`               | PostgreSQL connection string         | -             |
| `JWT_SECRET`                 | Secret key for JWT signing           | -             |
| `JWT_EXPIRATION`             | JWT token expiration time            | `1h`          |
| `OAUTH_GOOGLE_CLIENT_ID`     | Google OAuth client ID               | -             |
| `OAUTH_GOOGLE_CLIENT_SECRET` | Google OAuth client secret           | -             |
| `OAUTH_GITHUB_CLIENT_ID`     | GitHub OAuth client ID               | -             |
| `OAUTH_GITHUB_CLIENT_SECRET` | GitHub OAuth client secret           | -             |
| `MAGIC_LINK_SECRET`          | Secret for magic link generation     | -             |
| `MAGIC_LINK_EXPIRATION`      | Magic link expiration time           | `15m`         |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions, issues, or feature requests, please open an issue on GitHub.

---

Built with ❤️ using [NestJS](https://nestjs.com/)
