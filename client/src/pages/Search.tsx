/*
 * Search.tsx — BostonHomeGuide.com
 * Live MLS search powered by RealScout
 */
import React from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useSEO } from "@/lib/seo";

const HERO_IMAGE = "/images/towns/boston.jpeg";

// TypeScript declaration for RealScout web components
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "realscout-advanced-search": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-encoded-id": string;
      };
    }
  }
}

export default function SearchPage() {
  useSEO({
    title: "Search Greater Boston Homes for Sale",
    description:
      "Search current MLS listings across Greater Boston and MetroWest, Massachusetts. Save homes and get new-listing alerts with Will Shao, REMAX Executive Realty.",
    canonical: "https://bostonhomeguide.com/search",
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[45vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/65" />
        <div className="relative z-10 container text-center">
          <p className="text-sm font-semibold text-white/85 mb-3">Live MLS Search</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            Search Homes for Sale
          </h1>
          <p className="text-white/80 font-body text-lg mb-8 max-w-xl mx-auto">
            Browse current listings across Greater Boston's unique towns and neighborhoods.
          </p>

          {/* RealScout advanced search (web component loaded in index.html) */}
          <div className="relative z-50 max-w-3xl mx-auto bg-white/95 rounded-2xl p-4 text-left">
            <realscout-advanced-search agent-encoded-id="QWdlbnQtMTUzMjg1" />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#0D2137]">
        <div className="container text-center">
          <h2
            className="text-2xl font-bold text-white mb-3"
          >
            Need Help Finding the Right Home?
          </h2>
          <p className="text-white/70 font-body text-sm mb-6 max-w-lg mx-auto">
            Will knows every town across Greater Boston. Get personalized guidance and access to off-market opportunities.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-light text-sm">
              Send a Message →
            </Link>
            <a href="tel:+17814563541" className="btn-outline-light text-sm">
              Call (781) 456-3541
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
