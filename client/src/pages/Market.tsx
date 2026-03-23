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

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-skyline-night-k5Nv97BwMFAzzw7y57EB26.webp";

// Last updated: March 2026 — Sources: MAR, Redfin, Dorchester Post, Boston Agent Magazine
const priceData = [
  { month: "Sep '25", median: 880000, sales: 1850 },
  { month: "Oct '25", median: 800000, sales: 1420 },
  { month: "Nov '25", median: 780000, sales: 1050 },
  { month: "Dec '25", median: 762000, sales: 820 },
  { month: "Jan '26", median: 825000, sales: 780 },
  { month: "Feb '26", median: 813000, sales: 960 },
  { month: "Mar '26", median: 850000, sales: 1380 },
];

const domData = [
  { month: "Sep '25", dom: 28 },
  { month: "Oct '25", dom: 32 },
  { month: "Nov '25", dom: 38 },
  { month: "Dec '25", dom: 44 },
  { month: "Jan '26", dom: 47 },
  { month: "Feb '26", dom: 39 },
  { month: "Mar '26", dom: 33 },
];

const townData = [
  { town: "Newton",     medianPrice: 1500000, dom: 43, listToSale: 101.2, inventory: 35 },
  { town: "Wellesley",  medianPrice: 1650000, dom: 38, listToSale: 102.1, inventory: 22 },
  { town: "Brookline",  medianPrice: 1600000, dom: 21, listToSale:  98.0, inventory: 16 },
  { town: "Natick",     medianPrice:  933000, dom: 41, listToSale: 101.5, inventory: 48 },
  { town: "Lexington",  medianPrice: 1270000, dom: 50, listToSale: 100.8, inventory: 32 },
  { town: "Needham",    medianPrice: 1350000, dom: 32, listToSale: 101.3, inventory: 85 },
  { town: "Framingham", medianPrice:  672000, dom: 45, listToSale: 100.2, inventory: 68 },
  { town: "Waltham",    medianPrice:  750000, dom: 36, listToSale: 100.8, inventory: 42 },
];

const formatPrice = (v: number) => `$${(v / 1000).toFixed(0)}K`;
const formatFullPrice = (v: number) => `$${v.toLocaleString()}`;

export default function MarketPage() {
  useSEO({
    title: "Greater Boston Real Estate Market Report | March 2026",
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
              <span>Updated March 2026 · Next report: April 1, 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="bg-[#C89B3C] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "$813,000", label: "Median Sale Price", change: "-2.7% YoY" },
              { value: "39 days", label: "Avg. Days on Market", change: "+7 days YoY" },
              { value: "~100.5%", label: "List-to-Sale Ratio", change: "Varies by town" },
              { value: "2.8 mo", label: "Months of Supply", change: "+0.9 mo YoY" },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-2xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>{m.value}</p>
                <p className="text-xs text-[#0D2137]/70 font-body mt-0.5">{m.label}</p>
                <p className="text-xs font-semibold text-[#0D2137]/80 font-body mt-0.5">{m.change}</p>
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
                Median sale price trend across Greater Boston — last 7 months
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
                March 2026 market data by town
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Town</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Median Price</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Days on Market</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">List/Sale %</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Inventory</th>
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
                <p className="text-xs text-[#C89B3C] font-body font-semibold tracking-wider uppercase mb-1">Will's Market Commentary</p>
                <h3 className="text-xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  March 2026 — What This Means for You
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-sm text-gray-600 font-body leading-relaxed">
              <p>
                Greater Boston's spring market is off to a strong start. Median prices have
                risen 6.2% year-over-year to $875,000, while days on market have compressed
                to just 18 days — indicating strong buyer demand and limited inventory.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Buyers:</strong> Competition is
                intensifying as spring inventory comes online. Buyers who are pre-approved and
                ready to move quickly are winning. Multiple offer situations remain common in
                Newton, Wellesley, and Lexington, where list-to-sale ratios exceed 105%.
              </p>
              <p>
                <strong className="text-[#0D2137]">For Sellers:</strong> Now is an excellent
                time to list. Well-priced homes in desirable communities are selling in under
                two weeks with multiple offers. The window for maximum pricing power is open.
              </p>
              <p>
                <strong className="text-[#0D2137]">MetroWest Opportunity:</strong> Framingham
                and Natick continue to offer the best value in the region, with prices 20-30%
                below Newton and Wellesley while maintaining excellent school districts and
                commuter rail access.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0D2137] text-sm font-body">Will Shao</p>
                <p className="text-xs text-gray-400 font-body">REMAX Executive Realty · (781) 456-3541</p>
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
          <p className="text-white/60 font-body text-sm mb-6">
            Data-driven insights delivered to your inbox every month. Free, no spam, unsubscribe anytime.
          </p>
          <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-[#1A3A5C] border border-white/20 rounded px-4 py-3 text-sm font-body text-white placeholder-white/40 focus:outline-none focus:border-[#C89B3C]"
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
