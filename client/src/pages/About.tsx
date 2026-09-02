/*
 * About.tsx — BostonHomeGuide.com
 * About Will Shao — story, credentials, testimonials, and community involvement
 */
import { Link } from "wouter";
import {
  Award, Star, Users, Globe, Heart, CheckCircle, Quote
} from "lucide-react";
import { useSEO } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const WILL_BG = "/images/site/photo.jpg";

const testimonials = [
  {
    name: "Jake Uminski",
    location: "Greater Boston, MA",
    stars: 5,
    text: "Will Shao is attentive, knowledgeable, and tenacious. Not only did he curate an extensive list of homes catered to our needs and wants, but he was able to help us easily navigate all the complexities of the home buying process. We were so grateful to have Will in our corner!",
    date: "February 2025 · Google",
  },
  {
    name: "Meng-Ju Wu",
    location: "Westborough, MA",
    stars: 5,
    text: "This was our first time purchasing a single-family home and we were quite nervous. From the start, Will provided clear, honest guidance and helped us understand every step, from house hunting to closing. He took the time to visit every property and patiently explained the pros and cons of each one. What really stood out was the personal touch — Will was genuinely invested in helping us find not just a house, but the right home for our family.",
    date: "October 2024 · Google",
  },
  {
    name: "V.R.",
    location: "Greater Boston, MA",
    stars: 5,
    text: "Once we found our dream home, Will offered great advice on how to structure the offer and make it compelling — allowing our offer to stand out amongst multiple interested parties. Throughout this process, Will was super engaged, prompt, and courteous. Within three months we went from initiating a search to closing on a beautiful home. I highly recommend this team to any prospective buyers or sellers.",
    date: "July 2023 · Google",
  },
  {
    name: "Shang S.",
    location: "Sold a condo in Boston, MA",
    stars: 5,
    text: "Will is a consummate professional who went above and beyond to make sure I sold my house. I was away during most of the selling process — I'd already moved across the country — yet everything went as smoothly as it could. Will is honest, informative, and clear. Throughout inspection and negotiation he remained calm, knowledgeable, and creative. He communicates clearly, follows up on all open items, and worked around my busy schedule with full flexibility. I highly recommend Will as a trusted professional for both selling and buying.",
    date: "August 2012 · Yelp",
  },
  {
    name: "Michael Baker",
    location: "Eastern Massachusetts",
    stars: 5,
    text: "Truly exceptional service by Will and his teammate Rachael. Our move was from out of state during an extremely difficult market for buyers. Will's expert advice, patience, and dedication to finding our next home made all the difference. His professionalism is second to none — I wouldn't want to purchase a home with anyone else.",
    date: "October 2021 · Google",
  },
  {
    name: "Mark Fung-a-fat",
    location: "Greater Boston, MA",
    stars: 5,
    text: "Will's mantra was 'be prepared, be patient, and be persistent — all of my clients will get a house.' I was skeptical but his calm confidence and sound advice landed us a home in one of the best school districts in a fantastic neighborhood. In fact, the seller said 'you got this house because of your agent — he really knows what he is doing.' Thank you Will for helping us remain calm in this nutty market.",
    date: "June 2021 · Google",
  },
];

const credentials = [
  "Licensed Massachusetts Real Estate Agent",
  "REMAX Executive Realty — Top Producer",
  "REMAX Hall of Fame Award",
  "REMAX Platinum Level",
  "Top 100 Real Estate Agent in MA — 2025 (out of ~1,000 MA agents)",
  "Consistently Top 20 in Office (170+ agents)",
  "Nearly 20 Years Greater Boston Experience",
  "Zillow Premier Agent — 5.0 Stars",
  "Conversational Mandarin",
  "MLSPIN Member",
  "National Association of REALTORS® Member",
];

const stats = [
  { value: "$120M+", label: "In Transactions" },
  { value: "~20 yrs", label: "Experience" },
  { value: "5.0★", label: "Zillow Rating" },
  { value: "48", label: "Reviews" },
  { value: "70+", label: "Towns Served" },
  { value: "103.4%", label: "Avg. List-to-Sale" },
];

export default function AboutPage() {
  useSEO({
    title: "About Will Shao | RE/MAX Executive Realty | Greater Boston Realtor",
    description: "Nearly 20 years experience, $120M+ in transactions across Greater Boston and MetroWest MA. Will Shao is a top-rated RE/MAX agent with a 5.0★ Zillow rating. Bilingual English & Mandarin.",
    canonical: "https://bostonhomeguide.com/about",
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Will Shao",
      "jobTitle": "Real Estate Agent",
      "url": "https://bostonhomeguide.com/about",
      "telephone": "(781) 456-3541",
      "email": "will@willshao.com",
      "knowsLanguage": ["en", "zh"],
      "worksFor": { "@type": "Organization", "name": "RE/MAX Executive Realty" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "48", "bestRating": "5" }
    }
  });
  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      {/* Hero */}
      <section className="bg-[#0D2137] pt-28 pb-0">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-end">
            {/* Text */}
            <div className="py-12 lg:py-16 pr-0 lg:pr-12">
              <p className="section-label mb-3">Meet Your Agent</p>
              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Will Shao
              </h1>
              <p className="text-[#C89B3C] font-body text-lg font-semibold mb-2">
                REALTOR® · Buyer &amp; Seller Representation · REMAX Executive Realty
              </p>
              <p className="text-white/80 font-body text-base leading-relaxed mb-6">
                Nearly 20 years of experience. $120M+ in transactions.
                Serving Greater Boston and MetroWest MA with integrity and expertise.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://calendar.app.google/sGPHDTZGiH9zdE8x5"
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
            {/* Photo */}
            <div className="flex items-end justify-center lg:justify-end">
              <img
                src={WILL_BG}
                alt="Will Shao — Greater Boston REALTOR®"
                className="w-full max-w-sm lg:max-w-md object-cover object-top rounded-t-lg"
                style={{ maxHeight: "480px" }}
              />
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
                  className="text-2xl md:text-3xl font-bold text-[#C89B3C]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-white/50 font-body mt-0.5">{s.label}</p>
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
                className="text-4xl font-bold text-[#0D2137] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                A Trusted Guide for Greater Boston Buyers &amp; Sellers
              </h2>
              <div className="space-y-4 text-base text-gray-600 font-body leading-relaxed">
                <p>
                  Will Shao has been helping buyers and sellers navigate the Greater Boston
                  real estate market for nearly 20 years. He represents clients on both sides
                  of the transaction — from first-time buyers finding their perfect home to
                  sellers maximizing their return in a competitive market.
                </p>
                <p>
                  At REMAX Executive Realty, Will has earned the REMAX Hall of Fame Award
                  and REMAX Platinum level — recognition reserved for agents who consistently
                  deliver exceptional results. In 2025, he was named one of the Top 100 Real
                  Estate Agents in Massachusetts out of approximately 1,000 licensed agents
                  statewide, and he is consistently ranked in the Top 20 within his own office
                  of more than 170 agents.
                </p>
                <p>
                  His approach is simple: listen carefully, educate thoroughly, and negotiate
                  relentlessly on behalf of his clients. Will also assists clients who prefer
                  to communicate in Mandarin on a conversational basis.
                </p>
                <p>
                  Outside of real estate, Will is deeply rooted in the community. He coaches
                  youth basketball, serves in his church, attends Chinese school with his kids,
                  plays pick-up basketball, and cheers his children on at their various sporting
                  and recreational activities.
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
                      <span className="text-base text-gray-600 font-body">{c}</span>
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
                  Language
                </h3>
                <p className="text-white/70 font-body text-base leading-relaxed">
                  Will conducts all real estate services in <strong className="text-white">English</strong> and
                  has conversational <strong className="text-white">Mandarin</strong> ability —
                  helpful for clients who prefer some Mandarin communication during the process.
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
              className="text-4xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Will's Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Integrity & Honesty",
                desc: "Will tells you what you need to hear, not just what you want to hear — honest guidance at every step of the transaction.",
              },
              {
                icon: Award,
                title: "Professional Expertise",
                desc: "Nearly 20 years of Greater Boston market knowledge, Top 100 in MA, and consistently Top 20 in his office of 170+ agents.",
              },
              {
                icon: Users,
                title: "Respect & Fairness",
                desc: "Every client deserves equal care, transparency, and respect — regardless of background, budget, or experience level.",
              },
              {
                icon: Heart,
                title: "Community",
                desc: "Will is deeply invested in the communities he serves — coaching youth basketball, serving in his church, and raising his family here.",
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
                  <p className="text-base text-gray-500 font-body leading-relaxed">{v.desc}</p>
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
              className="text-4xl font-bold text-[#0D2137]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What Clients Say About Will
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C89B3C] text-[#C89B3C]" />
              ))}
              <span className="text-[#0D2137] font-semibold font-body ml-1">5.0 · 48 Reviews on Zillow &amp; Google</span>
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
                <p className="text-base text-gray-600 font-body leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-[#0D2137] font-body">{t.name}</p>
                    <p className="text-sm text-gray-400 font-body">{t.location}</p>
                  </div>
                  <p className="text-sm text-gray-400 font-body">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href="https://zillow.com/profile/willshao"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-sm"
            >
              Read Reviews on Zillow →
            </a>
            <a
              href="https://www.google.com/maps/place/Will+Shao+-+Greater+Boston+Real+Estate+Agent/@42.396144,-71.5891231,10z/data=!4m16!1m9!3m8!1s0x89e389477f2c7b09:0x6c87515ce456b0de!2sWill+Shao+-+Greater+Boston+Real+Estate+Agent!8m2!3d42.396109!4d-71.2594615!9m1!1b1!16s%2Fg%2F11qswmf7zz!3m5!1s0x89e389477f2c7b09:0x6c87515ce456b0de!8m2!3d42.396109!4d-71.2594615!16s%2Fg%2F11qswmf7zz?hl=en-US&entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold text-sm"
            >
              Read Reviews on Google →
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
          <p className="text-white/70 font-body text-base mb-6 max-w-xl mx-auto">
            Whether you're buying your first home or selling a longtime family property,
            Will is ready to guide you every step of the way.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://calendar.app.google/sGPHDTZGiH9zdE8x5"
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
