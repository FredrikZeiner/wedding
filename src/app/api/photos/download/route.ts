import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    if (!url) {
      return NextResponse.json(
        { error: 'Missing url parameter' },
        { status: 400 },
      );
    }

    const target = new URL(url);
    const filename = decodeURIComponent(
      target.pathname.split('/').pop() || 'photo.jpg',
    );

    const upstream = await fetch(target.toString());
    if (!upstream.ok || !upstream.body) {
      return new Response('Failed to fetch file', {
        status: upstream.status || 502,
      });
    }

    const contentType =
      upstream.headers.get('content-type') ?? 'application/octet-stream';

    return new Response(upstream.body, {
      headers: {
        'content-type': contentType,
        'content-disposition': `attachment; filename="${filename}"`,
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
