<div align="center">

# 🔐 Authly

### Plug-and-Play Authentication Microservice for Indie Developers

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/nileshkr17/Authly)
[![PR Validation](https://github.com/nileshkr17/Authly/actions/workflows/pr-validation.yml/badge.svg)](https://github.com/nileshkr17/Authly/actions/workflows/pr-validation.yml)
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
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### 2. Login

**POST** `/api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### 3. Refresh Token

**POST** `/api/auth/refresh`

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### OAuth Endpoints

#### 4. Google OAuth

**GET** `/api/oauth/google`

Redirects to Google OAuth consent screen.

**GET** `/api/oauth/google/callback`

Google OAuth callback endpoint. Returns JWT tokens upon successful authentication.

#### 5. GitHub OAuth

**GET** `/api/oauth/github`

Redirects to GitHub OAuth authorization screen.

**GET** `/api/oauth/github/callback`

GitHub OAuth callback endpoint. Returns JWT tokens upon successful authentication.

### Magic Link Endpoints

#### 6. Send Magic Link

**POST** `/api/magiclink/send`

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "Magic link sent to your email"
}
```

#### 7. Verify Magic Link

**GET** `/api/magiclink/verify?token=<magic_link_token>`

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### User Endpoints

#### 8. Get All Users (Protected)

**GET** `/api/users`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**

```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isEmailVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 9. Get User by ID (Protected)

**GET** `/api/users/:id`

**Headers:**
```
Authorization: Bearer <access_token>
```

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

### Run Tests with Coverage

```bash
npm run test:cov
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

## 🏗️ Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── dto/               # Data transfer objects
│   ├── auth.controller.ts # Auth endpoints
│   ├── auth.service.ts    # Auth business logic
│   └── auth.module.ts     # Auth module definition
├── users/                  # Users module
│   ├── dto/               # User DTOs
│   ├── user.entity.ts     # User database entity
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── oauth/                  # OAuth module
│   ├── oauth.controller.ts
│   ├── oauth.service.ts
│   └── oauth.module.ts
├── magiclink/             # Magic link module
│   ├── dto/
│   ├── magiclink.controller.ts
│   ├── magiclink.service.ts
│   └── magiclink.module.ts
├── common/                # Shared resources
│   ├── guards/           # Auth guards
│   ├── decorators/       # Custom decorators
│   └── strategies/       # Passport strategies
├── app.module.ts         # Root module
└── main.ts               # Application entry point
```

## 🔧 Development

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

### Build

```bash
npm run build
```

## 🔐 Setting Up OAuth

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/oauth/google/callback`
6. Copy Client ID and Client Secret to `.env`

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/oauth/github/callback`
4. Copy Client ID and Client Secret to `.env`

## 📧 Email Configuration

For Magic Link authentication, configure your SMTP settings in `.env`. For Gmail:

1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `SMTP_PASSWORD`

## 🐳 Docker Deployment

### Build and Run

```bash
docker-compose up --build
```

### Stop Containers

```bash
docker-compose down
```

### Clean Up (including volumes)

```bash
docker-compose down -v
```

## 🤝 Contributing

We welcome contributions! Before submitting a Pull Request, please ensure:

- ✅ All tests pass (`npm run test`)
- ✅ Code is linted (`npm run lint`)
- ✅ Build succeeds (`npm run build`)
- ✅ **New features include unit tests**

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

**Quick Start:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Add your changes **with tests**
4. Ensure all checks pass
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript
- [Passport](http://www.passportjs.org/) - Authentication middleware
- [JWT](https://jwt.io/) - JSON Web Tokens

