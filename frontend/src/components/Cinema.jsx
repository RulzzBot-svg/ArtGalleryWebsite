import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

export default function Cinema({ onFilmClick }) {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef([]);

  useEffect(() => {
    api.getCinema()
      .then(setFilms)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [films]);

  return (
    <section id="cinema" className="py-24 bg-[#111]">
      <div className="max-w-[1360px] mx-auto px-5 md:px-10">
        {/* Section header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#F5F4EF]/40">Cinema</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#F5F4EF]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Short Films &amp; Reels
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-video bg-white/5 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {films.map((film, i) => (
              <div
                key={film.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className="reveal relative overflow-hidden cursor-pointer group aspect-video"
                style={{ transitionDelay: `${i * 0.08}s` }}
                role="button"
                tabIndex={0}
                aria-label={`View film: ${film.title} by ${film.director}`}
                onClick={() => onFilmClick(film)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFilmClick(film); } }}
              >
                <img
                  src={film.thumbnail_url}
                  alt={film.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300 flex flex-col items-center justify-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white text-lg group-hover:border-white group-hover:scale-110 transition-all duration-300"
                    aria-hidden="true"
                  >
                    &#9654;
                  </div>
                  <div className="text-center px-4">
                    <p className="text-white font-serif text-xl font-light"
                       style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {film.title}
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {film.director} &mdash; {film.year} &mdash; {film.duration} &mdash; {film.genre}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
