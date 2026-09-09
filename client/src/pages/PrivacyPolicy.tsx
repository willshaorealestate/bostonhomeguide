/*
 * PrivacyPolicy.tsx — BostonHomeGuide.com
 * Privacy policy — data collection, SMS/phone consent, and no third-party resale statement
 */
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/lib/seo";

const LAST_UPDATED = "September 9, 2026";

export default function PrivacyPolicyPage() {
  useSEO({
    title: "Privacy Policy | BostonHomeGuide.com",
    description: "Privacy policy for BostonHomeGuide.com — how Will Shao, REMAX Executive Realty collects, uses, and protects your information, including SMS and phone consent.",
    canonical: "https://bostonhomeguide.com/privacy-policy",
  });

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />

      <section className="bg-[#0D2137] pt-32 pb-16">
        <div className="container text-center">
          <p className="section-label mb-3">Legal</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-white/70 font-body text-base">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-lg p-8 md:p-10 border border-gray-100 shadow-sm space-y-8 font-body text-base text-gray-600 leading-relaxed">
            <p>
              This Privacy Policy explains how BostonHomeGuide.com ("we," "us," or "our"), operated by
              Will Shao of REMAX Executive Realty (969 Concord Street, Framingham, MA 01701), collects,
              uses, and protects information you share with us through this website, including our
              contact, home valuation, buyer questionnaire, and newsletter forms.
            </p>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Information We Collect
              </h2>
              <p>
                When you submit a form on this site, we may collect your name, email address, phone
                number, property address, and any details you choose to share about your real estate
                needs. We also collect standard analytics data (such as pages visited and general
                location) through Google Analytics to help us understand how visitors use the site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                How We Use Your Information
              </h2>
              <p>We use the information you provide to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1.5">
                <li>Respond to your inquiries and provide the real estate services you requested;</li>
                <li>Contact you by phone, text message (SMS), or email regarding your inquiry, home search, home valuation, or scheduled consultation;</li>
                <li>Send you market updates, listing alerts, or newsletters you've opted into; and</li>
                <li>Improve our website and services.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                We Do Not Sell Your Information
              </h2>
              <p>
                <strong>We do not sell, rent, or share your name, phone number, or other personal
                information with third parties for their marketing or promotional purposes.</strong> Your
                phone number and mobile opt-in information collected through our forms is never shared
                with, or sold to, any third party for promotional or marketing purposes.
              </p>
              <p className="mt-3">
                We may share information with service providers who help us operate our business —
                such as our customer relationship management platform, Follow Up Boss — solely for the
                purpose of managing and responding to your inquiry. These providers are contractually
                required to keep your information confidential and to use it only to provide services
                to us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                SMS / Text Messaging
              </h2>
              <p>
                If you provide your phone number and agree to receive text messages, we may send you
                SMS communications related to your real estate inquiry (for example, listing updates,
                appointment reminders, or follow-up on a question you asked). Message frequency varies.
                Message and data rates may apply.
              </p>
              <p className="mt-3">
                You can opt out of text messages at any time by replying <strong>STOP</strong>. For help,
                reply <strong>HELP</strong> or contact us at{" "}
                <a href="mailto:will@willshao.com" className="text-[#C89B3C] hover:underline">will@willshao.com</a>{" "}
                or <a href="tel:+17814563541" className="text-[#C89B3C] hover:underline">(781) 456-3541</a>.
                No mobile information will be shared with third parties or affiliates for marketing or
                promotional purposes. Consent to receive text messages is not a condition of purchasing
                any property, product, or service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Cookies & Analytics
              </h2>
              <p>
                This site uses Google Analytics to understand aggregate visitor behavior and improve
                our content. Analytics data is anonymized and is not used to identify individual
                visitors. You can control cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Choices
              </h2>
              <p>
                You may ask us to delete your information, stop contacting you, or unsubscribe from
                marketing emails or texts at any time by contacting us at{" "}
                <a href="mailto:will@willshao.com" className="text-[#C89B3C] hover:underline">will@willshao.com</a>{" "}
                or <a href="tel:+17814563541" className="text-[#C89B3C] hover:underline">(781) 456-3541</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this
                page with an updated "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Contact Us
              </h2>
              <p>
                Will Shao, REMAX Executive Realty<br />
                969 Concord Street, Framingham, MA 01701<br />
                <a href="mailto:will@willshao.com" className="text-[#C89B3C] hover:underline">will@willshao.com</a>{" "}
                · <a href="tel:+17814563541" className="text-[#C89B3C] hover:underline">(781) 456-3541</a>
              </p>
            </div>

            <p className="text-sm text-gray-400 pt-4 border-t border-gray-100">
              See also our <Link href="/terms" className="text-[#C89B3C] hover:underline">Terms &amp; Conditions</Link>, including our SMS terms.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
