/*
 * Market.tsx — BostonHomeGuide.com
 * Monthly Greater Boston Market Reports with charts and email signup
 */
import { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Link } from "wouter";
import { TrendingUp, Mail, BarChart2, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import PullQuote from "@/components/PullQuote";
import TownCompareTable from "@/components/TownCompareTable";
import { townHistoryData } from "@/data/townMarketHistory";
import { toast } from "sonner";
import { submitToFub } from "@/lib/fub";
import { useSEO } from "@/lib/seo";
import { trackLead } from "@/lib/analytics";

const HERO_IMAGE = "/images/towns/newton.jpeg";

// Last updated: October 2026 — Source: MLSPIN Area Market Survey (SF + CC), individual town reports
const priceData = [
  { month: "Nov '25", median: 810000, sales: 1577 },
  { month: "Dec '25", median: 775000, sales: 1780 },
  { month: "Jan '26", median: 800000, sales: 1111 },
  { month: "Feb '26", median: 750000, sales: 950 },
  { month: "Mar '26", median: 805000, sales: 1258 },
  { month: "Apr '26", median: 857500, sales: 1597 },
  { month: "May '26", median: 850000, sales: 2116 },
  { month: "Jun '26", median: 860000, sales: 2761 },
  { month: "Jul '26", median: 850000, sales: 2709 },
  { month: "Aug '26", median: 857000, sales: 2083 },
  { month: "Sep '26", median: 790000, sales: 1647 },
  { month: "Oct '26", median: 805500, sales: 1601 },
];

const domData = [
  { month: "Nov '25", dom: 43 },
  { month: "Dec '25", dom: 51 },
  { month: "Jan '26", dom: 61 },
  { month: "Feb '26", dom: 64 },
  { month: "Mar '26", dom: 57 },
  { month: "Apr '26", dom: 44 },
  { month: "May '26", dom: 35 },
  { month: "Jun '26", dom: 33 },
  { month: "Jul '26", dom: 35 },
  { month: "Aug '26", dom: 40 },
  { month: "Sep '26", dom: 46 },
  { month: "Oct '26", dom: 46 },
];

const townData = [
  { town: "Boston",    medianPrice:  855000, dom: 59, listToSale: 99.0 },
  { town: "Cambridge", medianPrice: 1062500, dom: 61, listToSale: 102.0 },
  { town: "Somerville", medianPrice:  885000, dom: 50, listToSale: 101.0 },
  { town: "Brookline", medianPrice: 1450000, dom: 59, listToSale: 97.0 },
  { town: "Medford",   medianPrice:  790000, dom: 49, listToSale: 99.0 },
  { town: "Malden",    medianPrice:  700000, dom: 45, listToSale: 99.0 },
  { town: "Arlington", medianPrice: 1020000, dom: 38, listToSale: 102.0 },
  { town: "Belmont",   medianPrice: 1400000, dom: 64, listToSale: 98.0 },
  { town: "Waltham",   medianPrice:  787000, dom: 36, listToSale: 100.0 },
  { town: "Watertown", medianPrice:  775000, dom: 36, listToSale: 99.0 },
  { town: "Newton",    medianPrice: 1157500, dom: 69, listToSale: 98.0 },
  { town: "Wellesley", medianPrice: 2100000, dom: 37, listToSale: 99.0 },
  { town: "Natick",    medianPrice:  750000, dom: 56, listToSale: 100.0 },
  { town: "Framingham", medianPrice:  660000, dom: 36, listToSale: 98.0 },
  { town: "Wayland",   medianPrice:  875000, dom: 32, listToSale: 104.0 },
  { town: "Needham",   medianPrice: 1375000, dom: 59, listToSale: 99.0 },
  { town: "Weston",    medianPrice: 2115000, dom: 43, listToSale: 102.0 },
  { town: "Lincoln",   medianPrice: 1457100, dom: 33, listToSale: 103.0 },
  { town: "Sudbury",   medianPrice: 1175000, dom: 44, listToSale: 100.0 },
  { town: "Shrewsbury", medianPrice:  622000, dom: 60, listToSale: 100.0 },
  { town: "Hudson",    medianPrice:  640000, dom: 43, listToSale: 101.0 },
  { town: "Marlborough", medianPrice:  584000, dom: 39, listToSale: 100.0 },
  { town: "Southborough", medianPrice:  866000, dom: 66, listToSale: 98.0 },
  { town: "Westborough", medianPrice:  642680, dom: 52, listToSale: 99.0 },
  { town: "Northborough", medianPrice:  615000, dom: 43, listToSale: 98.0 },
  { town: "Berlin",    medianPrice:  615000, dom: 45, listToSale: 101.0 },
  { town: "Lexington", medianPrice: 1902450, dom: 72, listToSale: 98.0 },
  { town: "Concord",   medianPrice: 1234000, dom: 53, listToSale: 102.0 },
  { town: "Bedford",   medianPrice:  921000, dom: 24, listToSale: 104.0 },
  { town: "Burlington", medianPrice:  816500, dom: 44, listToSale: 103.0 },
  { town: "Carlisle",  medianPrice: 1312500, dom: 79, listToSale: 98.0 },
  { town: "Acton",     medianPrice:  805000, dom: 26, listToSale: 100.0 },
  { town: "Stow",      medianPrice:  875000, dom: 52, listToSale: 101.0 },
  { town: "Boxborough", medianPrice:  357500, dom: 65, listToSale: 97.0 },
  { town: "Bolton",    medianPrice:  830000, dom: 38, listToSale: 102.0 },
  { town: "Harvard",   medianPrice:  620000, dom: 63, listToSale: 100.0 },
  { town: "Maynard",   medianPrice:  655000, dom: 25, listToSale: 101.0 },
  { town: "Littleton", medianPrice:  750000, dom: 46, listToSale: 100.0 },
  { town: "Groton",    medianPrice:  800000, dom: 67, listToSale: 95.0 },
  { town: "Ayer",      medianPrice:  506000, dom: 23, listToSale: 103.0 },
  { town: "Westford",  medianPrice:  750000, dom: 25, listToSale: 102.0 },
  { town: "Chelmsford", medianPrice:  670000, dom: 29, listToSale: 102.0 },
  { town: "Billerica", medianPrice:  697500, dom: 29, listToSale: 100.0 },
  { town: "Winchester", medianPrice: 1564950, dom: 43, listToSale: 98.0 },
  { town: "Tewksbury", medianPrice:  661000, dom: 37, listToSale: 101.0 },
  { town: "Wilmington", medianPrice:  793500, dom: 44, listToSale: 101.0 },
  { town: "Woburn",    medianPrice:  650000, dom: 34, listToSale: 100.0 },
  { town: "Stoneham",  medianPrice:  760000, dom: 43, listToSale: 102.0 },
  { town: "Melrose",   medianPrice:  829500, dom: 40, listToSale: 103.0 },
  { town: "Wakefield", medianPrice:  710000, dom: 36, listToSale: 100.0 },
  { town: "Reading",   medianPrice:  872500, dom: 28, listToSale: 102.0 },
  { town: "North Reading", medianPrice:  799900, dom: 38, listToSale: 102.0 },
  { town: "Lynnfield", medianPrice: 1100000, dom: 37, listToSale: 99.0 },
  { town: "Andover",   medianPrice:  960000, dom: 29, listToSale: 101.0 },
  { town: "North Andover", medianPrice:  685000, dom: 22, listToSale: 102.0 },
  { town: "Dedham",    medianPrice:  700000, dom: 50, listToSale: 98.0 },
  { town: "Westwood",  medianPrice: 1250000, dom: 23, listToSale: 102.0 },
  { town: "Ashland",   medianPrice:  570000, dom: 27, listToSale: 100.0 },
  { town: "Hopkinton", medianPrice: 1425000, dom: 49, listToSale: 100.0 },
  { town: "Sherborn",  medianPrice: 1212500, dom: 42, listToSale: 96.0 },
  { town: "Holliston", medianPrice:  808500, dom: 41, listToSale: 100.0 },
  { town: "Medway",    medianPrice:  757500, dom: 58, listToSale: 102.0 },
  { town: "Millis",    medianPrice:  532500, dom: 29, listToSale: 97.0 },
  { town: "Milford",   medianPrice:  584000, dom: 31, listToSale: 101.0 },
  { town: "Dover",     medianPrice: 1970000, dom: 25, listToSale: 100.0 },
  { town: "Medfield",  medianPrice: 1196350, dom: 47, listToSale: 98.0 },
  { town: "Quincy",    medianPrice:  649900, dom: 37, listToSale: 99.0 },
  { town: "Canton",    medianPrice:  640998, dom: 32, listToSale: 101.0 },
  { town: "Sharon",    medianPrice:  937500, dom: 51, listToSale: 99.0 },
  { town: "Stoughton", medianPrice:  450000, dom: 34, listToSale: 100.0 },
  { town: "Norwood",   medianPrice:  585000, dom: 29, listToSale: 100.0 },
  { town: "Milton",    medianPrice: 1200000, dom: 39, listToSale: 102.0 },
  { town: "Braintree", medianPrice:  660000, dom: 43, listToSale: 100.0 },
];


// Tight y-axis for the median price chart: starting at $0 made a ~15% swing look flat.
// Computed from the data so it keeps working as the monthly job adds new months.
const priceMedians = priceData.map((d) => d.median);
const PRICE_STEP = 50_000;
const priceDomain: [number, number] = [
  Math.floor((Math.min(...priceMedians) * 0.97) / PRICE_STEP) * PRICE_STEP,
  Math.ceil((Math.max(...priceMedians) * 1.02) / PRICE_STEP) * PRICE_STEP,
];
// Even $50K gridlines ($700K, $750K, ...) instead of whatever recharts picks
const priceTicks = Array.from(
  { length: (priceDomain[1] - priceDomain[0]) / PRICE_STEP + 1 },
  (_, i) => priceDomain[0] + i * PRICE_STEP,
);

const formatPrice = (v: number) => `$${(v / 1000).toFixed(0)}K`;
const formatFullPrice = (v: number) => `$${v.toLocaleString()}`;

// Month labels on the trend charts. Recharts hides any label it thinks would touch its
// neighbor, which on phones and tablets silently dropped months (e.g. Sep '26). Show every
// month, and slant the labels on narrower screens so all twelve fit.
const SLANT_BELOW = 1024;
function useSlantMonths() {
  const [slant, setSlant] = useState(() => typeof window !== "undefined" && window.innerWidth < SLANT_BELOW);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SLANT_BELOW - 1}px)`);
    const onChange = () => setSlant(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return slant;
}
const SLANT_HEIGHT = 44; // room the slanted labels take below the plot
function monthAxisProps(slant: boolean, fontSize: number) {
  return {
    dataKey: "month",
    interval: 0,
    padding: { left: 16, right: 24 }, // keeps the first and last month labels from being cut off
    tick: { fontSize, fontFamily: "DM Sans" },
    ...(slant ? { angle: -40, textAnchor: "end" as const, height: SLANT_HEIGHT, tickMargin: 4 } : {}),
  } as const;
}

export default function MarketPage() {
  const slantMonths = useSlantMonths();
  useSEO({
    title: "Greater Boston Market Report: October 2026 | Will Shao",
    description: "Monthly market data for Greater Boston and MetroWest MA. Median prices, days on market, and list-to-sale ratios for Newton, Wellesley, Natick, Lexington, and more.",
    canonical: "https://bostonhomeguide.com/market",
  });
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"price" | "dom" | "towns">("price");
  const [townA, setTownA] = useState("Lexington");
  const [townB, setTownB] = useState("Newton");

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
        extraNote: "Wants to be notified when new market reports and guides are posted",
      });
      toast.success("Thanks! We'll let you know when new market reports and guides are posted.");
      trackLead("market-report-signup");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again or call (781) 456-3541.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[40vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/65" />
        <div className="relative z-10 container">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-white/85 mb-3">Market Intelligence</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Greater Boston Real Estate Market Report
            </h1>
            <p className="text-white/80 font-body text-lg mb-6">
              Monthly data-driven insights on prices, days on market, and trends across Greater Boston's most sought-after towns.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm font-body">
              <Calendar className="w-4 h-4" />
              <span>Updated October 2026 · Next report: November 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-[#F4F6F8] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$805,500", label: "Median Sale Price", change: "MLSPIN, Oct 2026" },
              { value: "46 days", label: "Avg. Days on Market", change: "SF + Condo, Greater Boston" },
              { value: "100%", label: "List-to-Sale Ratio", change: "At asking, on average" },
              { value: "1,601", label: "Closed Sales", change: "MLSPIN, Oct 2026" },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-3xl font-bold text-[#0D2137]">{m.value}</p>
                <p className="text-sm text-[#5B6270] font-body mt-0.5">{m.label}</p>
                <p className="text-sm font-semibold text-[#5B6270] font-body mt-0.5">{m.change}</p>
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
            <h2 className="text-2xl font-bold text-[#0D2137]">
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
                    ? "border-[#0D2137] text-[#0D2137]"
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
                Median sale price trend across Greater Boston — Nov '25 through Oct '26
              </p>
              <ResponsiveContainer width="100%" height={320 + (slantMonths ? SLANT_HEIGHT - 30 : 0)}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                  <XAxis {...monthAxisProps(slantMonths, 12)} />
                  <YAxis tickFormatter={formatPrice} tick={{ fontSize: 12, fontFamily: "DM Sans" }} domain={priceDomain} ticks={priceTicks} interval={0} />
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
              <ResponsiveContainer width="100%" height={320 + (slantMonths ? SLANT_HEIGHT - 30 : 0)}>
                <BarChart data={domData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                  <XAxis {...monthAxisProps(slantMonths, 12)} />
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
            const histA = townHistoryData[townA] ?? [];
            const histB = townHistoryData[townB] ?? [];
            const dataA = townData.find(t => t.town === townA)!;
            const dataB = townData.find(t => t.town === townB)!;
            // Join the two towns' histories by month (a small town can be missing a month with no sales)
            const monthKey = (m: string) => { const [mon, yy] = m.split(" '"); return Number(yy) * 12 + "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(mon) / 3; };
            const months = Array.from(new Set([...histA, ...histB].map(e => e.month))).sort((a, b) => monthKey(a) - monthKey(b));
            const byMonth = (h: typeof histA) => new Map(h.map(e => [e.month, e]));
            const mA = byMonth(histA), mB = byMonth(histB);
            const priceChartData = months.map(month => ({ month, [townA]: mA.get(month)?.median, [townB]: mB.get(month)?.median }));
            const domChartData = months.map(month => ({ month, [townA]: mA.get(month)?.dom, [townB]: mB.get(month)?.dom }));
            const lastA = histA[histA.length - 1], lastB = histB[histB.length - 1];
            const soldA = lastA?.sold ?? 0;
            const soldB = lastB?.sold ?? 0;
            const pendingA = lastA?.pending ?? 0;
            const pendingB = lastB?.pending ?? 0;
            const latestMonth = months[months.length - 1] ?? "";
            const trendLabel = months.length > 1 ? `${months.length}-Month Trend` : "Trend";
            const tableRows = townData.map(t => ({ ...t, sold: townHistoryData[t.town]?.slice(-1)[0]?.sold }));

            return (
              <div>
                {/* Region tabs + sortable table; Town A / Town B picks work across regions */}
                <TownCompareTable rows={tableRows} townA={townA} townB={townB} setTownA={setTownA} setTownB={setTownB} />

                {/* Side-by-side key stats */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mb-2">
                  {latestMonth} — Key Stats
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { town: townA, data: dataA, sold: soldA, pending: pendingA, color: "#0D2137" },
                    { town: townB, data: dataB, sold: soldB, pending: pendingB, color: "#C89B3C" },
                  ].map(({ town, data, sold, pending, color }) => (
                    <div key={town} className="bg-[#F4F6F8] rounded-2xl p-5 border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                        <p className="text-sm font-semibold text-gray-500 font-body uppercase tracking-wide">{town}</p>
                      </div>
                      <p className="text-2xl font-bold text-[#0D2137] mb-1">
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
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mb-2">Median Sale Price — {trendLabel}</p>
                <ResponsiveContainer width="100%" height={220 + (slantMonths ? SLANT_HEIGHT - 30 : 0)}>
                  <LineChart data={priceChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                    <XAxis {...monthAxisProps(slantMonths, 11)} />
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
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mt-6 mb-2">Days on Market — {trendLabel}</p>
                <ResponsiveContainer width="100%" height={180 + (slantMonths ? SLANT_HEIGHT - 30 : 0)}>
                  <BarChart data={domChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                    <XAxis {...monthAxisProps(slantMonths, 11)} />
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

      <PullQuote quote="jason" align="center" className="py-12 md:py-16" />

      {/* Will's Commentary */}
      <section className="py-16 bg-[#F7F8FA]">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#0D2137] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#0D2137] font-body font-semibold tracking-wider uppercase mb-1">Will's Market Commentary</p>
                <h3 className="text-xl font-bold text-[#0D2137]">
October 2026 — What This Means for You
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-base text-gray-600 font-body leading-relaxed">
              {/* COMMENTARY:START — generated by scripts/mlspin/commentary.mjs */}
              <p>
                October brought 1,601 closed sales across Greater Boston, down 3% from September. The median sale price came in at $805,500, up 2% from September, and homes took an average of 46 days to sell, the same as in September. On average, sellers received 100% of their list price. Fall typically brings a seasonal slowdown after the busy spring and summer months.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Buyers:</strong> The pace of the market is holding steady from last month. The most negotiating room right now is in Groton (95% of list, 67 days on market), Sherborn (96% of list, 42 days on market), and Boxborough (97% of list, 65 days on market). Across the region, homes are still selling at or above asking on average, so a strong first offer still matters.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Sellers:</strong> Bedford, Wayland, and Ayer are the most competitive markets we track this month, with homes selling at 103% of list price or better. Demand is holding steady, so a well-prepared, well-priced listing remains in a strong position.
              </p>
              <p>
                <strong className="text-[#0D2137]">Notable Standout:</strong> North Andover was one of the fastest-moving markets we track, with homes selling in 22 days on average at 102% of list. On the other end, homes in Carlisle averaged 79 days on market, so buyers there have more time to weigh their options.
              </p>
              {/* COMMENTARY:END */}
            </div>
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0D2137] text-base font-body">Will Shao</p>
                <p className="text-sm text-gray-400 font-body">REMAX Executive Realty · (781) 456-3541</p>
              </div>
              <Link href="/contact" className="btn-gold text-xs">
                Discuss the Market
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className="py-16 bg-[#0D2137]">
        <div className="container max-w-xl text-center">
          <Mail className="w-10 h-10 text-[#C89B3C] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Get Notified About New Reports
          </h2>
          <p className="text-white/60 font-body text-base mb-6">
            Get notified when new market reports and guides are posted. Free, and no spam.
          </p>
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-[#1A3A5C] border border-white/20 rounded-xl px-4 py-3 text-base font-body text-white placeholder-white/40 focus:outline-none focus:border-[#C89B3C]"
            />
            <button type="submit" disabled={submitting} className="btn-light text-sm whitespace-nowrap">
              {submitting ? "Signing up..." : "Notify Me"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
