# Quick Start Guide - Authly Frontend

This guide will help you get the Authly frontend up and running in minutes.

## Prerequisites

- Node.js 18+ installed
- Authly backend running (or configured API URL)

## Installation Steps

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Start Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:3001`

## Available Pages

- `/` - Home page with feature overview
- `/login` - Login with email/password or OAuth
- `/signup` - Create new account
- `/magic-link` - Passwordless authentication
- `/dashboard` - User profile and information
- `/admin` - User management panel (requires authentication)

## Production Build

To build for production:

```bash
npm run build
npm start
```

## Features Included

### Authentication
- ✅ Email/Password login
- ✅ User registration
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Magic link authentication

### User Management
- ✅ User dashboard
- ✅ Profile information
- ✅ Admin panel for user management
- ✅ User list and details
- ✅ Delete users

### Technical Features
- ✅ Automatic JWT token refresh
- ✅ Protected routes
- ✅ Form validation
- ✅ Responsive design
- ✅ Error handling

## Troubleshooting

### Port Already in Use

If port 3001 is already in use, you can change it in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3002"
  }
}
```

### Cannot Connect to Backend

1. Ensure the backend is running on the configured port
2. Check your `.env.local` file has the correct API URL
3. Verify CORS is configured in the backend to allow requests from `http://localhost:3001`

### Build Errors

If you encounter build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## Development Tips

### Using Mock Data

For development without a backend, you can use the mock data provided in `lib/mockData.ts`.

### Hot Reload

The development server supports hot reload. Changes to files will automatically refresh the browser.

### ESLint

Run ESLint to check for code issues:

```bash
npm run lint
```

## Next Steps

1. **Customize Styling** - Edit Tailwind configuration in `tailwind.config.ts`
2. **Add New Pages** - Create new directories under `app/`
3. **Extend API** - Add new endpoints in `lib/api.ts`
4. **Add Components** - Create reusable components in `components/`

## Documentation

- [Frontend README](./README.md) - Detailed documentation
- [Main Project README](../README.md) - Backend and project overview
- [API Documentation](../README.md#-api-usage-examples) - Backend API endpoints

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the example code in the repository

---

Happy coding! 🚀
