<div align="center">

# 🔐 Authly

### Plug-and-Play Authentication Microservice for Indie Developers

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/nileshkr17/Authly)
[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-friendly-orange)](https://hacktoberfest.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/nileshkr17/Authly/pulls)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Usage](#-api-usage) • [Contributing](#-contributing)

</div>

---

## 🎯 Problem & Solution

### The Problem
Building authentication from scratch is time-consuming, error-prone, and complex. Indie developers and small teams often spend weeks implementing secure authentication instead of focusing on their core product.

### The Solution
**Authly** is a production-ready authentication microservice that you can deploy in minutes. It handles all the complexity of modern authentication, so you can focus on building your application.

---

## ✨ Features

### 🎯 Must-Have Features
- ✅ **JWT-based Authentication** - Secure token-based authentication with refresh tokens
- ✅ **Email/Password Login** - Traditional signup and login with secure password hashing
- ✅ **OAuth Integration** - Seamless login with Google and GitHub
- ✅ **Passwordless Magic Links** - Email-based authentication without passwords
- ✅ **User Management** - Complete user CRUD operations
- ✅ **Token Refresh** - Automatic token renewal for seamless user experience
- ✅ **Security Best Practices** - Password hashing, CORS, rate limiting, and more

### 🚀 Should-Have Features (Coming Soon)
- 📧 Email Verification
- 🔄 Password Reset Flow
- 👥 Role-Based Access Control (RBAC)
- 📱 Two-Factor Authentication (2FA)
- 🔍 Session Management
- 📊 Activity Logging

### 💡 Could-Have Features (Future Roadmap)
- 🎨 Pre-built UI Components
- 📦 SDK for Popular Frameworks (React, Vue, Angular)
- 🔌 Webhook Support
- 📈 Analytics Dashboard
- 🌐 Multi-tenancy Support
- 🔐 SSO (Single Sign-On)

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Backend** | TypeScript, Node.js, NestJS/Express |
| **Database** | PostgreSQL, TypeORM |
| **Authentication** | JWT, Passport.js, bcrypt |
| **Email** | Nodemailer |
| **Containerization** | Docker, Docker Compose |
| **Testing** | Jest, Supertest |
| **Code Quality** | ESLint, Prettier |

</div>

---

## 📸 API Usage Examples

### 🔹 User Registration

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 🔹 User Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 🔹 OAuth Login (Google)

```bash
GET /api/auth/google
```

Redirects to Google OAuth consent screen, then callback to:

```bash
GET /api/auth/google/callback?code=AUTHORIZATION_CODE
```

### 🔹 OAuth Login (GitHub)

```bash
GET /api/auth/github
```

Redirects to GitHub OAuth consent screen, then callback to:

```bash
GET /api/auth/github/callback?code=AUTHORIZATION_CODE
```

### 🔹 Magic Link Login

**Step 1: Request Magic Link**
```bash
POST /api/auth/magic-link
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Magic link sent to your email"
}
```

**Step 2: Verify Magic Link**
```bash
GET /api/auth/magic-link/verify?token=MAGIC_LINK_TOKEN
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful",
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 🔹 Token Refresh

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 🔹 Protected Route Example

```bash
GET /api/users/me
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v13 or higher)
- **Docker** (optional, for containerized setup)
- **Git**

### 📦 Installation

#### Option 1: Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nileshkr17/Authly.git
   cd Authly
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your configuration:
   ```env
   # Application
   NODE_ENV=development
   PORT=3000
   API_PREFIX=/api

   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=authly

   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRATION=15m
   JWT_REFRESH_SECRET=your-super-secret-refresh-key
   JWT_REFRESH_EXPIRATION=7d

   # OAuth - Google
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

   # OAuth - GitHub
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

   # Email (for magic links)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   EMAIL_FROM=noreply@authly.com

   # Magic Link
   MAGIC_LINK_SECRET=your-magic-link-secret
   MAGIC_LINK_EXPIRATION=15m
   MAGIC_LINK_URL=http://localhost:3000/api/auth/magic-link/verify

   # Security
   BCRYPT_ROUNDS=10
   RATE_LIMIT_TTL=60
   RATE_LIMIT_MAX=100
   ```

4. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb authly

   # Run migrations
   npm run migration:run
   # or
   yarn migration:run
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

   The API will be available at `http://localhost:3000`

#### Option 2: Docker Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nileshkr17/Authly.git
   cd Authly
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file as needed.

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - Authly API on `http://localhost:3000`
   - PostgreSQL on `localhost:5432`

4. **View logs**
   ```bash
   docker-compose logs -f
   ```

5. **Stop the services**
   ```bash
   docker-compose down
   ```

---

## 🏃 Running the Project

### Development Mode
```bash
npm run start:dev
# or
yarn start:dev
```

### Production Mode
```bash
# Build the project
npm run build
# or
yarn build

# Start production server
npm run start:prod
# or
yarn start:prod
```

### Running Tests
```bash
# Unit tests
npm run test
# or
yarn test

# E2E tests
npm run test:e2e
# or
yarn test:e2e

# Test coverage
npm run test:cov
# or
yarn test:cov
```

### Linting & Formatting
```bash
# Run ESLint
npm run lint
# or
yarn lint

# Fix ESLint errors
npm run lint:fix
# or
yarn lint:fix

# Format with Prettier
npm run format
# or
yarn format
```

---

## 🤝 Contributing

We love contributions! Authly is an open-source project and we welcome contributions of all kinds: code, documentation, bug reports, feature requests, etc.

### 🎃 Hacktoberfest

Authly is **Hacktoberfest-friendly**! We have plenty of issues labeled as `good first issue` and `hacktoberfest` that are perfect for newcomers.

### How to Contribute

1. **Fork the repository**
   
   Click the "Fork" button at the top right of this page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Authly.git
   cd Authly
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**
   
   Follow the coding standards and write tests for your changes.

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `test:` for test changes
   - `refactor:` for code refactoring
   - `chore:` for maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   
   Go to the [Authly repository](https://github.com/nileshkr17/Authly) and click "New Pull Request".

### 🐛 Good First Issues

Looking for a place to start? Check out issues labeled with:
- [`good first issue`](https://github.com/nileshkr17/Authly/labels/good%20first%20issue) - Perfect for newcomers
- [`help wanted`](https://github.com/nileshkr17/Authly/labels/help%20wanted) - We need your help!
- [`hacktoberfest`](https://github.com/nileshkr17/Authly/labels/hacktoberfest) - Hacktoberfest-friendly issues

### 📋 Contribution Ideas

- 🐛 Fix bugs or report issues
- ✨ Add new features
- 📝 Improve documentation
- 🧪 Write tests
- 🎨 Improve UI/UX
- 🌐 Add translations
- ⚡ Performance improvements
- 🔒 Security enhancements

### Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Nilesh Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Contact & Maintainers

### Maintainers

- **Nilesh Kumar** - [@nileshkr17](https://github.com/nileshkr17)

### Get in Touch

- 🐛 Report bugs: [GitHub Issues](https://github.com/nileshkr17/Authly/issues)
- 💡 Feature requests: [GitHub Discussions](https://github.com/nileshkr17/Authly/discussions)
- 📧 Email: [Contact via GitHub](https://github.com/nileshkr17)
- 💬 Discord: Coming Soon!

### Support the Project

If you find Authly helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 📝 Contributing to documentation
- 💻 Contributing code
- 📢 Spreading the word

---

<div align="center">

### 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=nileshkr17/Authly&type=Date)](https://star-history.com/#nileshkr17/Authly&Date)

---

**Made with ❤️ by indie developers, for indie developers**

[⬆ Back to Top](#-authly)

</div>
