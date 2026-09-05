/*
 * Home.tsx — BostonHomeGuide.com
 * Refined Coastal Luxury: Full-bleed hero, social proof, neighborhoods, listings, CTAs, testimonials
 */
import React, { useState, useEffect, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import {
  Search, Star, Home, TrendingUp, MapPin, ChevronRight,
  ArrowRight, Play, Users, Award, Clock, CheckCircle
} from "lucide-react";

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "realscout-your-listings": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-encoded-id": string;
        "sort-order": string;
        "listing-status": string;
        "property-types": string;
      };
    }
  }
}
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialProofTicker from "@/components/SocialProofTicker";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingCTA from "@/components/FloatingCTA";
import BuyingProcessGuide from "@/components/BuyingProcessGuide";
import { toast } from "sonner";
import { submitToFub, getFelloUrl, isValidEmail, isValidPhone } from "@/lib/fub";
import { trackLead } from "@/lib/analytics";

const HERO_IMAGE = "/images/site/boston-hero.webp";
const NEIGHBORHOOD_IMAGE = "https://images.unsplash.com/photo-1599136115254-f3fa567872ae?w=1400&q=80";
const CONSULT_IMAGE = "/images/site/photo.jpg";
const METROWEST_IMAGE = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80";

const neighborhoods = [
  { name: "Newton", type: "City", medianPrice: "$1.55M", schools: "A+", img: "/images/towns/newton.jpeg" },
  { name: "Wellesley", type: "Town", medianPrice: "$2.23M", schools: "A+", img: "/images/towns/wellesley.jpeg" },
  { name: "Brookline", type: "Town", medianPrice: "$1.13M", schools: "A", img: "/images/towns/brookline.jpeg" },
  { name: "Natick", type: "Town", medianPrice: "$943K", schools: "A", img: "/images/towns/natick.jpeg" },
  { name: "Lexington", type: "Town", medianPrice: "$1.57M", schools: "A+", img: "/images/towns/lexington.jpeg" },
  { name: "Concord", type: "Town", medianPrice: "$1.42M", schools: "A+", img: "/images/towns/concord.jpeg" },
  { name: "Needham", type: "Town", medianPrice: "$1.76M", schools: "A", img: "/images/towns/needham.jpeg" },
  { name: "Framingham", type: "City", medianPrice: "$660K", schools: "B+", img: "/images/towns/framingham.jpeg" },
];


const testimonials = [
  {
    name: "Jake Uminski",
    location: "Greater Boston, MA",
    rating: 5,
    text: "Will Shao is attentive, knowledgeable, and tenacious. Not only did he curate an extensive list of homes catered to our needs and wants, but he was able to help us easily navigate all the complexities of the home buying process. We were so grateful to have Will in our corner!",
    source: "Google",
  },
  {
    name: "Tackle2thePeople",
    location: "Greater Boston, MA",
    rating: 5,
    text: "Will helped us navigate an incredibly competitive market in the Spring of 2024 — it ended with us purchasing our very first home! As someone who entered the real estate industry during the 2008 Housing Crisis, he has seen everything under the sun. Will had loads of expertise on everything that could go right or wrong, and helped us navigate a fairly unique situation that resulted in us purchasing our dream house.",
    source: "Google",
  },
  {
    name: "Jason Hou",
    location: "Newton, MA",
    rating: 5,
    text: "Will helped us so much in our home buying experience in this crazy market. He is patient, calm, knowledgeable, and honest. He won't push you to do something you are not comfortable doing. I feel he takes the customer's requirements extremely seriously. Thanks Will!",
    source: "Google",
  },
];

const stats = [
  { value: "20", label: "Years Experience", icon: Clock },
  { value: "$120M+", label: "In Transactions", icon: Home },
  { value: "5.0★", label: "Zillow Rating", icon: Star },
  { value: "70+", label: "Towns Served", icon: MapPin },
];

const blogPosts = [
  {
    title: "Best Neighborhoods for Families in Greater Boston",
    excerpt: "From top-rated schools to community parks, we break down the best towns for raising a family in the Boston metro area.",
    category: "Buyer Guide",
    readTime: "8 min read",
    href: "/blog/best-neighborhoods-families",
  },
  {
    title: "How Much Do I Need to Buy a Home in Massachusetts?",
    excerpt: "A detailed breakdown of down payments, closing costs, and monthly expenses for Boston-area home buyers in 2024.",
    category: "Finance",
    readTime: "6 min read",
    href: "/blog/how-much-to-buy-home-massachusetts",
  },
  {
    title: "How to Win a Bidding War in Greater Boston",
    excerpt: "Proven strategies that have helped Will's clients win competitive offers — without overpaying.",
    category: "Strategy",
    readTime: "5 min read",
    href: "/blog/win-bidding-war-boston",
  },
];

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

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

export default function HomePage() {
  useSEO({
    title: "Greater Boston & MetroWest Real Estate | Will Shao, RE/MAX",
    description: "Nearly 20 years experience, $120M+ in transactions across Greater Boston and MetroWest MA. Expert buyer and seller representation. Will Shao, RE/MAX Executive Realty. 5.0★ Zillow.",
    canonical: "https://bostonhomeguide.com/",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Will Shao — RE/MAX Executive Realty",
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
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "48", "bestRating": "5" },
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
      "memberOf": { "@type": "Organization", "name": "RE/MAX Executive Realty" },
      "sameAs": ["https://zillow.com/profile/willshao"]
    }
  });
  useRealScoutSearch();
  const [fubForm, setFubForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", interest: "", language: "english", message: ""
  });
  const [fubSubmitting, setFubSubmitting] = useState(false);
  const { ref: statsRef, visible: statsVisible } = useIntersection();
  const { ref: neighborhoodsRef, visible: neighborhoodsVisible } = useIntersection();
  const { ref: listingsRef, visible: listingsVisible } = useIntersection();

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

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <ExitIntentPopup />
      <FloatingCTA />

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D2137]/75 via-[#0D2137]/55 to-[#0D2137]/80" />

        <div className="relative z-10 container text-center pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <p className="section-label text-[#C89B3C] mb-4 animate-fade-up">
              Greater Boston & MetroWest Massachusetts
            </p>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up delay-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Complete Guide to
              <span className="block text-[#C89B3C] italic">Buying & Selling</span>
              in Greater Boston
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-body animate-fade-up delay-200">
              Expert guidance from Will Shao — nearly 20 years, $120M+ in transactions, serving Greater Boston's most sought-after towns.
            </p>

            {/* RealScout Search Widget */}
            <div className="relative z-10 max-w-2xl mx-auto mb-6 animate-fade-up delay-300">
              <div
                className="realscout-search simple"
                data-rep="willshao"
                data-button-color="#C89B3C"
                data-button-font="#0D2137"
                data-background-color="rgba(255,255,255,0.95)"
              />
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap justify-center gap-3 animate-fade-up delay-400">
              {[
                { label: "Buy a Home", href: "/buy" },
                { label: "Sell Your Home", href: "/sell" },
                { label: "Market Reports", href: "/market" },
                { label: "Neighborhood Guides", href: "/neighborhoods" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2 bg-white/15 hover:bg-white/25 text-white text-sm font-body rounded border border-white/30 transition-all backdrop-blur-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C89B3C]" />
        </div>
      </section>

      {/* ── SOCIAL PROOF TICKER ── */}
      <SocialProofTicker />

      {/* ── STATS BAR ── */}
      <section className="bg-[#0D2137] py-10" ref={statsRef}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center text-center px-6 ${
                    statsVisible ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Icon className="w-6 h-6 text-[#C89B3C] mb-2" />
                  <span
                    className="text-3xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/50 font-body uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARKET SNAPSHOT ── */}
      <section className="bg-[#FAF8F4] py-12 border-b border-gray-100">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="section-label mb-1">Live Market Data</p>
              <h2
                className="text-2xl font-bold text-[#0D2137]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Greater Boston Market Snapshot
              </h2>
              <p className="text-sm text-gray-500 font-body mt-1">Updated June 2026</p>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {[
                { label: "Median Sale Price", value: "$860,000", change: "Jun 2026", up: true },
                { label: "Days on Market", value: "33 days", change: "Greater Boston", up: false },
                { label: "List-to-Sale Ratio", value: "102%", change: "Above asking", up: true },
                { label: "Active Inventory", value: "723", change: "Jun 2026", up: false },
              ].map((metric) => (
                <div key={metric.label} className="text-center">
                  <p
                    className="text-2xl font-bold text-[#0D2137]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-500 font-body">{metric.label}</p>
                  <p
                    className={`text-xs font-semibold mt-0.5 ${
                      metric.up ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {metric.change} YoY
                  </p>
                </div>
              ))}
            </div>
            <Link href="/market" className="btn-outline-gold text-sm whitespace-nowrap">
              Full Report →
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEIGHBORHOODS ── */}
      <section className="py-20 bg-white" ref={neighborhoodsRef}>
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="gold-rule" />
              <p className="section-label mb-2">Explore Communities</p>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#0D2137]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Find Your Perfect Neighborhood
              </h2>
              <p className="text-gray-500 font-body mt-3 max-w-xl">
                Like ice cream flavors, every Greater Boston town has its own unique character — explore guides for 70+ communities with school ratings, market data, and local flavor.
              </p>
            </div>
            <Link
              href="/neighborhoods"
              className="mt-6 md:mt-0 flex items-center gap-2 text-[#C89B3C] font-semibold text-sm font-body hover:gap-3 transition-all"
            >
              View All Communities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neighborhoods.map((n, i) => (
              <Link
                key={n.name}
                href={`/neighborhoods/${n.name.toLowerCase()}`}
                className={`group relative overflow-hidden rounded-lg aspect-[4/3] card-hover ${
                  neighborhoodsVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <img
                  src={n.img}
                  alt={n.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2137]/85 via-[#0D2137]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="text-white font-bold text-lg leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {n.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/70 text-sm font-body">{n.medianPrice} avg.</span>
                    <span className="text-[#C89B3C] text-sm font-semibold font-body">
                      Schools: {n.schools}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="py-20 bg-[#FAF8F4]" ref={listingsRef}>
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="gold-rule" />
              <p className="section-label mb-2">Featured Properties</p>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#0D2137]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Homes for Sale in Greater Boston
              </h2>
            </div>
            <Link
              href="/search"
              className="mt-6 md:mt-0 flex items-center gap-2 text-[#C89B3C] font-semibold text-sm font-body hover:gap-3 transition-all"
            >
              View All Listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <style>{`
            realscout-your-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
            }
          `}</style>
          <realscout-your-listings
            agent-encoded-id="QWdlbnQtMTUzMjg1"
            sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
            listing-status="For Sale,For Rent,In Contract,Sold"
            property-types="SFR,MF,TC,LAL,MOBILE,OTHER"
          />
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="py-20 bg-[#0D2137]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buyer CTA */}
            <div
              className="relative overflow-hidden rounded-lg p-8 md:p-10"
              style={{
                backgroundImage: `url(${NEIGHBORHOOD_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-[#0D2137]/80" />
              <div className="relative z-10">
                <Home className="w-8 h-8 text-[#C89B3C] mb-4" />
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Find Your Dream Home
                </h3>
                <p className="text-white/70 font-body text-base mb-6 leading-relaxed">
                  Access the complete Greater Boston MLS, get personalized neighborhood
                  recommendations, and work with a buyer's agent who knows every street.
                </p>
                <Link href="/buy" className="btn-gold text-sm">
                  Start Your Search →
                </Link>
              </div>
            </div>

            {/* Seller CTA */}
            <div
              className="relative overflow-hidden rounded-lg p-8 md:p-10"
              style={{
                backgroundImage: `url(${METROWEST_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-[#1A3A5C]/85" />
              <div className="relative z-10">
                <TrendingUp className="w-8 h-8 text-[#C89B3C] mb-4" />
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  What's My Home Worth?
                </h3>
                <p className="text-white/70 font-body text-base mb-6 leading-relaxed">
                  Get a free, no-obligation home valuation based on real-time market data
                  and Will's nearly 20 years of local expertise.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={getFelloUrl()}
                    className="btn-gold text-sm fello-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Your Free Home Valuation →
                  </a>
                  <p className="text-sm text-white/50 font-body">Instant market analysis · Powered by Fello</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT WILL ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={CONSULT_IMAGE}
                  alt="Will Shao — Real Estate Expert"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-[#C89B3C] text-[#0D2137] rounded-lg p-4 shadow-xl">
                <p
                  className="text-3xl font-bold leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  18
                </p>
                <p className="text-xs font-semibold font-body mt-1">Years of<br />Excellence</p>
              </div>
            </div>

            <div>
              <span className="gold-rule" />
              <p className="section-label mb-2">Meet Your Agent</p>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#0D2137] mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Will Shao — Your Greater Boston Expert
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                With nearly 20 years of experience and $120M+ in closed transactions, Will Shao has
                built a reputation as the trusted guide for buyers and sellers across Greater
                Boston and MetroWest Massachusetts.
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Will serves the diverse communities of Greater Boston — from first-time buyers
                to experienced home sellers. His approach is educational first: he believes
                an informed client makes the best decisions.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "REMAX Executive Realty",
                  "REMAX Executive Realty",
                  "70+ Towns Served",
                  "5.0★ Zillow · 48 Reviews",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C89B3C] shrink-0" />
                    <span className="text-base text-gray-600 font-body">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="btn-navy text-sm">
                  Learn More About Will
                </Link>
                <a
                  href="https://calendar.app.google/sGPHDTZGiH9zdE8x5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold text-sm"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO INTRO ── */}
      <section className="py-20 bg-[#FAF8F4]">
        <div className="container">
          <div className="text-center mb-10">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">Video Introduction</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hear From Will Directly
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div
              className="relative aspect-video rounded-lg overflow-hidden bg-[#0D2137] shadow-xl cursor-pointer group"
              onClick={() => toast.info("Video coming soon — contact Will directly at (781) 456-3541")}
            >
              <img
                src={CONSULT_IMAGE}
                alt="Will Shao video introduction"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#C89B3C] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#0D2137] ml-1" />
                </div>
                <p className="text-white font-body text-sm mt-4 opacity-80">
                  Watch Will's Introduction (2 min)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#0D2137]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">Client Stories</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Clients Say About Will
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-[#C89B3C] text-[#C89B3C]" />
              ))}
              <span className="text-white/70 font-body text-sm ml-1">
                5.0 · 48 Reviews on Zillow &amp; Google
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="bg-[#1A3A5C] rounded-lg p-6 border border-white/10"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                  <span className="text-white/40 text-xs ml-2 font-body">{t.source}</span>
                </div>
                <p className="text-white/80 font-body text-base leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C89B3C]/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="text-white text-base font-semibold font-body">{t.name}</p>
                    <p className="text-white/50 text-sm font-body">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <a
              href="https://zillow.com/profile/willshao"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-sm"
            >
              Read Reviews on Zillow →
            </a>
            <a
              href="https://www.google.com/maps/place/Will+Shao+-+Greater+Boston+Real+Estate+Agent/@42.396144,-71.5891231,10z/data=!4m16!1m9!3m8!1s0x89e389477f2c7b09:0x6c87515ce456b0de!2sWill+Shao+-+Greater+Boston+Real+Estate+Agent!8m2!3d42.396109!4d-71.2594615!9m1!1b1!16s%2Fg%2F11qswmf7zz!3m5!1s0x89e389477f2c7b09:0x6c87515ce456b0de!8m2!3d42.396109!4d-71.2594615!16s%2Fg%2F11qswmf7zz?hl=en-US&entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-sm"
            >
              Read Reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* ── BUYING PROCESS GUIDE ── */}
      <BuyingProcessGuide />

      {/* ── BLOG POSTS ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="gold-rule" />
              <p className="section-label mb-2">Resources & Insights</p>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#0D2137]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Greater Boston Real Estate Guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="mt-6 md:mt-0 flex items-center gap-2 text-[#C89B3C] font-semibold text-sm font-body hover:gap-3 transition-all"
            >
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group bg-[#FAF8F4] rounded-lg overflow-hidden border border-gray-100 card-hover"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold font-body text-[#C89B3C] bg-[#C89B3C]/10 px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 font-body">{post.readTime}</span>
                  </div>
                  <h3
                    className="text-lg font-bold text-[#0D2137] mb-3 group-hover:text-[#1976A8] transition-colors leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-base text-gray-500 font-body leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-[#C89B3C] text-sm font-semibold font-body">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUB LEAD FORM ── */}
      <section className="py-16 bg-[#FAF8F4] border-t border-gray-100">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Award className="w-10 h-10 text-[#C89B3C] mx-auto mb-4" />
              <h2
                className="text-2xl md:text-3xl font-bold text-[#0D2137] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Make Your Move?
              </h2>
              <p className="text-gray-500 font-body text-base">
                Tell Will a bit about what you're looking for and he'll reach out within 24 hours.
              </p>
            </div>
            <form onSubmit={handleFubSubmit} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">First Name *</label>
                  <input type="text" required value={fubForm.firstName}
                    onChange={(e) => setFubForm({ ...fubForm, firstName: e.target.value })}
                    className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                    placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Last Name</label>
                  <input type="text" value={fubForm.lastName}
                    onChange={(e) => setFubForm({ ...fubForm, lastName: e.target.value })}
                    className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                    placeholder="Smith" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Email *</label>
                  <input type="email" required value={fubForm.email}
                    onChange={(e) => setFubForm({ ...fubForm, email: e.target.value })}
                    className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                    placeholder="jane@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Phone</label>
                  <input type="tel" value={fubForm.phone}
                    onChange={(e) => setFubForm({ ...fubForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                    placeholder="(617) 000-0000" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">I'm Interested In</label>
                  <select value={fubForm.interest} onChange={(e) => setFubForm({ ...fubForm, interest: e.target.value })}
                    className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]">
                    <option value="">Select one</option>
                    <option value="buying">Buying a Home</option>
                    <option value="selling">Selling My Home</option>
                    <option value="both">Buying &amp; Selling</option>
                    <option value="investing">Investment Property</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Preferred Language</label>
                  <select value={fubForm.language} onChange={(e) => setFubForm({ ...fubForm, language: e.target.value })}
                    className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]">
                    <option value="english">English</option>
                    <option value="mandarin">Mandarin 普通话</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Message (optional)</label>
                <textarea rows={3} value={fubForm.message}
                  onChange={(e) => setFubForm({ ...fubForm, message: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C] resize-none"
                  placeholder="Tell Will a bit about what you're looking for..." />
              </div>
              <button type="submit" disabled={fubSubmitting} className="btn-gold w-full text-center text-sm py-3 disabled:opacity-60">
                {fubSubmitting ? "Sending..." : "Send Message — Will Responds Within 24 Hours"}
              </button>
              <p className="text-xs text-gray-400 font-body text-center leading-relaxed">By submitting this form, you agree to be contacted by Will Shao at RE/MAX Executive Realty by phone, text, or email regarding your real estate inquiry. Your information is private and will never be shared with third parties.</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
