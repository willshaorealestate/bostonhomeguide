/*
 * Market.tsx — BostonHomeGuide.com
 * Monthly Greater Boston Market Reports with charts and email signup
 */
import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, Mail, BarChart2, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { toast } from "sonner";
import { submitToFub } from "@/lib/fub";
import { useSEO } from "@/lib/seo";
import { trackLead } from "@/lib/analytics";

const HERO_IMAGE = "https://images.unsplash.com/photo-1549728968-5aaff42193ab?w=1400&q=80";

// Last updated: August 2026 — Source: MLSPIN Area Market Survey (SF + CC), individual town reports
const priceData = [
  { month: "Jul '26", median: 850000, sales: 2703 },
  { month: "Aug '26", median: 860000, sales: 2038 },
];

const domData = [
  { month: "Jul '26", dom: 35 },
  { month: "Aug '26", dom: 40 },
];

const townData = [
  { town: "Boston",    medianPrice:  825000, dom: 49, listToSale: 98.0 },
  { town: "Cambridge", medianPrice: 1045000, dom: 42, listToSale: 102.0 },
  { town: "Somerville", medianPrice:  859500, dom: 32, listToSale: 100.0 },
  { town: "Brookline", medianPrice: 1148000, dom: 51, listToSale: 99.0 },
  { town: "Newton",    medianPrice: 1731500, dom: 48, listToSale: 99.0 },
  { town: "Needham",   medianPrice: 1490750, dom: 38, listToSale: 99.0 },
  { town: "Waltham",   medianPrice:  830000, dom: 39, listToSale: 100.0 },
  { town: "Watertown", medianPrice:  558000, dom: 33, listToSale: 102.0 },
  { town: "Medford",   medianPrice:  862500, dom: 53, listToSale: 100.0 },
  { town: "Arlington", medianPrice: 1130000, dom: 31, listToSale: 102.0 },
  { town: "Belmont",   medianPrice: 1377000, dom: 21, listToSale: 101.0 },
  { town: "Lexington", medianPrice: 1706000, dom: 58, listToSale: 99.0 },
  { town: "Winchester", medianPrice: 1737000, dom: 36, listToSale: 99.0 },
  { town: "Bedford",   medianPrice:  955000, dom: 31, listToSale: 101.0 },
  { town: "Concord",   medianPrice: 1725000, dom: 64, listToSale: 98.0 },
  { town: "Burlington", medianPrice:  815000, dom: 35, listToSale: 102.0 },
  { town: "Woburn",    medianPrice:  749500, dom: 29, listToSale: 102.0 },
  { town: "Acton",     medianPrice:  870000, dom: 32, listToSale: 100.0 },
  { town: "Westford",  medianPrice:  799900, dom: 28, listToSale: 101.0 },
  { town: "Chelmsford", medianPrice:  619000, dom: 31, listToSale: 100.0 },
  { town: "Natick",    medianPrice:  857500, dom: 27, listToSale: 100.0 },
  { town: "Framingham", medianPrice:  685000, dom: 29, listToSale: 102.0 },
  { town: "Hopkinton", medianPrice: 1030000, dom: 59, listToSale: 102.0 },
  { town: "Milton",    medianPrice: 1015000, dom: 34, listToSale: 100.0 },
  { town: "Dedham",    medianPrice:  680000, dom: 38, listToSale: 102.0 },
  { town: "Westwood",  medianPrice: 1395000, dom: 32, listToSale: 100.0 },
  { town: "Canton",    medianPrice:  685850, dom: 40, listToSale: 101.0 },
  { town: "Quincy",    medianPrice:  660000, dom: 35, listToSale: 100.0 },
  { town: "Wellesley", medianPrice: 2165000, dom: 33, listToSale: 97.0 },
];

// Per-town rolling 8-month history — scraper appends each month
const townHistoryData: Record<string, Array<{ month: string; median: number; dom: number; listToSale: number; sold: number; pending: number }>> = {
  "Boston": [
    { month: "Jul '26", median:  805000, dom: 45, listToSale: 100, sold: 540, pending: 88 },
    { month: "Aug '26", median:  825000, dom: 49, listToSale: 98, sold: 371, pending: 239 },
  
  
  
  
  ],
  "Newton": [
    { month: "Jul '26", median: 1402655, dom: 35, listToSale: 102, sold: 116, pending: 21 },
    { month: "Aug '26", median: 1731500, dom: 48, listToSale: 99, sold: 63, pending: 31 },
  
  
  
  
  ],
  "Wellesley": [
    { month: "Jul '26", median: 2595000, dom: 28, listToSale: 101, sold: 36, pending: 7 },
    { month: "Aug '26", median: 2165000, dom: 33, listToSale: 97, sold: 42, pending: 13 },
  
  
  
  
  ],
  "Brookline": [
    { month: "Jul '26", median: 1440000, dom: 40, listToSale: 100, sold: 56, pending: 9 },
    { month: "Aug '26", median: 1148000, dom: 51, listToSale: 99, sold: 46, pending: 22 },
  
  
  
  
  ],
  "Natick": [
    { month: "Jul '26", median:  900000, dom: 24, listToSale: 100, sold: 55, pending: 8 },
    { month: "Aug '26", median:  857500, dom: 27, listToSale: 100, sold: 36, pending: 28 },
  
  
  
  
  ],
  "Lexington": [
    { month: "Jul '26", median: 1580000, dom: 62, listToSale: 101, sold: 51, pending: 6 },
    { month: "Aug '26", median: 1706000, dom: 58, listToSale: 99, sold: 38, pending: 19 },
  
  
  
  
  ],
  "Needham": [
    { month: "Jul '26", median: 1700000, dom: 36, listToSale: 100, sold: 41, pending: 9 },
    { month: "Aug '26", median: 1490750, dom: 38, listToSale: 99, sold: 40, pending: 19 },
  
  
  
  
  ],
  "Framingham": [
    { month: "Jul '26", median:  675000, dom: 24, listToSale: 101, sold: 57, pending: 7 },
    { month: "Aug '26", median:  685000, dom: 29, listToSale: 102, sold: 48, pending: 52 },
  
  
  
  
  ],
  "Waltham": [
    { month: "Jul '26", median:  800000, dom: 30, listToSale: 102, sold: 31, pending: 6 },
    { month: "Aug '26", median:  830000, dom: 39, listToSale: 100, sold: 39, pending: 26 },
  
  
  
  
  ],
  "Cambridge": [
    { month: "Jul '26", median: 1287500, dom: 36, listToSale: 103, sold: 86, pending: 9 },
    { month: "Aug '26", median: 1045000, dom: 42, listToSale: 102, sold: 65, pending: 25 },
  
  
  
  
  ],
  "Arlington": [
    { month: "Jul '26", median: 1180000, dom: 28, listToSale: 104, sold: 48, pending: 4 },
    { month: "Aug '26", median: 1130000, dom: 31, listToSale: 102, sold: 38, pending: 19 },
  
  
  
  
  ],
  "Belmont": [
    { month: "Jul '26", median: 1540000, dom: 23, listToSale: 101, sold: 23, pending: 8 },
    { month: "Aug '26", median: 1377000, dom: 21, listToSale: 101, sold: 14, pending: 16 },
  
  
  
  
  ],
  "Somerville": [
    { month: "Jul '26", median:  805000, dom: 41, listToSale: 100, sold: 61, pending: 12 },
    { month: "Aug '26", median:  859500, dom: 32, listToSale: 100, sold: 36, pending: 18 },
  
  
  
  
  ],
  "Medford": [
    { month: "Jul '26", median:  873000, dom: 28, listToSale: 103, sold: 44, pending: 9 },
    { month: "Aug '26", median:  862500, dom: 53, listToSale: 100, sold: 45, pending: 26 },
  
  
  
  
  ],
  "Watertown": [
    { month: "Jul '26", median:  825000, dom: 35, listToSale: 100, sold: 37, pending: 8 },
    { month: "Aug '26", median:  558000, dom: 33, listToSale: 102, sold: 22, pending: 9 },
  
  
  
  
  ],
  "Winchester": [
    { month: "Jul '26", median: 1924500, dom: 30, listToSale: 101, sold: 30, pending: 1 },
    { month: "Aug '26", median: 1737000, dom: 36, listToSale: 99, sold: 18, pending: 12 },
  
  
  
  
  ],
  "Woburn": [
    { month: "Jul '26", median:  770000, dom: 29, listToSale: 101, sold: 39, pending: 4 },
    { month: "Aug '26", median:  749500, dom: 29, listToSale: 102, sold: 32, pending: 18 },
  
  
  
  
  ],
  "Burlington": [
    { month: "Jul '26", median:  932500, dom: 32, listToSale: 103, sold: 28, pending: 4 },
    { month: "Aug '26", median:  815000, dom: 35, listToSale: 102, sold: 14, pending: 14 },
  
  
  
  
  ],
  "Chelmsford": [
    { month: "Jul '26", median:  677500, dom: 28, listToSale: 102, sold: 40, pending: 7 },
    { month: "Aug '26", median:  619000, dom: 31, listToSale: 100, sold: 37, pending: 33 },
  
  
  
  
  ],
  "Acton": [
    { month: "Jul '26", median:  805000, dom: 30, listToSale: 102, sold: 39, pending: 1 },
    { month: "Aug '26", median:  870000, dom: 32, listToSale: 100, sold: 19, pending: 12 },
  
  
  
  
  ],
  "Bedford": [
    { month: "Jul '26", median: 1068000, dom: 44, listToSale: 103, sold: 21, pending: 1 },
    { month: "Aug '26", median:  955000, dom: 31, listToSale: 101, sold: 12, pending: 17 },
  
  
  
  
  ],
  "Concord": [
    { month: "Jul '26", median: 1775000, dom: 54, listToSale: 99, sold: 12, pending: 6 },
    { month: "Aug '26", median: 1725000, dom: 64, listToSale: 98, sold: 23, pending: 10 },
  
  
  
  
  ],
  "Westford": [
    { month: "Jul '26", median:  942500, dom: 24, listToSale: 102, sold: 30, pending: 6 },
    { month: "Aug '26", median:  799900, dom: 28, listToSale: 101, sold: 33, pending: 16 },
  
  
  
  
  ],
  "Hopkinton": [
    { month: "Jul '26", median: 1156000, dom: 40, listToSale: 102, sold: 38, pending: 4 },
    { month: "Aug '26", median: 1030000, dom: 59, listToSale: 102, sold: 27, pending: 20 },
  
  
  
  
  ],
  "Milton": [
    { month: "Jul '26", median: 1010000, dom: 25, listToSale: 105, sold: 21, pending: 5 },
    { month: "Aug '26", median: 1015000, dom: 34, listToSale: 100, sold: 27, pending: 10 },
  
  
  
  
  ],
  "Westwood": [
    { month: "Jul '26", median: 1200000, dom: 94, listToSale: 101, sold: 11, pending: 3 },
    { month: "Aug '26", median: 1395000, dom: 32, listToSale: 100, sold: 20, pending: 9 },
  
  
  
  
  ],
  "Dedham": [
    { month: "Jul '26", median:  778000, dom: 37, listToSale: 101, sold: 38, pending: 6 },
    { month: "Aug '26", median:  680000, dom: 38, listToSale: 102, sold: 29, pending: 17 },
  
  
  
  
  ],
  "Canton": [
    { month: "Jul '26", median:  715000, dom: 24, listToSale: 102, sold: 25, pending: 8 },
    { month: "Aug '26", median:  685850, dom: 40, listToSale: 101, sold: 30, pending: 23 },
  
  
  
  
  ],
  "Quincy": [
    { month: "Jul '26", median:  655000, dom: 27, listToSale: 101, sold: 63, pending: 20 },
    { month: "Aug '26", median:  660000, dom: 35, listToSale: 100, sold: 57, pending: 53 },
  
  
  
  
  ],
};

const formatPrice = (v: number) => `$${(v / 1000).toFixed(0)}K`;
const formatFullPrice = (v: number) => `$${v.toLocaleString()}`;

export default function MarketPage() {
  useSEO({
    title: "Greater Boston Real Estate Market Report | August 2026",
    description: "Monthly market data for Greater Boston and MetroWest MA. Median prices, days on market, and list-to-sale ratios for Newton, Wellesley, Natick, Lexington, and more.",
    canonical: "https://bostonhomeguide.com/market",
  });
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"price" | "dom" | "towns">("price");
  const [townA, setTownA] = useState("Newton");
  const [townB, setTownB] = useState("Wellesley");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await submitToFub({
        source: "Website — Market Reports",
        firstName: email.split("@")[0],
        email,
        interest: "market-report",
      });
      toast.success("You're subscribed! The next market report will be in your inbox.");
      trackLead("market-report-signup");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again or call (781) 456-3541.");
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
        className="relative pt-32 pb-20 min-h-[40vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/85" />
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <p className="section-label mb-3">Market Intelligence</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Greater Boston Real Estate Market Report
            </h1>
            <p className="text-white/80 font-body text-lg mb-6">
              Monthly data-driven insights on prices, days on market, and trends across Greater Boston's most sought-after towns.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm font-body">
              <Calendar className="w-4 h-4" />
              <span>Updated August 2026 · Next report: September 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-[#C89B3C] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$860,000", label: "Median Sale Price", change: "MLSPIN, Aug 2026" },
              { value: "40 days", label: "Avg. Days on Market", change: "SF + Condo, Greater Boston" },
              { value: "100%", label: "List-to-Sale Ratio", change: "Above asking, on average" },
              { value: "2,038", label: "Closed Sales", change: "MLSPIN, Aug 2026" },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-3xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>{m.value}</p>
                <p className="text-sm text-[#0D2137]/70 font-body mt-0.5">{m.label}</p>
                <p className="text-sm font-semibold text-[#0D2137]/80 font-body mt-0.5">{m.change}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mb-8">
            <span className="gold-rule" />
            <h2 className="text-2xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Market Trends — Greater Boston
            </h2>
          </div>

          {/* Tab nav */}
          <div className="flex gap-2 mb-8 border-b border-gray-100">
            {[
              { key: "price", label: "Median Price" },
              { key: "dom", label: "Days on Market" },
              { key: "towns", label: "By Town" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-2.5 text-sm font-body font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-[#C89B3C] text-[#C89B3C]"
                    : "border-transparent text-gray-500 hover:text-[#0D2137]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "price" && (
            <div>
              <p className="text-sm text-gray-500 font-body mb-6">
                Median sale price trend across Greater Boston — Mar '26 through Aug '26
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <YAxis tickFormatter={formatPrice} tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <Tooltip
                    formatter={(value: number) => [formatFullPrice(value), "Median Price"]}
                    contentStyle={{ fontFamily: "DM Sans", fontSize: 12, border: "1px solid #e5e7eb" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="median"
                    stroke="#C89B3C"
                    strokeWidth={2.5}
                    dot={{ fill: "#C89B3C", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "dom" && (
            <div>
              <p className="text-sm text-gray-500 font-body mb-6">
                Average days on market — lower is a hotter market
              </p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={domData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <YAxis tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <Tooltip
                    formatter={(value: number) => [`${value} days`, "Days on Market"]}
                    contentStyle={{ fontFamily: "DM Sans", fontSize: 12 }}
                  />
                  <Bar dataKey="dom" fill="#0D2137" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "towns" && (() => {
            const towns = townData.map(t => t.town);
            const histA = townHistoryData[townA];
            const histB = townHistoryData[townB];
            const dataA = townData.find(t => t.town === townA)!;
            const dataB = townData.find(t => t.town === townB)!;
            const priceChartData = histA.map((e, i) => ({
              month: e.month,
              [townA]: e.median,
              [townB]: histB[i].median,
            }));
            const domChartData = histA.map((e, i) => ({
              month: e.month,
              [townA]: e.dom,
              [townB]: histB[i].dom,
            }));
            const soldA = histA[histA.length - 1].sold;
            const soldB = histB[histB.length - 1].sold;
            const pendingA = histA[histA.length - 1].pending;
            const pendingB = histB[histB.length - 1].pending;

            return (
              <div>
                {/* Drag-and-drop / click town selector */}
                <p className="text-xs text-gray-400 font-body mb-3">Drag a town into a slot, or click a town to assign it.</p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  {[
                    { label: "Town A", value: townA, color: "#0D2137", setter: setTownA, other: townB },
                    { label: "Town B", value: townB, color: "#C89B3C", setter: setTownB, other: townA },
                  ].map(({ label, value, color, setter, other }) => (
                    <div
                      key={label}
                      className="flex-1 min-h-[56px] rounded-lg border-2 border-dashed flex items-center justify-between px-4 py-3 transition-colors"
                      style={{ borderColor: color, background: `${color}0d` }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        const dropped = e.dataTransfer.getData("town");
                        if (dropped && dropped !== other) setter(dropped);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                        <span className="text-xs font-semibold uppercase tracking-wider font-body" style={{ color }}>{label}</span>
                      </div>
                      <span className="font-bold text-[#0D2137] font-body">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[
                    "Boston", "Cambridge", "Somerville", "Brookline", "Newton", "Needham", "Waltham", "Watertown",
                    "Medford", "Arlington", "Belmont", "Lexington", "Winchester", "Bedford", "Concord", "Burlington", "Woburn", "Acton", "Westford", "Chelmsford",
                    "Natick", "Framingham", "Hopkinton",
                    "Milton", "Dedham", "Westwood", "Canton", "Quincy",
                  ].map(t => {
                    const isA = t === townA, isB = t === townB;
                    return (
                      <button
                        key={t}
                        draggable
                        onDragStart={e => e.dataTransfer.setData("town", t)}
                        onClick={() => {
                          if (isA || isB) return;
                          setTownB(townA);
                          setTownA(t);
                        }}
                        className="px-3 py-1.5 rounded text-sm font-body font-medium border transition-all cursor-grab active:cursor-grabbing select-none"
                        style={
                          isA ? { background: "#0D2137", color: "#fff", borderColor: "#0D2137" }
                          : isB ? { background: "#C89B3C", color: "#0D2137", borderColor: "#C89B3C" }
                          : { background: "#FAF8F4", color: "#0D2137", borderColor: "#e5e7eb" }
                        }
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                {/* Side-by-side key stats */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mb-2">
                  {histA[histA.length - 1].month} — Key Stats
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { town: townA, data: dataA, sold: soldA, pending: pendingA, color: "#0D2137" },
                    { town: townB, data: dataB, sold: soldB, pending: pendingB, color: "#C89B3C" },
                  ].map(({ town, data, sold, pending, color }) => (
                    <div key={town} className="bg-[#FAF8F4] rounded-lg p-5 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                        <p className="text-sm font-semibold text-gray-500 font-body uppercase tracking-wide">{town}</p>
                      </div>
                      <p className="text-2xl font-bold text-[#0D2137] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {formatFullPrice(data.medianPrice)}
                      </p>
                      {sold < 8 && (
                        <p className="text-xs text-gray-400 font-body italic mb-2">Low volume — median may not reflect market</p>
                      )}
                      <div className="grid grid-cols-2 gap-3 text-sm font-body mt-3">
                        <div>
                          <p className="font-bold text-[#0D2137]">{data.dom} days</p>
                          <p className="text-gray-400 text-xs">Avg. Days on Market</p>
                        </div>
                        <div>
                          <p className={`font-bold ${data.listToSale >= 98 ? "text-green-600" : "text-orange-500"}`}>
                            {data.listToSale}%
                          </p>
                          <p className="text-gray-400 text-xs">Sale vs. Orig. Ask</p>
                        </div>
                        <div>
                          <p className={`font-bold ${sold < 8 ? "text-gray-400" : "text-[#0D2137]"}`}>{sold}</p>
                          <p className="text-gray-400 text-xs">Homes Sold</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#0D2137]">{pending}</p>
                          <p className="text-gray-400 text-xs">Under Agreement</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Median price trend chart */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mb-2">Median Sale Price — 8 Month Trend</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={priceChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
                    <YAxis tickFormatter={formatPrice} tick={{ fontSize: 11, fontFamily: "DM Sans" }} width={55} />
                    <Tooltip
                      formatter={(value: number, name: string) => [formatFullPrice(value), name]}
                      contentStyle={{ fontFamily: "DM Sans", fontSize: 12, border: "1px solid #e5e7eb" }}
                    />
                    <Legend wrapperStyle={{ fontFamily: "DM Sans", fontSize: 12 }} />
                    <Line type="monotone" dataKey={townA} stroke="#0D2137" strokeWidth={2.5} dot={{ fill: "#0D2137", r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey={townB} stroke="#C89B3C" strokeWidth={2.5} dot={{ fill: "#C89B3C", r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>

                {/* DOM trend chart */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mt-6 mb-2">Days on Market — 8 Month Trend</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={domChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "DM Sans" }} />
                    <YAxis tick={{ fontSize: 11, fontFamily: "DM Sans" }} width={35} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value} days`, name]}
                      contentStyle={{ fontFamily: "DM Sans", fontSize: 12, border: "1px solid #e5e7eb" }}
                    />
                    <Legend wrapperStyle={{ fontFamily: "DM Sans", fontSize: 12 }} />
                    <Bar dataKey={townA} fill="#0D2137" radius={[4, 4, 0, 0]} />
                    <Bar dataKey={townB} fill="#C89B3C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <p className="text-xs text-gray-400 font-body mt-4">Source: MLSPIN. Data from live monthly reports.</p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Will's Commentary */}
      <section className="py-16 bg-[#FAF8F4]">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#0D2137] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-[#C89B3C]" />
              </div>
              <div>
                <p className="text-sm text-[#C89B3C] font-body font-semibold tracking-wider uppercase mb-1">Will's Market Commentary</p>
                <h3 className="text-xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>
August 2026 — What This Means for You
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-base text-gray-600 font-body leading-relaxed">
              <p>
                August 2026 shows a market that's still tight but beginning to breathe. Closed
                sales came in at 2,010 — down from July's peak of 2,701, which is typical seasonal
                pullback as buyers and sellers step back before fall. The median sale price held
                firm at $860,000, matching June's high. Days on market ticked up to 40, the first
                meaningful rise since winter, and the region-wide list-to-sale ratio held at 100%.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Buyers:</strong> The slight uptick in days
                on market is the first sign of breathing room in months — but don't mistake it for
                a buyer's market. Framingham leads all towns at 102% list-to-sale, and Natick and
                Waltham are at 100%. Wellesley is the outlier at 97% list-to-sale, but its
                33-day DOM suggests even that premium market is moving briskly. If
                you've been waiting for leverage, Brookline and Newton (both at 98–99%) offer the
                most room to negotiate right now.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Sellers:</strong> August is still your
                market. With only 2,010 closed sales in August versus a peak of 2,701 in July,
                demand is softening slightly but prices are holding at year highs. The window
                narrows once school starts and buyer urgency fades into October; if your home is
                ready, list now rather than waiting for spring.
              </p>
              <p>
                <strong className="text-[#0D2137]">Notable Standout:</strong> Wellesley's median
                of $2,165,000 at 33 days on market and 97% list-to-sale means even luxury buyers
                are not seeing meaningful discounts — sellers are still in control at the top of
                the market. Framingham continues to outperform at 102% — the most competitive
                pricing dynamic of any town tracked this month, and a strong signal for sellers
                in that price range.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0D2137] text-base font-body">Will Shao</p>
                <p className="text-sm text-gray-400 font-body">REMAX Executive Realty · (781) 456-3541</p>
              </div>
              <a href="https://calendar.app.google/sGPHDTZGiH9zdE8x5" target="_blank" rel="noopener noreferrer" className="btn-gold text-xs">
                Discuss the Market
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className="py-16 bg-[#0D2137]">
        <div className="container max-w-xl text-center">
          <Mail className="w-10 h-10 text-[#C89B3C] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get the Monthly Market Report
          </h2>
          <p className="text-white/60 font-body text-base mb-6">
            Data-driven insights delivered to your inbox every month. Free, no spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-[#1A3A5C] border border-white/20 rounded px-4 py-3 text-base font-body text-white placeholder-white/40 focus:outline-none focus:border-[#C89B3C]"
            />
            <button type="submit" disabled={submitting} className="btn-gold text-sm whitespace-nowrap">
              {submitting ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
