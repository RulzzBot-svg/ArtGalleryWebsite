import { useEffect, useCallback } from 'react';

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const art = items[index];

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    },
    [onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!art) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Artwork viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none transition-colors"
      >
        &times;
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={() => onNavigate(-1)}
          aria-label="Previous artwork"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-2xl transition-colors p-2"
        >
          &#8592;
        </button>
      )}

      {/* Next */}
      {index < items.length - 1 && (
        <button
          onClick={() => onNavigate(1)}
          aria-label="Next artwork"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-2xl transition-colors p-2"
        >
          &#8594;
        </button>
      )}

      {/* Stage */}
      <div className="flex flex-col items-center gap-5 px-16 max-w-4xl w-full">
        <img
          src={art.image_url}
          alt={`${art.title} by ${art.artist}`}
          className="max-h-[70vh] w-auto object-contain rounded-sm"
        />
        <div className="text-center">
          <p className="text-white font-serif text-2xl font-light"
             style={{ fontFamily: "'Cormorant Garamond', serif" }}>{art.title}</p>
          <p className="text-white/60 text-sm mt-1">{art.artist}</p>
          <p className="text-white/40 text-xs mt-0.5">{art.medium} &mdash; {art.year}</p>
        </div>
      </div>
    </div>
  );
}
