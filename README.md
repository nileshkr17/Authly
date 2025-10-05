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

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized setup)
- PostgreSQL (if running without Docker)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/nileshkr17/Authly.git
cd Authly
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file and configure it with your settings:

```bash
cp .env.example .env
```

Edit `.env` file and update the following variables:
- `JWT_SECRET` - Your JWT secret key
- `JWT_REFRESH_SECRET` - Your JWT refresh token secret
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - For Google OAuth
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` - For GitHub OAuth
- `MAGIC_LINK_SECRET` - Secret for magic link tokens
- `SMTP_*` variables - For email functionality
- `DB_*` variables - Database connection settings

### Running the Application

#### Option 1: Using Docker (Recommended)

The easiest way to get started is using Docker Compose, which will set up both the application and PostgreSQL database:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

To stop the containers:

```bash
docker-compose down
```

#### Option 2: Local Development

If you prefer to run the application locally:

1. **Ensure PostgreSQL is running** and update the database connection settings in `.env`

2. **Run in development mode**

```bash
npm run start:dev
```

3. **Run in production mode**

```bash
npm run build
npm run start:prod
```

The application will be available at `http://localhost:3000`

### Verify Installation

Once the application is running, you can verify it's working by accessing:

- API endpoint: `http://localhost:3000/api`
- Health check: Try registering a user or accessing any API endpoint

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

### Protected Routes

#### 8. Get User Profile (Protected)

**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "This is a protected route",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2025-10-04T00:00:00.000Z",
    "updatedAt": "2025-10-04T00:00:00.000Z"
  }
}
```

**Example with cURL:**

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Using JWT Auth Guard in Your Code

To protect your own routes, use the `JwtAuthGuard`:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProtectedData() {
    return { message: 'This route is protected' };
  }
}
```

### User Endpoints

#### 9. Get All Users (Protected)

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
│   ├── guards/            # JWT Auth Guard
│   ├── strategies/        # JWT Strategy
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
├── config/                # Configuration
│   └── typeorm.config.ts # TypeORM config for migrations
├── migrations/            # Database migrations
├── common/                # Shared resources
│   ├── guards/           # Auth guards
│   ├── decorators/       # Custom decorators
│   └── strategies/       # Passport strategies
├── app.module.ts         # Root module
└── main.ts               # Application entry point
```

## Database Migrations

### Running Migrations

```bash
# Run all pending migrations
npm run migration:run
```

### Creating New Migrations

```bash
# Generate a new migration based on entity changes
npm run migration:generate -- src/migrations/MigrationName
```

### Reverting Migrations

```bash
# Revert the last executed migration
npm run migration:revert
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

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript
- [Passport](http://www.passportjs.org/) - Authentication middleware
- [JWT](https://jwt.io/) - JSON Web Tokens

