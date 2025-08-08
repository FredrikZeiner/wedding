import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

interface PhotoEntry {
  id: number;
  src: string; // minified path
  minSrc: string; // duplicate of src (kept for compatibility)
  alt: string;
}

export async function GET() {
  try {
    // Top-level blobs
    const { blobs } = await list();

    // Group by base name, capturing full (-min) and small (-min-25) variants
    const groups = new Map<string, { full?: string; small?: string }>();

    blobs
      .filter((b) => /\.(jpe?g|png|webp|gif)$/i.test(b.pathname))
      .forEach((b) => {
        const pathname = b.pathname; // e.g., DSC_1234-min.jpg or DSC_1234-min-25.jpg
        const match = pathname.match(/^(.*?)(-min(?:-25)?)\.[^.]+$/i);
        if (!match) return;
        const base = match[1];
        const variant = match[2]; // -min or -min-25
        const entry = groups.get(base) ?? {};
        if (/^-min-25$/i.test(variant)) {
          entry.small = b.url;
        } else if (/^-min$/i.test(variant)) {
          entry.full = b.url;
        }
        groups.set(base, entry);
      });

    const keys = Array.from(groups.keys()).sort((a, b) => a.localeCompare(b));
    const items: PhotoEntry[] = keys.map((key, index) => {
      const g = groups.get(key)!;
      const displayUrl = g.small ?? g.full!; // prefer 25% for display
      const fullUrl = g.full ?? g.small!; // fallback if only one exists
      return {
        id: index + 1,
        src: displayUrl,
        minSrc: fullUrl,
        alt: `Wedding photo ${index + 1}`,
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to list photos', error);
    return NextResponse.json(
      { error: 'Failed to list photos' },
      { status: 500 },
    );
  }
}

// Explicitly ensure Node.js runtime (fs is not available on Edge)
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
