/*
 * PhotoComparisonCarousel.tsx — Side-by-side before/after photo comparison
 * "Listed with Other Agent" vs "Listed with Will Shao"
 * Auto-advances with manual prev/next navigation
 */
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoPair {
  before: string;
  after: string;
  room: string;
}

const pairs: PhotoPair[] = [
  {
    before: "/images/marketing-before-1.jpg",
    after:  "/images/marketing-after-1.jpg",
    room:   "Living Room",
  },
  // Add more pairs here as you have photos:
  // { before: "/images/marketing-before-2.jpg", after: "/images/marketing-after-2.jpg", room: "Dining Room" },
];

export default function PhotoComparisonCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % pairs.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + pairs.length) % pairs.length);
  };

  useEffect(() => {
    if (paused || pairs.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const pair = pairs[current];

  return (
    <section
      className="py-20 bg-[#0D2137]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="gold-rule mx-auto" />
          <p className="section-label mb-2">Professional Photography</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Does Marketing Matter?
          </h2>
          <p className="text-white/60 font-body text-sm mt-3 max-w-xl mx-auto">
            The same home. The same rooms. Two very different results.
          </p>
        </div>

        {/* Column labels */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto mb-3">
          <div className="text-center">
            <span className="inline-block bg-white/10 text-white/60 font-body text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded">
              Listed with Other Agent
            </span>
          </div>
          <div className="text-center">
            <span className="inline-block bg-[#C89B3C] text-[#0D2137] font-body text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded">
              Listed with Will Shao
            </span>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden shadow-xl aspect-[4/3] bg-[#1A3A5C]">
            <img
              key={pair.before}
              src={pair.before}
              alt={`${pair.room} — other agent`}
              className="w-full h-full object-cover opacity-0 transition-opacity duration-700"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
            />
            <div className="absolute bottom-3 left-3 bg-black/60 text-white/70 text-xs font-body px-2.5 py-1 rounded">
              346 days · Did not sell
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-xl aspect-[4/3] bg-[#1A3A5C]">
            <img
              key={pair.after}
              src={pair.after}
              alt={`${pair.room} — Will Shao`}
              className="w-full h-full object-cover opacity-0 transition-opacity duration-700"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
            />
            <div className="absolute bottom-3 left-3 bg-[#C89B3C] text-[#0D2137] text-xs font-body font-bold px-2.5 py-1 rounded">
              SOLD in 32 days
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {pairs.length > 1 && (
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#C89B3C] hover:text-[#C89B3C] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Room label + dots */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/40 font-body text-xs uppercase tracking-widest">
              {pair.room}
            </p>
            {pairs.length > 1 && (
              <div className="flex gap-2">
                {pairs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-[#C89B3C] w-6" : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {pairs.length > 1 && (
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#C89B3C] hover:text-[#C89B3C] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Outcome banner */}
        <div className="mt-10 max-w-2xl mx-auto bg-[#1A3A5C] rounded-lg p-6 text-center">
          <p
            className="text-white font-bold text-lg mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Who you hire matters.
          </p>
          <p className="text-white/60 font-body text-sm">
            This home sat on the market for 346 days with another agent and didn't sell.
            Re-listed with Will Shao — <span className="text-[#C89B3C] font-semibold">sold in 32 days</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
