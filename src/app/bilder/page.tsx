'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../hooks/useScreenWidth';

// Photos will be fetched from API to ensure full folder coverage
type PhotoItem = {
  id: number;
  src: string;
  minSrc: string;
  alt: string;
  width?: number;
  height?: number;
};

const photoUrls = [
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2545-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2851-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2536-min-25.jpg',

  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3655-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2584-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2884-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2885-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2893-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2895-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2901-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2905-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2921-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2927-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2935-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2937-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2938-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2939-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2940-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2943-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2949-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2964-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2967-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2980-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2981-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3002-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3018-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3028-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3031-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3038-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3067-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3070-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3091-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3092-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3094-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3095-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3096-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3101-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3107-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3120-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3129-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3133-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3142-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3164-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3179-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3183-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3210-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3236-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3242-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2596-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2601-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2612-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2614-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2617-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2618-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2625-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2628-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2638-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2646-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2660-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2661-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2668-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2674-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2678-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2590-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2683-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2686-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2708-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2714-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2739-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2756-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2759-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2777-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2778-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2785-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2795-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2798-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2807-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2813-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2825-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2829-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2850-min-25.jpg',

  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2854-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2860-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2867-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2870-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2878-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3295-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3343-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3361-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3392-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3415-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3452-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3475-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3506-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3508-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3509-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3538-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3555-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3570-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3571-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3582-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3601-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3604-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3609-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3616-min-25.jpg',

  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3703-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3837-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3846-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3878-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3881-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3922-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3926-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3964-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3979-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_3987-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4010-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4022-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4053-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4079-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4089-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4132-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4136-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4181-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4201-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4212-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4254-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4273-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4298-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4309-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4310-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4325-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4327-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4329-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4332-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4334-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4353-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4355-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4362-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4363-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4379-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4381-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4392-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4401-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4402-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4407-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4410-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4417-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4422-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4424-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4427-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4430-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4443-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4451-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_4475-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2531-min-25.jpg',

  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2547-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2625-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2629-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2635-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2658-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/_DSC2666-min-25.jpg',
  'https://lh1yzaitd3r9e9ns.public.blob.vercel-storage.com/DSC_2565-min-25.jpg',
];

function getImageDimensions(
  imageUrl: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = imageUrl;
  });
}

const Masonry = dynamic<any>(
  () => import('masonic').then((mod) => mod.Masonry),
  {
    ssr: false,
  },
);

export default function PhotosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | undefined>();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isSmAndDown } = useScreenWidth();
  const sharedTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  } as const;
  const PAGE_SIZE = 30;
  const urlsRef = useRef<string[]>([]);
  const nextIndexRef = useRef(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const selectedIndex =
    selectedPhoto != null
      ? photos.findIndex((p) => p.id === selectedPhoto)
      : -1;

  // Display should use the smaller 25% image (API returns it as `src`).
  // Downloads should use the full minified image if available (API returns it as `minSrc`).
  const getDisplaySrc = (src: string, _full?: string) => src;
  const getDownloadSrc = (src: string, full?: string) => full ?? src;

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const urls = urlsRef.current;
    const start = nextIndexRef.current;
    const end = Math.min(start + PAGE_SIZE, urls.length);
    const slice = urls.slice(start, end);
    const baseItems: PhotoItem[] = slice.map((url, i) => {
      const minSrc = url.replace(/-min-25(\.[^.]+)$/i, '-min$1');
      const id = start + i + 1;
      return { id, src: url, minSrc, alt: `Wedding photo ${id}` };
    });
    const dims = await Promise.all(
      baseItems.map((it) =>
        getImageDimensions(it.src)
          .then((d) => d)
          .catch(() => undefined),
      ),
    );
    dims.forEach((d, i) => {
      if (d) {
        baseItems[i].width = d.width;
        baseItems[i].height = d.height;
      }
    });
    setPhotos((prev) => [...prev, ...baseItems]);
    nextIndexRef.current = end;
    if (end >= urls.length) setHasMore(false);
    setIsLoadingMore(false);
  }, [PAGE_SIZE, hasMore, isLoadingMore]);

  const handlePhotoOpen = (id: number) => {
    setIsModalOpen(true);
    setSelectedPhoto(id);
    setIsNavigating(false);
  };

  const handlePhotoClose = () => {
    // Close the modal but keep the selected photo until the layout animation completes
    setIsModalOpen(false);
  };

  const goToNextPhoto = () => {
    if (selectedPhoto == null) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto);
    if (currentIndex === -1 || currentIndex >= photos.length - 1) return;
    const nextIndex = currentIndex + 1;
    setIsNavigating(true);
    setSelectedPhoto(photos[nextIndex].id);
  };

  const goToPreviousPhoto = () => {
    if (selectedPhoto == null) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto);
    if (currentIndex === -1 || currentIndex <= 0) return;
    const previousIndex = currentIndex - 1;
    setIsNavigating(true);
    setSelectedPhoto(photos[previousIndex].id);
  };

  useEffect(() => {
    urlsRef.current = [...photoUrls];
    nextIndexRef.current = 0;
    setPhotos([]);
    setHasMore(true);
    setIsLoadingMore(false);
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: '1200px 0px', threshold: 0.01 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (selectedIndex < photos.length - 1) {
          goToNextPhoto();
        }
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (selectedIndex > 0) {
          goToPreviousPhoto();
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        handlePhotoClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isModalOpen,
    selectedPhoto,
    selectedIndex,
    goToNextPhoto,
    goToPreviousPhoto,
    photos.length,
  ]);

  // When navigating within the modal, keep the grid item for the selected photo in view
  useEffect(() => {
    if (!isNavigating || selectedPhoto == null) return;
    const el = document.getElementById(`photo-${selectedPhoto}-container`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const completelyOutOfView =
        rect.bottom <= 0 || rect.top >= window.innerHeight;
      if (completelyOutOfView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedPhoto, isNavigating]);

  return (
    <div className="bg-wedding-gold-100 min-h-screen lg:pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-billy from-wedding-gold-400 to-wedding-gold-500 leading-20 bg-gradient-to-tr bg-clip-text text-6xl text-transparent">
            Bilder
          </h1>
          <p className="text-wedding-brown-700 mt-4 text-lg">
            Minner fra vårt bryllup
          </p>
        </div>

        {/* Photo Grid */}
        <Masonry
          columnCount={isSmAndDown ? 2 : 3}
          columnGutter={16}
          rowGutter={16}
          items={photos}
          className="outline-none"
          render={({ data: photo }: { data: PhotoItem }) => (
            <div
              key={photo.id}
              id={`photo-${photo.id}-container`}
              className="break-inside-avoid"
            >
              <div
                className={`group relative z-0 cursor-pointer rounded-xl transition-all ${
                  selectedPhoto !== photo.id ? '' : 'z-10'
                }`}
                onClick={() => handlePhotoOpen(photo.id)}
              >
                <motion.img
                  layoutId={`photo-${photo.id}`}
                  src={getDisplaySrc(photo.src, photo.minSrc)}
                  className="h-full w-full overflow-hidden rounded-xl object-contain"
                  height={photo.height}
                  width={photo.width}
                  transition={isNavigating ? { duration: 0 } : sharedTransition}
                  onLayoutAnimationComplete={() => {
                    // When closing, clear the selected photo only after the layout animation finishes
                    if (!isModalOpen && selectedPhoto === photo.id) {
                      setSelectedPhoto(undefined);
                    }
                  }}
                />
                {/* Overlay */}
                {selectedPhoto !== photo.id && (
                  <div className="absolute inset-0 rounded-lg bg-black/0 transition-colors group-hover:bg-black/20" />
                )}
                {/* Download button on grid (desktop only) */}
                <a
                  href={`/api/photos/download?url=${encodeURIComponent(
                    getDownloadSrc(photo.src, photo.minSrc),
                  )}`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-2 top-2 z-10 hidden rounded-lg p-1.5 text-white opacity-0 transition-opacity hover:bg-black/20 focus:outline-none group-hover:opacity-100 sm:block md:right-3 md:top-3"
                  aria-label="Last ned bilde"
                >
                  <Download className="h-5 w-5" />
                </a>
              </div>
              <AnimatePresence>
                {isModalOpen && selectedPhoto === photo.id && (
                  <div onClick={handlePhotoClose}>
                    {/* Backdrop */}
                    <motion.div
                      className="z-100 fixed left-0 right-0 top-0 h-full w-full"
                      initial={{ opacity: isNavigating ? 0.7 : 0 }}
                      animate={{ opacity: 0.7 }}
                      exit={{ opacity: 0 }}
                      transition={sharedTransition}
                      style={{ backgroundColor: 'black' }}
                    />
                    {/* Photo */}
                    <div className="z-100 fixed left-0 right-0 top-0 flex h-full items-center justify-center overflow-hidden">
                      <div className="group pointer-events-auto relative">
                        <motion.img
                          layout
                          layoutId={`photo-${photo.id}`}
                          src={getDisplaySrc(photo.src, photo.minSrc)}
                          alt={photo.alt}
                          className="h-auto max-h-[90vh] w-auto max-w-[calc(100vw-2rem)] rounded-xl object-contain"
                          height={photo.height}
                          width={photo.width}
                          transition={sharedTransition}
                        />
                        {/* Download button on modal */}
                        <a
                          href={`/api/photos/download?url=${encodeURIComponent(
                            getDownloadSrc(photo.src, photo.minSrc),
                          )}`}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-2 top-2 md:top-4 md:right-4 z-10 rounded-lg p-1.5 text-white md:opacity-0 transition-opacity hover:bg-black/20 focus:outline-none group-hover:opacity-100"
                          aria-label="Last ned bilde"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                        {/* Left Arrow */}
                        {selectedIndex > 0 && (
                          <button
                            type="button"
                            aria-label="Forrige bilde"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToPreviousPhoto();
                            }}
                            className="fixed left-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-xl p-3 text-white hover:bg-black/20 focus:outline-none"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                        )}
                        {/* Right Arrow */}
                        {selectedIndex < photos.length - 1 && (
                          <button
                            type="button"
                            aria-label="Neste bilde"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToNextPhoto();
                            }}
                            className="fixed right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-xl p-3 text-white hover:bg-black/20 focus:outline-none"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        />
        <div ref={sentinelRef} className="h-10" />
      </div>
    </div>
  );
}
