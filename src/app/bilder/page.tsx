'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useScreenWidth from '../../hooks/useScreenWidth';

// Photos will be fetched from API to ensure full folder coverage
type PhotoItem = { id: number; src: string; minSrc: string; alt: string };

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
  const { isSmAndDown } = useScreenWidth();
  const sharedTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
  } as const;
  const selectedIndex =
    selectedPhoto != null
      ? photos.findIndex((p) => p.id === selectedPhoto)
      : -1;

  // Display should use the smaller 25% image (API returns it as `src`).
  // Downloads should use the full minified image if available (API returns it as `minSrc`).
  const getDisplaySrc = (src: string, _full?: string) => src;
  const getDownloadSrc = (src: string, full?: string) => full ?? src;

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
    // Fetch photo list from API
    const fetchPhotos = async () => {
      try {
        const res = await fetch('/api/photos', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load photos');
        const data: PhotoItem[] = await res.json();
        setPhotos(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPhotos();
  }, []);

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
                  height={800}
                  width={800}
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
                          height={800}
                          width={800}
                          transition={sharedTransition}
                        />
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
      </div>
    </div>
  );
}
