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
    description: "Meet with a lender to determine your budget and get pre-approved for a mortgage. This shows sellers you're serious and helps you move quickly in competitive markets. Paying cash? A proof of funds letter carries the same weight.",
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
    description: "Work with your agent to identify your must-haves: location, school district, home style, price range, and lifestyle needs.",
    duration: "1-2 weeks",
    icon: "🎯",
    details: [
      "Identify top 3-5 neighborhoods",
      "List must-haves vs. nice-to-haves",
      "Set realistic price expectations",
    ],
  },
  {
    number: 3,
    title: "Start Your Search",
    description: "Begin touring homes that match your criteria. Your agent will guide you through neighborhoods, market trends, and property details.",
    duration: "2-8 weeks",
    icon: "🏠",
    details: [
      "Tour homes systematically",
      "Take notes and photos",
      "Discuss market conditions with your agent",
    ],
  },
  {
    number: 4,
    title: "Make an Offer",
    description: "When you find the right home, your agent will help you craft a competitive offer based on comparable sales and market conditions. A good-faith deposit (typically $1,000 or more) is submitted with the offer — refundable if a contingency is exercised.",
    duration: "1 day",
    icon: "📝",
    details: [
      "Research comparable sales",
      "Determine offer price and terms",
      "Submit offer with contingencies",
    ],
  },
  {
    number: 5,
    title: "Negotiate & Accept",
    description: "The seller may counter your offer. Your agent will guide negotiations until both parties reach an agreement.",
    duration: "1-3 days",
    icon: "🤝",
    details: [
      "Review seller's counter-offer",
      "Negotiate terms and price",
      "Reach mutual acceptance",
    ],
  },
  {
    number: 6,
    title: "Home Inspection",
    description: "Hire a professional inspector to evaluate the home's condition. Your agent reviews the findings with you and advises on which items to address before moving forward.",
    duration: "1-2 weeks",
    icon: "🔍",
    details: [
      "Schedule professional inspection",
      "Review inspection report with your agent",
      "Request repairs or credits if needed",
    ],
  },
  {
    number: 7,
    title: "Purchase & Sale Agreement",
    description: "Unique to Massachusetts, the P&S is the binding contract that replaces the original offer. Your attorney prepares and reviews it; your agent coordinates signatures. A deposit of typically 5% of the purchase price is due at signing.",
    duration: "1-2 weeks",
    icon: "📋",
    details: [
      "Work with a MA real estate attorney",
      "5% deposit due at P&S signing",
      "Both deposits apply toward your down payment",
    ],
  },
  {
    number: 8,
    title: "Appraisal & Underwriting",
    description: "Your lender orders an appraisal and reviews your financial documents. This ensures the home value supports the loan amount. This step typically takes 2–4 weeks.",
    duration: "2-4 weeks",
    icon: "📊",
    details: [
      "Lender orders appraisal",
      "Respond to document requests quickly",
      "Avoid major financial changes during this period",
    ],
  },
  {
    number: 9,
    title: "Final Walkthrough",
    description: "Do a final walkthrough on closing day to confirm the home is in agreed-upon condition and all repairs were completed.",
    duration: "1 day",
    icon: "✅",
    details: [
      "Verify agreed-upon repairs completed",
      "Confirm home is vacant",
      "Check utilities are on",
    ],
  },
  {
    number: 10,
    title: "Closing Day",
    description: "Sign final documents, transfer funds, and receive your keys! Congratulations — you're now a homeowner.",
    duration: "1 day",
    icon: "🎉",
    details: [
      "Final walkthrough before heading to closing",
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
