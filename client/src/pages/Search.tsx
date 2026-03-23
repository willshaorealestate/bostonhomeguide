/*
 * Search.tsx — BostonHomeGuide.com
 * Live MLS search powered by RealScout
 */
import React, { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const HERO_IMAGE = "/images/boston.jpeg";

// TypeScript declaration for RealScout web components
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "realscout-office-listings": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-encoded-id": string;
        "sort-order": string;
        "listing-status": string;
        "property-types": string;
      };
    }
  }
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

export default function SearchPage() {
  useRealScoutSearch();

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[45vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/80" />
        <div className="relative z-10 container text-center">
          <p className="section-label mb-3">Live MLS Search</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Search Homes for Sale
          </h1>
          <p className="text-white/80 font-body text-lg mb-8 max-w-xl mx-auto">
            Browse current listings across Greater Boston's unique towns and neighborhoods.
          </p>

          {/* RealScout Search Widget */}
          <div className="relative z-50 max-w-2xl mx-auto">
            <div
              className="realscout-search simple"
              data-rep="willshao"
              data-button-color="#C89B3C"
              data-button-font="#0D2137"
              data-background-color="rgba(255,255,255,0.95)"
            />
          </div>
        </div>
      </section>

      {/* RealScout Office Listings */}
      <section className="py-12">
        <div className="container">
          <h2
            className="text-2xl font-bold text-[#0D2137] mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Greater Boston Listings
          </h2>
          <p className="text-sm text-gray-500 font-body mb-8">
            Live MLS data · Click any listing to view full details on RealScout
          </p>
          <style>{`
            realscout-office-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
            }
          `}</style>
          <realscout-office-listings
            agent-encoded-id="QWdlbnQtMTUzMjg1"
            sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
            listing-status="For Sale,For Rent,In Contract,Sold,Rented"
            property-types="SFR,MF,TC,LAL,MOBILE,OTHER"
          />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-[#0D2137]">
        <div className="container text-center">
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Need Help Finding the Right Home?
          </h2>
          <p className="text-white/70 font-body text-sm mb-6 max-w-lg mx-auto">
            Will knows every town across Greater Boston. Get personalized guidance and access to off-market opportunities.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://calendar.app.google/sGPHDTZGiH9zdE8x5"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm"
            >
              Book a Consultation →
            </a>
            <a href="tel:+17814563541" className="btn-outline-gold text-sm">
              Call (781) 456-3541
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
