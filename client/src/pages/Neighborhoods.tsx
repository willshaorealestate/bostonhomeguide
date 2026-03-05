/*
 * Neighborhoods.tsx — BostonHomeGuide.com
 * Neighborhood Guides index + individual town pages
 */
import { useState } from "react";
import { Link, useParams } from "wouter";
import { MapPin, School, TrendingUp, Train, Search, ArrowLeft, Star, Home } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { toast } from "sonner";

const NEIGHBORHOOD_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-neighborhood-DGmdQCZgdpvwWuXmyhsZGU.webp";

const allNeighborhoods = [
  { slug: "newton", name: "Newton", region: "Inner Suburbs", medianPrice: "$1,285,000", schools: "A+", commute: "25 min", walkScore: 72, description: "One of Boston's most prestigious suburbs, Newton offers top-rated schools, diverse neighborhoods, and easy access to Boston via the Green Line.", highlights: ["Top-rated Newton Public Schools", "Green Line T access", "Village centers: Newton Centre, Chestnut Hill", "Strong appreciation history"], img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80" },
  { slug: "brookline", name: "Brookline", region: "Inner Suburbs", medianPrice: "$1,120,000", schools: "A", commute: "20 min", walkScore: 85, description: "A walkable, vibrant town surrounded by Boston, Brookline offers excellent schools, diverse dining, and Green Line access throughout.", highlights: ["Coolidge Corner village", "Green Line throughout", "Excellent public schools", "Vibrant restaurant scene"], img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80" },
  { slug: "wellesley", name: "Wellesley", region: "MetroWest", medianPrice: "$1,550,000", schools: "A+", commute: "30 min", walkScore: 55, description: "Home to Wellesley College and consistently ranked among Massachusetts' top towns for schools, safety, and quality of life.", highlights: ["#1 ranked school district", "Wellesley College campus", "Upscale shopping on Linden Street", "Commuter rail to South Station"], img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80" },
  { slug: "natick", name: "Natick", region: "MetroWest", medianPrice: "$875,000", schools: "A", commute: "35 min", walkScore: 48, description: "A thriving MetroWest community with excellent schools, the Natick Collection mall, and strong community spirit.", highlights: ["Excellent value for MetroWest", "Natick Collection mall", "Lake Cochituate recreation", "Commuter rail access"], img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80" },
  { slug: "lexington", name: "Lexington", region: "Inner Suburbs", medianPrice: "$1,350,000", schools: "A+", commute: "30 min", walkScore: 52, description: "Historic Lexington combines Revolutionary War heritage with exceptional schools and a strong sense of community.", highlights: ["Battle Road historic sites", "Top-ranked schools", "Strong tech community", "Vibrant town center"], img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { slug: "concord", name: "Concord", region: "MetroWest", medianPrice: "$1,420,000", schools: "A+", commute: "40 min", walkScore: 45, description: "Steeped in literary and Revolutionary history, Concord offers a charming town center, excellent schools, and natural beauty.", highlights: ["Walden Pond State Reservation", "Historic town center", "Excellent schools", "Commuter rail to North Station"], img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { slug: "needham", name: "Needham", region: "Inner Suburbs", medianPrice: "$1,130,000", schools: "A", commute: "25 min", walkScore: 50, description: "A family-friendly suburb with excellent schools, strong community programs, and convenient highway access.", highlights: ["Excellent public schools", "Strong community programs", "Route 128 access", "Commuter rail"], img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80" },
  { slug: "framingham", name: "Framingham", region: "MetroWest", medianPrice: "$695,000", schools: "B+", commute: "40 min", walkScore: 52, description: "MetroWest's largest city offers excellent value, diverse communities, and strong amenities including Framingham State University.", highlights: ["Best value in MetroWest", "Diverse community", "Commuter rail to South Station", "Major employers nearby"], img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { slug: "wayland", name: "Wayland", region: "MetroWest", medianPrice: "$985,000", schools: "A", commute: "40 min", walkScore: 30, description: "A quiet, upscale suburb known for excellent schools, beautiful natural landscapes, and a strong sense of community.", highlights: ["Excellent schools", "Beautiful natural setting", "Low density living", "Strong community"], img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80" },
  { slug: "dedham", name: "Dedham", region: "Inner Suburbs", medianPrice: "$765,000", schools: "B+", commute: "25 min", walkScore: 55, description: "An affordable inner suburb with good schools, easy highway access, and a charming historic town center.", highlights: ["Affordable inner suburb", "Legacy Place shopping", "Easy highway access", "Historic courthouse square"], img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80" },
  { slug: "westwood", name: "Westwood", region: "Inner Suburbs", medianPrice: "$1,100,000", schools: "A", commute: "30 min", walkScore: 35, description: "A prestigious suburb known for its excellent schools, low crime rate, and beautiful residential neighborhoods.", highlights: ["Top-ranked schools", "Low crime rate", "University Station development", "Commuter rail"], img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { slug: "waltham", name: "Waltham", region: "Inner Suburbs", medianPrice: "$825,000", schools: "B+", commute: "20 min", walkScore: 65, description: "A vibrant city with a growing restaurant scene, Brandeis University, and excellent value for Greater Boston.", highlights: ["Vibrant restaurant scene", "Brandeis University", "Route 128 tech corridor", "Commuter rail"], img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80" },
  { slug: "belmont", name: "Belmont", region: "Inner Suburbs", medianPrice: "$1,050,000", schools: "A", commute: "20 min", walkScore: 70, description: "A charming residential town between Cambridge and Lexington, known for excellent schools and easy Boston access.", highlights: ["Excellent schools", "Easy Boston access", "Charming town center", "Strong community"], img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80" },
  { slug: "arlington", name: "Arlington", region: "Inner Suburbs", medianPrice: "$950,000", schools: "A-", commute: "20 min", walkScore: 78, description: "A walkable, progressive community with excellent schools, diverse dining, and easy access to Cambridge and Boston.", highlights: ["Highly walkable", "Excellent schools", "Vibrant Mass Ave corridor", "Easy Cambridge access"], img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { slug: "winchester", name: "Winchester", region: "Inner Suburbs", medianPrice: "$1,200,000", schools: "A+", commute: "25 min", walkScore: 58, description: "An elegant suburb with a beautiful town center, excellent schools, and a strong sense of community pride.", highlights: ["Beautiful town center", "Top-ranked schools", "Commuter rail to North Station", "Mystic Lakes"], img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80" },
  { slug: "acton", name: "Acton", region: "MetroWest", medianPrice: "$895,000", schools: "A+", commute: "45 min", walkScore: 28, description: "A family-friendly suburb with exceptional schools, including the top-ranked Acton-Boxborough Regional School District.", highlights: ["Top-ranked school district", "Family-friendly community", "Commuter rail", "Natural recreation"], img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { slug: "sudbury", name: "Sudbury", region: "MetroWest", medianPrice: "$1,050,000", schools: "A+", commute: "45 min", walkScore: 22, description: "A beautiful rural suburb with excellent schools, large lots, and a strong community identity.", highlights: ["Lincoln-Sudbury school district", "Large lot sizes", "Rural character", "Strong community"], img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80" },
  { slug: "hopkinton", name: "Hopkinton", region: "MetroWest", medianPrice: "$785,000", schools: "A", commute: "50 min", walkScore: 25, description: "Famous as the start of the Boston Marathon, Hopkinton offers excellent schools, newer construction, and great value.", highlights: ["Boston Marathon start line", "Excellent schools", "Newer construction", "Great value"], img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80" },
];

const regions = ["All", "Inner Suburbs", "MetroWest"];

// Individual neighborhood detail page
function NeighborhoodDetail({ slug }: { slug: string }) {
  const neighborhood = allNeighborhoods.find((n) => n.slug === slug);
  const [email, setEmail] = useState("");

  if (!neighborhood) {
    return (
      <div className="min-h-screen bg-[#FAF8F4]">
        <Navigation />
        <div className="container pt-40 pb-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Neighborhood Not Found
          </h1>
          <Link href="/neighborhoods" className="mt-6 btn-gold inline-block">
            View All Neighborhoods
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`You'll receive new listings in ${neighborhood.name} directly to your inbox!`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[45vh] flex items-center"
        style={{ backgroundImage: `url(${neighborhood.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/75" />
        <div className="relative z-10 container">
          <Link href="/neighborhoods" className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-body mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Neighborhoods
          </Link>
          <p className="section-label mb-2">{neighborhood.region}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {neighborhood.name}, MA
          </h1>
          <p className="text-white/80 font-body text-lg max-w-xl">{neighborhood.description}</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0D2137] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Median Home Price", value: neighborhood.medianPrice, icon: Home },
              { label: "School Rating", value: neighborhood.schools, icon: School },
              { label: "Commute to Boston", value: neighborhood.commute, icon: Train },
              { label: "Walk Score", value: `${neighborhood.walkScore}/100`, icon: MapPin },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label}>
                  <Icon className="w-5 h-5 text-[#C89B3C] mx-auto mb-1.5" />
                  <p className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                  <p className="text-xs text-white/50 font-body mt-0.5">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {/* Highlights */}
              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#0D2137] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Why {neighborhood.name}?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {neighborhood.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#C89B3C] shrink-0" />
                      <span className="text-sm text-gray-600 font-body">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market data */}
              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#0D2137] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {neighborhood.name} Real Estate Market
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: "Median Sale Price", value: neighborhood.medianPrice },
                    { label: "Avg. Days on Market", value: "14 days" },
                    { label: "List-to-Sale Ratio", value: "104.2%" },
                    { label: "Active Listings", value: "23" },
                    { label: "Price Per Sq Ft", value: "$425" },
                    { label: "YoY Appreciation", value: "+7.3%" },
                  ].map((m) => (
                    <div key={m.label} className="bg-[#FAF8F4] rounded p-3">
                      <p className="text-lg font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>{m.value}</p>
                      <p className="text-xs text-gray-500 font-body mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current listings placeholder */}
              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Homes for Sale in {neighborhood.name}
                  </h2>
                  <Link href="/search" className="text-[#C89B3C] text-sm font-semibold font-body hover:underline">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { price: neighborhood.medianPrice, beds: 4, baths: 3, sqft: "2,400", type: "Colonial" },
                    { price: "$" + (parseInt(neighborhood.medianPrice.replace(/[$,]/g, "")) * 0.85).toLocaleString(), beds: 3, baths: 2, sqft: "1,850", type: "Cape Cod" },
                  ].map((listing, i) => (
                    <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-100 relative overflow-hidden">
                        <img src={neighborhood.img} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2">
                          <span className="bg-[#C89B3C] text-[#0D2137] text-xs font-bold px-2 py-0.5 rounded font-body">For Sale</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-[#0D2137] text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{listing.price}</p>
                        <p className="text-xs text-gray-500 font-body">{listing.beds}bd · {listing.baths}ba · {listing.sqft} sqft · {listing.type}</p>
                        <Link href="/search" className="mt-2 text-xs text-[#C89B3C] font-semibold font-body hover:underline">View Details →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Lead capture */}
              <div className="bg-[#0D2137] rounded-lg p-6">
                <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Get New Listings in {neighborhood.name}
                </h3>
                <p className="text-white/60 text-sm font-body mb-4">
                  Be the first to know when homes hit the market in {neighborhood.name}.
                </p>
                <form onSubmit={handleSignup} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-[#1A3A5C] border border-white/20 rounded px-4 py-2.5 text-sm font-body text-white placeholder-white/40 focus:outline-none focus:border-[#C89B3C]"
                  />
                  <button type="submit" className="btn-gold w-full text-sm text-center">
                    Get Listing Alerts
                  </button>
                </form>
              </div>

              {/* Talk to Will */}
              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <h3 className="text-[#0D2137] font-bold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Ask Will About {neighborhood.name}
                </h3>
                <p className="text-gray-500 text-sm font-body mb-4">
                  Will has sold dozens of homes in {neighborhood.name} and knows every street.
                </p>
                <div className="space-y-2">
                  <a href="tel:+17814563541" className="btn-navy w-full text-sm text-center block">
                    Call (781) 456-3541
                  </a>
                  <a href="https://calendar.app.google/rp3dJPWTjzaV9W1W7" target="_blank" rel="noopener noreferrer" className="btn-outline-gold w-full text-sm text-center block">
                    Book a Consultation
                  </a>
                </div>
              </div>

              {/* Nearby towns */}
              <div className="bg-[#FAF8F4] rounded-lg p-6 border border-gray-100">
                <h3 className="text-[#0D2137] font-bold text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Explore Nearby Towns
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allNeighborhoods
                    .filter((n) => n.slug !== slug && n.region === neighborhood.region)
                    .slice(0, 6)
                    .map((n) => (
                      <Link
                        key={n.slug}
                        href={`/neighborhoods/${n.slug}`}
                        className="text-xs text-[#0D2137] bg-white border border-gray-200 px-3 py-1.5 rounded hover:border-[#C89B3C] hover:text-[#C89B3C] transition-colors font-body"
                      >
                        {n.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Neighborhoods index page
export default function NeighborhoodsPage() {
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug;

  if (slug) {
    return <NeighborhoodDetail slug={slug} />;
  }

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = allNeighborhoods.filter((n) => {
    const matchSearch = n.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "All" || n.region === region;
    return matchSearch && matchRegion;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[40vh] flex items-center"
        style={{ backgroundImage: `url(${NEIGHBORHOOD_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/80" />
        <div className="relative z-10 container text-center">
          <p className="section-label mb-3">Explore Greater Boston</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Neighborhood Guides
          </h1>
          <p className="text-white/80 font-body text-lg max-w-2xl mx-auto mb-8">
            Hyper-local guides for 37+ Greater Boston and MetroWest communities — with school
            ratings, market data, commute times, and current listings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a town..."
                className="w-full pl-10 pr-4 py-3 rounded text-[#0D2137] font-body text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-30">
        <div className="container py-3 flex items-center gap-3">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-4 py-1.5 rounded text-sm font-body font-medium transition-colors ${
                region === r
                  ? "bg-[#0D2137] text-white"
                  : "bg-[#FAF8F4] text-[#0D2137] hover:bg-gray-100"
              }`}
            >
              {r}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 font-body">{filtered.length} communities</span>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((n) => (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={n.img}
                    alt={n.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2137]/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs bg-[#C89B3C] text-[#0D2137] font-bold px-2 py-0.5 rounded font-body">
                      {n.region}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#0D2137] text-base mb-2 group-hover:text-[#1976A8] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {n.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-body">
                      <span className="text-gray-500">Median Price</span>
                      <span className="font-semibold text-[#0D2137]">{n.medianPrice}</span>
                    </div>
                    <div className="flex justify-between text-xs font-body">
                      <span className="text-gray-500">Schools</span>
                      <span className="font-semibold text-green-600">{n.schools}</span>
                    </div>
                    <div className="flex justify-between text-xs font-body">
                      <span className="text-gray-500">Commute</span>
                      <span className="font-semibold text-[#0D2137]">{n.commute}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-body">No communities match your search. Try a different name.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0D2137]">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Not Sure Which Town is Right for You?
          </h2>
          <p className="text-white/70 font-body text-sm mb-6 max-w-xl mx-auto">
            Will has lived and worked in Greater Boston for 18 years. Let him help you find
            the perfect community for your lifestyle, budget, and family.
          </p>
          <a href="https://calendar.app.google/rp3dJPWTjzaV9W1W7" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
            Book a Free Neighborhood Consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
