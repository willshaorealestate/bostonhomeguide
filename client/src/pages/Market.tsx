/*
 * Market.tsx — BostonHomeGuide.com
 * Monthly Greater Boston Market Reports with charts and email signup
 */
import { useState } from "react";
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

// Last updated: September 2026 — Source: MLSPIN Area Market Survey (SF + CC), individual town reports
const priceData = [
  { month: "Oct '25", median: 810000, sales: 1871 },
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
];

const domData = [
  { month: "Oct '25", dom: 42 },
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
];

const townData = [
  { town: "Boston",    medianPrice:  787500, dom: 61, listToSale: 98.0 },
  { town: "Cambridge", medianPrice:  862500, dom: 50, listToSale: 99.0 },
  { town: "Somerville", medianPrice:  879000, dom: 44, listToSale: 101.0 },
  { town: "Brookline", medianPrice: 1275000, dom: 83, listToSale: 97.0 },
  { town: "Medford",   medianPrice:  745000, dom: 57, listToSale: 100.0 },
  { town: "Malden",    medianPrice:  645000, dom: 39, listToSale: 100.0 },
  { town: "Quincy",    medianPrice:  732000, dom: 36, listToSale: 99.0 },
  { town: "Arlington", medianPrice: 1340000, dom: 33, listToSale: 103.0 },
  { town: "Belmont",   medianPrice: 1525000, dom: 61, listToSale: 97.0 },
  { town: "Waltham",   medianPrice:  767500, dom: 42, listToSale: 99.0 },
  { town: "Newton",    medianPrice: 1647500, dom: 47, listToSale: 99.0 },
  { town: "Wellesley", medianPrice: 2950000, dom: 62, listToSale: 97.0 },
  { town: "Natick",    medianPrice:  873500, dom: 41, listToSale: 100.0 },
  { town: "Framingham", medianPrice:  705000, dom: 34, listToSale: 100.0 },
  { town: "Wayland",   medianPrice:  827500, dom: 42, listToSale: 100.0 },
  { town: "Needham",   medianPrice: 1570000, dom: 80, listToSale: 98.0 },
  { town: "Dedham",    medianPrice:  830000, dom: 33, listToSale: 101.0 },
  { town: "Westwood",  medianPrice: 1255000, dom: 81, listToSale: 99.0 },
  { town: "Weston",    medianPrice: 1742925, dom: 91, listToSale: 96.0 },
  { town: "Sudbury",   medianPrice:  957500, dom: 41, listToSale: 99.0 },
  { town: "Shrewsbury", medianPrice:  670000, dom: 37, listToSale: 101.0 },
  { town: "Lexington", medianPrice: 1422000, dom: 48, listToSale: 98.0 },
  { town: "Concord",   medianPrice: 1437500, dom: 59, listToSale: 102.0 },
  { town: "Winchester", medianPrice: 2021000, dom: 64, listToSale: 99.0 },
  { town: "Bedford",   medianPrice: 1088000, dom: 47, listToSale: 101.0 },
  { town: "Carlisle",  medianPrice: 1080000, dom: 91, listToSale: 94.0 },
  { town: "Acton",     medianPrice:  850000, dom: 50, listToSale: 100.0 },
  { town: "Stow",      medianPrice:  724500, dom: 62, listToSale: 100.0 },
  { town: "Boxborough", medianPrice: 1200000, dom: 46, listToSale: 99.0 },
  { town: "Bolton",    medianPrice:  811000, dom: 71, listToSale: 100.0 },
  { town: "Harvard",   medianPrice: 1335000, dom: 80, listToSale: 97.0 },
  { town: "Maynard",   medianPrice:  575000, dom: 25, listToSale: 100.0 },
  { town: "Littleton", medianPrice:  890000, dom: 28, listToSale: 102.0 },
  { town: "Groton",    medianPrice:  803777, dom: 27, listToSale: 102.0 },
  { town: "Ayer",      medianPrice:  336000, dom: 21, listToSale: 105.0 },
  { town: "Westford",  medianPrice:  894500, dom: 32, listToSale: 100.0 },
  { town: "Chelmsford", medianPrice:  670000, dom: 36, listToSale: 101.0 },
  { town: "Billerica", medianPrice:  677500, dom: 35, listToSale: 101.0 },
  { town: "Tewksbury", medianPrice:  616700, dom: 27, listToSale: 102.0 },
  { town: "Wilmington", medianPrice:  775000, dom: 26, listToSale: 103.0 },
  { town: "Woburn",    medianPrice:  710000, dom: 28, listToSale: 100.0 },
  { town: "Stoneham",  medianPrice:  875000, dom: 33, listToSale: 101.0 },
  { town: "Melrose",   medianPrice:  870000, dom: 41, listToSale: 103.0 },
  { town: "Wakefield", medianPrice:  810000, dom: 38, listToSale: 101.0 },
  { town: "Reading",   medianPrice:  860000, dom: 32, listToSale: 100.0 },
  { town: "North Reading", medianPrice:  732500, dom: 39, listToSale: 99.0 },
  { town: "Lynnfield", medianPrice: 1353500, dom: 33, listToSale: 104.0 },
  { town: "Andover",   medianPrice:  932500, dom: 34, listToSale: 100.0 },
  { town: "North Andover", medianPrice:  675000, dom: 50, listToSale: 100.0 },
  { town: "Ashland",   medianPrice:  669500, dom: 21, listToSale: 102.0 },
  { town: "Hopkinton", medianPrice: 1000000, dom: 50, listToSale: 100.0 },
  { town: "Sherborn",  medianPrice:  800000, dom: 94, listToSale: 94.0 },
  { town: "Holliston", medianPrice:  967500, dom: 34, listToSale: 97.0 },
  { town: "Medway",    medianPrice:  720000, dom: 50, listToSale: 99.0 },
  { town: "Millis",    medianPrice:  532500, dom: 47, listToSale: 99.0 },
  { town: "Milford",   medianPrice:  570000, dom: 44, listToSale: 100.0 },
  { town: "Hudson",    medianPrice:  599950, dom: 31, listToSale: 101.0 },
  { town: "Marlborough", medianPrice:  612500, dom: 51, listToSale: 99.0 },
  { town: "Southborough", medianPrice:  940000, dom: 46, listToSale: 97.0 },
  { town: "Westborough", medianPrice:  607450, dom: 55, listToSale: 98.0 },
  { town: "Northborough", medianPrice:  750000, dom: 73, listToSale: 96.0 },
  { town: "Dover",     medianPrice: 1782500, dom: 59, listToSale: 98.0 },
  { town: "Medfield",  medianPrice: 1085000, dom: 44, listToSale: 100.0 },
  { town: "Canton",    medianPrice:  792500, dom: 49, listToSale: 100.0 },
  { town: "Sharon",    medianPrice: 1002000, dom: 42, listToSale: 99.0 },
  { town: "Stoughton", medianPrice:  607500, dom: 29, listToSale: 99.0 },
  { town: "Norwood",   medianPrice:  675000, dom: 35, listToSale: 99.0 },
  { town: "Milton",    medianPrice: 1170000, dom: 28, listToSale: 100.0 },
  { town: "Braintree", medianPrice:  745000, dom: 37, listToSale: 101.0 },
  { town: "Watertown", medianPrice:  716250, dom: 43, listToSale: 102.0 },
  { town: "Burlington", medianPrice:  899900, dom: 56, listToSale: 102.0 },
];


const formatPrice = (v: number) => `$${(v / 1000).toFixed(0)}K`;
const formatFullPrice = (v: number) => `$${v.toLocaleString()}`;

export default function MarketPage() {
  useSEO({
    title: "Greater Boston Market Report: September 2026 | Will Shao",
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
              <span>Updated September 2026 · Next report: October 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-[#F4F6F8] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$790,000", label: "Median Sale Price", change: "MLSPIN, Sep 2026" },
              { value: "46 days", label: "Avg. Days on Market", change: "SF + Condo, Greater Boston" },
              { value: "100%", label: "List-to-Sale Ratio", change: "At asking, on average" },
              { value: "1,647", label: "Closed Sales", change: "MLSPIN, Sep 2026" },
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
                Median sale price trend across Greater Boston — Oct '25 through Sep '26
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
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-body mt-6 mb-2">Days on Market — {trendLabel}</p>
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
September 2026 — What This Means for You
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-base text-gray-600 font-body leading-relaxed">
              {/* COMMENTARY:START — generated by scripts/mlspin/commentary.mjs */}
              <p>
                September brought 1,647 closed sales across Greater Boston, down 21% from August. The median sale price came in at $790,000, down 8% from August, and homes took an average of 46 days to sell, up from 40 days in August. On average, sellers received 100% of their list price. Fall typically brings a seasonal slowdown after the busy spring and summer months.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Buyers:</strong> Homes are sitting a little longer than they were last month, which gives you more time to make decisions and a bit more room to negotiate. The most negotiating room right now is in Sherborn (94% of list, 94 days on market), Carlisle (94% of list, 91 days on market), and Weston (96% of list, 91 days on market). Across the region, homes are still selling at or above asking on average, so a strong first offer still matters.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Sellers:</strong> Ayer, Lynnfield, and Wilmington are the most competitive markets we track this month, with homes selling at 103% of list price or better. With homes taking a bit longer to sell overall, pricing your home right from day one matters more than usual. A listing that starts too high tends to sit, and buyers notice.
              </p>
              <p>
                <strong className="text-[#0D2137]">Notable Standout:</strong> Ashland was one of the fastest-moving markets we track, with homes selling in 21 days on average at 102% of list. On the other end, homes in Brookline averaged 83 days on market, so buyers there have more time to weigh their options.
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
              className="flex-1 bg-[#1A3A5C] border border-white/20 rounded-xl px-4 py-3 text-base font-body text-white placeholder-white/40 focus:outline-none focus:border-[#C89B3C]"
            />
            <button type="submit" disabled={submitting} className="btn-light text-sm whitespace-nowrap">
              {submitting ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
