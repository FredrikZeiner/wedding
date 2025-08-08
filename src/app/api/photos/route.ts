import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

interface PhotoEntry {
  id: number;
  src: string; // minified path
  minSrc: string; // duplicate of src (kept for compatibility)
  alt: string;
}

export async function GET() {
  try {
    // Ensure Node.js runtime for fs
    const photosDir = path.resolve(process.cwd(), 'public/photos');
    const entries = await fs.readdir(photosDir);

    const minifiedFiles = entries
      .filter((name) => /\.(jpe?g|png|webp|gif)$/i.test(name))
      .filter((name) => /-min\.[a-z0-9]+$/i.test(name))
      .sort((a, b) => a.localeCompare(b));

    const items: PhotoEntry[] = minifiedFiles.map((filename, index) => ({
      id: index + 1,
      src: `/photos/${filename}`,
      minSrc: `/photos/${filename}`,
      alt: `Wedding photo ${index + 1}`,
    }));

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
