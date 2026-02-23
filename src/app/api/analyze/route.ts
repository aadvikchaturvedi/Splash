import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB
const ALLOWED_MIME_TYPES = ['video/mp4', 'video/quicktime'];

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('video');

    // Validate file exists
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'No video file provided. Please upload a valid .mp4 or .mov file.' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type: "${file.type}". Only .mp4 and .mov files are accepted.` },
        { status: 415 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        { error: `File size (${sizeMB}MB) exceeds the 100MB limit.` },
        { status: 413 }
      );
    }

    const endpoint = process.env.AQA_LINK;

    // Development fallback — return mock data if no endpoint is configured
    if (!endpoint) {
      console.warn('[analyze] AQA_LINK not set — returning mock analytics data.');
      const { MOCK_ANALYTICS } = await import('@/types/analytics');
      return NextResponse.json(MOCK_ANALYTICS, { status: 200 });
    }

    // Forward video to external AI API
    const outboundForm = new FormData();
    outboundForm.set('video', file);

    const apiResponse = await fetch(endpoint, {
      method: 'POST',
      body: outboundForm,
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text().catch(() => 'Unknown error');
      console.error('[analyze] External API error:', apiResponse.status, errorText);
      return NextResponse.json(
        { error: `External analysis service returned an error (${apiResponse.status}). Please try again.` },
        { status: 502 }
      );
    }

    const analyticsData: unknown = await apiResponse.json();
    return NextResponse.json(analyticsData, { status: 200 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected server error.';
    console.error('[analyze] Caught error:', message);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your video. Please try again.' },
      { status: 500 }
    );
  }
}
