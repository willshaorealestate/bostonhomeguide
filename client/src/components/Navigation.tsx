/*
 * Navigation.tsx — BostonHomeGuide.com
 * Refined Coastal Luxury: Sticky transparent-to-navy nav, gold accents, Playfair logo
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  {
    label: "Buy",
    href: "/buy",
    children: [
      { label: "Buyer's Guide", href: "/buy" },
      { label: "Home Search", href: "/search" },
      { label: "Mortgage Calculator", href: "/mortgage" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    children: [
      { label: "Seller's Guide", href: "/sell" },
      { label: "Free Home Valuation", href: "/sell#valuation" },
      { label: "Market Reports", href: "/market" },
    ],
  },
  {
    label: "Neighborhoods",
    href: "/neighborhoods",
    children: [
      { label: "Newton", href: "/neighborhoods/newton" },
      { label: "Wellesley", href: "/neighborhoods/wellesley" },
      { label: "Brookline", href: "/neighborhoods/brookline" },
      { label: "Natick", href: "/neighborhoods/natick" },
      { label: "View All 37+ Towns", href: "/neighborhoods" },
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog & Guides", href: "/blog" },
      { label: "Market Reports", href: "/market" },
      { label: "Mortgage Calculator", href: "/mortgage" },
    ],
  },
  { label: "About Will", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const navBg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-[#0D2137] shadow-lg";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex flex-col leading-none">
              <span
                className="font-display text-xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Boston<span style={{ color: "#C89B3C" }}>Home</span>Guide
              </span>
              <span className="text-[10px] font-body text-white/60 tracking-widest uppercase">
                Greater Boston & MetroWest
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-white/90 hover:text-white text-sm font-medium font-body transition-colors">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded shadow-xl border border-gray-100 py-1 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#0D2137] hover:bg-[#FAF8F4] hover:text-[#C89B3C] font-body transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-white/90 hover:text-white text-sm font-medium font-body transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C89B3C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              )
            )}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+17814563541"
              className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-body transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (781) 456-3541
            </a>
            <Link
              href="/contact"
              className="btn-gold text-sm py-2 px-4"
            >
              Talk to Will
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0D2137] border-t border-white/10">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between px-3 py-3 text-white/90 text-sm font-medium font-body"
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.label ? null : link.label)
                    }
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === link.label && (
                    <div className="pl-4 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="px-3 py-2.5 text-sm text-white/70 hover:text-[#C89B3C] font-body"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 text-white/90 hover:text-[#C89B3C] text-sm font-medium font-body transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="tel:+17814563541"
                className="flex items-center gap-2 text-white/80 text-sm font-body"
              >
                <Phone className="w-4 h-4" />
                (781) 456-3541
              </a>
              <Link href="/contact" className="btn-gold text-sm text-center">
                Talk to Will
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
