/*
 * SocialProofTicker.tsx — BostonHomeGuide.com
 * Scrolling ticker of recent sales — gold on navy
 */
import { Home } from "lucide-react";

const sales = [
  "Just Sold: 4BR Colonial in Newton for $1,285,000",
  "Just Sold: 3BR Ranch in Natick for $875,000",
  "Just Sold: 5BR in Wellesley for $1,650,000",
  "Just Sold: 3BR Cape in Framingham for $695,000",
  "Just Sold: 4BR in Needham for $1,125,000",
  "Just Sold: 3BR in Wayland for $985,000",
  "Just Sold: 4BR Colonial in Concord for $1,420,000",
  "Just Sold: 2BR Condo in Brookline for $785,000",
  "Just Sold: 4BR in Lexington for $1,350,000",
  "Just Sold: 3BR in Dedham for $765,000",
  "Just Sold: 5BR in Westwood for $1,495,000",
  "Just Sold: 3BR in Waltham for $825,000",
];

export default function SocialProofTicker() {
  const doubled = [...sales, ...sales];

  return (
    <div className="bg-[#0D2137] border-y border-[#C89B3C]/20 py-2.5 overflow-hidden">
      <div className="ticker-track">
        {doubled.map((sale, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-8 whitespace-nowrap"
          >
            <Home className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
            <span className="text-xs font-body text-white/75 tracking-wide">
              {sale}
            </span>
            <span className="text-[#C89B3C]/40 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
