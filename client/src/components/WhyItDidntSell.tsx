/*
 * WhyItDidntSell.tsx — Scroll-driven deconstruction animation
 * Bold gradient cards with oversized icons, no photos
 */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CameraOff, TrendingDown, Compass } from "lucide-react";

const problems = [
  {
    icon: CameraOff,
    label: "Bad Photos",
    detail: "Poor visuals mean buyers scroll right past your listing.",
    gradient: "from-rose-950 via-red-900 to-rose-800",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-300",
    accent: "bg-red-400",
  },
  {
    icon: TrendingDown,
    label: "Wrong Price",
    detail: "Overpricing kills momentum before it starts.",
    gradient: "from-amber-950 via-orange-900 to-amber-800",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-300",
    accent: "bg-orange-400",
  },
  {
    icon: Compass,
    label: "No Strategy",
    detail: "Most agents just list it and wait. That's not enough.",
    gradient: "from-slate-800 via-slate-700 to-slate-600",
    iconBg: "bg-slate-400/20",
    iconColor: "text-slate-300",
    accent: "bg-slate-400",
  },
];

export default function WhyItDidntSell() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Title
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const titleY       = useTransform(scrollYProgress, [0, 0.12], [40, 0]);

  // Card 1 — flies in from left
  const c1Opacity = useTransform(scrollYProgress, [0.15, 0.32], [0, 1]);
  const c1X       = useTransform(scrollYProgress, [0.15, 0.32], [-260, 0]);
  const c1Rotate  = useTransform(scrollYProgress, [0.15, 0.32], [-10, 0]);

  // Card 2 — drops from top
  const c2Opacity = useTransform(scrollYProgress, [0.36, 0.53], [0, 1]);
  const c2Y       = useTransform(scrollYProgress, [0.36, 0.53], [-200, 0]);
  const c2Rotate  = useTransform(scrollYProgress, [0.36, 0.53], [6, 0]);

  // Card 3 — flies in from right
  const c3Opacity = useTransform(scrollYProgress, [0.57, 0.74], [0, 1]);
  const c3X       = useTransform(scrollYProgress, [0.57, 0.74], [260, 0]);
  const c3Rotate  = useTransform(scrollYProgress, [0.57, 0.74], [10, 0]);

  // Bottom line
  const lineOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 1]);
  const lineY       = useTransform(scrollYProgress, [0.82, 1], [30, 0]);

  const cardMotion = [
    { opacity: c1Opacity, x: c1X, rotate: c1Rotate },
    { opacity: c2Opacity, y: c2Y, rotate: c2Rotate },
    { opacity: c3Opacity, x: c3X, rotate: c3Rotate },
  ];

  return (
    <div ref={containerRef} style={{ height: "280vh" }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-[#0a1628] overflow-hidden px-4 md:px-6">

        {/* Title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-5 md:mb-12"
        >
          <p className="text-[#C89B3C] uppercase tracking-[0.2em] text-xs md:text-sm font-semibold mb-2 md:mb-4">
            Sound familiar?
          </p>
          <h2
            className="text-2xl sm:text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your home didn't sell<br className="hidden md:block" /> for one of these reasons.
          </h2>
        </motion.div>

        {/* Problem cards */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 w-full max-w-4xl">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br ${p.gradient} flex flex-row md:flex-col items-center gap-5 md:gap-0 md:justify-between p-5 md:p-8`}
                style={{
                  ...(cardMotion[i] as any),
                  minHeight: "clamp(110px, 18vh, 160px)",
                  flex: 1,
                }}
              >
                {/* Top accent line — desktop only */}
                <div className={`hidden md:block absolute top-0 left-0 right-0 h-1 ${p.accent} opacity-80`} />
                {/* Left accent line — mobile only */}
                <div className={`md:hidden absolute top-0 left-0 bottom-0 w-1.5 ${p.accent} opacity-80`} />

                {/* Icon */}
                <div className={`shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-full ${p.iconBg} flex items-center justify-center md:mx-auto md:mb-4`}>
                  <Icon className={`w-8 h-8 md:w-12 md:h-12 ${p.iconColor}`} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="text-left md:text-center md:mt-auto">
                  <h3
                    className="text-white text-xl md:text-3xl font-bold mb-1 md:mb-2 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {p.label}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-snug">
                    {p.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resolution */}
        <motion.div
          style={{ opacity: lineOpacity, y: lineY }}
          className="mt-5 md:mt-12 text-center"
        >
          <div className="w-16 h-px bg-[#C89B3C] mx-auto mb-5" />
          <p
            className="text-[#C89B3C] text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            I fix all three.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
