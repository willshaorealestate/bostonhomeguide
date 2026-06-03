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

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-skyline-night-k5Nv97BwMFAzzw7y57EB26.webp";

// Last updated: May 2026 — Source: MLSPIN Area Market Survey (SF + CC), individual town reports
const priceData = [
  { month: "Oct '25", median: 810000, sales: 1871 },
  { month: "Nov '25", median: 810000, sales: 1576 },
  { month: "Dec '25", median: 775000, sales: 1779 },
  { month: "Jan '26", median: 805000, sales: 1105 },
  { month: "Feb '26", median: 750000, sales:  943 },
  { month: "Mar '26", median: 810000, sales: 1233 },
  { month: "Apr '26", median: 860000, sales: 1494 },
  { month: "May '26", median: 850000, sales: 2068 },
];

const domData = [
  { month: "Oct '25", dom: 42 },
  { month: "Nov '25", dom: 43 },
  { month: "Dec '25", dom: 51 },
  { month: "Jan '26", dom: 61 },
  { month: "Feb '26", dom: 63 },
  { month: "Mar '26", dom: 57 },
  { month: "Apr '26", dom: 43 },
  { month: "May '26", dom: 35 },
];

const townData = [
  { town: "Boston",     medianPrice:  822000, dom: 44, listToSale: 100.0, inventory: 644 },
  { town: "Newton",     medianPrice: 1695000, dom: 40, listToSale: 103.0, inventory:  83 },
  { town: "Wellesley",  medianPrice: 2628000, dom: 62, listToSale: 102.0, inventory:  20 },
  { town: "Brookline",  medianPrice: 1280000, dom: 43, listToSale: 100.0, inventory:  68 },
  { town: "Natick",     medianPrice:  775000, dom: 38, listToSale:  99.0, inventory:  23 },
  { town: "Lexington",  medianPrice: 1685000, dom: 29, listToSale: 104.0, inventory:  40 },
  { town: "Needham",    medianPrice: 1607500, dom: 34, listToSale: 101.0, inventory:  29 },
  { town: "Framingham", medianPrice:  700000, dom: 26, listToSale: 103.0, inventory:  33 },
  { town: "Waltham",    medianPrice:  813300, dom: 31, listToSale: 101.0, inventory:  27 },
];

const formatPrice = (v: number) => `$${(v / 1000).toFixed(0)}K`;
const formatFullPrice = (v: number) => `$${v.toLocaleString()}`;

export default function MarketPage() {
  useSEO({
    title: "Greater Boston Real Estate Market Report | May 2026",
    description: "Monthly market data for Greater Boston and MetroWest MA. Median prices, days on market, inventory, and list-to-sale ratios for Newton, Wellesley, Natick, Lexington, and more.",
    canonical: "https://bostonhomeguide.com/market",
  });
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"price" | "dom" | "towns">("price");

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
              Monthly data-driven insights on prices, inventory, and trends across Greater Boston's most sought-after towns.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm font-body">
              <Calendar className="w-4 h-4" />
              <span>Updated May 2026 · Next report: July 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-[#C89B3C] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$850,000", label: "Median Sale Price", change: "MLSPIN, May 2026" },
              { value: "35 days", label: "Avg. Days on Market", change: "SF + Condo, Greater Boston" },
              { value: "102%", label: "List-to-Sale Ratio", change: "Above asking, on average" },
              { value: "1.0 mo", label: "Months of Supply", change: "2,020 active / 2,068 sold" },
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
                Median sale price trend across Greater Boston — Oct '25 through May '26
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

          {activeTab === "towns" && (
            <div>
              <p className="text-sm text-gray-500 font-body mb-6">
                May 2026 market data by town — Source: MLSPIN
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Town</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Median Price</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Days on Market</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">List/Sale %</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">Inventory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {townData.map((t, i) => (
                      <tr key={t.town} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-[#FAF8F4]" : "bg-white"}`}>
                        <td className="py-3 px-4 font-semibold text-[#0D2137]">{t.town}</td>
                        <td className="py-3 px-4 text-right text-[#0D2137]">{formatFullPrice(t.medianPrice)}</td>
                        <td className="py-3 px-4 text-right text-[#0D2137]">{t.dom} days</td>
                        <td className="py-3 px-4 text-right font-semibold text-green-600">{t.listToSale}%</td>
                        <td className="py-3 px-4 text-right text-[#0D2137]">{t.inventory}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
                  May 2026 — What This Means for You
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-base text-gray-600 font-body leading-relaxed">
              <p>
                May 2026 delivered the highest sales volume of the year so far — 2,068 closed
                transactions — while inventory stayed extremely tight at just 1.0 month of supply.
                The median sale price held steady at $850,000, essentially flat from April's
                $860,000. The overall list-to-sale ratio remained at 102%, and days on market
                fell further to 35 days, the fastest pace in months.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Buyers:</strong> The market is moving
                quickly. Framingham (26 days) and Lexington (29 days) are the fastest markets
                this month. Lexington is running at 104% list-to-sale — expect to bid well
                above asking in that town. Natick is the one relative soft spot at 99%,
                meaning you may have a bit more negotiating room there. Come pre-approved
                and be ready to write competitive offers.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Sellers:</strong> Conditions remain
                favorable. With only 1.0 month of supply region-wide, well-priced homes are
                moving fast and drawing multiple offers. Framingham (103%) and Lexington (104%)
                are outperforming on list-to-sale. If you've been waiting to list, summer
                typically sees slightly more inventory — listing now puts you ahead of that
                competition.
              </p>
              <p>
                <strong className="text-[#0D2137]">Notable Standout:</strong> Wellesley's
                median came in at $2,628,000 in May — a reflection of a luxury-heavy month
                with only 23 closed sales. Active inventory there is razor-thin at just 20
                listings. If you're considering Wellesley, acting now while a handful of
                quality properties are available gives you the best selection before fall.
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
