/*
 * Home.tsx — BostonHomeGuide.com
 * Modern local guide: full-bleed hero with search, then short photo-led sections.
 * Each section is a heading, one line, and a "See all" link — depth lives on the inner pages.
 */
import React, { useState, useEffect } from "react";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingCTA from "@/components/FloatingCTA";
import PullQuote from "@/components/PullQuote";
import { toast } from "sonner";
import { submitToFub, getFelloUrl, isValidEmail, isValidPhone } from "@/lib/fub";
import { trackLead } from "@/lib/analytics";

const HERO_IMAGE = "/images/site/boston-hero.webp";
const HEADSHOT = "/images/site/photo.jpg";
const SELL_IMAGE = "/images/towns/belmont.jpeg"; // same house as the Sell page banner

const INK = "#0D2137";

// Order matters: the first cards get the most attention, especially on phones.
// Prices and school grades match client/src/data/neighborhoods.ts.
const neighborhoods = [
  { name: "Lexington", medianPrice: "$1.42M", schools: "A+", img: "/images/towns/lexington.jpeg" },
  { name: "Bedford", medianPrice: "$998K", schools: "A", img: "/images/towns/bedford.jpeg" },
  { name: "Concord", medianPrice: "$1.42M", schools: "A+", img: "/images/towns/concord.jpeg" },
  { name: "Acton", medianPrice: "$850K", schools: "A+", img: "/images/towns/acton.jpeg" },
  { name: "Arlington", medianPrice: "$1.1M", schools: "A-", img: "/images/towns/arlington.jpeg" },
  { name: "Winchester", medianPrice: "$1.5M", schools: "A+", img: "/images/towns/winchester.jpeg" },
  { name: "Waltham", medianPrice: "$768K", schools: "B+", img: "/images/towns/waltham.jpeg" },
  { name: "Cambridge", medianPrice: "$1.31M", schools: "B+", img: "/images/towns/cambridge.jpeg" },
];

const heroTowns = ["Lexington", "Bedford", "Concord", "Acton", "Arlington"];

// Update monthly alongside Market.tsx
const marketStats = [
  { value: "$790K", label: "Median sale price" },
  { value: "46 days", label: "Average days on market" },
  { value: "99%", label: "Sale-to-list price" },
  { value: "2,749", label: "Homes for sale" },
];
const MARKET_PERIOD = "Greater Boston · September 2026";

// Kept inline (not imported from data/blogPosts) so the full article text isn't bundled into the homepage.
const latestGuides = [
  {
    href: "/blog/best-neighborhoods-families",
    title: "Best Neighborhoods for Families in Greater Boston",
    category: "Buyer Guide",
    minutes: 8,
    img: "https://images.unsplash.com/photo-1785301694927-bca6526554b9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    href: "/blog/how-much-to-buy-home-massachusetts",
    title: "How Much Do I Need to Buy a Home in Massachusetts?",
    category: "Finance",
    minutes: 6,
    img: "https://images.unsplash.com/photo-1578091436046-ecd3f4fe6992?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    href: "/blog/win-bidding-war-boston",
    title: "How to Win a Bidding War in Greater Boston",
    category: "Strategy",
    minutes: 5,
    img: "https://images.unsplash.com/photo-1672380135241-c024f7fbfa13?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

function useRealScoutSearch() {
  useEffect(() => {
    const existing = document.querySelector(".rs-embedded-script");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.className = "rs-embedded-script";
    script.async = true;
    script.src = "https://em.realscout.com/assets/em/v3/all.js";
    document.head.appendChild(script);
  }, []);
}

function SectionHeader({
  id, title, subtitle, linkLabel, href, dark = false,
}: { id: string; title: string; subtitle?: string; linkLabel?: string; href?: string; dark?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 md:mb-10">
      <div>
        <h2 id={id} className={`font-body text-3xl md:text-4xl font-bold tracking-tight ${dark ? "text-white" : "text-[#0D2137]"}`}>
          {title}
        </h2>
        {subtitle && <p className={`text-base md:text-lg mt-2 ${dark ? "text-white/70" : "text-[#5B6270]"}`}>{subtitle}</p>}
      </div>
      {linkLabel && href && (
        <Link
          href={href}
          className={`inline-flex items-center gap-1.5 py-2 text-base font-semibold hover:gap-2.5 transition-all shrink-0 ${dark ? "text-[#E2C27A]" : "text-[#0D2137]"}`}
        >
          {linkLabel} <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  useSEO({
    title: "Greater Boston & MetroWest Real Estate | Will Shao",
    description: "Nearly 20 years experience, $120M+ in transactions across Greater Boston and MetroWest MA. Expert buyer and seller representation. Will Shao, REMAX Executive Realty. 5.0★ Zillow.",
    canonical: "https://bostonhomeguide.com/",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Will Shao — REMAX Executive Realty",
      "url": "https://bostonhomeguide.com",
      "telephone": "(781) 456-3541",
      "email": "will@willshao.com",
      "description": "Nearly 20 years of experience, $120M+ in transactions across Greater Boston and MetroWest MA.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "969 Concord Street",
        "addressLocality": "Framingham",
        "addressRegion": "MA",
        "postalCode": "01701",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday","Sunday"], "opens": "10:00", "closes": "16:00" }
      ],
      "priceRange": "$$",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "50", "bestRating": "5" },
      "areaServed": [
        "Boston","Newton","Wellesley","Brookline","Natick","Lexington","Needham","Framingham",
        "Waltham","Concord","Cambridge","Somerville","Arlington","Belmont","Medford","Quincy",
        "Dedham","Westwood","Weston","Lincoln","Sudbury","Shrewsbury","Winchester","Andover",
        "Acton","Westford","Chelmsford","Billerica","Woburn","Stoneham","Melrose","Wakefield",
        "Reading","Lynnfield","Ashland","Hopkinton","Holliston","Medway","Millis","Milford",
        "Hudson","Marlborough","Southborough","Westborough","Northborough","Dover","Medfield",
        "Canton","Sharon","Stoughton","Norwood","Milton","Braintree"
      ],
      "knowsLanguage": ["en", "zh"],
      "memberOf": { "@type": "Organization", "name": "REMAX Executive Realty" },
      "sameAs": ["https://zillow.com/profile/willshao"]
    }
  });
  useRealScoutSearch();
  const [fubForm, setFubForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", interest: "", language: "english", message: ""
  });
  const [fubSubmitting, setFubSubmitting] = useState(false);

  const handleFubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fubForm.email || !fubForm.firstName) {
      toast.error("Please fill in your first name and email.");
      return;
    }
    if (!isValidEmail(fubForm.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (fubForm.phone && !isValidPhone(fubForm.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setFubSubmitting(true);
    try {
      await submitToFub({
        source: "Website — BostonHomeGuide.com Home",
        firstName: fubForm.firstName,
        lastName: fubForm.lastName,
        email: fubForm.email,
        phone: fubForm.phone,
        interest: fubForm.interest,
        language: fubForm.language,
        message: fubForm.message,
      });
      toast.success("Got it! Will will be in touch within 24 hours.");
      trackLead("home-contact");
      setFubForm({ firstName: "", lastName: "", email: "", phone: "", interest: "", language: "english", message: "" });
    } catch {
      toast.error("Something went wrong. Please call (781) 456-3541 directly.");
    } finally {
      setFubSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#D5DAE0] bg-white px-4 py-3 text-base text-[#0D2137] focus:outline-none focus:border-[#0D2137] focus:ring-2 focus:ring-[#0D2137]/10";
  const labelClass = "block text-sm font-medium text-[#3A4049] mb-1.5";

  return (
    <div className="min-h-screen bg-white font-body text-[#0D2137]">
      <Navigation />
      <ExitIntentPopup />
      <FloatingCTA />

      {/* ── HERO ── */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex items-center justify-center min-h-[640px] md:min-h-[740px]"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/55" aria-hidden="true" />
        <div className="relative z-10 container pt-28 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              id="hero-heading"
              className="font-body text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white"
            >
              Find your place in Greater Boston
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/85">
              Homes, towns, and market insight from a local agent.
            </p>

            {/* RealScout Search Widget */}
            <div className="mt-9 max-w-2xl mx-auto">
              <div
                className="realscout-search simple"
                data-rep="willshao"
                data-button-color={INK}
                data-button-font="#FFFFFF"
                data-background-color="rgba(255,255,255,0.97)"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {heroTowns.map((town) => (
                <Link
                  key={town}
                  href={`/neighborhoods/${town.toLowerCase()}`}
                  className="px-4 py-2.5 rounded-full bg-white text-[#0D2137] text-sm font-medium hover:bg-[#EEF1F4] transition-colors"
                >
                  {town}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* ── COMMUNITIES ── */}
        <section aria-labelledby="towns-heading" className="pt-20 md:pt-28">
          <div className="container">
            <SectionHeader
              id="towns-heading"
              title="Explore communities"
              subtitle="Schools, prices, and local character, town by town."
              linkLabel="See all towns"
              href="/neighborhoods"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
              {neighborhoods.map((n) => (
                <Link key={n.name} href={`/neighborhoods/${n.name.toLowerCase()}`} className="group block">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EEF1F4]">
                    <img
                      src={n.img}
                      alt={n.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-body mt-3 text-lg font-semibold">{n.name}</h3>
                  <p className="text-sm text-[#5B6270]">
                    Median {n.medianPrice} · Schools {n.schools}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PullQuote quote="jake" align="right" className="pt-16 md:pt-20" />

        {/* ── MARKET ── */}
        <section aria-labelledby="market-heading" className="mt-20 md:mt-28 py-16 md:py-24 bg-[#0D2137]">
          <div className="container">
            <SectionHeader
              id="market-heading"
              title="The market right now"
              subtitle={MARKET_PERIOD}
              linkLabel="Full market report"
              href="/market"
              dark
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {marketStats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/[0.07] border border-white/10 p-6 md:p-8">
                  <p className="text-3xl md:text-4xl font-bold tracking-tight text-white">{s.value}</p>
                  <p className="mt-1.5 text-sm md:text-base text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GUIDES ── */}
        <section aria-labelledby="guides-heading" className="pt-20 md:pt-28">
          <div className="container">
            <SectionHeader
              id="guides-heading"
              title="Local guides"
              subtitle="Straight answers for buying and selling here."
              linkLabel="All guides"
              href="/blog"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {latestGuides.map((g) => (
                <Link key={g.href} href={g.href} className="group block">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#EEF1F4]">
                    <img
                      src={g.img}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#5B6270]">
                    {g.category} · {g.minutes} min read
                  </p>
                  <h3 className="font-body mt-1 text-xl font-semibold leading-snug group-hover:underline underline-offset-4">
                    {g.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PullQuote quote="shang" align="left" className="pt-16 md:pt-20" />

        {/* ── HOME VALUE ── */}
        <section aria-labelledby="sell-heading" className="pt-20 md:pt-28">
          <div className="container">
            <div className="rounded-3xl bg-[#F4F6F8] overflow-hidden grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto md:min-h-[400px]">
                <img
                  src={SELL_IMAGE}
                  alt="Brick colonial home with a landscaped front lawn"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-14 flex flex-col justify-center">
                <h2 id="sell-heading" className="font-body text-3xl md:text-4xl font-bold tracking-tight">
                  What's your home worth?
                </h2>
                <p className="mt-3 text-base md:text-lg text-[#5B6270]">
                  See an instant estimate based on recent sales near you.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={getFelloUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fello-cta inline-flex items-center px-6 py-3.5 rounded-full bg-[#0D2137] text-white text-base font-semibold hover:bg-[#1A3A5C] transition-colors"
                  >
                    Check your home's value
                  </a>
                  <Link
                    href="/sell"
                    className="inline-flex items-center px-6 py-3.5 rounded-full border border-[#C9CFD6] bg-white text-base font-semibold hover:border-[#0D2137] transition-colors"
                  >
                    Seller's guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MEET WILL ── */}
        <section aria-labelledby="will-heading" className="mt-20 md:mt-28 py-16 md:py-24 bg-[#0D2137]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 md:gap-14 items-center">
              <div className="aspect-[4/5] max-w-sm w-full rounded-3xl overflow-hidden bg-[#1A3A5C]">
                <img src={HEADSHOT} alt="Will Shao" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 id="will-heading" className="font-body text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Meet Will &amp; the team
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
                  Nearly 20 years and $120M+ in sales across Greater Boston. We keep you informed at
                  every step, market every home to stand out, and negotiate for the result you deserve.
                </p>
                <p className="mt-5 flex items-center gap-2 text-base text-white">
                  <Star className="w-5 h-5 fill-[#C89B3C] text-[#C89B3C]" aria-hidden="true" />
                  <span className="font-semibold">5.0</span>
                  <span className="text-white/70">· 50 reviews on Zillow and Google</span>
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-light text-base">
                    Get in touch
                  </Link>
                  <Link href="/about" className="btn-outline-light text-base">
                    About &amp; reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section aria-labelledby="contact-heading" className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 id="contact-heading" className="font-body text-3xl md:text-4xl font-bold tracking-tight">
                  Thinking about a move?
                </h2>
                <p className="mt-3 text-base md:text-lg text-[#5B6270]">
                  Tell us what you're looking for. We'll reply within 24 hours.
                </p>
              </div>
              <form onSubmit={handleFubSubmit} className="rounded-3xl bg-[#F4F6F8] p-6 md:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-first" className={labelClass}>First name *</label>
                    <input id="home-first" type="text" required autoComplete="given-name" value={fubForm.firstName}
                      onChange={(e) => setFubForm({ ...fubForm, firstName: e.target.value })}
                      className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="home-last" className={labelClass}>Last name</label>
                    <input id="home-last" type="text" autoComplete="family-name" value={fubForm.lastName}
                      onChange={(e) => setFubForm({ ...fubForm, lastName: e.target.value })}
                      className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-email" className={labelClass}>Email *</label>
                    <input id="home-email" type="email" required autoComplete="email" value={fubForm.email}
                      onChange={(e) => setFubForm({ ...fubForm, email: e.target.value })}
                      className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="home-phone" className={labelClass}>Phone</label>
                    <input id="home-phone" type="tel" autoComplete="tel" value={fubForm.phone}
                      onChange={(e) => setFubForm({ ...fubForm, phone: e.target.value })}
                      className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-interest" className={labelClass}>I'm interested in</label>
                    <select id="home-interest" value={fubForm.interest}
                      onChange={(e) => setFubForm({ ...fubForm, interest: e.target.value })}
                      className={inputClass}>
                      <option value="">Select one</option>
                      <option value="buying">Buying a Home</option>
                      <option value="selling">Selling My Home</option>
                      <option value="both">Buying &amp; Selling</option>
                      <option value="investing">Investment Property</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="home-language" className={labelClass}>Preferred language</label>
                    <select id="home-language" value={fubForm.language}
                      onChange={(e) => setFubForm({ ...fubForm, language: e.target.value })}
                      className={inputClass}>
                      <option value="english">English</option>
                      <option value="mandarin">Mandarin 普通话</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="home-message" className={labelClass}>Message (optional)</label>
                  <textarea id="home-message" rows={3} value={fubForm.message}
                    onChange={(e) => setFubForm({ ...fubForm, message: e.target.value })}
                    className={`${inputClass} resize-none`} />
                </div>
                <button
                  type="submit"
                  disabled={fubSubmitting}
                  className="w-full rounded-full bg-[#0D2137] py-3.5 text-base font-semibold text-white hover:bg-[#1A3A5C] transition-colors disabled:opacity-60"
                >
                  {fubSubmitting ? "Sending..." : "Send message"}
                </button>
                <p className="text-xs text-[#5B6270] text-center leading-relaxed">
                  By submitting this form, you agree to be contacted by Firefly Real Estate, Inc., d/b/a Will Shao at REMAX Executive Realty, by phone, text message, and email regarding your real estate inquiry. Msg &amp; data rates may apply. Message frequency varies. Reply STOP to unsubscribe, HELP for help. Your information will never be sold or shared with third parties for promotional purposes. See our{" "}
                  <Link href="/privacy-policy" className="underline hover:text-[#0D2137]">Privacy Policy</Link>{" "}
                  and{" "}
                  <Link href="/terms" className="underline hover:text-[#0D2137]">Terms &amp; Conditions</Link>.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
