import { useEffect, useCallback } from 'react';

export default function CinemaModal({ film, onClose }) {
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!film) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Film viewer"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl leading-none transition-colors"
      >
        &times;
      </button>

      <div className="flex flex-col items-center gap-6 px-4 sm:px-8 max-w-3xl w-full">
        {/* Thumbnail with play overlay */}
        <div className="relative w-full aspect-video overflow-hidden rounded-sm">
          <img
            src={film.thumbnail_url}
            alt={film.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center text-white text-2xl">
              &#9654;
            </div>
            <p className="text-white/60 text-sm">
              {film.video_url ? 'Video link available' : 'Preview only'}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="text-center">
          <p className="text-white font-serif text-2xl sm:text-3xl font-light"
             style={{ fontFamily: "'Cormorant Garamond', serif" }}>{film.title}</p>
          <p className="text-white/60 text-sm mt-1">Dir. {film.director}</p>
          <p className="text-white/40 text-xs mt-0.5">
            {film.year} &mdash; {film.duration} &mdash; {film.genre}
          </p>
          {film.description && (
            <p className="text-white/50 text-sm mt-3 max-w-xs sm:max-w-md mx-auto leading-relaxed">{film.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
