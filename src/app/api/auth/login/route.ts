import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { data, error } = await authService.signIn({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: (error as any).message || 'Login failed' },
        { status: 401 }
      );
    }
    
    if (!data) {
      return NextResponse.json(
        { error: 'No data returned from login' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
        message: 'Login successful',
        user: data.user,
        session: data.session,
      },
      { status: 200 }
    );

    // Set secure cookie if session exists
    if (data.session?.access_token) {
      response.cookies.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      response.cookies.set('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
