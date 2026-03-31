export default function Hero({ onSubmitClick, heroImages, isLoggedIn }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F4EF]">
      {/* Background strip */}
      <div
        className="absolute inset-0 flex opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        {heroImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="flex-1 object-cover"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-10 pt-24 pb-16">
        <p className="text-xs font-medium tracking-[0.2em] text-[#888] uppercase mb-6">
          An open gallery &mdash; est. 2024
        </p>
        <h1
          className="font-serif text-6xl md:text-8xl lg:text-[9rem] font-light leading-none tracking-tight text-[#111] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Art without<br />
          <em>boundaries.</em>
        </h1>
        <p className="text-base md:text-lg text-[#888] max-w-lg mb-10 leading-relaxed">
          A space for painters, photographers, filmmakers,
          sculptors, and digital artists to share work with the world.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#works"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111] text-[#F5F4EF] text-sm font-medium tracking-wide rounded-sm hover:bg-transparent hover:text-[#111] border border-[#111] transition-colors"
          >
            Explore Gallery
          </a>
          {isLoggedIn && (
            <button
              onClick={onSubmitClick}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#111]/30 text-[#111] text-sm font-medium tracking-wide rounded-sm hover:border-[#111] transition-colors"
            >
              Share Your Work
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-10 hidden md:flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#888] rotate-90 origin-center mb-4">Scroll</span>
        <div className="w-px h-16 bg-[#111]/20" />
      </div>
    </section>
  );
}
