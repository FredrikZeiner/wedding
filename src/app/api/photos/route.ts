import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

interface PhotoEntry {
  id: number;
  src: string; // original size
  minSrc: string; // -min variant (or fallback to src)
  alt: string;
}

export async function GET() {
  try {
    // Ensure Node.js runtime for fs
    const photosDir = path.resolve(process.cwd(), 'public/photos');
    const entries = await fs.readdir(photosDir);

    const imageFiles = entries.filter((name) =>
      /\.(jpe?g|png|webp|gif)$/i.test(name),
    );

    // Group by base name without -min suffix
    const groups = new Map<string, { original?: string; min?: string }>();
    for (const filename of imageFiles) {
      const ext = path.extname(filename); // .jpg
      const base = path.basename(filename, ext); // DSC_1234 or DSC_1234-min
      const isMin = /-min$/i.test(base);
      const key = isMin ? base.replace(/-min$/i, '') : base;
      const group = groups.get(key) ?? {};
      if (isMin) {
        group.min = filename;
      } else {
        group.original = filename;
      }
      groups.set(key, group);
    }

    // Build list: prefer original for src, min for minSrc; fallback when missing
    const items: PhotoEntry[] = [];
    const sortedKeys = Array.from(groups.keys()).sort((a, b) =>
      a.localeCompare(b),
    );
    sortedKeys.forEach((key, index) => {
      const g = groups.get(key)!;
      const originalFile = g.original ?? g.min!; // fallback to min if original missing
      const minFile = g.min ?? g.original!; // fallback to original if min missing
      items.push({
        id: index + 1,
        src: `/photos/${originalFile}`,
        minSrc: `/photos/${minFile}`,
        alt: `Wedding photo ${index + 1}`,
      });
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
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
