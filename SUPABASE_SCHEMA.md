# Supabase Database Schema Setup

## SQL Setup Instructions

Run this SQL in your Supabase dashboard under SQL Editor to create the users table:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookup
CREATE INDEX idx_users_email ON users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow users to read their own data
CREATE POLICY "Users can read their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Allow users to insert their own profile during signup
CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Table Schema

### `users` table
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, references auth.users |
| `email` | VARCHAR(255) | User email (unique) |
| `name` | VARCHAR(255) | User's full name |
| `avatar_url` | TEXT | URL to user's profile picture |
| `bio` | TEXT | User biography/description |
| `created_at` | TIMESTAMP | Account creation timestamp |
| `updated_at` | TIMESTAMP | Last profile update timestamp |

## How It Works

1. **User Signs Up** - They provide email, password, and name via the signup form
2. **Supabase Auth** - Creates an entry in `auth.users` table
3. **Trigger Fires** - The `on_auth_user_created` trigger automatically executes
4. **User Profile Created** - A new row is inserted into the `users` table with:
   - `id` from the auth user
   - `email` from the auth user
   - `name` from the signup form (stored in `raw_user_meta_data`)
5. **User Persisted** - User data is now stored and can be queried

## Querying User Data

After signup, you can fetch user profile information:

```typescript
import { supabase } from '@/lib/supabase';

// Get user profile by ID
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();

// Get user profile by email
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .single();
```

## RLS (Row Level Security)

The RLS policies ensure:
- Users can only see their own profile
- Users can only update their own profile
- Users can only insert their own profiles
- All operations are secure and isolated

## Migration Notes

If you're adding this to an existing Supabase project:
1. Go to SQL Editor in Supabase dashboard
2. Create a new query
3. Copy and paste the SQL setup code above
4. Run the query
5. Verify the `users` table appears in the Tables section
