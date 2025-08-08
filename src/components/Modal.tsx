import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div
        className="bg-black/30 fixed inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="bg-wedding-gold-100 relative z-50 my-8 max-h-[95dvh] min-h-[95dvh] w-full max-w-[95vw] overflow-y-scroll rounded-2xl shadow-xl sm:max-w-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="bg-wedding-brown-700 hover:bg-wedding-gold-500 shadow-wedding-brown-700 shadow-xs absolute right-4 top-4 z-50 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white transition-colors"
          aria-label="Close dialog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 id="modal-title" className="sr-only">
          RSVP Form
        </h2>
        {children}
      </div>
    </div>,
    document.body,
  );
};
