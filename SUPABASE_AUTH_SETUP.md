# Supabase Authentication Setup Guide

## Installation

Supabase dependencies are already installed. You now need to set up your environment variables.

## Environment Setup

1. **Create a Supabase account** at [https://supabase.com](https://supabase.com)
2. **Create a new project** in your Supabase dashboard
3. **Get your credentials:**
   - Go to Settings > API
   - Copy `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - Copy `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

4. **Create `.env.local`** in the root directory:
```bash
cp .env.local.example .env.local
```

5. **Update `.env.local`** with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## API Endpoints

### Sign Up
**POST** `/api/auth/signup`

Request:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe" // optional
}
```

Response:
```json
{
  "message": "Sign up successful! Please check your email to verify your account.",
  "user": { /* user object */ }
}
```

### Login
**POST** `/api/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

Response:
```json
{
  "message": "Login successful",
  "user": { /* user object */ },
  "session": { /* session object */ }
}
```

### Logout
**POST** `/api/auth/logout`

Response:
```json
{
  "message": "Logged out successfully"
}
```

### Get Current User
**GET** `/api/auth/user`

Response:
```json
{
  "user": { /* user object */ }
}
```

### Update Password
**POST** `/api/auth/update-password`

Request:
```json
{
  "newPassword": "newSecurePassword123"
}
```

Response:
```json
{
  "message": "Password updated successfully",
  "user": { /* user object */ }
}
```

### Reset Password
**POST** `/api/auth/reset-password`

Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "message": "Password reset email sent. Please check your email."
}
```

## Client-Side Usage

```typescript
import { authClient } from '@/lib/authClient';

// Sign up
const signupResult = await authClient.signup('user@example.com', 'password123', 'John');

// Login
const loginResult = await authClient.login('user@example.com', 'password123');

// Get current user
const user = await authClient.getCurrentUser();

// Logout
await authClient.logout();

// Update password
await authClient.updatePassword('newPassword123');

// Reset password
await authClient.resetPassword('user@example.com');
```

## Setting up Email Verification

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Email Templates
3. Customize the email verification template if needed
4. Users will receive a confirmation email after signup

## Password Reset Flow

1. User requests password reset with their email
2. They'll receive an email with a reset link (redirects to `/auth/reset-password`)
3. They can then update their password

## Supabase Authentication Features

- **Email/Password authentication** (built-in)
- **OAuth providers** (Google, GitHub, etc.) - can be added easily
- **Email verification** - enabled by default
- **Session management** - automatic token refresh
- **Secure cookies** - httpOnly tokens for added security

## File Structure

```
src/
├── lib/
│   ├── supabase.ts         # Supabase client configuration
│   ├── auth.ts             # Server-side auth service
│   └── authClient.ts       # Client-side auth utilities
└── app/
    └── api/
        └── auth/
            ├── signup/route.ts           # Sign up endpoint
            ├── login/route.ts            # Login endpoint
            ├── logout/route.ts           # Logout endpoint
            ├── user/route.ts             # Get current user endpoint
            ├── update-password/route.ts  # Update password endpoint
            └── reset-password/route.ts   # Reset password endpoint
```

## Next Steps

1. **Enable additional auth providers** (Google, GitHub, etc.)
2. **Create protected routes** - add middleware to protect routes
3. **Add user profile pages**
4. **Implement email verification**
5. **Add role-based access control (RBAC)**

For more information, visit [Supabase Documentation](https://supabase.com/docs/guides/auth)
