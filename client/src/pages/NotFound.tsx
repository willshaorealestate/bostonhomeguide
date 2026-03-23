import { Link } from "wouter";
import { Home, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />

      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="container text-center max-w-2xl py-24">
          <p
            className="text-[120px] md:text-[160px] font-bold leading-none text-[#0D2137]/10 select-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            404
          </p>
          <div className="-mt-8 relative z-10">
            <span className="gold-rule mx-auto" />
            <h1
              className="text-3xl md:text-4xl font-bold text-[#0D2137] mb-4 mt-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Page Not Found
            </h1>
            <p className="text-gray-500 font-body mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
              <br />
              Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="btn-gold inline-flex items-center justify-center gap-2 text-sm"
              >
                <Home className="w-4 h-4" />
                Return Home
              </Link>
              <a
                href="tel:+17814563541"
                className="btn-outline-gold inline-flex items-center justify-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                Call Will: (781) 456-3541
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
