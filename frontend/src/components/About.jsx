export default function About({ onSubmitClick, isLoggedIn }) {
  return (
    <section id="about" className="py-24 bg-[#F5F4EF]">
      <div className="max-w-[1360px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#888]">About</span>
            <h2
              className="font-serif text-5xl md:text-6xl font-light text-[#111] mt-2 mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A home for<br /><em>all artists.</em>
            </h2>
            <p className="text-[#888] text-base leading-relaxed mb-4">
              ARTHAUS is an open platform where creators share their work — paintings, photography,
              digital art, sculpture, cinema, and everything in between. No gatekeeping. No algorithms.
              Just art.
            </p>
            <p className="text-[#888] text-base leading-relaxed mb-8">
              Whether you&apos;re a professional or just starting out, your work belongs here.
            </p>
            {isLoggedIn && (
              <button
                onClick={onSubmitClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111] text-[#F5F4EF] text-sm font-medium tracking-wide rounded-sm hover:bg-transparent hover:text-[#111] border border-[#111] transition-colors"
              >
                Submit Your Work
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-6">
            {[
              { number: '2,400+', label: 'Works Displayed' },
              { number: '840+', label: 'Artists' },
              { number: '6', label: 'Categories' },
            ].map(({ number, label }) => (
              <div key={label} className="flex flex-col items-start">
                <span
                  className="font-serif text-4xl md:text-5xl font-light text-[#111] leading-none"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {number}
                </span>
                <span className="text-xs text-[#888] mt-2 leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
