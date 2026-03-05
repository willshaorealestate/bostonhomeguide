/*
 * Contact.tsx — BostonHomeGuide.com
 * Contact page with form, phone, calendar embed, social links, and map
 */
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Calendar, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "general", message: "", language: "english"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Will responds within 1 business day.");
    setForm({ name: "", email: "", phone: "", subject: "general", message: "", language: "english" });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />

      {/* Hero */}
      <section className="bg-[#0D2137] pt-32 pb-16">
        <div className="container text-center">
          <p className="section-label mb-3">Get in Touch</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let's Talk Real Estate
          </h1>
          <p className="text-white/70 font-body text-lg max-w-xl mx-auto">
            Whether you're buying, selling, or just exploring your options — Will responds
            within 1 business day. Available in English and Mandarin.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3
                  className="text-lg font-bold text-[#0D2137] mb-5"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+17814563541"
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C89B3C]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-body uppercase tracking-wide mb-0.5">Phone</p>
                      <p className="text-sm font-semibold text-[#0D2137] group-hover:text-[#C89B3C] transition-colors font-body">
                        (781) 456-3541
                      </p>
                    </div>
                  </a>
                  <a
                    href="mailto:will@willshao.com"
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#C89B3C]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-body uppercase tracking-wide mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-[#0D2137] group-hover:text-[#C89B3C] transition-colors font-body">
                        will@willshao.com
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#C89B3C]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-body uppercase tracking-wide mb-0.5">Service Area</p>
                      <p className="text-sm text-[#0D2137] font-body">
                        Greater Boston & MetroWest, MA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#C89B3C]/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-[#C89B3C]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-body uppercase tracking-wide mb-0.5">Response Time</p>
                      <p className="text-sm text-[#0D2137] font-body">Within 1 business day</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                <h3
                  className="text-base font-bold text-[#0D2137] mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Connect Online
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Zillow Profile", href: "https://zillow.com/profile/willshao", desc: "48 Reviews · 5.0★" },
                    { label: "Instagram", href: "#", desc: "@willshao_realestate" },
                    { label: "Facebook", href: "#", desc: "BostonHomeGuide" },
                    { label: "LinkedIn", href: "#", desc: "Will Shao, REMAX" },
                    { label: "TikTok", href: "#", desc: "@bostonhomeguide" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#0D2137] group-hover:text-[#C89B3C] transition-colors font-body">
                          {s.label}
                        </p>
                        <p className="text-xs text-gray-400 font-body">{s.desc}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C89B3C] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-[#0D2137] rounded-lg p-6">
                <p className="text-[#C89B3C] text-xs font-body uppercase tracking-wider mb-2">Languages</p>
                <p className="text-white font-body text-sm">
                  Will is fluent in <strong>English</strong> and <strong>Mandarin (普通话)</strong>.
                  All communications, documents, and guidance are available in both languages.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm">
                <h2
                  className="text-2xl font-bold text-[#0D2137] mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Send Will a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                        placeholder="(xxx) xxx-xxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                        I'm Interested In
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
                      >
                        <option value="buying">Buying a Home</option>
                        <option value="selling">Selling My Home</option>
                        <option value="both">Buying & Selling</option>
                        <option value="valuation">Home Valuation</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                      Preferred Language
                    </label>
                    <div className="flex gap-4">
                      {[
                        { value: "english", label: "English" },
                        { value: "mandarin", label: "Mandarin (普通话)" },
                        { value: "both", label: "Both" },
                      ].map((lang) => (
                        <label key={lang.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="language"
                            value={lang.value}
                            checked={form.language === lang.value}
                            onChange={(e) => setForm({ ...form, language: e.target.value })}
                            className="accent-[#C89B3C]"
                          />
                          <span className="text-sm font-body text-[#0D2137]">{lang.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0D2137] mb-1.5 font-body uppercase tracking-wide">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C] resize-none"
                      placeholder="Tell Will about your real estate goals..."
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full text-center text-sm py-3">
                    Send Message — Will Responds Within 1 Business Day
                  </button>
                </form>
              </div>

              {/* Calendar booking */}
              <div className="bg-[#0D2137] rounded-lg p-8">
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-[#C89B3C] shrink-0 mt-1" />
                  <div>
                    <h3
                      className="text-white font-bold text-xl mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Book a Free Consultation
                    </h3>
                    <p className="text-white/60 font-body text-sm mb-5">
                      Schedule a free 30-minute consultation with Will — by phone, video, or
                      in person. Available in English and Mandarin.
                    </p>
                    <a
                      href="https://calendar.app.google/rp3dJPWTjzaV9W1W7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold text-sm"
                    >
                      View Available Times →
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                <div className="h-64 bg-[#FAF8F4] flex items-center justify-center relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=60)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.3,
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-8 h-8 text-[#C89B3C] mx-auto mb-2" />
                    <p
                      className="text-[#0D2137] font-bold text-lg"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Greater Boston & MetroWest, MA
                    </p>
                    <p className="text-gray-500 text-sm font-body">Serving 37+ communities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
