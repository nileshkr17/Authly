# Magic Link API Documentation

## Overview
The Magic Link API provides secure, passwordless authentication for Authly. Users receive time-limited, one-time-use tokens via email to login without passwords.

## Endpoints

### Send Magic Link
**POST** `/api/magiclink/send`

Generates and sends a magic link to the user's email address.

#### Request Body
```json
{
  "email": "user@example.com"
}
```

#### Request Validation
- `email`: Required, valid email format, max 254 characters
- Email is automatically lowercased and trimmed

#### Response
```json
{
  "message": "Magic link sent to your email successfully"
}
```

#### Development Response (when email service is not configured)
```json
{
  "message": "Development mode: Email service not configured",
  "devToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Rate Limiting
- Maximum 3 requests per email address per minute
- Returns `400 Bad Request` if limit exceeded

#### Error Responses
- `400`: Invalid email format or rate limit exceeded
- `500`: Email service failure

---

### Verify Magic Link
**GET** `/api/magiclink/verify?token={token}`

Verifies the magic link token and returns authentication tokens.

#### Query Parameters
- `token`: JWT magic link token (required)

#### Response
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isEmailVerified": true
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses
- `401`: Invalid, expired, or already used token
- `404`: Token not found in database

---

## Security Features

### One-Time Use Tokens
- Each magic link token can only be used once
- Tokens are marked as used in the database after successful verification
- Attempting to reuse a token returns a 401 error

### Configurable Expiration
- Default: 15 minutes (configurable via `MAGIC_LINK_EXPIRATION`)
- Supported formats: `15m`, `1h`, `2d`, `30s`
- Expired tokens return a 401 error

### Input Validation
- Email validation using class-validator decorators
- JWT token validation for magic link tokens
- Rate limiting to prevent spam

### Security Headers
- IP address tracking for audit logs
- User agent logging for security monitoring
- Secure token generation using crypto.randomUUID()

### Database Tracking
- All magic link tokens are stored in the database
- Tracks creation time, expiration, usage status
- Automatic cleanup of expired tokens
- Audit trail with IP and user agent information

## Environment Variables

```bash
# Magic Link Configuration
MAGIC_LINK_SECRET=your-magic-link-secret-key-change-this-in-production
MAGIC_LINK_EXPIRATION=15m

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3001

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-email-password
SMTP_FROM=noreply@authly.com
```

## Frontend Integration

### Sending Magic Links
```typescript
import { apiService } from '@/lib/api';

const sendMagicLink = async (email: string) => {
  try {
    const response = await apiService.sendMagicLink({ email });
    console.log(response.message);
    
    // In development mode, you may get a devToken
    if (response.devToken) {
      console.log('Dev token:', response.devToken);
    }
  } catch (error) {
    console.error('Failed to send magic link:', error);
  }
};
```

### Verifying Magic Links
```typescript
import { apiService } from '@/lib/api';

const verifyMagicLink = async (token: string) => {
  try {
    const authData = await apiService.verifyMagicLink(token);
    
    // Tokens are automatically stored by the API service
    console.log('User logged in:', authData.user);
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Magic link verification failed:', error);
  }
};
```

## Testing

### Unit Tests
Run the magic link service tests:
```bash
npm test -- magiclink.service.spec.ts
```

### Manual Testing
1. Start the development server
2. Navigate to `/magic-link` in the frontend
3. Enter an email address
4. Check console for dev token (in development mode)
5. Use the token to verify login

### Rate Limiting Test
Send multiple requests quickly to test rate limiting:
```bash
curl -X POST http://localhost:3000/api/magiclink/send \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Database Schema

### magic_link_tokens Table
```sql
CREATE TABLE magic_link_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token VARCHAR UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  expires_at TIMESTAMP NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMP NULL,
  ip_address VARCHAR NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_magic_link_tokens_user_id ON magic_link_tokens(user_id);
CREATE INDEX idx_magic_link_tokens_token ON magic_link_tokens(token);
CREATE INDEX idx_magic_link_tokens_expires_at ON magic_link_tokens(expires_at);
```

## Error Handling

### Common Errors
- **Rate Limiting**: Too many requests in short time
- **Invalid Email**: Malformed email address
- **Token Expired**: Magic link past expiration time
- **Token Used**: Attempting to reuse a magic link
- **Email Service**: SMTP configuration or delivery issues

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Too many magic link requests. Please try again later.",
  "error": "Bad Request"
}
```

## Best Practices

1. **Environment Security**: Use strong, unique secrets for `MAGIC_LINK_SECRET`
2. **Email Templates**: Customize email templates for branding
3. **Rate Limiting**: Monitor and adjust rate limits based on usage
4. **Token Cleanup**: Regularly clean up expired tokens from database
5. **Monitoring**: Log and monitor failed verification attempts
6. **User Experience**: Provide clear feedback for all error states
