/*
 * Neighborhoods.tsx — BostonHomeGuide.com
 * Neighborhood Guides index + individual town pages
 */
import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { MapPin, School, TrendingUp, Train, Search, ArrowLeft, Star, Home, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { QuoteCard } from "@/components/PullQuote";
import { toast } from "sonner";
import { isValidEmail, submitToFub } from "@/lib/fub";
import { trackLead } from "@/lib/analytics";
import { allNeighborhoods, regions } from "@/data/neighborhoods";
import { useSEO } from "@/lib/seo";

const NEIGHBORHOOD_IMAGE = "/images/towns/somerville.jpeg";

// All neighborhoods imported from data file

// Individual neighborhood detail page
function NeighborhoodDetail({ slug }: { slug: string }) {
  const neighborhood = allNeighborhoods.find((n) => n.slug === slug);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useSEO({
    title: neighborhood
      ? `${neighborhood.name}, MA Homes for Sale | Will Shao`
      : "Neighborhood Guide | BostonHomeGuide.com",
    description: neighborhood
      ? `Explore homes for sale in ${neighborhood.name}, MA. ${neighborhood.description?.slice(0, 120) ?? "Local market data, school info, and expert guidance from Will Shao, REMAX Executive Realty."}`
      : "Find homes in Greater Boston and MetroWest neighborhoods.",
    canonical: neighborhood
      ? `https://bostonhomeguide.com/neighborhoods/${neighborhood.slug}`
      : "https://bostonhomeguide.com/neighborhoods",
  });

  useEffect(() => {
    const existing = document.querySelector(".rs-embedded-script");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.className = "rs-embedded-script";
    script.async = true;
    script.src = "https://em.realscout.com/assets/em/v3/all.js";
    document.head.appendChild(script);
  }, [slug]);

  useEffect(() => {
    if (!neighborhood) return;
    let el = document.getElementById("breadcrumb-schema") as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = "breadcrumb-schema";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bostonhomeguide.com/" },
        { "@type": "ListItem", "position": 2, "name": "Neighborhoods", "item": "https://bostonhomeguide.com/neighborhoods" },
        { "@type": "ListItem", "position": 3, "name": `${neighborhood.name}, MA`, "item": `https://bostonhomeguide.com/neighborhoods/${neighborhood.slug}` },
      ],
    });
    return () => { document.getElementById("breadcrumb-schema")?.remove(); };
  }, [neighborhood]);

  if (!neighborhood) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container pt-40 pb-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D2137]">
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      await submitToFub({
        source: `Website — Listing Alerts (${neighborhood.name})`,
        firstName: email.split("@")[0],
        email,
        interest: "listing-alerts",
        extraNote: `Wants new listings in ${neighborhood.name}`,
      });
      toast.success(`You're signed up. Will will be in touch about new listings in ${neighborhood.name}.`);
      trackLead("neighborhood-listing-alert");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again or call (781) 456-3541.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[45vh] flex items-center"
        style={{ backgroundImage: `url(${neighborhood.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/65" />
        <div className="relative z-10 container">
          <Link href="/neighborhoods" className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-body mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Neighborhoods
          </Link>
          <p className="text-sm font-semibold text-white/85 mb-2">{neighborhood.region}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
              { label: "Avg. Home Value", value: neighborhood.medianPrice, icon: Home },
              { label: "School Rating", value: neighborhood.schools, icon: School },
              { label: "Commute to Boston", value: neighborhood.commute, icon: Train },
              { label: "Walk Score", value: `${neighborhood.walkScore}/100`, icon: MapPin },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label}>
                  <Icon className="w-5 h-5 text-[#C89B3C] mx-auto mb-1.5" />
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-sm text-white/50 font-body mt-0.5">{s.label}</p>
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
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#0D2137] mb-4">
                  Why {neighborhood.name}?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {neighborhood.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#0D2137] shrink-0" />
                      <span className="text-base text-gray-600 font-body">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market data */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#0D2137] mb-4">
                  {neighborhood.name} Real Estate Market
                </h2>
                <div className="bg-[#F4F6F8] rounded-xl p-4 mb-4 inline-block">
                  <p className="text-2xl font-bold text-[#0D2137]">{neighborhood.medianPrice}</p>
                  <p className="text-sm text-gray-500 font-body mt-0.5">Average Home Value</p>
                </div>
                <p className="text-sm text-gray-500 font-body">
                  For current pricing trends, inventory, and days on market,{" "}
                  <a href="/market" className="text-[#0D2137] font-semibold hover:underline">
                    see the Monthly Market Report
                  </a>.
                </p>
              </div>

              {/* Search homes in this town */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-[#0D2137] mb-2">
                  Homes for Sale in {neighborhood.name}
                </h2>
                <p className="text-sm text-gray-500 font-body mb-4">
                  Browse current MLS listings in {neighborhood.name} and save the homes you like.
                </p>
                {neighborhood.geoId ? (
                  <a
                    href={`https://willshao.realscout.com/homesearch/map?geo_type=township&geo_id=${neighborhood.geoId}&for_sale=1&for_rent=0`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-navy text-sm inline-block"
                  >
                    Search {neighborhood.name} Homes →
                  </a>
                ) : (
                  <Link href="/search" className="btn-navy text-sm inline-block">
                    Search {neighborhood.name} Homes →
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Lead capture */}
              <div className="bg-[#0D2137] rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">
                  Get New Listings in {neighborhood.name}
                </h3>
                <p className="text-white/60 text-base font-body mb-4">
                  Be the first to know when homes hit the market in {neighborhood.name}.
                </p>
                <form onSubmit={handleSignup} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Email address"
                    autoComplete="email"
                    required
                    className="w-full bg-[#1A3A5C] border border-white/20 rounded-xl px-4 py-3 text-base font-body text-white placeholder-white/40 focus:outline-none focus:border-white/60"
                  />
                  <button type="submit" disabled={submitting} className="btn-light w-full text-sm text-center disabled:opacity-60">
                    {submitting ? "Signing up..." : "Get Listing Alerts"}
                  </button>
                </form>
              </div>

              {/* Talk to Will */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-[#0D2137] font-bold text-lg mb-3">
                  Ask Will About {neighborhood.name}
                </h3>
                <p className="text-gray-500 text-base font-body mb-4">
                  Will has helped many clients navigate the market in {neighborhood.name}. Every town has its own unique flavor — let Will help you find the right fit.
                </p>
                <div className="space-y-2">
                  <Link href="/contact" className="btn-navy w-full text-sm text-center block">
                    Send a Message
                  </Link>
                  <a href="tel:+17814563541" className="btn-outline-gold w-full text-sm text-center block">
                    Call (781) 456-3541
                  </a>
                </div>
              </div>

              <QuoteCard quote="baker" />

              {/* Town resources */}
              {neighborhood.resources && neighborhood.resources.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-[#0D2137] font-bold text-base mb-3">
                    {neighborhood.name} Resources
                  </h3>
                  <div className="space-y-2.5">
                    {neighborhood.resources.map((r) => (
                      <a
                        key={r.label}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between group"
                      >
                        <span className="text-sm text-[#0D2137] group-hover:text-[#1A3A5C] transition-colors font-body font-medium">
                          {r.label}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1A3A5C] transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby towns */}
              <div className="bg-[#F4F6F8] rounded-2xl p-6 border border-gray-100">
                <h3 className="text-[#0D2137] font-bold text-base mb-3">
                  Explore Nearby Towns
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(neighborhood.nearby ?? [])
                    .map((nearSlug) => allNeighborhoods.find((n) => n.slug === nearSlug))
                    .filter((n): n is typeof allNeighborhoods[0] => !!n)
                    .slice(0, 6)
                    .map((n) => (
                      <Link
                        key={n.slug}
                        href={`/neighborhoods/${n.slug}`}
                        className="text-xs text-[#0D2137] bg-white border border-gray-200 px-3 py-1.5 rounded-xl hover:border-[#0D2137] hover:text-[#1A3A5C] transition-colors font-body"
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

  useSEO({
    title: "Greater Boston & MetroWest Town Guides | Will Shao",
    description: "Explore homes and real estate in Newton, Wellesley, Brookline, Natick, Lexington, Concord, and 60+ Greater Boston and MetroWest towns. Local market data and expert guidance.",
    canonical: "https://bostonhomeguide.com/neighborhoods",
  });

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = allNeighborhoods.filter((n) => {
    const matchSearch = n.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "All" || n.region === region;
    return matchSearch && matchRegion;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[40vh] flex items-center"
        style={{ backgroundImage: `url(${NEIGHBORHOOD_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/65" />
        <div className="relative z-10 container text-center">
          <p className="text-sm font-semibold text-white/85 mb-3">Explore Greater Boston</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Neighborhood Guides
          </h1>
          <p className="text-white/80 font-body text-lg max-w-2xl mx-auto mb-8">
            Like ice cream flavors, every Greater Boston town has its own unique character. Explore hyper-local guides with school ratings, market data, commute times, and local flavor.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search a town..."
                className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white text-[#0D2137] font-body text-base focus:outline-none"
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
              className={`px-4 py-1.5 rounded-xl text-sm font-body font-medium transition-colors ${
                region === r
                  ? "bg-[#0D2137] text-white"
                  : "bg-[#F4F6F8] text-[#0D2137] hover:bg-gray-100"
              }`}
            >
              {r}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400 font-body">{filtered.length} communities</span>
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
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={n.img}
                    alt={n.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2137]/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs bg-[#0D2137] text-white font-bold px-2 py-0.5 rounded-xl font-body">
                      {n.region}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#0D2137] text-base mb-2 group-hover:text-[#1976A8] transition-colors">
                    {n.name}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-gray-500">Avg. Home Value</span>
                      <span className="font-semibold text-[#0D2137]">{n.medianPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-gray-500">Schools</span>
                      <span className="font-semibold text-green-600">{n.schools}</span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Not Sure Which Town is Right for You?
          </h2>
          <p className="text-white/70 font-body text-base mb-6 max-w-xl mx-auto">
            Every town has its own unique flavor — and Will knows them all. With nearly 20 years exploring Greater Boston's communities, he'll help you find the one that's just right for your family.
          </p>
          <Link href="/contact" className="btn-light text-sm">
            Ask About a Neighborhood
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
