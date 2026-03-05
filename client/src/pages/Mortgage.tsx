/*
 * Mortgage.tsx — BostonHomeGuide.com
 * Full interactive mortgage calculator with amortization schedule
 */
import { useState, useMemo } from "react";
import { DollarSign, Percent, Calendar, Home, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { toast } from "sonner";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function calcMortgage(homePrice: number, downPayment: number, rate: number, termYears: number, tax: number, hoa: number, insurance: number) {
  const principal = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const n = termYears * 12;
  let monthlyPI = 0;
  if (monthlyRate === 0) {
    monthlyPI = principal / n;
  } else {
    monthlyPI = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }
  const monthlyTax = tax / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyHOA = hoa;
  const total = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA;
  const totalInterest = monthlyPI * n - principal;
  return { monthlyPI, monthlyTax, monthlyInsurance, monthlyHOA, total, totalInterest, principal };
}

function buildAmortization(principal: number, rate: number, termYears: number) {
  const monthlyRate = rate / 100 / 12;
  const n = termYears * 12;
  let balance = principal;
  const rows: { year: number; payment: number; principal: number; interest: number; balance: number }[] = [];
  let monthlyPI = 0;
  if (monthlyRate === 0) {
    monthlyPI = principal / n;
  } else {
    monthlyPI = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }

  for (let year = 1; year <= termYears; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      yearInterest += interestPayment;
      yearPrincipal += principalPayment;
      balance -= principalPayment;
    }
    rows.push({
      year,
      payment: monthlyPI * 12,
      principal: yearPrincipal,
      interest: yearInterest,
      balance: Math.max(0, balance),
    });
  }
  return rows;
}

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useState(875000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);
  const [tax, setTax] = useState(8750);
  const [hoa, setHoa] = useState(0);
  const [insurance, setInsurance] = useState(1500);
  const [showAmort, setShowAmort] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });

  const downPayment = (homePrice * downPct) / 100;
  const result = useMemo(
    () => calcMortgage(homePrice, downPayment, rate, term, tax, hoa, insurance),
    [homePrice, downPayment, rate, term, tax, hoa, insurance]
  );

  const amortRows = useMemo(
    () => buildAmortization(result.principal, rate, term),
    [result.principal, rate, term]
  );

  const pieData = [
    { name: "Principal & Interest", value: Math.round(result.monthlyPI) },
    { name: "Property Tax", value: Math.round(result.monthlyTax) },
    { name: "Insurance", value: Math.round(result.monthlyInsurance) },
    { name: "HOA", value: Math.round(result.monthlyHOA) },
  ].filter((d) => d.value > 0);

  const COLORS = ["#0D2137", "#C89B3C", "#1976A8", "#1A3A5C"];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Great! Will will connect you with a trusted local lender within 1 business day.");
    setLeadForm({ name: "", email: "", phone: "" });
  };

  const SliderInput = ({
    label, value, min, max, step, onChange, format, icon
  }: {
    label: string; value: number; min: number; max: number; step: number;
    onChange: (v: number) => void; format: (v: number) => string; icon: React.ReactNode;
  }) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-xs font-semibold text-[#0D2137] font-body uppercase tracking-wide">
          {icon}{label}
        </label>
        <span className="text-sm font-bold text-[#0D2137] font-body">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: "#C89B3C" }}
      />
      <div className="flex justify-between text-xs text-gray-400 font-body mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section className="bg-[#0D2137] pt-32 pb-16">
        <div className="container text-center">
          <p className="section-label mb-3">Planning Tools</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Mortgage Calculator
          </h1>
          <p className="text-white/70 font-body text-lg max-w-xl mx-auto">
            Estimate your monthly payment, total interest, and amortization schedule for any
            Greater Boston home.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator inputs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-[#0D2137] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Loan Details
                </h2>
                <div className="space-y-6">
                  <SliderInput
                    label="Home Price"
                    value={homePrice}
                    min={200000}
                    max={3000000}
                    step={25000}
                    onChange={setHomePrice}
                    format={(v) => formatCurrency(v)}
                    icon={<Home className="w-3.5 h-3.5 text-[#C89B3C]" />}
                  />
                  <SliderInput
                    label="Down Payment"
                    value={downPct}
                    min={3}
                    max={50}
                    step={1}
                    onChange={setDownPct}
                    format={(v) => `${v}% (${formatCurrency((homePrice * v) / 100)})`}
                    icon={<DollarSign className="w-3.5 h-3.5 text-[#C89B3C]" />}
                  />
                  <SliderInput
                    label="Interest Rate"
                    value={rate}
                    min={3}
                    max={12}
                    step={0.125}
                    onChange={setRate}
                    format={(v) => `${v.toFixed(3)}%`}
                    icon={<Percent className="w-3.5 h-3.5 text-[#C89B3C]" />}
                  />
                  <div>
                    <label className="block text-xs font-semibold text-[#0D2137] mb-2 font-body uppercase tracking-wide">
                      Loan Term
                    </label>
                    <div className="flex gap-3">
                      {[10, 15, 20, 30].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTerm(t)}
                          className={`flex-1 py-2 rounded text-sm font-body font-medium transition-colors ${
                            term === t
                              ? "bg-[#0D2137] text-white"
                              : "bg-[#FAF8F4] text-[#0D2137] hover:bg-gray-100"
                          }`}
                        >
                          {t} yr
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-[#0D2137] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Monthly Costs
                </h2>
                <div className="space-y-5">
                  <SliderInput
                    label="Annual Property Tax"
                    value={tax}
                    min={0}
                    max={30000}
                    step={500}
                    onChange={setTax}
                    format={(v) => formatCurrency(v)}
                    icon={<Calendar className="w-3.5 h-3.5 text-[#C89B3C]" />}
                  />
                  <SliderInput
                    label="Annual Home Insurance"
                    value={insurance}
                    min={0}
                    max={10000}
                    step={100}
                    onChange={setInsurance}
                    format={(v) => formatCurrency(v)}
                    icon={<Home className="w-3.5 h-3.5 text-[#C89B3C]" />}
                  />
                  <SliderInput
                    label="Monthly HOA"
                    value={hoa}
                    min={0}
                    max={2000}
                    step={50}
                    onChange={setHoa}
                    format={(v) => formatCurrency(v)}
                    icon={<DollarSign className="w-3.5 h-3.5 text-[#C89B3C]" />}
                  />
                </div>
              </div>

              {/* Amortization table */}
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FAF8F4] transition-colors"
                  onClick={() => setShowAmort(!showAmort)}
                >
                  <h2 className="text-lg font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Amortization Schedule
                  </h2>
                  {showAmort ? <ChevronUp className="w-5 h-5 text-[#C89B3C]" /> : <ChevronDown className="w-5 h-5 text-[#C89B3C]" />}
                </button>
                {showAmort && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="bg-[#FAF8F4] border-y border-gray-100">
                          <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Year</th>
                          <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Principal</th>
                          <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Interest</th>
                          <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortRows.map((row, i) => (
                          <tr key={row.year} className={`border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-[#FAF8F4]"}`}>
                            <td className="py-2.5 px-4 text-[#0D2137] font-medium">{row.year}</td>
                            <td className="py-2.5 px-4 text-right text-green-600">{formatCurrency(row.principal)}</td>
                            <td className="py-2.5 px-4 text-right text-red-500">{formatCurrency(row.interest)}</td>
                            <td className="py-2.5 px-4 text-right text-[#0D2137]">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Results sidebar */}
            <div className="space-y-5">
              {/* Monthly payment */}
              <div className="bg-[#0D2137] rounded-lg p-6 text-center">
                <p className="text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                  Estimated Monthly Payment
                </p>
                <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {formatCurrency(result.total)}
                </p>
                <p className="text-white/50 text-xs font-body">/month</p>

                <div className="mt-5 pt-5 border-t border-white/10 space-y-2.5">
                  {[
                    { label: "Principal & Interest", value: result.monthlyPI },
                    { label: "Property Tax", value: result.monthlyTax },
                    { label: "Insurance", value: result.monthlyInsurance },
                    ...(result.monthlyHOA > 0 ? [{ label: "HOA", value: result.monthlyHOA }] : []),
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-white/60 font-body">{item.label}</span>
                      <span className="text-white font-semibold font-body">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loan summary */}
              <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm space-y-3">
                {[
                  { label: "Loan Amount", value: formatCurrency(result.principal) },
                  { label: "Down Payment", value: `${formatCurrency(downPayment)} (${downPct}%)` },
                  { label: "Total Interest", value: formatCurrency(result.totalInterest) },
                  { label: "Total Cost", value: formatCurrency(result.principal + result.totalInterest) },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-500 font-body">{item.label}</span>
                    <span className="font-semibold text-[#0D2137] font-body">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Pie chart */}
              <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
                <p className="text-sm font-bold text-[#0D2137] mb-3 font-body">Payment Breakdown</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ fontFamily: "DM Sans", fontSize: 11 }} />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Pre-approval CTA */}
              <div className="bg-[#FAF8F4] rounded-lg p-5 border border-gray-100">
                <TrendingDown className="w-6 h-6 text-[#C89B3C] mb-3" />
                <h3 className="font-bold text-[#0D2137] text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Get Pre-Approved
                </h3>
                <p className="text-xs text-gray-500 font-body mb-4">
                  Will works with trusted local lenders who offer competitive rates for Greater
                  Boston buyers. Get connected today.
                </p>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  {[
                    { key: "name", placeholder: "Your name", type: "text" },
                    { key: "email", placeholder: "Email address", type: "email" },
                    { key: "phone", placeholder: "Phone (optional)", type: "tel" },
                  ].map((f) => (
                    <input
                      key={f.key}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={leadForm[f.key as keyof typeof leadForm]}
                      onChange={(e) => setLeadForm({ ...leadForm, [f.key]: e.target.value })}
                      required={f.key !== "phone"}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-xs font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                    />
                  ))}
                  <button type="submit" className="btn-gold w-full text-xs text-center py-2.5">
                    Connect Me with a Lender
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
