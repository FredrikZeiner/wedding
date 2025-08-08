'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Forside', href: '/' },
  { name: 'Book rom', href: '/book-rom' },
  { name: 'Meny', href: '/meny' },
  { name: 'Bilder', href: '/bilder' },
  { name: 'Ønsker', href: 'https://www.bryllupslisten.no/pdqi' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside, but only on the backdrop
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Get the backdrop element
      const backdrop = document.getElementById('mobile-backdrop');

      // Only close if clicking directly on the backdrop
      if (backdrop && e.target === backdrop) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Function to check if link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled ? 'bg-wedding-gold-100 shadow-md' : 'bg-transparent'
        }`}
      >
        {/* Desktop Navbar */}
        <div className="mx-auto hidden max-w-7xl items-center justify-center px-4 py-4 sm:px-6 lg:flex lg:px-8">
          <div className="flex items-center space-x-10">
            <div className="flex space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel={link.href.startsWith('http') ? 'noreferrer' : ''}
                  className={`text-sm uppercase tracking-widest transition-colors ${
                    isActive(link.href)
                      ? 'from-wedding-gold-400 to-wedding-gold-500 bg-gradient-to-tr bg-clip-text font-semibold text-transparent'
                      : 'text-wedding-brown-700 hover:text-wedding-gold-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="mx-auto flex items-center justify-end px-4 py-3 lg:hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="text-wedding-brown-700 hover:text-wedding-gold-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Dark Backdrop with animation */}
        <div
          id="mobile-backdrop"
          className={`fixed inset-0 bg-black backdrop-blur-sm transition-all duration-300 ease-in-out lg:hidden ${
            isOpen ? 'visible opacity-50' : 'invisible opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Mobile Menu Sheet */}
        <div
          className={`bg-wedding-gold-100 fixed inset-y-0 right-0 z-50 w-64 transform p-6 shadow-lg transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden`}
        >
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="text-wedding-brown-700 hover:text-wedding-gold-500 focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-8 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg uppercase tracking-widest transition-colors ${
                  isActive(link.href)
                    ? 'from-wedding-gold-400 to-wedding-gold-500 bg-gradient-to-tr bg-clip-text font-semibold text-transparent'
                    : 'text-wedding-brown-700 hover:text-wedding-gold-500'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
