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

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-neighborhood-DGmdQCZgdpvwWuXmyhsZGU.webp";

const buyingSteps = [
  {
    step: "01",
    title: "Get Pre-Approved",
    icon: DollarSign,
    description:
      "Before you start touring homes, get pre-approved by a lender. This tells you exactly what you can afford and makes your offer competitive in Boston's fast-moving market.",
    tips: ["Choose a local lender familiar with MA transactions", "Get pre-approved, not just pre-qualified", "Lock in your rate when you find the right home"],
  },
  {
    step: "02",
    title: "Define Your Priorities",
    icon: Search,
    description:
      "Work with Will to clarify your must-haves vs. nice-to-haves. Location, school district, commute, home size — we'll map out your ideal community and property type.",
    tips: ["Consider commute to Boston/major employers", "Research school districts in advance", "Think about 5-year plans, not just today"],
  },
  {
    step: "03",
    title: "Tour Homes",
    icon: Home,
    description:
      "Access the full MLSPIN database with Will's guidance. We'll schedule private showings and open houses, and Will will provide candid assessments of every property.",
    tips: ["Visit at different times of day", "Ask about utility costs and HOA fees", "Look beyond staging to the bones of the home"],
  },
  {
    step: "04",
    title: "Make a Winning Offer",
    icon: FileText,
    description:
      "In Greater Boston's competitive market, offer strategy matters. Will will analyze comparable sales, advise on price and terms, and help you craft an offer that wins.",
    tips: ["Escalation clauses in hot markets", "Waiving contingencies strategically", "Personal letters can make a difference"],
  },
  {
    step: "05",
    title: "Inspections & Due Diligence",
    icon: CheckCircle,
    description:
      "Will coordinates home inspections, reviews the Purchase & Sale Agreement, and ensures you understand every clause before you sign.",
    tips: ["Always get a home inspection", "Consider radon, oil tank, and sewer scope", "Review the P&S carefully with your attorney"],
  },
  {
    step: "06",
    title: "Close & Get Your Keys",
    icon: Key,
    description:
      "From final walkthrough to closing day, Will is with you every step. We'll ensure a smooth closing and hand you the keys to your new Greater Boston home.",
    tips: ["Final walkthrough 24 hours before closing", "Bring certified funds or wire transfer", "Review HUD-1 closing disclosure carefully"],
  },
];

const faqs = [
  {
    q: "How much do I need for a down payment in Massachusetts?",
    a: "Conventional loans typically require 5-20% down. FHA loans require 3.5% with a 580+ credit score. First-time buyers may qualify for MassHousing programs with as little as 3% down. Will can connect you with trusted local lenders to find the best program for your situation.",
  },
  {
    q: "How long does it take to buy a home in Greater Boston?",
    a: "From pre-approval to closing typically takes 60-90 days. Finding the right home can take 2-8 weeks depending on the market and your criteria. In competitive situations, offers are often due within 24-48 hours of listing.",
  },
  {
    q: "Do I need a buyer's agent in Massachusetts?",
    a: "While not legally required, working with a dedicated buyer's agent like Will is strongly recommended. Will represents your interests exclusively, provides expert market analysis, and his fee is typically paid by the seller — so there's no cost to you.",
  },
  {
    q: "What are closing costs in Massachusetts?",
    a: "Buyers typically pay 2-4% of the purchase price in closing costs, including lender fees, title insurance, attorney fees, and prepaid items. Will provides a detailed estimate early in the process so there are no surprises.",
  },
  {
    q: "Can Will help Mandarin-speaking buyers?",
    a: "Absolutely. Will is fluent in Mandarin (普通话) and has helped many Chinese-speaking families navigate the Greater Boston real estate market. All communications, documents, and guidance are available in both English and Mandarin.",
  },
];

export default function BuyerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", timeline: "", budget: "",
    towns: "", bedrooms: "", message: "", language: "english"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Will will be in touch within 1 business day. You've been tagged as a Buyer Lead.");
    setForm({ name: "", email: "", phone: "", timeline: "", budget: "", towns: "", bedrooms: "", message: "", language: "english" });
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
                href="https://calendar.app.google/rp3dJPWTjzaV9W1W7"
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
              { icon: "🏆", title: "18 Years of Expertise", desc: "Deep knowledge of every neighborhood, school district, and market trend across 37+ Greater Boston communities." },
              { icon: "🤝", title: "Buyer-First Advocacy", desc: "As your dedicated buyer's agent, Will represents only your interests — never the seller's. Your goals come first." },
              { icon: "🗣️", title: "English & Mandarin", desc: "Fluent in both English and Mandarin, Will serves Greater Boston's diverse communities with full language support." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-[#FAF8F4] rounded-lg">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="text-lg font-bold text-[#0D2137] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">{item.desc}</p>
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
              className="text-3xl md:text-4xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How Will Guides You Home
            </h2>
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
                      <p className="text-xs font-body text-[#C89B3C] font-semibold tracking-wider">
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
                  <p className="text-sm text-gray-600 font-body leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-xs text-gray-500 font-body">
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
              className="text-3xl font-bold text-[#0D2137]"
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
                    className="font-semibold text-[#0D2137] text-sm pr-4"
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
                    <p className="text-sm text-gray-600 font-body leading-relaxed">{faq.a}</p>
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
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tell Will About Your Home Search
            </h2>
            <p className="text-white/60 font-body text-sm mt-3">
              Complete this questionnaire and Will will reach out within 1 business day
              with personalized recommendations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                  placeholder="(xxx) xxx-xxxx"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Budget Range
                </label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
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
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Preferred Towns
                </label>
                <input
                  type="text"
                  value={form.towns}
                  onChange={(e) => setForm({ ...form, towns: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                  placeholder="e.g. Newton, Natick, Wellesley"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                  Timeline
                </label>
                <select
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
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
              <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
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
              <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C] resize-none"
                placeholder="School districts, commute requirements, must-haves..."
              />
            </div>
            <button type="submit" className="btn-gold w-full text-center text-sm py-3">
              Submit — Will Will Respond Within 1 Business Day
            </button>
            <p className="text-xs text-gray-400 font-body text-center">
              Your information is private and will never be shared.
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
            <p className="text-white/60 text-sm font-body mb-4">
              Book a free 30-minute consultation with Will at a time that works for you.
            </p>
            <a
              href="https://calendar.app.google/rp3dJPWTjzaV9W1W7"
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
