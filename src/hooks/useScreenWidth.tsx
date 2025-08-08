'use client';

import { useState, useEffect } from 'react';

// Define Tailwind breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920, // Custom breakpoint from your global.css
};

export type BreakpointKey = keyof typeof breakpoints;

export interface ScreenWidth {
  width: number;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
  is3Xl: boolean;
  isSmAndUp: boolean;
  isMdAndUp: boolean;
  isLgAndUp: boolean;
  isXlAndUp: boolean;
  is2XlAndUp: boolean;
  is3XlAndUp: boolean;
  isSmAndDown: boolean;
  isMdAndDown: boolean;
  isLgAndDown: boolean;
  isXlAndDown: boolean;
  is2XlAndDown: boolean;
  activeBreakpoint: BreakpointKey | null;
}

export function useScreenWidth(): ScreenWidth {
  // Default to a reasonable width for SSR
  const [width, setWidth] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only calculate these values on the client side
  if (!isClient) {
    return {
      width: 0,
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
      is2Xl: false,
      is3Xl: false,
      isSmAndUp: false,
      isMdAndUp: false,
      isLgAndUp: false,
      isXlAndUp: false,
      is2XlAndUp: false,
      is3XlAndUp: false,
      isSmAndDown: false,
      isMdAndDown: false,
      isLgAndDown: false,
      isXlAndDown: false,
      is2XlAndDown: false,
      activeBreakpoint: null,
    };
  }

  // Determine current breakpoint
  const isSm = width >= breakpoints.sm && width < breakpoints.md;
  const isMd = width >= breakpoints.md && width < breakpoints.lg;
  const isLg = width >= breakpoints.lg && width < breakpoints.xl;
  const isXl = width >= breakpoints.xl && width < breakpoints['2xl'];
  const is2Xl = width >= breakpoints['2xl'] && width < breakpoints['3xl'];
  const is3Xl = width >= breakpoints['3xl'];

  // Determine "and up" values
  const isSmAndUp = width >= breakpoints.sm;
  const isMdAndUp = width >= breakpoints.md;
  const isLgAndUp = width >= breakpoints.lg;
  const isXlAndUp = width >= breakpoints.xl;
  const is2XlAndUp = width >= breakpoints['2xl'];
  const is3XlAndUp = width >= breakpoints['3xl'];

  // Determine "and down" values
  const isSmAndDown = width < breakpoints.md;
  const isMdAndDown = width < breakpoints.lg;
  const isLgAndDown = width < breakpoints.xl;
  const isXlAndDown = width < breakpoints['2xl'];
  const is2XlAndDown = width < breakpoints['3xl'];

  // Determine active breakpoint
  let activeBreakpoint: BreakpointKey | null = null;
  if (width < breakpoints.sm) {
    activeBreakpoint = null; // Below smallest breakpoint
  } else if (width < breakpoints.md) {
    activeBreakpoint = 'sm';
  } else if (width < breakpoints.lg) {
    activeBreakpoint = 'md';
  } else if (width < breakpoints.xl) {
    activeBreakpoint = 'lg';
  } else if (width < breakpoints['2xl']) {
    activeBreakpoint = 'xl';
  } else if (width < breakpoints['3xl']) {
    activeBreakpoint = '2xl';
  } else {
    activeBreakpoint = '3xl';
  }

  return {
    width,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    is3Xl,
    isSmAndUp,
    isMdAndUp,
    isLgAndUp,
    isXlAndUp,
    is2XlAndUp,
    is3XlAndUp,
    isSmAndDown,
    isMdAndDown,
    isLgAndDown,
    isXlAndDown,
    is2XlAndDown,
    activeBreakpoint,
  };
}

// Default export
export default useScreenWidth;
