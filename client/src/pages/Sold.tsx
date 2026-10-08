/*
 * Sold.tsx — Landing page for homeowners whose listing expired without selling
 * Route: /sold (linked from expired-listing prospecting emails)
 * Short on purpose: hero with the 346 → 32 day proof, one case study, track record + reviews, form.
 * Visible copy avoids the industry term "expired"; to the homeowner, their home just didn't sell.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useSEO } from "@/lib/seo";
import { submitToFub, isValidEmail, isValidPhone } from "@/lib/fub";
import { trackLead } from "@/lib/analytics";
import { Calendar, Phone, Play, Star } from "lucide-react";

const testimonials = [
  {
    name: "Philip S.",
    quote:
      "18 groups visited during our 1-hour open house and we received two offers the same day — one of which we closed on above asking price.",
  },
  {
    name: "Shang S.",
    quote:
      "Will went above and beyond to make sure I sold my house. Calm, knowledgeable, and creative through every step.",
  },
];

const CALENDAR_URL = "https://calendar.app.google/13BYGTeMsaNqoLp39";
const HEADSHOT = "/images/site/photo.jpg";

// The same living room from the 346-day listing and from Will's relisting (see PhotoComparisonCarousel).
const RESULT = [
  {
    badge: "Another agent",
    img: "/images/marketing/marketing-before-1.jpg",
    alt: "Living room photo from the original listing",
    days: "346 days",
    label: "On the market. Didn't sell.",
    sold: false,
  },
  {
    badge: "With Will",
    img: "/images/marketing/marketing-after-1.jpg",
    alt: "The same living room, photographed for Will's relisting",
    days: "32 days",
    label: "Relisted. Sold.",
    sold: true,
  },
];
const CASE_STUDY_VIDEO_ID = "VLY1Yofa_r8";

function CaseStudyVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0D2137] shadow-xl">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${CASE_STUDY_VIDEO_ID}?autoplay=1`}
          title="Video tour of the relisted home"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label="Play the video tour"
        >
          <img
            src={`https://img.youtube.com/vi/${CASE_STUDY_VIDEO_ID}/hqdefault.jpg`}
            alt="Video tour of the relisted home"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#C89B3C] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-[#0D2137] ml-1" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

const inputClass =
  "w-full border border-gray-200 rounded-lg px-4 py-3 text-base text-[#0D2137] focus:outline-none focus:border-[#C89B3C]";
const labelClass = "block text-sm font-semibold text-[#0D2137] mb-1.5 uppercase tracking-wide";

function ListingReviewForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const [firstName, ...rest] = form.name.trim().split(" ");
    if (!firstName || !form.email || !form.address.trim()) {
      setError("Please fill in your name, email, and the property address.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.phone && !isValidPhone(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      await submitToFub({
        source: "Website — Expired Listing Page (/sold)",
        firstName,
        lastName: rest.join(" "),
        email: form.email,
        phone: form.phone,
        interest: "expired-listing",
        extraNote: [
          "Property: " + form.address.trim(),
          form.message.trim() ? "Notes: " + form.message.trim() : "",
        ].filter(Boolean).join(" | "),
      });
      trackLead("expired-listing-review");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-10 text-center">
        <p
          className="text-[#0D2137] text-2xl md:text-3xl font-bold mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Thanks, {form.name.trim().split(" ")[0]}.
        </p>
        <p className="text-gray-500 text-lg leading-relaxed">
          I'll take a look at {form.address.trim()} and get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 space-y-5 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="review-name">Name *</label>
          <input id="review-name" type="text" required autoComplete="name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="review-email">Email *</label>
          <input id="review-email" type="email" required autoComplete="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="your@email.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="review-address">Property Address *</label>
          <input id="review-address" type="text" required autoComplete="street-address" value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} placeholder="Street address, town" />
        </div>
        <div>
          <label className={labelClass} htmlFor="review-phone">Phone</label>
          <input id="review-phone" type="tel" autoComplete="tel" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="Optional" />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="review-message">Anything I should know?</label>
        <textarea id="review-message" rows={3} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`}
          placeholder="Optional. What happened with the listing, your timeline, or what you're hoping for." />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {status === "error" && (
        <p className="text-red-600 text-sm">
          Something went wrong sending your request. Please call or text me at (781) 456-3541.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#C89B3C] hover:bg-[#b8893a] text-[#0D2137] font-bold px-8 py-4 rounded-xl text-lg transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Find Out Why It Didn't Sell"}
      </button>
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        By submitting this form, you agree to be contacted by Firefly Real Estate, Inc., d/b/a Will Shao at REMAX Executive Realty, by phone, text message, and email regarding your real estate inquiry. Msg &amp; data rates may apply. Message frequency varies. Reply STOP to unsubscribe, HELP for help. Your information will never be sold or shared with third parties for promotional purposes. See our{" "}
        <Link href="/privacy-policy" className="underline hover:text-[#C89B3C]">Privacy Policy</Link>{" "}
        and{" "}
        <Link href="/terms" className="underline hover:text-[#C89B3C]">Terms &amp; Conditions</Link>.
      </p>
    </form>
  );
}

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
    title: "Your Home Didn't Sell? Let's Change That | Will Shao",
    description:
      "If your home sat on the market and didn't sell, find out why — and how Will Shao's proven marketing process gets homes sold. Book a free 30-minute conversation.",
    canonical: "https://bostonhomeguide.com/sold",
  });

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="bg-[#0D2137] text-white px-5 pt-12 pb-14 md:px-8 md:pt-20 md:pb-20">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={HEADSHOT}
                alt="Will Shao"
                className="lg:hidden w-24 h-24 rounded-full object-cover object-[50%_20%] border-[3px] border-[#C89B3C] shrink-0"
              />
              <p className="text-white/70 text-sm leading-relaxed">
                <span className="block text-white text-lg font-semibold">Will Shao</span>
                REMAX Executive Realty
                <span className="block">Nearly 20 years of experience</span>
              </p>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-balance mt-6 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your home didn't sell. Let's find out why.
            </h1>
            <p className="text-white/65 text-lg lg:text-xl leading-relaxed mb-8">
              Most homes that don't sell have a fixable problem: the price, the marketing, or the plan. I'll tell you
              honestly which one it was.
            </p>

            <p className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Same house. <span className="text-[#C89B3C]">A different result.</span>
            </p>
            <div className="grid grid-cols-2 gap-2.5 md:gap-3.5 mb-8">
              {RESULT.map((r) => (
                <figure key={r.badge} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A3A5C]">
                  <img
                    src={r.img}
                    alt={r.alt}
                    className={`w-full h-full object-cover ${r.sold ? "" : "scale-[1.2] grayscale-[0.6] brightness-75"}`}
                  />
                  <span
                    className={`absolute top-2 left-2 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.12em] px-2 py-1 rounded-md ${
                      r.sold ? "bg-[#C89B3C] text-[#0D2137]" : "bg-[#0D2137]/75 text-white/80"
                    }`}
                  >
                    {r.badge}
                  </span>
                  <figcaption className="absolute inset-x-0 bottom-0 px-3 pt-7 pb-2.5 md:px-4 md:pt-9 md:pb-3.5 bg-gradient-to-b from-transparent via-[#0D2137]/85 to-[#0D2137]/95">
                    <span
                      className={`block text-3xl md:text-4xl font-bold leading-none ${r.sold ? "text-[#C89B3C]" : ""}`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {r.days}
                    </span>
                    <span className="block text-[11px] md:text-xs text-white/75 mt-1.5">{r.label}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <a
              href="#review"
              className="inline-block bg-[#C89B3C] hover:bg-[#b8893a] text-[#0D2137] font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-xl"
            >
              Find Out Why It Didn't Sell
            </a>
            <p className="text-white/40 text-sm mt-4">
              No pressure. No obligation. Or{" "}
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                book a free 30-minute call
              </a>
              .
            </p>
          </div>

          <img
            src={HEADSHOT}
            alt="Will Shao"
            className="hidden lg:block w-full aspect-[4/5] object-cover object-[50%_15%] rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="py-24 md:py-32 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-sm font-semibold mb-5">
              A home that didn't sell the first time
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold text-[#0D2137] leading-tight tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              An honest plan, and the buyer it was waiting for.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <img
              src="/images/case-studies/relisted-character-home.jpg"
              alt="An older home with character that sold after Will relisted it"
              loading="lazy"
              className="w-full aspect-[3/2] object-cover rounded-2xl"
            />
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                This older home had real character, and it had already come off the market once without selling. When
                the sellers came to me, I was upfront with them: a home like this wouldn't sell to just anyone. It
                needed a buyer who would love its age and charm, and finding that buyer could take some time.
              </p>
              <p>
                So I built the marketing around what made it special, including a full video tour, and I updated the
                sellers every week so they always knew what was happening and why. The plan worked: it sold to a buyer who
                appreciated the home for exactly the character we'd been showcasing.
              </p>
            </div>
          </div>

          <p
            className="mt-14 text-center text-[#C89B3C] text-2xl md:text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Upfront · Strategic · Responsive
          </p>

          <div className="mt-16 max-w-3xl mx-auto">
            <CaseStudyVideo />
            <p className="text-gray-400 text-sm text-center mt-4">The full video tour from the relaunch.</p>
          </div>

          <p
            className="mt-16 text-center text-[#0D2137] text-2xl md:text-3xl leading-snug max-w-2xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            You'll always know where things stand. I stay in close contact until your home sells.
          </p>
        </div>
      </section>

      {/* ── TRACK RECORD + REVIEWS ── */}
      <section className="py-20 md:py-28 bg-[#FAF8F4] px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-sm font-semibold text-center mb-10">
            Track record
          </p>
          <div className="grid grid-cols-3 gap-6 md:gap-16 text-center">
            {[
              { value: "103.4%", label: "Avg. List-to-Sale" },
              { value: "$120M+", label: "In Transactions" },
              { value: "5.0★", label: "48 Zillow Reviews" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="text-[#0D2137] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.value}
                </p>
                <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mt-3">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 mt-16">
            {testimonials.map((t) => (
              <div key={t.name} className="border-t-2 border-[#C89B3C] pt-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
                <p
                  className="text-[#0D2137] text-xl leading-relaxed mb-5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "{t.quote}"
                </p>
                <p className="font-bold text-[#0D2137] text-base">{t.name}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-xs text-center mt-12">
            Past results are not a guarantee of future performance. Every property is unique.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="review" className="py-24 md:py-36 bg-[#0D2137] px-6 scroll-mt-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-sm font-semibold mb-8">
            Let's talk
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let's find out why it didn't sell.
          </h2>
          <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Send me the address and I'll look at how your home was listed, including the price, the photos, and
            the marketing. Then I'll reach out to talk through what held it back and what I'd do differently.
          </p>
          <div className="mb-10">
            <ListingReviewForm />
          </div>
          <p className="text-white/50 text-base mb-4">Rather talk it through?</p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#0D2137] font-bold px-8 py-4 rounded-xl text-base transition-colors mb-8"
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
          © {new Date().getFullYear()} Will Shao · REMAX Executive Realty · Licensed in Massachusetts
        </p>
        <p className="text-white/15 text-xs mt-2">
          <a href="https://bostonhomeguide.com" className="hover:text-white/30 transition-colors">
            BostonHomeGuide.com
          </a>
          {" · "}
          <Link href="/privacy-policy" className="hover:text-white/30 transition-colors">Privacy Policy</Link>
          {" · "}
          <Link href="/terms" className="hover:text-white/30 transition-colors">Terms</Link>
        </p>
      </footer>

    </div>
  );
}
