/*
 * Seller.tsx — BostonHomeGuide.com
 * Comprehensive Seller's Guide with process steps, valuation tool, and lead capture
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  TrendingUp, Camera, DollarSign, Users, FileText,
  Key, CheckCircle, ChevronDown, ChevronUp, Calendar, Home
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import PhotoComparisonCarousel from "@/components/PhotoComparisonCarousel";
import { toast } from "sonner";
import { submitToFub, getFelloUrl, isValidEmail, isValidPhone } from "@/lib/fub";
import { useSEO } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/metrowest-homes-RnrYQRpo87TWQGTtebwN6S.webp";

const sellingSteps = [
  {
    step: "01",
    title: "Discuss Your Goals & Plans",
    icon: FileText,
    description: "Before anything else, Will and his team take the time to understand what you need — your timeline, where you're headed next, and what a smooth transition looks like for you. Every plan starts with your goals.",
  },
  {
    step: "02",
    title: "Free Home Valuation",
    icon: DollarSign,
    description: "We provide a comprehensive Comparative Market Analysis (CMA) using real-time MLSPIN data to determine your home's optimal listing price and position it competitively in the current market.",
  },
  {
    step: "03",
    title: "Prepare Your Home",
    icon: Home,
    description: "Our pre-listing checklist covers staging, repairs, and targeted improvements that maximize your sale price. We'll connect you with trusted contractors and stagers to get your home ready to impress.",
  },
  {
    step: "04",
    title: "Professional Marketing",
    icon: Camera,
    description: "Professional photography, targeted digital advertising, MLS listing, and syndication across Zillow, Realtor.com, Homes.com, and the REMAX global network — reaching buyers across 110 countries.",
  },
  {
    step: "05",
    title: "Coming Soon & Strategic Launch",
    icon: Calendar,
    description: "When timing allows, our team runs a Coming Soon campaign to build early buyer interest before the listing goes live. We carefully select your launch date, coordinate open houses, and — when conditions are right — set an offer deadline to generate a focused, competitive offer process.",
  },
  {
    step: "06",
    title: "Weekly Updates & Communication",
    icon: Users,
    description: "Our team sends you a weekly property report covering showings, buyer feedback, online views, and market activity. You're never left in the dark — clear, consistent communication is one of our biggest commitments to you.",
  },
  {
    step: "07",
    title: "Negotiate the Best Outcome",
    icon: TrendingUp,
    description: "The best offer isn't always the highest price — it's the one that best matches your goals. Our team reviews every offer with you across price, contingencies, closing date, and terms, then negotiates to get you the outcome that matters most.",
  },
  {
    step: "08",
    title: "Pre-Closing Coordination",
    icon: FileText,
    description: "As closing approaches, our team coordinates all the required items to get you to the finish line — inspections, final readings, and any documentation needed by the buyer's side. We also stay in close contact with the buyer's lender to monitor the mortgage commitment and keep the timeline on track.",
  },
  {
    step: "09",
    title: "Close & Celebrate!",
    icon: Key,
    description: "Your attorney handles the closing table — our team is there to ensure a smooth final walkthrough and hand over the keys. You've done it! Selling your home and moving on to the next chapter is a big deal, and it deserves to be celebrated.",
  },
];

const marketingItems = [
  "Professional photography & video tour",
  "MLS listing on MLSPIN",
  "Zillow, Realtor.com & Homes.com syndication",
  "REMAX global network — 110 countries",
  "Social media posts promoting your listing across Facebook & Instagram",
  "Email blast to Will's buyer database",
  "Weekly seller property report",
  "Open house coordination",
  "Coming Soon pre-marketing strategy",
  "Yard sign & lockbox installation",
];

export default function SellerPage() {
  useSEO({
    title: "Sell Your Greater Boston Home for Top Dollar | Will Shao, RE/MAX",
    description: "Will Shao's proven marketing strategy gets sellers maximum value — 103.4% list-to-sale ratio, avg 18 days on market, 212+ homes sold. Free home valuation. Greater Boston & MetroWest MA.",
    canonical: "https://bostonhomeguide.com/sell",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "When is the best time to sell in Greater Boston?", "acceptedAnswer": { "@type": "Answer", "text": "Spring (March–June) is traditionally the strongest selling season in Greater Boston, with high buyer demand and multiple offers common. However, the right time to sell is when you're ready." } },
        { "@type": "Question", "name": "How does Will determine my home's value?", "acceptedAnswer": { "@type": "Answer", "text": "Will uses a Comparative Market Analysis (CMA) that analyzes recent sales of similar homes in your neighborhood, current active listings, market trends, and your home's specific features." } },
        { "@type": "Question", "name": "How long will it take to sell my home?", "acceptedAnswer": { "@type": "Answer", "text": "In Greater Boston's current market, well-priced homes in high demand areas can sell in 7–21 days. Our strategic pricing and marketing approach is designed to attract qualified buyers as efficiently as possible." } },
        { "@type": "Question", "name": "What is your marketing strategy?", "acceptedAnswer": { "@type": "Answer", "text": "Professional photography, MLS listing, syndication across Zillow, Realtor.com, and Homes.com, social media marketing, and global reach through the RE/MAX network spanning 110 countries." } }
      ]
    }
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "",
    beds: "", baths: "", sqft: "", timeline: "", reason: "", message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [netCalc, setNetCalc] = useState({
    salePrice: "", mortgage: "", agentFee: "5", closingCosts: "2"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const [firstName, ...rest] = form.name.trim().split(" ");
    if (!firstName || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (form.phone && !isValidPhone(form.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setSubmitting(true);
    try {
      await submitToFub({
        source: "Website — Seller's Guide",
        firstName,
        lastName: rest.join(" "),
        email: form.email,
        phone: form.phone,
        interest: "selling",
        extraNote: [
          form.address  ? "Address: " + form.address + (form.city ? ", " + form.city : "") : "",
          form.beds     ? `Beds: ${form.beds} / Baths: ${form.baths} / SqFt: ${form.sqft}` : "",
          form.timeline ? "Timeline: " + form.timeline : "",
          form.message  ? "Notes: " + form.message : "",
        ].filter(Boolean).join(" | "),
      });
      toast.success("Thank you! Will will contact you within 1 business day with your free home valuation.");
      setForm({ name: "", email: "", phone: "", address: "", city: "", beds: "", baths: "", sqft: "", timeline: "", reason: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please call (781) 456-3541 directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const calcNetProceeds = () => {
    const sale = parseFloat(netCalc.salePrice.replace(/,/g, "")) || 0;
    const mortgage = parseFloat(netCalc.mortgage.replace(/,/g, "")) || 0;
    const agentFee = (parseFloat(netCalc.agentFee) / 100) * sale;
    const closing = (parseFloat(netCalc.closingCosts) / 100) * sale;
    return sale - mortgage - agentFee - closing;
  };

  const netProceeds = calcNetProceeds();

  const faqs = [
    { q: "When is the best time to sell in Greater Boston?", a: "Spring (March–June) is traditionally the strongest selling season in Greater Boston, with high buyer demand and multiple offers common. However, Will has successfully sold homes in every season. The right time to sell is when you're ready." },
    { q: "How does Will determine my home's value?", a: "Will uses a Comparative Market Analysis (CMA) that analyzes recent sales of similar homes in your neighborhood, current active listings, market trends, and your home's specific features. This data-driven approach ensures accurate pricing." },
    { q: "What is your marketing strategy?", a: "Our goal is to cast the widest possible net to reach the most qualified buyers for your home. Every element of our marketing is designed with that in mind — professional photography, MLS listing, and syndication across Zillow, Realtor.com, and Homes.com puts your home in front of active buyers locally. And as part of REMAX — present in 110 countries — your listing has global reach that few independent agents can match. We pair that exposure with targeted social media advertising and direct outreach to our buyer database to make sure the right buyers find your home." },
    { q: "How long will it take to sell my home?", a: "In Greater Boston's current market, well-priced homes in high demand areas can sell in 7–21 days. However, timing varies depending on the type of property, location, and current market conditions — some homes take longer, and the market can shift. Our team's strategic pricing and marketing approach is designed to attract qualified buyers as efficiently as possible, but we'll always give you an honest assessment of what to expect for your specific home." },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[50vh] flex items-center"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/80" />
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <p className="section-label mb-3">Seller's Guide</p>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sell Your Greater Boston Home for Maximum Value
            </h1>
            <p className="text-white/80 font-body text-lg mb-8">
              Will Shao's proven marketing strategy and negotiation expertise have helped
              212+ homeowners achieve top dollar in Greater Boston and MetroWest MA.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="#valuation" className="btn-gold text-sm">
                Get My Free Home Valuation
              </a>
              <a
                href="https://calendar.app.google/sGPHDTZGiH9zdE8x5"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm"
              >
                Book a Listing Consultation
              </a>
            </div>
            <div>
              <a
                href={getFelloUrl()}
                className="btn-gold text-sm fello-cta inline-block"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "1rem", padding: "16px 32px" }}
              >
                Get Your Instant Home Valuation →
              </a>
              <p className="text-sm text-white/50 font-body mt-2">
                Instant estimate · No obligation · Powered by Fello
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#C89B3C] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "103.4%", label: "Avg. List-to-Sale Ratio" },
              { value: "18 days", label: "Avg. Days on Market" },
              { value: "212+", label: "Homes Sold" },
              { value: "5.0★", label: "Zillow Rating" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p className="text-sm text-[#0D2137]/70 font-body mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoComparisonCarousel />

      {/* Staging Before/After */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">Staging Makes the Difference</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              See the Transformation
            </h2>
            <p className="text-gray-500 font-body text-base mt-3 max-w-xl mx-auto">
              Staged homes sell faster and for more money. Drag the slider to see the same
              room — before and after professional staging.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider
              afterSrc="/images/staging/staging-after.jpg"
              beforeSrc="/images/staging/staging-before.jpg"
              afterLabel="Staged"
              beforeLabel="Unstaged"
            />
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {[
                { value: "17%", label: "Higher sale price on average" },
                { value: "73%", label: "Of buyers' agents say staging helps" },
                { value: "50%", label: "Fewer days on market" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#FAF8F4] rounded-lg p-4">
                  <p
                    className="text-3xl font-bold text-[#C89B3C]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 font-body mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selling Process */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">The Selling Process</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Will's Proven Selling System
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="bg-[#FAF8F4] rounded-lg p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#0D2137] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="text-sm font-body text-[#C89B3C] font-semibold tracking-wider">STEP {step.step}</p>
                      <h3 className="text-base font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 font-body leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marketing Plan */}
      <section className="py-20 bg-[#0D2137]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="gold-rule" />
              <p className="section-label mb-2">Marketing Plan</p>
              <h2
                className="text-4xl font-bold text-white mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Maximum Exposure for Your Home
              </h2>
              <p className="text-white/70 font-body text-base leading-relaxed mb-6">
                Our comprehensive marketing strategy ensures your home reaches every qualified buyer — locally and globally. As part of REMAX, your listing is backed by a network spanning 110 countries. Throughout the process, you'll receive a weekly property report with showings, buyer feedback, and online activity so you're always in the loop.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {marketingItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C89B3C] shrink-0" />
                    <span className="text-base text-white/70 font-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1A3A5C] rounded-lg p-8">
              <h3
                className="text-white font-bold text-xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Net Proceeds Calculator
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Expected Sale Price ($)", key: "salePrice", placeholder: "e.g. 875,000" },
                  { label: "Remaining Mortgage ($)", key: "mortgage", placeholder: "e.g. 350,000" },
                  { label: "Agent Commission (%)", key: "agentFee", placeholder: "5" },
                  { label: "Closing Costs (%)", key: "closingCosts", placeholder: "2" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm text-white/60 font-body mb-1">{field.label}</label>
                    <input
                      type="text"
                      value={netCalc[field.key as keyof typeof netCalc]}
                      onChange={(e) => setNetCalc({ ...netCalc, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-[#0D2137] border border-white/20 rounded px-4 py-3 text-base font-body text-white focus:outline-none focus:border-[#C89B3C]"
                    />
                  </div>
                ))}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 font-body text-base">Estimated Net Proceeds</span>
                    <span
                      className="text-3xl font-bold text-[#C89B3C]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {netProceeds > 0
                        ? `$${netProceeds.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                        : "—"}
                    </span>
                  </div>
                  <p className="text-sm text-white/40 font-body mt-2">
                    Estimate only. Contact Will for a precise analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Comparison */}
      <section className="py-20 bg-[#FAF8F4]">
        <div className="container">
          <div className="text-center mb-14">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">Why It Matters</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Not All Listings Are Created Equal
            </h2>
            <p className="text-gray-500 font-body text-base mt-3 max-w-xl mx-auto">
              The way your home is presented and marketed directly impacts how quickly it sells and for how much. Here's how our approach compares.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-0 rounded-xl overflow-hidden shadow-lg border border-gray-100">
              {/* Header Row */}
              <div className="bg-[#FAF8F4] p-5 border-b border-gray-100" />
              <div className="bg-gray-100 p-5 border-b border-gray-200 text-center">
                <p className="text-sm font-semibold text-gray-400 font-body uppercase tracking-wider">Typical Agent</p>
              </div>
              <div className="bg-[#0D2137] p-5 border-b border-[#1A3A5C] text-center">
                <p className="text-sm font-semibold text-[#C89B3C] font-body uppercase tracking-wider">Will Shao</p>
                <p className="text-sm text-white/50 font-body mt-0.5">RE/MAX Executive Realty</p>
              </div>

              {/* Rows */}
              {[
                {
                  feature: "Photography",
                  typical: "Agent's phone or basic photos",
                  will: "Professional photographer — magazine-quality images",
                  highlight: true,
                },
                {
                  feature: "Home Staging",
                  typical: "Listed as-is",
                  will: "Staging consultation + trusted stager referrals",
                  highlight: false,
                },
                {
                  feature: "Video Tour",
                  typical: "Rarely included",
                  will: "Professional video for higher-end & luxury properties",
                  highlight: true,
                },
                {
                  feature: "Pre-Market Strategy",
                  typical: "No coming soon or off-market marketing",
                  will: "Coming Soon campaign when timing allows — builds buyer interest before launch",
                  highlight: false,
                },
                {
                  feature: "Online & Social Media",
                  typical: "MLS listing only",
                  will: "Social media marketing + dedicated website presence across platforms",
                  highlight: true,
                },
                {
                  feature: "Global Reach",
                  typical: "Local market only",
                  will: "RE/MAX network — 110 countries worldwide",
                  highlight: false,
                },
                {
                  feature: "Seller Communication",
                  typical: "Updates when asked",
                  will: "Weekly property reports: showings, feedback & views",
                  highlight: true,
                },
                {
                  feature: "Offer Strategy",
                  typical: "Accept first reasonable offer",
                  will: "Structured offer deadlines to drive competition",
                  highlight: false,
                },
              ].map((row, i) => (
                <div key={row.feature} className="contents">
                  <div className={`p-4 border-b border-gray-100 flex items-center ${i % 2 === 0 ? "bg-white" : "bg-[#FAF8F4]"}`}>
                    <p className="text-sm font-semibold text-[#0D2137] font-body">{row.feature}</p>
                  </div>
                  <div className={`p-4 border-b border-gray-200 flex items-center justify-center text-center ${i % 2 === 0 ? "bg-gray-50" : "bg-gray-100/60"}`}>
                    <p className="text-sm text-gray-400 font-body leading-snug">{row.typical}</p>
                  </div>
                  <div className={`p-4 border-b border-[#1A3A5C]/40 flex items-center gap-2 ${i % 2 === 0 ? "bg-[#0D2137]" : "bg-[#112840]"}`}>
                    <span className="text-[#C89B3C] font-bold shrink-0">✓</span>
                    <p className="text-sm text-white/80 font-body leading-snug">{row.will}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 text-center">
              <p className="text-gray-500 font-body text-base mb-4">
                Ready to see what a fully-marketed listing looks like for your home?
              </p>
              <a href="#valuation" className="btn-gold text-sm">
                Get Your Free Home Valuation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="gold-rule mx-auto" />
            <h2 className="text-4xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Seller FAQ
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-[#FAF8F4] hover:bg-[#F0EDE6] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0D2137] text-base pr-4" style={{ fontFamily: "'Playfair Display', serif" }}>{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-[#C89B3C] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#C89B3C] shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="p-5 bg-white">
                    <p className="text-base text-gray-600 font-body leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation Form */}
      <section id="valuation" className="py-20 bg-[#0D2137]">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">Free Valuation</p>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              What's Your Home Worth?
            </h2>
            <p className="text-white/60 font-body text-base mt-3">
              Get a free, no-obligation home valuation from Will. No pressure, just data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Full Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]" placeholder="your@email.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]" placeholder="(xxx) xxx-xxxx" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Timeline to Sell</label>
                <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]">
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-3months">1–3 months</option>
                  <option value="3-6months">3–6 months</option>
                  <option value="6-12months">6–12 months</option>
                  <option value="just-curious">Just curious</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Property Address *</label>
              <input type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]" placeholder="Street address" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Beds", key: "beds", placeholder: "3" },
                { label: "Baths", key: "baths", placeholder: "2" },
                { label: "Sq Ft", key: "sqft", placeholder: "1,800" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">{f.label}</label>
                  <input type="text" value={form[f.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]" placeholder={f.placeholder} />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">Additional Notes</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C] resize-none"
                placeholder="Recent renovations, unique features, reason for selling..." />
            </div>
            <button type="submit" disabled={submitting} className="btn-gold w-full text-center text-sm py-3 disabled:opacity-60">
              {submitting ? "Sending..." : "Get Free Home Valuation Consultation"}
            </button>
            <p className="text-xs text-gray-400 font-body text-center leading-relaxed">
              By submitting this form, you agree to be contacted by Will Shao at RE/MAX Executive Realty by phone, text, or email regarding your real estate inquiry. Your information is private and will never be shared with third parties.
            </p>
          </form>

          <div className="mt-8 bg-[#1A3A5C] rounded-lg p-6 text-center">
            <Calendar className="w-8 h-8 text-[#C89B3C] mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Book a Listing Consultation
            </h3>
            <p className="text-white/60 text-base font-body mb-4">
              Schedule a free, no-obligation listing consultation with Will.
            </p>
            <a href="https://calendar.app.google/sGPHDTZGiH9zdE8x5" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
              Schedule Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
