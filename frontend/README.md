# Authly Frontend

A modern, responsive web UI and admin panel for the Authly authentication microservice built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Features

### Authentication Pages
- **Login Page** - Email/password login with validation
- **Signup Page** - User registration with form validation
- **Magic Link** - Passwordless authentication via email
- **OAuth Integration** - Google and GitHub login buttons

### User Dashboard
- Profile overview with user details
- Account status and verification information
- Connected OAuth providers display

### Admin Panel
- User list with search and filtering
- User details view
- User management (view, delete)
- Role and status management
- Real-time data refresh

### Technical Features
- 🎨 Responsive design with Tailwind CSS
- 🔐 JWT-based authentication with automatic token refresh
- 📝 Form validation using React Hook Form and Zod
- 🔄 State management with React Context API
- 🌐 API integration with Axios
- 🎭 Clean, modular component architecture
- 🔍 TypeScript for type safety

## 🏗️ Project Structure

```
frontend/
├── app/                      # Next.js app directory
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── magic-link/          # Magic link authentication
│   ├── dashboard/           # User dashboard
│   ├── admin/               # Admin panel
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # Reusable UI components
│   ├── Button.tsx           # Button component with variants
│   ├── Input.tsx            # Input field with validation
│   ├── Card.tsx             # Card container components
│   └── Navbar.tsx           # Navigation bar
├── contexts/                # React context providers
│   └── AuthContext.tsx      # Authentication state management
├── lib/                     # Utilities and services
│   └── api.ts               # API service with Axios
├── types/                   # TypeScript type definitions
│   └── index.ts             # Shared types and interfaces
└── package.json             # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Authly backend running on `http://localhost:3000` (or configure `NEXT_PUBLIC_API_URL`)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🔌 API Integration

The frontend integrates with the following Authly backend endpoints:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - Get user profile

### OAuth Endpoints
- `GET /api/oauth/google` - Google OAuth flow
- `GET /api/oauth/github` - GitHub OAuth flow

### Magic Link Endpoints
- `POST /api/magiclink/send` - Send magic link email
- `GET /api/magiclink/verify?token=<token>` - Verify magic link

### User Management Endpoints
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `DELETE /api/users/:id` - Delete user (protected)

## 🎨 UI Components

### Button
Multiple variants: `primary`, `secondary`, `danger`, `outline`
```tsx
<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

### Input
Form input with label and error display
```tsx
<Input
  label="Email"
  type="email"
  error="Invalid email"
  {...register('email')}
/>
```

### Card
Container component for content sections
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

## 🔐 Authentication Flow

1. **Login/Signup**: User submits credentials
2. **API Request**: Credentials sent to backend
3. **Token Storage**: JWT tokens stored in localStorage
4. **Auto-refresh**: Access token automatically refreshed when expired
5. **Protected Routes**: Auth state checked on protected pages
6. **Logout**: Tokens cleared from localStorage

## 🎯 State Management

Uses React Context API for global state:
- `AuthContext` - User authentication state
- `useAuth()` hook for accessing auth state and methods

Example usage:
```tsx
const { user, login, logout, loading } = useAuth();
```

## 📱 Responsive Design

The UI is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Features

- JWT tokens stored in localStorage
- Automatic token refresh before expiration
- Protected routes redirect to login if not authenticated
- CSRF protection ready
- XSS protection with React's built-in sanitization

## 🐛 Development Tips

### Debugging API Calls
Check browser console for detailed error messages from API calls.

### Mock Data
For development without backend, you can modify `lib/api.ts` to return mock data.

### Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: http://localhost:3000/api)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Keep components modular and reusable
4. Add proper error handling
5. Test on different screen sizes

## 📄 License

This project is part of the Authly authentication microservice.

## 🔗 Related

- [Authly Backend](../README.md) - Main backend service
- [API Documentation](../README.md#-api-usage-examples) - Backend API endpoints

## 🆘 Support

For issues and questions:
- Check the main [Authly README](../README.md)
- Open an issue on GitHub
- Review the API documentation

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
