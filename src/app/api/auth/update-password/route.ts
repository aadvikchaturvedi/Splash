import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const { data, error } = await authService.updatePassword(newPassword);

    if (error || !data) {
      return NextResponse.json(
        { error: (error as any).message || 'An error occurred' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: 'Password updated successfully',
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update password error:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}
