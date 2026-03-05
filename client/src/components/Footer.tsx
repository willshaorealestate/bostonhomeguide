/*
 * Footer.tsx — BostonHomeGuide.com
 * Refined Coastal Luxury: Deep navy footer, gold accents, comprehensive links
 */
import { Link } from "wouter";
import { Phone, Mail, MapPin, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D2137] text-white/80">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span
                className="font-display text-2xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Boston<span style={{ color: "#C89B3C" }}>Home</span>Guide
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-white/60">
              Your trusted guide to buying and selling homes in Greater Boston &
              MetroWest Massachusetts. Serving 37+ communities with expertise and care.
            </p>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[#C89B3C] text-[#C89B3C]" />
              ))}
              <span className="text-sm text-white/70 ml-1">5.0 · 48 Reviews</span>
            </div>
            <p className="text-xs text-white/50">Zillow · Google · Realtor.com</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4 text-base">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Buy a Home", href: "/buy" },
                { label: "Sell Your Home", href: "/sell" },
                { label: "Home Search", href: "/search" },
                { label: "Neighborhood Guides", href: "/neighborhoods" },
                { label: "Market Reports", href: "/market" },
                { label: "Mortgage Calculator", href: "/mortgage" },
                { label: "Blog & Resources", href: "/blog" },
                { label: "About Will", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#C89B3C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4 text-base">
              Service Areas
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {[
                "Newton", "Brookline", "Natick", "Framingham",
                "Wayland", "Wellesley", "Needham", "Dedham",
                "Westwood", "Concord", "Lexington", "Waltham",
                "Belmont", "Arlington", "Winchester", "Acton",
              ].map((town) => (
                <Link
                  key={town}
                  href={`/neighborhoods/${town.toLowerCase()}`}
                  className="text-xs text-white/55 hover:text-[#C89B3C] transition-colors"
                >
                  {town}
                </Link>
              ))}
            </div>
            <Link
              href="/neighborhoods"
              className="mt-3 inline-block text-xs text-[#C89B3C] hover:underline"
            >
              View all 37+ communities →
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4 text-base">
              Contact Will
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+17814563541"
                className="flex items-start gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#C89B3C]" />
                (781) 456-3541
              </a>
              <a
                href="mailto:will@willshao.com"
                className="flex items-start gap-2.5 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#C89B3C]" />
                will@willshao.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#C89B3C]" />
                Greater Boston & MetroWest, MA
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Follow</p>
              <div className="flex gap-3">
                {[
                  { label: "Zillow", href: "https://zillow.com/profile/willshao" },
                  { label: "Instagram", href: "#" },
                  { label: "Facebook", href: "#" },
                  { label: "LinkedIn", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-[#C89B3C] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs text-white/40 mb-1">Languages</p>
              <p className="text-sm text-white/60">English · 普通话 (Mandarin)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} BostonHomeGuide.com</span>
            <span>·</span>
            <span>Will Shao, REMAX Executive Realty</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>Equal Housing Opportunity</span>
            <span>·</span>
            <a href="#" className="hover:text-white/60">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white/60">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
