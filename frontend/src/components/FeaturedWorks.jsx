import { useEffect, useRef } from 'react';

export default function FeaturedWorks({ artworks, onArtClick }) {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [artworks]);

  return (
    <section id="featured" className="py-24 bg-[#F5F4EF]">
      <div className="max-w-[1360px] mx-auto px-5 md:px-10">
        {/* Section header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#888]">Featured</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#111]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Selected Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {artworks.map((art, i) => (
            <div
              key={art.id}
              ref={(el) => (itemRefs.current[i] = el)}
              className="reveal relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: i === 0 ? '3/4' : i === 1 ? '4/3' : '3/4', transitionDelay: `${i * 0.1}s` }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/70 mb-1">{art.category}</span>
                <p className="text-white font-serif text-xl font-light"
                   style={{ fontFamily: "'Cormorant Garamond', serif" }}>{art.title}</p>
                <p className="text-white/70 text-xs mt-0.5">{art.artist} &mdash; {art.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
