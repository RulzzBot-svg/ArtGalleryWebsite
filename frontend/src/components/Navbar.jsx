import { useState, useEffect } from 'react';

export default function Navbar({ onSubmitClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function closeMenu() { setMenuOpen(false); }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#F5F4EF]/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
        style={{ height: '64px' }}
      >
        <div className="max-w-[1360px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">
          <a href="#" className="font-sans font-semibold text-lg tracking-widest text-[#111]">
            ARTHAUS
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#works" className="text-sm font-medium text-[#111] hover:opacity-60 transition-opacity">Works</a>
            <a href="#cinema" className="text-sm font-medium text-[#111] hover:opacity-60 transition-opacity">Cinema</a>
            <a href="#about" className="text-sm font-medium text-[#111] hover:opacity-60 transition-opacity">About</a>
            <button
              onClick={onSubmitClick}
              className="px-5 py-2.5 text-sm font-medium border border-[#111] text-[#111] hover:bg-[#111] hover:text-[#F5F4EF] transition-colors rounded-sm"
            >
              Submit Work
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={`block w-5 h-0.5 bg-[#111] transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#111] transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#111] transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-[#F5F4EF] border-b border-[#111]/10 flex flex-col py-6 px-6 gap-5 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'
        }`}
      >
        <a href="#works" onClick={closeMenu} className="text-sm font-medium text-[#111]">Works</a>
        <a href="#cinema" onClick={closeMenu} className="text-sm font-medium text-[#111]">Cinema</a>
        <a href="#about" onClick={closeMenu} className="text-sm font-medium text-[#111]">About</a>
        <button
          onClick={() => { closeMenu(); onSubmitClick(); }}
          className="text-sm font-medium text-[#111] text-left"
        >
          Submit Work
        </button>
      </div>
    </>
  );
}
