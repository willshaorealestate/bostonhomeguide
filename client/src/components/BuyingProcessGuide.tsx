/*
 * BuyingProcessGuide.tsx — Interactive Animated Home Buying Process
 * Step-by-step walkthrough with smooth animations and social sharing
 */
import { useState } from "react";
import { ChevronRight, ChevronLeft, Share2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Get Pre-Approved",
    description: "Before you start touring homes, get pre-approved by a lender. This tells you exactly what you can afford and makes your offer competitive in Boston's fast-moving market. Paying cash? A proof of funds letter is your equivalent and carries serious weight with sellers.",
    duration: "1-2 weeks",
    icon: "💰",
    details: [
      "Choose a local lender familiar with MA transactions",
      "Get pre-approved, not just pre-qualified",
      "Cash buyers: have a proof of funds letter ready",
    ],
  },
  {
    number: 2,
    title: "Define Your Priorities",
    description: "Work with our team to clarify your must-haves vs. nice-to-haves. Location, school district, commute, home size — we'll map out your ideal community and property type.",
    duration: "1-2 weeks",
    icon: "🎯",
    details: [
      "Consider commute to Boston/major employers",
      "Research school districts in advance",
      "Think about 5-year plans, not just today",
    ],
  },
  {
    number: 3,
    title: "Tour Homes",
    description: "Access the full MLSPIN database with our team's guidance. We'll schedule private showings and open houses and provide candid, honest assessments of every property.",
    duration: "2-8 weeks",
    icon: "🏠",
    details: [
      "Visit at different times of day",
      "Ask about utility costs and HOA fees",
      "Look beyond staging to the bones of the home",
    ],
  },
  {
    number: 4,
    title: "Make a Winning Offer",
    description: "Our team analyzes comparable sales, advises on price and terms, and helps you craft an offer that wins. A good-faith deposit (typically $1,000 or more) is submitted with the offer — usually refundable if a contingency such as the inspection or mortgage contingency is exercised.",
    duration: "1 day",
    icon: "📝",
    details: [
      "Escalation clauses in hot markets",
      "Key contingencies protect your deposit",
      "Personal letters can make a difference",
    ],
  },
  {
    number: 5,
    title: "Inspections & Due Diligence",
    description: "Once your offer is accepted, you'll have a due diligence period to conduct inspections. Our team reviews the findings with you and advises on which items to address before moving forward.",
    duration: "1-2 weeks",
    icon: "🔍",
    details: [
      "Always get a home inspection",
      "Consider radon, oil tank, and sewer scope",
      "Use this period to make informed decisions",
    ],
  },
  {
    number: 6,
    title: "Purchase & Sale Agreement",
    description: "The P&S is Massachusetts' second step — the binding contract that replaces the original offer. Your attorney prepares and reviews it; our team coordinates to get it signed by all parties. A deposit of typically 5% of the purchase price is due at signing.",
    duration: "1-2 weeks",
    icon: "📋",
    details: [
      "Work with a MA real estate attorney",
      "5% deposit due at P&S signing",
      "Deposits apply toward your down payment",
    ],
  },
  {
    number: 7,
    title: "Mortgage Commitment",
    description: "After the P&S is signed, the baton passes to your lender. They'll request documents, order an appraisal, and issue your mortgage commitment — typically 2–4 weeks. Our team works in the background to keep everything on track.",
    duration: "2-4 weeks",
    icon: "📊",
    details: [
      "Respond to lender document requests quickly",
      "Avoid major financial changes during this period",
      "Our team monitors the timeline throughout",
    ],
  },
  {
    number: 8,
    title: "Close & Get Your Keys",
    description: "This is what you've been working toward! From the final walkthrough to closing day, Will and his team are with you every step of the way. You'll walk away with the keys to your new home — time to celebrate!",
    duration: "1 day",
    icon: "🎉",
    details: [
      "Final walkthrough day-of closing",
      "Bring certified check or wire funds",
      "Celebrate — you're a homeowner!",
    ],
  },
];

export default function BuyingProcessGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<"carousel" | "timeline">("carousel");

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleShare = () => {
    const text = `Step ${step.number}: ${step.title} - ${step.description}`;
    if (navigator.share) {
      navigator.share({
        title: "Boston Home Buying Process",
        text,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#FAF8F4] to-white py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="gold-rule mx-auto" />
          <p className="section-label mb-2">Step-by-Step Guide</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0D2137] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Home Buying Journey
          </h2>
          <p className="text-gray-600 font-body max-w-2xl mx-auto">
            Follow along as we walk you through each stage of buying a home in Greater Boston.
            From pre-approval to closing day, we've got you covered.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setViewMode("carousel")}
            className={`px-4 py-2 rounded text-sm font-body font-semibold transition-all ${
              viewMode === "carousel"
                ? "bg-[#0D2137] text-white"
                : "bg-white border border-gray-200 text-[#0D2137] hover:border-[#C89B3C]"
            }`}
          >
            Interactive View
          </button>
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-4 py-2 rounded text-sm font-body font-semibold transition-all ${
              viewMode === "timeline"
                ? "bg-[#0D2137] text-white"
                : "bg-white border border-gray-200 text-[#0D2137] hover:border-[#C89B3C]"
            }`}
          >
            Timeline View
          </button>
        </div>

        {/* Carousel View */}
        {viewMode === "carousel" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
              {/* Step Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-12"
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-4xl">
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-[#C89B3C] font-body text-sm font-semibold uppercase tracking-wider">
                        Step {step.number} of {steps.length}
                      </p>
                      <p className="text-gray-400 font-body text-sm">
                        Typically takes {step.duration}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-3xl md:text-4xl font-bold text-[#0D2137] mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 font-body text-lg leading-relaxed mb-8">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="bg-[#FAF8F4] rounded-lg p-6 mb-8">
                    <h4 className="font-semibold text-[#0D2137] mb-4 font-body">What to expect:</h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 font-body">
                          <span className="text-[#C89B3C] font-bold mt-0.5">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                    <motion.div
                      className="bg-[#C89B3C] h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded text-[#0D2137] font-body font-semibold hover:border-[#C89B3C] hover:text-[#C89B3C] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <div className="flex gap-2">
                      {steps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentStep(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            i === currentStep ? "bg-[#C89B3C] w-8" : "bg-gray-300 hover:bg-gray-400"
                          }`}
                          aria-label={`Go to step ${i + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={currentStep === steps.length - 1}
                      className="flex items-center gap-2 px-6 py-3 bg-[#0D2137] text-white rounded font-body font-semibold hover:bg-[#1A3A5C] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Share Button */}
              <div className="border-t border-gray-100 px-8 md:px-12 py-4 bg-[#FAF8F4] flex items-center justify-between">
                <p className="text-sm text-gray-500 font-body">Share this step on social media</p>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-[#C89B3C] text-[#0D2137] rounded font-body font-semibold hover:bg-[#D4AF5A] transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Timeline View */}
        {viewMode === "timeline" && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C89B3C] to-[#C89B3C]/30" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.number}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`flex gap-6 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Dot */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white border-4 border-[#C89B3C] flex items-center justify-center text-2xl shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {s.icon}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-[#C89B3C] font-body text-xs font-semibold uppercase tracking-wider mb-1">
                          Step {s.number}
                        </p>
                        <h3
                          className="text-xl font-bold text-[#0D2137] mb-2"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {s.title}
                        </h3>
                        <p className="text-gray-600 font-body text-sm mb-3">{s.description}</p>
                        <p className="text-gray-400 font-body text-xs">⏱ {s.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 font-body mb-4">Ready to start your home buying journey?</p>
              <a
                href="/buy"
                className="inline-block btn-gold text-sm"
              >
                Learn More About Buying
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
