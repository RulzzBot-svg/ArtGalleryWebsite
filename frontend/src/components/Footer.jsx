export default function Footer({ onSubmitClick }) {
  return (
    <footer id="footer" className="bg-[#111] text-[#F5F4EF] py-16">
      <div className="max-w-[1360px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="font-sans font-semibold text-lg tracking-widest">ARTHAUS</span>
            <p className="text-sm text-white/50">An open gallery for every form of art.</p>
          </div>

          {/* Links */}
          <div className="flex gap-12 md:gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40">Explore</h4>
              <a href="#works" className="text-sm text-white/70 hover:text-white transition-colors">Gallery</a>
              <a href="#cinema" className="text-sm text-white/70 hover:text-white transition-colors">Cinema</a>
              <a href="#featured" className="text-sm text-white/70 hover:text-white transition-colors">Featured</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40">Artists</h4>
              <button
                onClick={onSubmitClick}
                className="text-sm text-white/70 hover:text-white transition-colors text-left"
              >
                Submit Work
              </button>
              <a href="#about" className="text-sm text-white/70 hover:text-white transition-colors">About</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40">Follow</h4>
              <a href="#" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a>
              <a href="#" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Twitter / X</a>
              <a href="#" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Vimeo</a>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <p className="text-xs text-white/30">&copy; 2024 ARTHAUS &mdash; Made for artists, by artists.</p>
        </div>
      </div>
    </footer>
  );
}
