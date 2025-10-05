# Security Policy

## 🔐 Security Considerations

Authly is built with security as a top priority. This document outlines the security practices, considerations, and policies for the project.

---

## 🛡️ Security Features

### Password Security

#### Password Hashing

- **Algorithm**: bcrypt with salt rounds
- **Implementation**: All passwords are hashed using bcrypt before storage
- **Salt Rounds**: Configurable (default: 10 rounds)
- **Storage**: Only password hashes are stored, never plain text passwords

```typescript
// Example: Password hashing in Authly
import * as bcrypt from 'bcrypt';

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
```

#### Password Requirements

We recommend implementing the following password requirements in your application:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### JWT Token Security

#### Access Token

- **Expiration**: 1 hour (configurable via `JWT_EXPIRATION`)
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Storage**: Best practice is to use HTTP-only cookies set by the server. The included frontend demo uses `localStorage` for simplicity. For production applications handling sensitive data, consider implementing HTTP-only cookies.
  > **Note:** The current implementation returns tokens in the response body. For production use, consider implementing HTTP-only cookie support on the server side.
- **Secret**: Must be a strong, randomly generated string (minimum 32 characters)

#### Refresh Token

- **Expiration**: 7 days (configurable via `JWT_REFRESH_EXPIRATION`)
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Usage**: Used to obtain new access tokens without re-authentication
- **Security**: Separate secret key from access tokens (`JWT_REFRESH_SECRET`)

#### Best Practices for JWT

1. **Keep secrets secure**: Never commit JWT secrets to version control
2. **Use environment variables**: Store secrets in `.env` files
3. **Strong secrets**: Use cryptographically secure random strings
4. **Short expiration times**: Keep access token expiration short (1-2 hours)
5. **Secure transmission**: Always use HTTPS in production
6. **Token rotation**: Implement refresh token rotation for enhanced security

### Magic Link Security

#### Implementation

- **Expiration**: 15 minutes (configurable via `MAGIC_LINK_EXPIRATION`)
- **One-time use**: Magic link tokens are invalidated after use
- **Secure token generation**: Uses cryptographically secure random token generation
- **Email verification**: Only sent to verified email addresses

#### Security Measures

1. **Short expiration time**: Magic links expire quickly to minimize attack window
2. **Token complexity**: Tokens are cryptographically secure random strings
3. **Rate limiting**: Implement rate limiting on magic link requests
4. **Email confirmation**: Verify email ownership before sending links

### Input Validation

#### Implementation

- **Library**: class-validator and class-transformer
- **DTOs**: All input is validated using Data Transfer Objects
- **Sanitization**: Input is sanitized to prevent injection attacks

#### Validation Examples

```typescript
// Example: Email/Password validation
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
```

### OAuth Security

#### Google & GitHub OAuth

- **PKCE**: Recommended for enhanced security (consider implementing)
- **State parameter**: Prevents CSRF attacks (implement if not already present)
- **Secure callback URLs**: Only whitelist trusted callback URLs
- **Token validation**: Always validate OAuth tokens server-side

#### Best Practices

1. **Use official libraries**: passport-google-oauth20, passport-github2
2. **Validate tokens**: Never trust client-side token validation alone
3. **Secure client secrets**: Keep OAuth client secrets in environment variables
4. **HTTPS only**: Always use HTTPS for OAuth callbacks in production

---

## 🚨 Security Best Practices

### Environment Variables

#### Production Secrets

**CRITICAL**: Never use default or example values in production!

```bash
# ❌ BAD - Do not use in production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# ✅ GOOD - Use strong, randomly generated secrets
JWT_SECRET=8f4e2a3c9d7b1e6f5a8c4d2e9f3b7a1c6e5d8f2a4b9c7e3d1f6a5b8c2e4d9f7a3
```

#### Generating Secure Secrets

```bash
# Generate a secure random secret (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or using OpenSSL
openssl rand -hex 32
```

### Database Security

1. **Use environment variables**: Never hardcode database credentials
2. **Principle of least privilege**: Database user should only have necessary permissions
3. **SSL/TLS connections**: Use encrypted connections in production
4. **Regular backups**: Implement automated backup strategy
5. **Update regularly**: Keep PostgreSQL and dependencies up to date

### CORS Configuration

```typescript
// Example: Secure CORS configuration
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Rate Limiting

Consider implementing rate limiting to prevent abuse:

```typescript
// Example: Rate limiting (requires @nestjs/throttler)
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,  // Time window in milliseconds
      limit: 10,   // Max requests per time window
    }]),
  ],
})
```

### HTTPS Only

- **Production**: Always use HTTPS in production
- **Cookies**: Set secure flag on cookies
- **HSTS**: Implement HTTP Strict Transport Security headers

```typescript
// Example: Security headers
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }),
);
```

---

## 🔧 Development Setup

### Setting Up OAuth

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/oauth/google/callback`
6. Copy Client ID and Client Secret to `.env`

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/oauth/github/callback`
4. Copy Client ID and Client Secret to `.env`

### Email Configuration

For Magic Link authentication, configure your SMTP settings in `.env`. For Gmail:

1. Enable 2-factor authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password in `SMTP_PASSWORD`

---

## 🔒 Production Security Checklist

Before deploying to production, ensure:

### Environment & Secrets

- [ ] All environment variables use secure, randomly generated values
- [ ] JWT_SECRET and JWT_REFRESH_SECRET are strong (32+ characters)
- [ ] MAGIC_LINK_SECRET is cryptographically secure
- [ ] Database credentials are secure and not default values
- [ ] SMTP credentials are secure
- [ ] OAuth client secrets are properly configured

### Network & Communication

- [ ] HTTPS is enabled and enforced
- [ ] CORS is properly configured for your domain(s)
- [ ] OAuth callback URLs are whitelisted and use HTTPS
- [ ] Database connection encryption is enabled

### Security Features

- [ ] Rate limiting is implemented to prevent abuse
- [ ] Security headers are configured (HSTS, CSP, etc.)
- [ ] Secure, HTTP-only cookies are used for token storage (or implement CSP if using localStorage)
  > **Note:** The included frontend demo uses `localStorage` for simplicity. For production applications handling sensitive data, consider implementing HTTP-only cookies on the server side for enhanced security. If using `localStorage`, ensure proper Content Security Policy (CSP) headers are configured.
- [ ] Input validation is working on all endpoints
- [ ] Password requirements are enforced
- [ ] Magic link expiration is set appropriately (15 minutes recommended)

### Monitoring & Maintenance

- [ ] Logging is enabled for security events
- [ ] Database backups are configured
- [ ] Dependencies are up to date (run `npm audit`)
- [ ] Set up proper monitoring and alerting
- [ ] Email sending is working and secure
