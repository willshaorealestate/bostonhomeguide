/*
 * About.tsx — BostonHomeGuide.com
 * About Will Shao — story, credentials, testimonials, and community involvement
 */
import { Link } from "wouter";
import {
  Award, Star, Users, Home, Globe, Heart, CheckCircle, Quote
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const WILL_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/will-shao-bg-Nt9VYEqMxYFWKYNYjPnMGP.webp";

const testimonials = [
  {
    name: "Michael & Jennifer Chen",
    location: "Newton, MA",
    stars: 5,
    text: "Will helped us buy our first home in Newton. As first-time buyers, we were nervous, but Will explained every step in both English and Mandarin. He found us a home we love, under budget, in a competitive market. We can't recommend him enough.",
    date: "January 2026",
  },
  {
    name: "David & Sarah Thompson",
    location: "Wellesley, MA",
    stars: 5,
    text: "We were relocating from California and needed someone who truly knew Greater Boston. Will was incredibly knowledgeable about every town — schools, commutes, market trends. He helped us find the perfect home in Wellesley in just 3 weeks.",
    date: "December 2025",
  },
  {
    name: "Robert & Lisa Park",
    location: "Natick, MA",
    stars: 5,
    text: "Will sold our Natick home in 8 days for 6% over asking. His marketing strategy was exceptional — professional photos, 3D tour, and targeted advertising. He made the whole process stress-free.",
    date: "November 2025",
  },
  {
    name: "Wei & Mei Zhang",
    location: "Lexington, MA",
    stars: 5,
    text: "作为中国移民，我们非常感激能找到一位说普通话的经纪人。Will不仅语言上帮助了我们，更用他对大波士顿市场的深刻了解帮助我们在Lexington找到了完美的家。强烈推荐！",
    date: "October 2025",
  },
  {
    name: "James & Patricia O'Brien",
    location: "Framingham, MA",
    stars: 5,
    text: "Will helped us downsize after our kids left for college. He was patient, understanding, and found us the perfect condo in Framingham. The whole process was smooth and he got us a great price.",
    date: "September 2025",
  },
  {
    name: "Anita & Raj Patel",
    location: "Needham, MA",
    stars: 5,
    text: "We interviewed 4 agents before choosing Will. His market knowledge, communication, and professionalism were head and shoulders above the rest. He helped us win a competitive offer in Needham — our dream neighborhood.",
    date: "August 2025",
  },
];

const credentials = [
  "Licensed Massachusetts Real Estate Agent",
  "REMAX Executive Realty — Top Producer",
  "18+ Years Greater Boston Experience",
  "Fluent English & Mandarin (普通话)",
  "Certified Buyer's Representative (CBR)",
  "Zillow Premier Agent — 5.0 Stars",
  "MLSPIN Member",
  "National Association of REALTORS® Member",
];

const stats = [
  { value: "212+", label: "Homes Sold" },
  { value: "18 yrs", label: "Experience" },
  { value: "5.0★", label: "Zillow Rating" },
  { value: "48", label: "Reviews" },
  { value: "37+", label: "Communities Served" },
  { value: "103.4%", label: "Avg. List-to-Sale" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 min-h-[55vh] flex items-center"
        style={{
          backgroundImage: `url(${WILL_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D2137]/90 via-[#0D2137]/70 to-transparent" />
        <div className="relative z-10 container">
          <div className="max-w-xl">
            <p className="section-label mb-3">Meet Your Agent</p>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Will Shao
            </h1>
            <p className="text-[#C89B3C] font-body text-lg font-semibold mb-2">
              Buyer's Agent · REMAX Executive Realty
            </p>
            <p className="text-white/80 font-body text-base leading-relaxed mb-6">
              18 years of experience. 212+ homes sold. Fluent in English and Mandarin.
              Serving Greater Boston and MetroWest MA with integrity and expertise.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendar.app.google/rp3dJPWTjzaV9W1W7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm"
              >
                Book a Consultation
              </a>
              <a href="tel:+17814563541" className="btn-outline-gold text-sm">
                Call (781) 456-3541
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#0D2137] py-8">
        <div className="container">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="text-xl md:text-2xl font-bold text-[#C89B3C]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-white/50 font-body mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="gold-rule" />
              <p className="section-label mb-2">Will's Story</p>
              <h2
                className="text-3xl font-bold text-[#0D2137] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                A Trusted Guide for Greater Boston Home Buyers
              </h2>
              <div className="space-y-4 text-sm text-gray-600 font-body leading-relaxed">
                <p>
                  Will Shao has been helping buyers and sellers navigate the Greater Boston
                  real estate market for over 18 years. Born in China and raised in Boston,
                  Will brings a unique perspective to real estate — combining deep local
                  knowledge with the ability to serve both English and Mandarin-speaking clients.
                </p>
                <p>
                  After graduating from Boston University, Will began his real estate career
                  at REMAX Executive Realty, where he quickly established himself as one of
                  the region's top buyer's agents. His approach is simple: listen carefully,
                  educate thoroughly, and negotiate relentlessly on behalf of his clients.
                </p>
                <p>
                  Will specializes in helping buyers find their perfect home in Greater Boston
                  and MetroWest — from first-time buyers navigating the process for the first
                  time to experienced investors expanding their portfolios. His bilingual
                  capabilities have made him the go-to agent for Greater Boston's growing
                  Mandarin-speaking community.
                </p>
                <p>
                  When he's not helping clients, Will is actively involved in the Greater
                  Boston community — volunteering with local housing nonprofits, mentoring
                  new agents, and exploring the neighborhoods he loves.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Credentials */}
              <div className="bg-[#FAF8F4] rounded-lg p-6 border border-gray-100">
                <h3
                  className="text-lg font-bold text-[#0D2137] mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Credentials & Certifications
                </h3>
                <div className="space-y-2.5">
                  {credentials.map((c) => (
                    <div key={c} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#C89B3C] shrink-0" />
                      <span className="text-sm text-gray-600 font-body">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-[#0D2137] rounded-lg p-6">
                <Globe className="w-6 h-6 text-[#C89B3C] mb-3" />
                <h3
                  className="text-white font-bold text-lg mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Bilingual Service
                </h3>
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  Will provides full real estate services in both <strong className="text-white">English</strong> and{" "}
                  <strong className="text-white">Mandarin (普通话)</strong>. All communications,
                  contracts, and guidance are available in your preferred language.
                </p>
                <p className="text-white/50 text-xs font-body mt-3">
                  威尔邵为大波士顿地区的中文客户提供全面的房地产服务。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#FAF8F4]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="gold-rule mx-auto" />
            <h2
              className="text-3xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Will's Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Client-First",
                desc: "Every decision is made with your best interests at heart. Will's loyalty is 100% to you — never to the seller.",
              },
              {
                icon: Award,
                title: "Expertise",
                desc: "18 years of Greater Boston market knowledge means Will can identify opportunities and risks that others miss.",
              },
              {
                icon: Globe,
                title: "Inclusivity",
                desc: "Bilingual service in English and Mandarin ensures every client receives the same quality of guidance.",
              },
              {
                icon: Heart,
                title: "Community",
                desc: "Will is deeply invested in the communities he serves — not just as an agent, but as a neighbor and community member.",
              },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-lg p-6 border border-gray-100 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#0D2137] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-[#C89B3C]" />
                  </div>
                  <h3
                    className="font-bold text-[#0D2137] text-base mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-body leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="gold-rule mx-auto" />
            <p className="section-label mb-2">Client Reviews</p>
            <h2
              className="text-3xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Clients Say About Will
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C89B3C] text-[#C89B3C]" />
              ))}
              <span className="text-[#0D2137] font-semibold font-body ml-1">5.0 · 48 reviews on Zillow</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#FAF8F4] rounded-lg p-6 border border-gray-100 relative">
                <Quote className="w-6 h-6 text-[#C89B3C]/30 absolute top-4 right-4" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-body leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#0D2137] font-body">{t.name}</p>
                    <p className="text-xs text-gray-400 font-body">{t.location}</p>
                  </div>
                  <p className="text-xs text-gray-400 font-body">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://zillow.com/profile/willshao"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-sm"
            >
              Read All 48 Reviews on Zillow →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0D2137]">
        <div className="container text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Work with Will?
          </h2>
          <p className="text-white/70 font-body text-sm mb-6 max-w-xl mx-auto">
            Whether you're buying your first home or selling a longtime family property,
            Will is ready to guide you every step of the way.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://calendar.app.google/rp3dJPWTjzaV9W1W7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm"
            >
              Book a Free Consultation
            </a>
            <Link href="/contact" className="btn-outline-gold text-sm">
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
