# Authly

A modern, production-ready authentication microservice built with TypeScript and NestJS. Authly provides JWT-based authentication, OAuth integration (Google & GitHub), and passwordless magic link login.

## 🚀 Features

- **JWT Authentication** - Secure token-based authentication with access and refresh tokens
- **OAuth Integration** - Login with Google and GitHub
- **Magic Link Login** - Passwordless authentication via email
- **PostgreSQL Database** - Robust data persistence with TypeORM
- **Docker Support** - Easy deployment with Docker and Docker Compose
- **Type Safety** - Full TypeScript support
- **Input Validation** - Request validation using class-validator
- **Testing** - Unit tests with Jest
- **Code Quality** - ESLint and Prettier for consistent code style

## 📋 Prerequisites

- Node.js 20.x or higher
- PostgreSQL 15.x or higher
- Docker and Docker Compose (optional)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/nileshkr17/Authly.git
cd Authly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=authly
DB_PASSWORD=authly_password
DB_DATABASE=authly_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=1h
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-this-in-production
JWT_REFRESH_EXPIRATION=7d

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/oauth/google/callback

# OAuth - GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/oauth/github/callback

# Magic Link
MAGIC_LINK_SECRET=your-magic-link-secret-key-change-this-in-production
MAGIC_LINK_EXPIRATION=15m

# Email (for Magic Link)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-email-password
SMTP_FROM=noreply@authly.com
```

### 4. Database Setup

#### Using Docker Compose (Recommended)

```bash
docker-compose up -d postgres
```

#### Manual PostgreSQL Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE authly_db;
CREATE USER authly WITH PASSWORD 'authly_password';
GRANT ALL PRIVILEGES ON DATABASE authly_db TO authly;
```

## 🚀 Running the Application

### Development Mode

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`

### Production Mode

```bash
npm run build
npm run start:prod
```

### Using Docker Compose

```bash
docker-compose up --build
```

## 📚 API Documentation

### Authentication Endpoints

#### 1. Register User

**POST** `/api/auth/register`

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
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

## 📞 Support

For support, email support@authly.com or open an issue in the GitHub repository.
