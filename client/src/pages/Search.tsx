/*
 * Search.tsx — BostonHomeGuide.com
 * Home Search page with filters and Zillow/IDX redirect
 */
import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Home, DollarSign, Bed, Bath, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { toast } from "sonner";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-hero-YjFUt2Wy7gJDmMDPLVJAWm.webp";

const sampleListings = [
  { id: 1, price: 1285000, beds: 4, baths: 3, sqft: 2650, type: "Colonial", town: "Newton", address: "42 Maple Street", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", status: "For Sale", dom: 5 },
  { id: 2, price: 875000, beds: 3, baths: 2, sqft: 1890, type: "Cape Cod", town: "Natick", address: "18 Oak Avenue", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", status: "For Sale", dom: 3 },
  { id: 3, price: 1550000, beds: 5, baths: 4, sqft: 3200, type: "Contemporary", town: "Wellesley", address: "7 Linden Road", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", status: "For Sale", dom: 8 },
  { id: 4, price: 695000, beds: 3, baths: 2, sqft: 1650, type: "Ranch", town: "Framingham", address: "156 Central Street", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", status: "For Sale", dom: 12 },
  { id: 5, price: 1350000, beds: 4, baths: 3, sqft: 2850, type: "Victorian", town: "Lexington", address: "23 Battle Road", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", status: "For Sale", dom: 7 },
  { id: 6, price: 985000, beds: 4, baths: 2, sqft: 2100, type: "Colonial", town: "Wayland", address: "88 Cochituate Road", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", status: "For Sale", dom: 2 },
  { id: 7, price: 825000, beds: 3, baths: 2, sqft: 1750, type: "Garrison Colonial", town: "Waltham", address: "34 Newton Street", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80", status: "For Sale", dom: 15 },
  { id: 8, price: 1130000, beds: 4, baths: 3, sqft: 2400, type: "Colonial", town: "Needham", address: "67 Highland Avenue", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", status: "For Sale", dom: 4 },
  { id: 9, price: 1050000, beds: 3, baths: 2, sqft: 2050, type: "Craftsman", town: "Belmont", address: "12 Trapelo Road", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", status: "Pending", dom: 6 },
  { id: 10, price: 950000, beds: 4, baths: 2, sqft: 1980, type: "Cape Cod", town: "Arlington", address: "45 Mass Avenue", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", status: "For Sale", dom: 9 },
  { id: 11, price: 1200000, beds: 4, baths: 3, sqft: 2600, type: "Colonial", town: "Winchester", address: "29 Church Street", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", status: "For Sale", dom: 11 },
  { id: 12, price: 785000, beds: 3, baths: 2, sqft: 1800, type: "Ranch", town: "Hopkinton", address: "5 Marathon Drive", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", status: "For Sale", dom: 14 },
];

const towns = ["All Towns", "Newton", "Brookline", "Wellesley", "Natick", "Lexington", "Concord", "Needham", "Framingham", "Wayland", "Dedham", "Westwood", "Waltham", "Belmont", "Arlington", "Winchester", "Acton", "Sudbury", "Hopkinton"];
const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Under $500K", min: 0, max: 500000 },
  { label: "$500K–$750K", min: 500000, max: 750000 },
  { label: "$750K–$1M", min: 750000, max: 1000000 },
  { label: "$1M–$1.5M", min: 1000000, max: 1500000 },
  { label: "$1.5M+", min: 1500000, max: Infinity },
];
const bedOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
const homeTypes = ["All Types", "Colonial", "Cape Cod", "Ranch", "Victorian", "Contemporary", "Craftsman", "Condo", "Townhouse"];

export default function SearchPage() {
  const [town, setTown] = useState("All Towns");
  const [priceRange, setPriceRange] = useState(0);
  const [minBeds, setMinBeds] = useState("Any");
  const [homeType, setHomeType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [email, setEmail] = useState("");

  const filtered = sampleListings.filter((l) => {
    const range = priceRanges[priceRange];
    const matchTown = town === "All Towns" || l.town === town;
    const matchPrice = l.price >= range.min && l.price <= range.max;
    const matchBeds = minBeds === "Any" || l.beds >= parseInt(minBeds);
    const matchType = homeType === "All Types" || l.type === homeType;
    const matchSearch = searchQuery === "" || l.town.toLowerCase().includes(searchQuery.toLowerCase()) || l.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTown && matchPrice && matchBeds && matchType && matchSearch;
  });

  const handleAlertSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Listing alert created! You'll receive new matches by email.");
    setEmail("");
  };

  const handleViewListing = () => {
    toast.info("Full MLS listing details — contact Will for a private showing: (781) 456-3541");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      {/* Hero search bar */}
      <section
        className="relative pt-32 pb-16 min-h-[40vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/80" />
        <div className="relative z-10 container text-center">
          <p className="section-label mb-3">MLS Search</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Search Homes for Sale
          </h1>
          <p className="text-white/80 font-body text-lg mb-8 max-w-xl mx-auto">
            Browse current listings across 37+ Greater Boston and MetroWest communities.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-lg p-3 max-w-2xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by town, address, or ZIP..."
                className="w-full pl-9 pr-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded text-sm font-body font-medium transition-colors ${
                showFilters ? "bg-[#0D2137] text-white" : "bg-[#FAF8F4] text-[#0D2137] hover:bg-gray-100"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="bg-white rounded-lg p-5 max-w-2xl mx-auto mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Town</label>
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-xs font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                >
                  {towns.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-xs font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                >
                  {priceRanges.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Min Beds</label>
                <select
                  value={minBeds}
                  onChange={(e) => setMinBeds(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-xs font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                >
                  {bedOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Home Type</label>
                <select
                  value={homeType}
                  onChange={(e) => setHomeType(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-xs font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                >
                  {homeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-xl font-bold text-[#0D2137]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {filtered.length} Homes Found
              </h2>
              <p className="text-sm text-gray-500 font-body">
                Greater Boston & MetroWest · Updated March 2026
              </p>
            </div>
            <a
              href="https://www.zillow.com/boston-ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#C89B3C] font-semibold font-body hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Full MLS Search
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm card-hover cursor-pointer"
                onClick={handleViewListing}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={listing.img}
                    alt={listing.address}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded font-body ${
                      listing.status === "Pending"
                        ? "bg-orange-500 text-white"
                        : "bg-[#C89B3C] text-[#0D2137]"
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="text-xs bg-[#0D2137]/80 text-white px-2 py-0.5 rounded font-body">
                      {listing.dom}d ago
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p
                    className="text-lg font-bold text-[#0D2137] mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ${listing.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 font-body mb-1">{listing.address}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-body mb-3">
                    <MapPin className="w-3 h-3" />
                    {listing.town}, MA
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-body border-t border-gray-50 pt-3">
                    <span className="flex items-center gap-1">
                      <Bed className="w-3 h-3" />{listing.beds} bd
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3 h-3" />{listing.baths} ba
                    </span>
                    <span className="flex items-center gap-1">
                      <Home className="w-3 h-3" />{listing.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-body text-lg mb-2">No listings match your search</p>
              <p className="text-gray-400 font-body text-sm">Try adjusting your filters or contact Will for off-market opportunities.</p>
              <a href="tel:+17814563541" className="mt-6 btn-gold text-sm inline-block">
                Call Will: (781) 456-3541
              </a>
            </div>
          )}

          {/* Full MLS CTA */}
          <div className="mt-10 bg-[#0D2137] rounded-lg p-8 text-center">
            <h3
              className="text-white font-bold text-xl mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              See All Greater Boston Listings
            </h3>
            <p className="text-white/70 font-body text-sm mb-5 max-w-lg mx-auto">
              This page shows a sample of current listings. For the complete MLS database with
              all active listings, use Will's full search portal.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://www.zillow.com/boston-ma/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm"
              >
                Search Full MLS →
              </a>
              <a
                href="https://calendar.app.google/rp3dJPWTjzaV9W1W7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm"
              >
                Book a Home Tour
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Listing alert signup */}
      <section className="py-16 bg-[#C89B3C]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2
                className="text-2xl font-bold text-[#0D2137] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Get Instant Listing Alerts
              </h2>
              <p className="text-[#0D2137]/70 font-body text-sm">
                Be the first to know when new homes hit the market in your target area.
              </p>
            </div>
            <form onSubmit={handleAlertSignup} className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 md:w-72 bg-white border border-[#0D2137]/20 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#0D2137]"
              />
              <button type="submit" className="bg-[#0D2137] text-white px-5 py-2.5 rounded text-sm font-body font-semibold hover:bg-[#1A3A5C] transition-colors whitespace-nowrap">
                Set Alert
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
