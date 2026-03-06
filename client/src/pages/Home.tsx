/*
 * Home.tsx — BostonHomeGuide.com
 * Refined Coastal Luxury: Full-bleed hero, social proof, neighborhoods, listings, CTAs, testimonials
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Search, Star, Home, TrendingUp, MapPin, ChevronRight,
  ArrowRight, Play, Users, Award, Clock, CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SocialProofTicker from "@/components/SocialProofTicker";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingCTA from "@/components/FloatingCTA";
import BuyingProcessGuide from "@/components/BuyingProcessGuide";
import { toast } from "sonner";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-hero-QUAvLWQJDdVc4F5dNh4SWw.webp";
const NEIGHBORHOOD_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-neighborhood-DGmdQCZgdpvwWuXmyhsZGU.webp";
const CONSULT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/will-shao-bg-NysPAKtyBRYzwefUMrznta.webp";
const METROWEST_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/metrowest-homes-RnrYQRpo87TWQGTtebwN6S.webp";

const neighborhoods = [
  { name: "Newton", type: "City", medianPrice: "$1.28M", schools: "A+", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80" },
  { name: "Wellesley", type: "Town", medianPrice: "$1.55M", schools: "A+", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80" },
  { name: "Brookline", type: "Town", medianPrice: "$1.12M", schools: "A", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80" },
  { name: "Natick", type: "Town", medianPrice: "$875K", schools: "A", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" },
  { name: "Lexington", type: "Town", medianPrice: "$1.35M", schools: "A+", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" },
  { name: "Concord", type: "Town", medianPrice: "$1.42M", schools: "A+", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
  { name: "Needham", type: "Town", medianPrice: "$1.13M", schools: "A", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80" },
  { name: "Framingham", type: "City", medianPrice: "$695K", schools: "B+", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
];

const featuredListings = [
  { id: 1, address: "42 Maple Street", city: "Newton, MA", price: "$1,285,000", beds: 4, baths: 3, sqft: "2,840", type: "Colonial", status: "For Sale", img: METROWEST_IMAGE },
  { id: 2, address: "18 Oak Lane", city: "Natick, MA", price: "$875,000", beds: 3, baths: 2, sqft: "1,950", type: "Cape Cod", status: "For Sale", img: NEIGHBORHOOD_IMAGE },
  { id: 3, address: "7 Elm Court", city: "Wellesley, MA", price: "$1,650,000", beds: 5, baths: 4, sqft: "3,600", type: "Colonial", status: "For Sale", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
];

const testimonials = [
  {
    name: "Sarah & Michael T.",
    location: "Newton, MA",
    rating: 5,
    text: "Will made our home search seamless. His deep knowledge of Newton's neighborhoods and school districts was invaluable. We found our dream home in just 6 weeks!",
    source: "Zillow",
  },
  {
    name: "Jennifer L.",
    location: "Natick, MA",
    rating: 5,
    text: "As a first-time buyer, I was nervous about the process. Will walked me through every step with patience and expertise. I couldn't have done it without him.",
    source: "Google",
  },
  {
    name: "David & Amy C.",
    location: "Wellesley, MA",
    rating: 5,
    text: "Will sold our home in 8 days at 12% over asking. His marketing strategy and negotiation skills are exceptional. Highly recommend!",
    source: "Zillow",
  },
];

const stats = [
  { value: "18", label: "Years Experience", icon: Clock },
  { value: "212+", label: "Homes Sold", icon: Home },
  { value: "5.0★", label: "Zillow Rating", icon: Star },
  { value: "37+", label: "Communities", icon: MapPin },
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

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const { ref: statsRef, visible: statsVisible } = useIntersection();
  const { ref: neighborhoodsRef, visible: neighborhoodsVisible } = useIntersection();
  const { ref: listingsRef, visible: listingsVisible } = useIntersection();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    toast.success("You're subscribed to the Boston Market Report!");
    setEmailInput("");
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
              Expert guidance from Will Shao — 18 years, 212+ homes sold, serving 37+ communities
              across Greater Boston and MetroWest MA.
            </p>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8 animate-fade-up delay-300"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by city, neighborhood, or ZIP code..."
                  className="w-full pl-12 pr-4 py-4 rounded text-[#0D2137] font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C] shadow-lg"
                />
              </div>
              <button
                type="submit"
                className="btn-gold px-8 py-4 text-sm whitespace-nowrap shadow-lg"
              >
                Search Homes
              </button>
            </form>

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
                  <span className="text-xs text-white/50 font-body uppercase tracking-wider">
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
              <p className="text-sm text-gray-500 font-body mt-1">Updated March 2026</p>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {[
                { label: "Median Sale Price", value: "$875,000", change: "+6.2%", up: true },
                { label: "Days on Market", value: "18 days", change: "-4 days", up: true },
                { label: "List-to-Sale Ratio", value: "103.4%", change: "+1.2%", up: true },
                { label: "Active Inventory", value: "1,240", change: "-8%", up: false },
              ].map((metric) => (
                <div key={metric.label} className="text-center">
                  <p
                    className="text-2xl font-bold text-[#0D2137]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500 font-body">{metric.label}</p>
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
                className="text-3xl md:text-4xl font-bold text-[#0D2137]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Find Your Perfect Neighborhood
              </h2>
              <p className="text-gray-500 font-body mt-3 max-w-xl">
                From vibrant city neighborhoods to peaceful MetroWest suburbs — explore 37+
                communities with hyper-local guides, school ratings, and live listings.
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
                    <span className="text-white/70 text-xs font-body">{n.medianPrice} median</span>
                    <span className="text-[#C89B3C] text-xs font-semibold font-body">
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
                className="text-3xl md:text-4xl font-bold text-[#0D2137]"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredListings.map((listing, i) => (
              <div
                key={listing.id}
                className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 card-hover ${
                  listingsVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={listing.img}
                    alt={listing.address}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#C89B3C] text-[#0D2137] text-xs font-bold px-2.5 py-1 rounded font-body">
                      {listing.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#0D2137]/80 text-white text-xs px-2.5 py-1 rounded font-body">
                      {listing.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p
                    className="text-xl font-bold text-[#0D2137] mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {listing.price}
                  </p>
                  <p className="text-sm text-gray-600 font-body mb-3">
                    {listing.address}, {listing.city}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-body border-t border-gray-100 pt-3">
                    <span>{listing.beds} bd</span>
                    <span>·</span>
                    <span>{listing.baths} ba</span>
                    <span>·</span>
                    <span>{listing.sqft} sqft</span>
                  </div>
                  <Link
                    href="/search"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 border border-[#0D2137] text-[#0D2137] text-sm font-semibold font-body rounded hover:bg-[#0D2137] hover:text-white transition-colors"
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
                <p className="text-white/70 font-body text-sm mb-6 leading-relaxed">
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
                <p className="text-white/70 font-body text-sm mb-6 leading-relaxed">
                  Get a free, no-obligation home valuation based on real-time market data
                  and Will's 18 years of local expertise.
                </p>
                <Link href="/sell" className="btn-gold text-sm">
                  Get My Home's Value →
                </Link>
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
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={CONSULT_IMAGE}
                  alt="Will Shao — Real Estate Expert"
                  className="w-full h-full object-cover"
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
                className="text-3xl md:text-4xl font-bold text-[#0D2137] mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Will Shao — Your Greater Boston Expert
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                With 18 years of experience and 212+ successful transactions, Will Shao has
                built a reputation as the trusted guide for buyers and sellers across Greater
                Boston and MetroWest Massachusetts.
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Fluent in both English and Mandarin, Will serves the diverse communities of
                Greater Boston — from first-time buyers to luxury home sellers. His approach
                is educational first: he believes an informed client makes the best decisions.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "REMAX Executive Realty",
                  "English & Mandarin",
                  "37+ Communities",
                  "5.0★ Zillow · 48 Reviews",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C89B3C] shrink-0" />
                    <span className="text-sm text-gray-600 font-body">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="btn-navy text-sm">
                  Learn More About Will
                </Link>
                <a
                  href="https://calendar.app.google/rp3dJPWTjzaV9W1W7"
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
              className="text-3xl md:text-4xl font-bold text-[#0D2137]"
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
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Clients Say About Will
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-[#C89B3C] text-[#C89B3C]" />
              ))}
              <span className="text-white/70 font-body text-sm ml-1">
                5.0 · 48 Reviews on Zillow
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
                <p className="text-white/80 font-body text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C89B3C]/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#C89B3C]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold font-body">{t.name}</p>
                    <p className="text-white/50 text-xs font-body">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://zillow.com/profile/willshao"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-sm"
            >
              Read All 48 Reviews on Zillow →
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
                className="text-3xl md:text-4xl font-bold text-[#0D2137]"
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
                  <p className="text-sm text-gray-500 font-body leading-relaxed">
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

      {/* ── EMAIL CAPTURE ── */}
      <section className="py-16 bg-[#FAF8F4] border-t border-gray-100">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Award className="w-10 h-10 text-[#C89B3C] mx-auto mb-4" />
            <h2
              className="text-2xl md:text-3xl font-bold text-[#0D2137] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get the Monthly Boston Market Report
            </h2>
            <p className="text-gray-500 font-body text-sm mb-6">
              Data-driven insights on prices, inventory, and trends across 37+ Greater Boston
              communities — delivered to your inbox every month.
            </p>
            <form
              onSubmit={handleEmailSignup}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 border border-gray-200 rounded px-4 py-3 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
              />
              <button type="submit" className="btn-gold text-sm whitespace-nowrap">
                Subscribe Free
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-3 font-body">
              No spam. Unsubscribe anytime. Your privacy is protected.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
