import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const { profile, error } = await authService.getUserProfile(userId);

    if (error || !profile) {
      return NextResponse.json(
        { error: error || 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { profile },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { user, error: authError } = await authService.getCurrentUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { data, error } = await authService.updateProfile(user.id, body);

    if (error) {
      return NextResponse.json(
        { error: typeof error === 'string' ? error : 'Failed to update profile' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { profile: data, message: 'Profile updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
