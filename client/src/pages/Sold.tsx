/*
 * Sold.tsx — Expired listing prospecting landing page
 * Route: /sold
 * Design: Large typography, generous whitespace, visual-first (inspired by Google DeepMind aesthetic)
 */
import { useEffect } from "react";
import { useSEO } from "@/lib/seo";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import PhotoComparisonCarousel from "@/components/PhotoComparisonCarousel";
import WhyItDidntSell from "@/components/WhyItDidntSell";
import { Calendar, Phone, Star } from "lucide-react";

const testimonials = [
  {
    name: "Philip S.",
    context: "Sold & Purchased in Greater Boston",
    quote:
      "18 groups visited during our 1-hour open house and we received two offers the same day — one of which we closed on above asking price.",
  },
  {
    name: "Shang S.",
    context: "Sold a condo in Boston, MA",
    quote:
      "Will went above and beyond to make sure I sold my house. Calm, knowledgeable, and creative through every step.",
  },
];

const CALENDAR_URL = "https://calendar.app.google/13BYGTeMsaNqoLp39";

export default function SoldPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgetbe.com/agent";
    script.async = true;
    script.onload = () => {
      (window as any).widgetTracker("create", "WT-RUJPYHXU");
      (window as any).widgetTracker("send", "pageview");
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useSEO({
    title: "Your Home Didn't Sell — Let's Change That | Will Shao RE/MAX",
    description:
      "If your home sat on the market and didn't sell, find out why — and how Will Shao's proven marketing process gets homes sold. Book a free 30-minute conversation.",
    canonical: "https://bostonhomeguide.com/sold",
  });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="bg-[#0D2137] text-white px-6 pt-24 pb-28 md:pt-36 md:pb-40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-sm md:text-base font-semibold mb-8">
            Your home didn't sell. Here's why.
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Most Listings Fail to Sell Because of Poor Marketing —{" "}
            <em className="not-italic text-[#C89B3C]">Not the Home.</em>
          </h1>
          <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            The right agent changes everything. Let's talk.
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C89B3C] hover:bg-[#b8893a] text-[#0D2137] font-bold px-10 py-5 rounded-xl text-lg transition-colors shadow-xl"
          >
            <Calendar className="w-5 h-5" />
            Book a Free 30-Min Call
          </a>
          <p className="text-white/30 text-sm mt-5">No pressure. No obligation.</p>
        </div>
      </section>

      {/* ── SCROLL ANIMATION ── */}
      <WhyItDidntSell />

      {/* ── PHOTO COMPARISON ── */}
      <PhotoComparisonCarousel />

      {/* ── STAGING SECTION ── */}
      <section className="py-24 md:py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-sm font-semibold mb-5">
              Presentation
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold text-[#0D2137] leading-tight tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Buyers decide in seconds.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mt-5 max-w-lg mx-auto leading-relaxed">
              Drag to see the difference staging makes.
            </p>
          </div>
          <BeforeAfterSlider
            beforeSrc="/images/staging/staging-before.jpg"
            afterSrc="/images/staging/staging-after.jpg"
            beforeLabel="Unstaged"
            afterLabel="Staged"
          />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 md:py-32 bg-[#0D2137] px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-sm font-semibold text-center mb-16">
            Track record
          </p>
          <div className="grid grid-cols-3 gap-8 md:gap-16 text-center">
            {[
              { value: "103.4%", label: "Avg. List-to-Sale" },
              { value: "$120M+", label: "In Transactions" },
              { value: "5.0★", label: "Zillow Rating" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="text-[#C89B3C] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.value}
                </p>
                <p className="text-white/50 text-sm md:text-base uppercase tracking-widest mt-3">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs text-center mt-12">
            Past results are not a guarantee of future performance. Every property is unique.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 md:py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-sm font-semibold mb-5">
              What sellers say
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold text-[#0D2137] leading-tight tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Real Results.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="border-t-2 border-[#C89B3C] pt-8">
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
                <p
                  className="text-[#0D2137] text-xl md:text-2xl leading-relaxed mb-8 font-medium"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-bold text-[#0D2137] text-base">{t.name}</p>
                  <p className="text-gray-400 text-sm mt-1">{t.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 md:py-36 bg-[#0D2137] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-sm font-semibold mb-8">
            Let's talk
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            You need the right agent this time.
          </h2>
          <p className="text-white/50 text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed">
            Your home deserves a marketing strategy built to sell. Let's talk about what that looks like for your property.
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#C89B3C] hover:bg-[#b8893a] text-[#0D2137] font-bold px-10 py-5 rounded-xl text-lg transition-colors shadow-xl mb-8"
          >
            <Calendar className="w-5 h-5" />
            Book a Free 30-Min Call
          </a>
          <div className="flex items-center justify-center gap-2 text-white/40 text-base">
            <Phone className="w-4 h-4" />
            <span>
              Or call / text:{" "}
              <a
                href="tel:+17814563541"
                className="text-white font-semibold hover:text-[#C89B3C] transition-colors"
              >
                (781) 456-3541
              </a>
            </span>
          </div>
          <p className="text-white/20 text-sm mt-12">
            <a
              href="https://bostonhomeguide.com/sell"
              className="hover:text-white/40 transition-colors"
            >
              View full Seller's Guide →
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#060f1c] py-8 px-6 text-center">
        <p className="text-white/25 text-sm">
          © {new Date().getFullYear()} Will Shao · RE/MAX Executive Realty · Licensed in Massachusetts
        </p>
        <p className="text-white/15 text-xs mt-2">
          <a href="https://bostonhomeguide.com" className="hover:text-white/30 transition-colors">
            BostonHomeGuide.com
          </a>
        </p>
      </footer>

    </div>
  );
}
