/*
 * FloatingCTA.tsx — BostonHomeGuide.com
 * Persistent floating "Talk to Will" CTA button
 */
import { useState, useEffect } from "react";
import { MessageCircle, X, Phone, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function FloatingCTA() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-100 p-4 w-56 animate-fade-up">
          <p
            className="text-[#0D2137] font-semibold text-sm mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Connect with Will
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="tel:+17814563541"
              className="flex items-center gap-2 text-sm text-[#0D2137] hover:text-[#C89B3C] font-body transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C89B3C]" />
              (781) 456-3541
            </a>
            <a
              href="https://calendar.app.google/rp3dJPWTjzaV9W1W7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#0D2137] hover:text-[#C89B3C] font-body transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#C89B3C]" />
              Book a Consultation
            </a>
            <Link
              href="/contact"
              className="mt-1 btn-gold text-xs text-center py-2"
              onClick={() => setExpanded(false)}
            >
              Send a Message
            </Link>
          </div>
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 bg-[#C89B3C] hover:bg-[#D4AF5A] text-[#0D2137] font-semibold text-sm px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {expanded ? (
          <X className="w-4 h-4" />
        ) : (
          <MessageCircle className="w-4 h-4" />
        )}
        Talk to Will
      </button>
    </div>
  );
}
