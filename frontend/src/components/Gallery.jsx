import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

const CATEGORIES = ['all', 'painting', 'photography', 'digital', 'sculpture', 'cinema'];

export default function Gallery({ onArtClick }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemRefs = useRef([]);

  useEffect(() => {
    setLoading(true);
    api.getArtworks(activeFilter)
      .then(setArtworks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [artworks]);

  return (
    <section id="works" className="py-24 bg-[#EEECEA]">
      <div className="max-w-[1360px] mx-auto px-5 md:px-10">
        {/* Section header */}
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#888]">Gallery</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#111]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            All Works
          </h2>
        </div>

        {/* Filter tabs */}
        <div
          className="flex gap-2 mb-10 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filter gallery by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              className={`flex-shrink-0 px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-sm border transition-colors ${
                activeFilter === cat
                  ? 'bg-[#111] text-[#F5F4EF] border-[#111]'
                  : 'bg-transparent text-[#111] border-[#111]/20 hover:border-[#111]'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-[#111]/5 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : artworks.length === 0 ? (
          <p className="text-[#888] py-12 text-center">No works found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {artworks.map((art, i) => (
              <div
                key={art.id}
                ref={(el) => (itemRefs.current[i] = el)}
                className="reveal relative overflow-hidden cursor-pointer group aspect-[3/4]"
                style={{ transitionDelay: `${(i % 8) * 0.06}s` }}
                role="button"
                tabIndex={0}
                aria-label={`View ${art.title} by ${art.artist}`}
                onClick={() => onArtClick(art, artworks)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onArtClick(art, artworks); } }}
              >
                <img
                  src={art.image_url}
                  alt={`${art.title} by ${art.artist}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/60 mb-0.5">{art.category}</span>
                  <p className="text-white text-sm font-medium leading-snug">{art.title}</p>
                  <p className="text-white/60 text-xs">{art.artist}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
