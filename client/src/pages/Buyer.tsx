/*
 * Buyer.tsx — BostonHomeGuide.com
 * Comprehensive Buyer's Guide with process steps, questionnaire, and calendar booking
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  CheckCircle, Home, FileText, Key, Search, DollarSign,
  Calendar, ChevronDown, ChevronUp, ArrowRight, Phone
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { toast } from "sonner";
import { submitToFub, isValidEmail, isValidPhone } from "@/lib/fub";
import { trackLead } from "@/lib/analytics";
import { useSEO } from "@/lib/seo";

const HERO_IMAGE = "https://images.unsplash.com/photo-1599136115254-f3fa567872ae?w=1400&q=80";

const buyingSteps = [
  {
    step: "01",
    title: "Get Pre-Approved",
    icon: DollarSign,
    description:
      "Before you start touring homes, get pre-approved by a lender. This tells you exactly what you can afford and makes your offer competitive in Boston's fast-moving market. Paying cash? A proof of funds letter is your equivalent and carries serious weight with sellers.",
    tips: ["Choose a local lender familiar with MA transactions", "Get pre-approved, not just pre-qualified", "Cash buyers: have a proof of funds letter ready"],
  },
  {
    step: "02",
    title: "Define Your Priorities",
    icon: Search,
    description:
      "Work with our team to clarify your must-haves vs. nice-to-haves. Location, school district, commute, home size — we'll map out your ideal community and property type.",
    tips: ["Consider commute to Boston/major employers", "Research school districts in advance", "Think about 5-year plans, not just today"],
  },
  {
    step: "03",
    title: "Tour Homes",
    icon: Home,
    description:
      "Access the full MLSPIN database with our team's guidance. We'll schedule private showings and open houses and provide candid, honest assessments of every property.",
    tips: ["Visit at different times of day", "Ask about utility costs and HOA fees", "Look beyond staging to the bones of the home"],
  },
  {
    step: "04",
    title: "Make a Winning Offer",
    icon: FileText,
    description:
      "Our team analyzes comparable sales, advises on price and terms, and helps you craft an offer that wins. A good-faith deposit (typically $1,000 or more) is submitted with the offer to bind it — this is usually refundable if a contingency such as the home inspection or mortgage contingency is exercised.",
    tips: ["Escalation clauses in hot markets", "Key contingencies protect your deposit", "Personal letters can make a difference"],
  },
  {
    step: "05",
    title: "Inspections & Due Diligence",
    icon: CheckCircle,
    description:
      "Once your offer is accepted, you'll have a due diligence period to conduct inspections. Our team reviews the findings with you and advises on which items to address before moving forward.",
    tips: ["Always get a home inspection", "Consider radon, oil tank, and sewer scope", "Use this period to make informed decisions"],
  },
  {
    step: "06",
    title: "Purchase & Sale Agreement",
    icon: FileText,
    description:
      "The P&S is Massachusetts' second step — the binding contract that replaces the original offer. Your attorney prepares and reviews it; our team coordinates to get it signed by all parties. A larger deposit of typically 5% of the purchase price is due at signing. Both deposits are applied toward your down payment at closing.",
    tips: ["Work with a MA real estate attorney", "5% deposit due at P&S signing", "Deposits apply toward your down payment"],
  },
  {
    step: "07",
    title: "Mortgage Commitment",
    icon: DollarSign,
    description:
      "After the P&S is signed, the baton passes to your lender. They'll request documents, order an appraisal if needed, and issue your mortgage commitment — a process that typically takes 2–4 weeks. Our team works in the background to make sure everything stays on track.",
    tips: ["Respond to lender document requests quickly", "Avoid major financial changes during this period", "Our team monitors the timeline throughout"],
  },
  {
    step: "08",
    title: "Final Walkthrough",
    icon: CheckCircle,
    description:
      "Before heading to the closing table, Will walks through the home with you to confirm it's in agreed-upon condition and any negotiated repairs are complete. Our team will also send you utility transfer contacts and mailing address change info ahead of time so you're ready from day one.",
    tips: ["Confirm all agreed-upon repairs are done", "Check utilities are on and functioning", "Our team sends utility and mailing contacts in advance"],
  },
  {
    step: "09",
    title: "Closing Day & Celebration!",
    icon: Key,
    description:
      "This is what you've been working toward! Your attorney handles the closing table while Will and his team are with you to make sure everything goes smoothly. Sign the final documents, hand over your funds, and get the keys to your new home. Time to celebrate! 🎉",
    tips: ["Attorney handles all closing documents", "Bring a certified check or wire funds in advance", "🎉 Celebrate — you're a homeowner!"],
  },
];

const faqs = [
  {
    q: "How much do I need for a down payment in Massachusetts?",
    a: "Conventional loans typically require 5-20% down. FHA loans require 3.5% with a 580+ credit score. First-time buyers may qualify for MassHousing programs with as little as 3% down. Will can connect you with trusted local lenders to find the best program for your situation.",
  },
  {
    q: "How long does it take to buy a home in Greater Boston?",
    a: "Closings can happen in as little as 30 days, with 45 days being the current average. A realistic range is 30–60 days from accepted offer to closing. Finding the right home varies — in competitive situations, offers are often due within 24–48 hours of listing.",
  },
  {
    q: "Do I need a buyer's agent in Massachusetts?",
    a: "While not legally required, working with a dedicated buyer's agent like Will is strongly recommended. Will represents your interests exclusively, provides expert market analysis, and his fee is typically paid by the seller — so there's no cost to you.",
  },
  {
    q: "What are closing costs in Massachusetts?",
    a: "Buyers typically pay 2–4% of the purchase price in closing costs, including lender fees, title insurance, attorney fees, and prepaid items. Your lender will provide a Good Faith Estimate (GFE) outlining these costs — the exact amount depends on your loan type, lender, and transaction specifics. Will refers buyers to trusted local lenders who can walk you through the numbers.",
  },
  {
    q: "Can Will help Mandarin-speaking buyers?",
    a: "Yes. Will can conduct his part of the process in Mandarin, and works with a network of fluent Mandarin-speaking attorneys and lenders who can explain the financing and legal aspects of the transaction in detail. Mandarin-speaking buyers are well supported throughout the entire process.",
  },
];

export default function BuyerPage() {
  useSEO({
    title: "Buying a Home in Greater Boston | Buyer's Guide | Will Shao",
    description: "Your complete guide to buying a home in Greater Boston and MetroWest MA. Pre-approval, home search, offers, P&S, and closing — step-by-step with Will Shao, RE/MAX.",
    canonical: "https://bostonhomeguide.com/buy",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How much do I need for a down payment in Massachusetts?", "acceptedAnswer": { "@type": "Answer", "text": "Conventional loans typically require 5-20% down. FHA loans require 3.5% with a 580+ credit score. First-time buyers may qualify for MassHousing programs with as little as 3% down." } },
        { "@type": "Question", "name": "How long does it take to buy a home in Greater Boston?", "acceptedAnswer": { "@type": "Answer", "text": "Closings can happen in as little as 30 days, with 45 days being the current average. A realistic range is 30–60 days from accepted offer to closing." } },
        { "@type": "Question", "name": "Do I need a buyer's agent in Massachusetts?", "acceptedAnswer": { "@type": "Answer", "text": "While not legally required, working with a dedicated buyer's agent is strongly recommended. A buyer's agent represents your interests exclusively and their fee is typically paid by the seller." } },
        { "@type": "Question", "name": "What are closing costs in Massachusetts?", "acceptedAnswer": { "@type": "Answer", "text": "Buyers typically pay 2–4% of the purchase price in closing costs, including lender fees, title insurance, attorney fees, and prepaid items." } },
        { "@type": "Question", "name": "Can Will help Mandarin-speaking buyers?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Will can conduct his part of the process in Mandarin, and works with a network of fluent Mandarin-speaking attorneys and lenders." } }
      ]
    }
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", timeline: "", budget: "",
    towns: "", bedrooms: "", message: "", language: "english"
  });
  const [submitting, setSubmitting] = useState(false);

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
        source: "Website — Buyer's Guide",
        firstName,
        lastName: rest.join(" "),
        email: form.email,
        phone: form.phone,
        interest: "buying",
        language: form.language,
        extraNote: [
          form.budget   ? "Budget: " + form.budget   : "",
          form.towns    ? "Towns: " + form.towns      : "",
          form.timeline ? "Timeline: " + form.timeline: "",
          form.message  ? "Notes: " + form.message    : "",
        ].filter(Boolean).join(" | "),
      });
      toast.success("Thank you! Will will be in touch within 1 business day.");
      trackLead("buyer-inquiry");
      setForm({ name: "", email: "", phone: "", timeline: "", budget: "", towns: "", bedrooms: "", message: "", language: "english" });
    } catch {
      toast.error("Something went wrong. Please call (781) 456-3541 directly.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <p className="section-label mb-3">Buyer's Guide</p>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Complete Guide to Buying a Home in Greater Boston
            </h1>
            <p className="text-white/80 font-body text-lg mb-8">
              From pre-approval to closing day — Will Shao guides you through every step
              of the home buying process in Massachusetts.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#questionnaire" className="btn-gold text-sm">
                Start My Home Search
              </a>
              <a
                href="https://calendar.app.google/sGPHDTZGiH9zdE8x5"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm"
              >
                Book a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Will */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🏆", title: "Nearly 20 Years of Expertise", desc: "Deep knowledge of every neighborhood, school district, and market trend across Greater Boston's most sought-after towns." },
              { icon: "🤝", title: "Buyer-First Advocacy", desc: "As your dedicated buyer's agent, Will represents only your interests — never the seller's. Your goals come first." },
              { icon: "🗣️", title: "Clear Communication", desc: "Will keeps you informed at every step — plain-language explanations, no jargon, and always available to answer questions." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-[#FAF8F4] rounded-lg">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="text-lg font-bold text-[#0D2137] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-base text-gray-500 font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Process */}
      <section className="py-20 bg-[#FAF8F4]">
        <div className="container">
          <div className="text-center mb-14">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">The Buying Process</p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#0D2137] mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How We Guide You Home
            </h2>
            <p className="text-gray-500 font-body text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Buying a home is a team effort — like a relay race where every handoff matters.
            </p>

            {/* Relay Race Visual */}
            <div className="max-w-4xl mx-auto mb-14">
              <div className="flex flex-col md:flex-row items-stretch gap-0">

                {/* Agent */}
                <div className="flex-1 bg-[#0D2137] text-white rounded-t-lg md:rounded-l-lg md:rounded-tr-none p-6 text-center">
                  <div className="text-3xl mb-2">🏃</div>
                  <p className="font-display font-bold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Will & Team</p>
                  <p className="text-white/60 text-sm font-body mb-3">Search → Offer → Inspections</p>
                  <p className="text-white/80 text-sm font-body leading-relaxed">We find the home, craft the winning offer, and guide you through due diligence.</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center bg-[#C89B3C] px-3 py-2 md:py-0">
                  <span className="text-white font-bold text-lg rotate-90 md:rotate-0">→</span>
                </div>

                {/* Attorney - P&S */}
                <div className="flex-1 bg-[#1A3A5C] text-white p-6 text-center">
                  <div className="text-3xl mb-2">⚖️</div>
                  <p className="font-display font-bold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Attorney</p>
                  <p className="text-white/60 text-sm font-body mb-3">Purchase & Sale Agreement</p>
                  <p className="text-white/80 text-sm font-body leading-relaxed">Your attorney prepares and reviews the binding P&S contract.</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center bg-[#C89B3C] px-3 py-2 md:py-0">
                  <span className="text-white font-bold text-lg rotate-90 md:rotate-0">→</span>
                </div>

                {/* Lender */}
                <div className="flex-1 bg-[#1A3A5C] text-white p-6 text-center">
                  <div className="text-3xl mb-2">🏦</div>
                  <p className="font-display font-bold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Lender</p>
                  <p className="text-white/60 text-sm font-body mb-3">Mortgage Commitment</p>
                  <p className="text-white/80 text-sm font-body leading-relaxed">Your lender takes the lead to secure your mortgage commitment.</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center bg-[#C89B3C] px-3 py-2 md:py-0">
                  <span className="text-white font-bold text-lg rotate-90 md:rotate-0">→</span>
                </div>

                {/* Attorney - Closing */}
                <div className="flex-1 bg-[#1A3A5C] text-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none p-6 text-center">
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="font-display font-bold text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Attorney</p>
                  <p className="text-white/60 text-sm font-body mb-3">Closing Table</p>
                  <p className="text-white/80 text-sm font-body leading-relaxed">Your attorney handles the closing. You walk away with the keys.</p>
                </div>

              </div>

              {/* Guide thread */}
              <div className="mt-4 bg-[#C89B3C]/10 border border-[#C89B3C]/30 rounded-lg px-6 py-4 text-center">
                <p className="text-[#0D2137] font-body text-sm">
                  <span className="font-semibold text-[#C89B3C]">Will & his team</span> guide you through every handoff — keeping the process on track from the first showing all the way to the closing table.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#0D2137] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="text-sm font-body text-[#C89B3C] font-semibold tracking-wider">
                        STEP {step.step}
                      </p>
                      <h3
                        className="text-lg font-bold text-[#0D2137]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-base text-gray-600 font-body leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-gray-500 font-body">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C89B3C] mt-0.5 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="gold-rule mx-auto" />
            <h2
              className="text-4xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left bg-[#FAF8F4] hover:bg-[#F0EDE6] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className="font-semibold text-[#0D2137] text-base pr-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-[#C89B3C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#C89B3C] shrink-0" />
                  )}
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

      {/* Questionnaire */}
      <section id="questionnaire" className="py-20 bg-[#0D2137]">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">Get Started</p>
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tell Will About Your Home Search
            </h2>
            <p className="text-white/60 font-body text-base mt-3">
              Complete this questionnaire and Will will reach out within 1 business day
              with personalized recommendations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                  placeholder="(xxx) xxx-xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Budget Range
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                >
                  <option value="">Select range</option>
                  <option value="under-500k">Under $500K</option>
                  <option value="500k-750k">$500K – $750K</option>
                  <option value="750k-1m">$750K – $1M</option>
                  <option value="1m-1.5m">$1M – $1.5M</option>
                  <option value="over-1.5m">Over $1.5M</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Preferred Towns
                </label>
                <input
                  type="text"
                  value={form.towns}
                  onChange={(e) => setForm({ ...form, towns: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                  placeholder="e.g. Newton, Natick, Wellesley"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Timeline
                </label>
                <select
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                >
                  <option value="">Select timeline</option>
                  <option value="asap">ASAP</option>
                  <option value="1-3months">1–3 months</option>
                  <option value="3-6months">3–6 months</option>
                  <option value="6-12months">6–12 months</option>
                  <option value="just-browsing">Just browsing</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                Preferred Language
              </label>
              <div className="flex gap-4">
                {["english", "mandarin", "both"].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={form.language === lang}
                      onChange={(e) => setForm({ ...form, language: e.target.value })}
                      className="accent-[#C89B3C]"
                    />
                    <span className="text-sm font-body text-[#0D2137] capitalize">{lang === "mandarin" ? "Mandarin (普通话)" : lang}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded px-4 py-3 text-base font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C] resize-none"
                placeholder="School districts, commute requirements, must-haves..."
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-gold w-full text-center text-sm py-3 disabled:opacity-60">
              {submitting ? "Sending..." : "Get Buyer Consultation — Free"}
            </button>
            <p className="text-xs text-gray-400 font-body text-center leading-relaxed">
              By submitting this form, you agree to be contacted by Will Shao at RE/MAX Executive Realty by phone, text, or email regarding your real estate inquiry. Your information is private and will never be shared with third parties.
            </p>
          </form>

          {/* Calendar booking */}
          <div className="mt-8 bg-[#1A3A5C] rounded-lg p-6 text-center">
            <Calendar className="w-8 h-8 text-[#C89B3C] mx-auto mb-3" />
            <h3
              className="text-white font-bold text-lg mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Prefer to Schedule Directly?
            </h3>
            <p className="text-white/60 text-base font-body mb-4">
              Book a free 30-minute consultation with Will at a time that works for you.
            </p>
            <a
              href="https://calendar.app.google/sGPHDTZGiH9zdE8x5"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
