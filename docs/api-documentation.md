# 📚 Authly API Documentation

Complete API reference for Authly authentication microservice.

---

## 🔗 Base URL

```
http://localhost:3000/api
```

> **Production**: Replace with your production domain and always use HTTPS

---

## 📋 Table of Contents

- [Authentication Endpoints](#authentication-endpoints)
  - [Register](#1-register)
  - [Login](#2-login)
  - [Refresh Token](#3-refresh-token)
  - [Get Profile](#4-get-profile-protected)
- [OAuth Endpoints](#oauth-endpoints)
  - [Google OAuth](#5-google-oauth)
  - [GitHub OAuth](#6-github-oauth)
- [Magic Link Endpoints](#magic-link-endpoints)
  - [Send Magic Link](#7-send-magic-link)
  - [Verify Magic Link](#8-verify-magic-link)
- [User Endpoints](#user-endpoints)
  - [Get All Users](#9-get-all-users-protected)
  - [Get User by ID](#10-get-user-by-id-protected)
  - [Update User](#11-update-user-protected)
  - [Delete User](#12-delete-user-protected)
- [Error Responses](#error-responses)
- [Authentication](#authentication-guide)

---

## 🔐 Authentication Endpoints

### 1. Register

Create a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Success Response** (201 Created):

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2025-10-04T12:00:00.000Z",
    "updatedAt": "2025-10-04T12:00:00.000Z"
  }
}
```

**Error Response** (400 Bad Request):

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password must be longer than 8 characters"],
  "error": "Bad Request"
}
```

**Example (cURL)**:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Example (JavaScript/Fetch)**:

```javascript
const response = await fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePassword123!',
    firstName: 'John',
    lastName: 'Doe',
  }),
});

const data = await response.json();
console.log(data.access_token);
```

**Example (Python)**:

```python
import requests

response = requests.post(
    'http://localhost:3000/api/auth/register',
    json={
        'email': 'user@example.com',
        'password': 'SecurePassword123!',
        'firstName': 'John',
        'lastName': 'Doe'
    }
)

data = response.json()
print(data['access_token'])
```

---

### 2. Login

Authenticate with email and password.

**Endpoint**: `POST /auth/login`

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response** (200 OK):

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2025-10-04T12:00:00.000Z",
    "updatedAt": "2025-10-04T12:00:00.000Z"
  }
}
```

**Error Response** (401 Unauthorized):

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

**Example (cURL)**:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }'
```

---

### 3. Refresh Token

Get a new access token using a refresh token.

**Endpoint**: `POST /auth/refresh`

**Request Body**:

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response** (200 OK):

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (401 Unauthorized):

```json
{
  "statusCode": 401,
  "message": "Invalid refresh token",
  "error": "Unauthorized"
}
```

**Example (JavaScript)**:

```javascript
async function refreshAccessToken(refreshToken) {
  const response = await fetch('http://localhost:3000/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  const data = await response.json();
  return data.access_token;
}
```

---

### 4. Get Profile (Protected)

Get the authenticated user's profile.

**Endpoint**: `GET /auth/profile`

**Headers**:

```
Authorization: Bearer <access_token>
```

**Success Response** (200 OK):

```json
{
  "message": "This is a protected route",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2025-10-04T12:00:00.000Z",
    "updatedAt": "2025-10-04T12:00:00.000Z"
  }
}
```

**Error Response** (401 Unauthorized):

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**Example (cURL)**:

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example (JavaScript)**:

```javascript
const response = await fetch('http://localhost:3000/api/auth/profile', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const profile = await response.json();
```

---

## 🔗 OAuth Endpoints

### 5. Google OAuth

#### Initiate Google OAuth Flow

**Endpoint**: `GET /oauth/google`

Redirects the user to Google's OAuth consent screen.

**Example**:

```html
<a href="http://localhost:3000/api/oauth/google"> Login with Google </a>
```

#### Google OAuth Callback

**Endpoint**: `GET /oauth/google/callback`

Google redirects here after user authorization.

**Query Parameters**:

- `code`: Authorization code from Google

**Success Response**: Returns JWT tokens

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@gmail.com",
    "firstName": "John",
    "lastName": "Doe",
    "provider": "google"
  }
}
```

**Setup**:

1. Get credentials from [Google Cloud Console](https://console.cloud.google.com/)
2. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
3. Add callback URL: `http://localhost:3000/api/oauth/google/callback`

---

### 6. GitHub OAuth

#### Initiate GitHub OAuth Flow

**Endpoint**: `GET /oauth/github`

Redirects the user to GitHub's OAuth authorization screen.

**Example**:

```html
<a href="http://localhost:3000/api/oauth/github"> Login with GitHub </a>
```

#### GitHub OAuth Callback

**Endpoint**: `GET /oauth/github/callback`

GitHub redirects here after user authorization.

**Success Response**: Returns JWT tokens

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@github.com",
    "firstName": "John",
    "lastName": "Doe",
    "provider": "github"
  }
}
```

**Setup**:

1. Get credentials from [GitHub Developer Settings](https://github.com/settings/developers)
2. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in `.env`
3. Add callback URL: `http://localhost:3000/api/oauth/github/callback`

---

## ✨ Magic Link Endpoints

### 7. Send Magic Link

Send a passwordless authentication link via email.

**Endpoint**: `POST /magiclink/send`

**Request Body**:

```json
{
  "email": "user@example.com"
}
```

**Success Response** (200 OK):

```json
{
  "message": "Magic link sent to your email"
}
```

**Error Response** (400 Bad Request):

```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

**Example (cURL)**:

```bash
curl -X POST http://localhost:3000/api/magiclink/send \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

**Email Example**:

```
Subject: Your Magic Link

Click the link below to sign in:
http://localhost:3000/api/magiclink/verify?token=abc123...

This link expires in 15 minutes.
```

---

### 8. Verify Magic Link

Verify the magic link token and authenticate the user.

**Endpoint**: `GET /magiclink/verify?token=<token>`

**Query Parameters**:

- `token` (required): The magic link token from email

**Success Response** (200 OK):

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Response** (400 Bad Request):

```json
{
  "statusCode": 400,
  "message": "Invalid or expired magic link",
  "error": "Bad Request"
}
```

**Example (JavaScript)**:

```javascript
// After user clicks the link from email
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

const response = await fetch(`http://localhost:3000/api/magiclink/verify?token=${token}`);
const { access_token } = await response.json();

// ⚠️ SECURITY NOTE: Store tokens securely!
// The included frontend demo uses localStorage for simplicity.
// For production: Consider implementing HTTP-only cookies on the server side for enhanced security.
window.location.href = '/dashboard';
```

---

## 👥 User Endpoints

### 9. Get All Users (Protected)

Retrieve a list of all users.

**Endpoint**: `GET /users`

**Headers**:

```
Authorization: Bearer <access_token>
```

**Success Response** (200 OK):

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user1@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isActive": true,
    "createdAt": "2025-10-04T12:00:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "email": "user2@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "isActive": true,
    "createdAt": "2025-10-04T13:00:00.000Z"
  }
]
```

**Example (cURL)**:

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 10. Get User by ID (Protected)

Retrieve a specific user by ID.

**Endpoint**: `GET /users/:id`

**Headers**:

```
Authorization: Bearer <access_token>
```

**URL Parameters**:

- `id` (required): User UUID

**Success Response** (200 OK):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "isActive": true,
  "createdAt": "2025-10-04T12:00:00.000Z",
  "updatedAt": "2025-10-04T12:00:00.000Z"
}
```

**Error Response** (404 Not Found):

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

**Example (cURL)**:

```bash
curl -X GET http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 11. Update User (Protected)

Update a user's information.

**Endpoint**: `PATCH /users/:id`

**Headers**:

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "firstName": "Johnny",
  "lastName": "Doe"
}
```

**Success Response** (200 OK):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "firstName": "Johnny",
  "lastName": "Doe",
  "isActive": true,
  "updatedAt": "2025-10-04T14:00:00.000Z"
}
```

---

### 12. Delete User (Protected)

Delete a user account.

**Endpoint**: `DELETE /users/:id`

**Headers**:

```
Authorization: Bearer <access_token>
```

**Success Response** (200 OK):

```json
{
  "message": "User deleted successfully"
}
```

**Example (cURL)**:

```bash
curl -X DELETE http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## ❌ Error Responses

### Common HTTP Status Codes

| Code | Status                | Description                       |
| ---- | --------------------- | --------------------------------- |
| 200  | OK                    | Request successful                |
| 201  | Created               | Resource created successfully     |
| 400  | Bad Request           | Invalid request data              |
| 401  | Unauthorized          | Authentication required or failed |
| 403  | Forbidden             | Insufficient permissions          |
| 404  | Not Found             | Resource not found                |
| 409  | Conflict              | Resource already exists           |
| 500  | Internal Server Error | Server error                      |

### Error Response Format

All errors follow this structure:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### Validation Errors

```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password must be longer than 8 characters"],
  "error": "Bad Request"
}
```

---

## 🔑 Authentication Guide

### How to Authenticate

1. **Register or Login**: Get `access_token` and `refresh_token`
2. **Store Tokens**: Save securely (see Token Storage Best Practices below)
3. **Include in Requests**: Add `Authorization: Bearer <access_token>` header
4. **Handle Expiration**: Use `refresh_token` to get new `access_token`

### Token Lifecycle

```javascript
// 1. Login and get tokens
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const { access_token, refresh_token } = await loginResponse.json();

// 2. Store tokens securely
// ⚠️ SECURITY NOTE: The included frontend demo uses localStorage for simplicity.
// For production, consider HTTP-only cookies for enhanced security.
// See Token Storage Best Practices section below for details.

// 3. Make authenticated requests
const profileResponse = await fetch('/api/auth/profile', {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

// 4. Handle token expiration
if (profileResponse.status === 401) {
  // Refresh the token
  const refreshResponse = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token }),
  });
  const { access_token: newToken } = await refreshResponse.json();
  // Store the new token securely (see Token Storage Best Practices)

  // Retry the original request
  // ...
}
```

### Token Storage Best Practices

> **Current Implementation:** The API returns tokens in the response body (JSON). The included frontend demo uses `localStorage` for simplicity.

#### ✅ Recommended for Production: HTTP-only Cookies

For production deployments, the most secure approach is HTTP-only cookies:

- Tokens are not accessible to JavaScript (protects against XSS attacks)
- Automatically included in requests to the same domain
- Can be configured with `Secure` and `SameSite` flags for additional protection
- Requires server-side implementation to set cookies in response headers

**Note:** This requires modifications to both the backend (to set cookies) and frontend (to handle cookie-based auth).

#### ⚠️ Current Approach: localStorage

The included frontend demo uses `localStorage` for token storage:

- **Pros**: Simple to implement, persists across browser sessions, works well for demos
- **Cons**: Accessible to any JavaScript on the page, vulnerable to XSS attacks
- **Recommendation**: Acceptable for development and internal tools, but consider upgrading to HTTP-only cookies for production applications handling sensitive data

**Security Tips if using localStorage:**

- Implement Content Security Policy (CSP) headers to reduce XSS risk
- Keep token expiration times short
- Validate and sanitize all user input to prevent XSS
- Regularly update dependencies to patch security vulnerabilities
- Consider using libraries that provide additional XSS protection

---

## 🧪 Testing the API

### Using Postman

1. Import the collection (if available)
2. Set environment variables:
   - `BASE_URL`: `http://localhost:3000/api`
   - `ACCESS_TOKEN`: Your access token
3. Test endpoints in this order:
   - Register → Login → Get Profile → Other endpoints

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set headers and body as shown in examples
4. Save requests for reuse

### Using cURL

Examples are provided for each endpoint above.

---

## 📊 Rate Limiting

> **Note**: Rate limiting should be implemented for production use.

Recommended limits:

- Authentication endpoints: 5 requests per 15 minutes per IP
- Magic link send: 3 requests per 15 minutes per email
- Other endpoints: 100 requests per 15 minutes per IP

---

## 🔗 Related Documentation

- [README.md](../README.md) - Getting started guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [Security Documentation](./security.md) - Security best practices
- [Testing Documentation](./testing-and-coverage.md) - Testing guide

---

## 📝 Notes

- All dates are in ISO 8601 format
- All endpoints return JSON
- Content-Type header should be `application/json` for POST/PATCH requests
- Always use HTTPS in production
- Token expiration times are configurable via environment variables
