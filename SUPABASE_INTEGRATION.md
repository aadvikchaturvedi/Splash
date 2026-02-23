# Complete Supabase Integration Setup Guide

## Overview
Your app is fully integrated with Supabase for authentication. Here's everything that's connected:

## Architecture

```
User (Frontend)
    ↓
Login/Signup Pages (Client Components)
    ↓
useAuth Hook (State Management)
    ↓
authClient (Client-side API Calls)
    ↓
API Routes (/api/auth/*)
    ↓
auth Service (Supabase Backend)
    ↓
Supabase (Database + Auth)
```

## Setup Steps

### 1. Create Supabase Project
- Go to https://supabase.com
- Click "New Project"
- Choose your organization and provide project details
- Wait for the project to be created

### 2. Get Environment Variables
In your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
3. Also note your **Project ID** (visible in the URL)

### 3. Create `.env.local` File
```bash
# In the root directory of your project
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Create Users Table in Supabase

Go to your Supabase dashboard:
1. Click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire SQL from `migrations/001_create_users_table.sql`
4. Paste it into the query editor
5. Click **Run**

This creates:
- `users` table with profile fields
- Automatic trigger to create user profiles on signup
- Row Level Security (RLS) policies
- Indexes for fast lookups

### 5. Verify Environment
Check that your `.env.local` file has:
```
✓ NEXT_PUBLIC_SUPABASE_URL
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
✓ NEXT_PUBLIC_APP_URL
```

## Connected Components

### Frontend Pages
- **Login** (`src/app/login/page.tsx`)
  - Form with email/password
  - Integrated with `useAuth()` hook
  - Redirects to `/dashboard` on success

- **Signup** (`src/app/signup/page.tsx`)
  - Form with name/email/password
  - Integrated with `useAuth()` hook
  - Auto-creates user profile in database
  - Redirects to `/login` on success

### API Routes
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Sign in user
- `POST /api/auth/logout` - Sign out user
- `GET /api/auth/user` - Get current user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/update-password` - Change password
- `POST /api/auth/reset-password` - Send reset email

### Hooks
- **useAuth()** (`src/hooks/useAuth.ts`)
  - `user` - Current authenticated user
  - `loading` - Loading state
  - `error` - Error messages
  - `isAuthenticated` - Boolean check
  - `signup(email, password, name)` - Create account
  - `login(email, password)` - Sign in
  - `logout()` - Sign out
  - `updatePassword(newPassword)` - Change password
  - `resetPassword(email)` - Send reset email
  - `getUserProfile(userId)` - Fetch profile
  - `updateProfile(updates)` - Update profile
  - `loadUser()` - Reload current user

### Services
- **authClient** (`src/lib/authClient.ts`)
  - Client-side utilities for making API calls

- **authService** (`src/lib/auth.ts`)
  - Server-side Supabase integration
  - Direct database access
  - All auth methods

- **supabase** (`src/lib/supabase.ts`)
  - Supabase client configuration

## Database Schema

### users table
```
id (UUID) - Primary key, links to auth.users
email (VARCHAR) - User email
name (VARCHAR) - User's full name
avatar_url (TEXT) - Profile picture URL
bio (TEXT) - User bio
created_at (TIMESTAMP) - Account creation time
updated_at (TIMESTAMP) - Last update time
```

## How It Works

### Signup Flow
1. User fills out signup form (name, email, password)
2. Frontend calls `useAuth().signup()`
3. API route `/api/auth/signup` receives request
4. Backend calls `authService.signUp()`
5. Supabase creates auth user
6. Database trigger fires automatically
7. User profile inserted into `users` table
8. User redirected to login page

### Login Flow
1. User enters email and password
2. Frontend calls `useAuth().login()`
3. API route `/api/auth/login` receives request
4. Backend calls `authService.signIn()`
5. Supabase validates credentials
6. Auth tokens stored in cookies
7. User redirected to `/dashboard`

### Profile Access
1. After login, user data available in `useAuth().user`
2. Fetch full profile: `getUserProfile(userId)`
3. Update profile: `updateProfile({ name, bio, avatar_url })`
4. Changes sync to database immediately

## Testing

### Test Signup
1. Go to http://localhost:3000/signup
2. Enter test email, password, and name
3. Click "Create Account"
4. Should redirect to login
5. Check Supabase dashboard → Tables → `users`
6. New record should appear

### Test Login
1. Go to http://localhost:3000/login
2. Enter test email and password
3. Click "Log In"
4. Should redirect to `/dashboard`
5. User data should be available in the page

### Test Profile
1. After login, call `getUserProfile(userId)`
2. Profile should return with name, email, timestamps
3. Update profile with `updateProfile()`
4. Changes should reflect in database immediately

## Security Features

✓ **Row Level Security (RLS)** - Users can only access their own data
✓ **Secure Cookies** - Auth tokens stored httpOnly
✓ **Password Hashing** - Supabase handles bcrypt
✓ **Email Verification** - Optional email confirmation
✓ **Password Reset** - Secure reset links
✓ **CSRF Protection** - Next.js middleware support

## Common Issues

### "Not authenticated" error
- Check `.env.local` is in root directory
- Verify `NEXT_PUBLIC_SUPABASE_URL` and key are correct
- Restart dev server after env changes

### Users not appearing in table
- Verify SQL migration was run in Supabase
- Check the `handle_new_user()` trigger exists
- Look for errors in Supabase logs

### Profile API returning 404
- Ensure user is authenticated (check cookies)
- Verify user ID is correct
- Check RLS policies in Supabase

## Next Steps

1. ✓ Create `.env.local` with credentials
2. ✓ Run SQL migration in Supabase
3. ✓ Start dev server: `npm run dev`
4. ✓ Test signup/login at http://localhost:3000
5. Create dashboard page at `/dashboard`
6. Add logout button in navbar
7. Create profile edit page

## Support

For issues:
- Check Supabase dashboard Logs
- Verify browser cookies are set
- Check API routes in terminal output
- Ensure RLS policies are correct
