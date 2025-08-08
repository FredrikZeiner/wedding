'use client';

import Image from 'next/image';
import { useScreenWidth } from '../hooks/useScreenWidth';

export default function Hero() {
  const { isLg, is2Xl } = useScreenWidth();

  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="relative mx-auto max-h-full min-h-[800px] min-w-[800px] overflow-visible p-20 px-4 text-center">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image
              src="/images/hero.png"
              fill
              alt="Decorative rings"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
