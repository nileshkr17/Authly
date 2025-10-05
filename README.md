<div align="center">

![Authly Banner](https://raw.githubusercontent.com/nileshkr17/Authly/main/assets/authly-banner.svg)

# 🔐 Authly

### Plug-and-Play Authentication Microservice for Indie Developers

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/nileshkr17/Authly)
[![PR Validation](https://github.com/nileshkr17/Authly/actions/workflows/pr-validation.yml/badge.svg)](https://github.com/nileshkr17/Authly/actions/workflows/pr-validation.yml)
[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-friendly-orange)](https://hacktoberfest.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/nileshkr17/Authly/pulls)
[![Contributors](https://img.shields.io/github/contributors/nileshkr17/Authly)](https://github.com/nileshkr17/Authly/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/nileshkr17/Authly)](https://github.com/nileshkr17/Authly/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/nileshkr17/Authly)](https://github.com/nileshkr17/Authly/pulls)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Usage](#-api-usage) • [Contributing](#-contributing)

</div>

---

## 🎯 Problem & Solution

### The Problem
Building authentication from scratch is time-consuming, error-prone, and complex. Indie developers and small teams often spend weeks implementing secure authentication instead of focusing on their core product.

### The Solution
**Authly** is a production-ready authentication microservice that you can deploy in minutes. It handles all the complexity of modern authentication, so you can focus on building your application.

<div align="center">

![Architecture](https://raw.githubusercontent.com/nileshkr17/Authly/main/assets/architecture.svg)

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

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

Copy the `.env.example` file to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_HOST` - PostgreSQL host
- `DATABASE_PORT` - PostgreSQL port (default: 5432)
- `DATABASE_USER` - PostgreSQL username
- `DATABASE_PASSWORD` - PostgreSQL password
- `DATABASE_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (optional)
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret (optional)
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID (optional)
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret (optional)
- `SMTP_HOST` - SMTP server host for emails
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password

4. **Start the development server**

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Quick Start with Docker

For a faster setup, use Docker Compose:

```bash
docker-compose up --build
```

This will start both the application and PostgreSQL database.

### Frontend Web UI

Authly now includes a complete web UI and admin panel built with Next.js!

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start the development server (runs on port 3001)
npm run dev
```

The frontend will be available at `http://localhost:3001`

**Features:**
- 🔐 Login and Signup pages with form validation
- 🌐 OAuth integration (Google, GitHub)
- ✉️ Magic link authentication
- 📊 User dashboard with profile information
- 👥 Admin panel for user management
- 📱 Fully responsive design

See the [Frontend README](./frontend/README.md) for detailed setup instructions.

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
- ✅ **Pre-built Web UI** - Complete Next.js frontend with authentication and admin panel
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
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **State Management** | React Context API |
| **API Client** | Axios with auto-refresh |
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
Authly/
├── src/                    # Backend source code
│   ├── auth/              # Authentication module
│   │   ├── dto/          # Data transfer objects
│   │   ├── guards/       # JWT Auth Guard
│   │   ├── strategies/   # JWT Strategy
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/             # Users module
│   │   ├── dto/          # User DTOs
│   │   ├── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── oauth/             # OAuth module
│   │   ├── oauth.controller.ts
│   │   ├── oauth.service.ts
│   │   └── oauth.module.ts
│   ├── magiclink/         # Magic link module
│   │   ├── dto/
│   │   ├── magiclink.controller.ts
│   │   ├── magiclink.service.ts
│   │   └── magiclink.module.ts
│   ├── config/            # Configuration
│   ├── migrations/        # Database migrations
│   ├── common/            # Shared resources
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── frontend/              # Next.js web UI
│   ├── app/              # Next.js app directory
│   │   ├── login/       # Login page
│   │   ├── signup/      # Signup page
│   │   ├── magic-link/  # Magic link authentication
│   │   ├── dashboard/   # User dashboard
│   │   └── admin/       # Admin panel
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Navbar.tsx
│   ├── contexts/         # React Context providers
│   │   └── AuthContext.tsx
│   ├── lib/              # Utilities
│   │   ├── api.ts       # API service
│   │   └── mockData.ts  # Mock data for development
│   └── types/            # TypeScript types
│       └── index.ts
├── docker-compose.yml     # Docker setup
├── Dockerfile            # Container configuration
└── README.md             # This file
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

## 👥 Maintainers

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/nileshkr17">
        <img src="https://github.com/nileshkr17.png" width="100px;" alt="Nilesh Kumar"/>
        <br />
        <sub><b>Nilesh Kumar</b></sub>
      </a>
      <br />
      <sub>Project Lead</sub>
    </td>
  </tr>
</table>

## 🌟 Contributors

Thanks to all the amazing contributors who have helped make Authly better! 💙

[![Contributors](https://contrib.rocks/image?repo=nileshkr17/Authly)](https://github.com/nileshkr17/Authly/graphs/contributors)

### Contribution Activity

![GitHub Contributor Activity](https://repobeats.axiom.co/api/embed/7f3a0e8f8d6c3b5e4f2d1a0c9b8e7f6d5c4b3a2.svg "Repobeats analytics image")

Want to contribute? Check out our [Contributing Guidelines](#-contributing)!

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript
- [Passport](http://www.passportjs.org/) - Authentication middleware
- [JWT](https://jwt.io/) - JSON Web Tokens

