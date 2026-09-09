/*
 * Terms.tsx — BostonHomeGuide.com
 * Terms & Conditions, including required SMS Terms and Conditions for carrier registration
 */
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSEO } from "@/lib/seo";

const LAST_UPDATED = "September 9, 2026";

export default function TermsPage() {
  useSEO({
    title: "Terms & Conditions | BostonHomeGuide.com",
    description: "Terms and conditions for BostonHomeGuide.com, including SMS/text messaging terms for Will Shao, REMAX Executive Realty.",
    canonical: "https://bostonhomeguide.com/terms",
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
            Terms &amp; Conditions
          </h1>
          <p className="text-white/70 font-body text-base">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-lg p-8 md:p-10 border border-gray-100 shadow-sm space-y-8 font-body text-base text-gray-600 leading-relaxed">
            <p>
              These Terms &amp; Conditions govern your use of BostonHomeGuide.com, operated by Firefly
              Real Estate, Inc., d/b/a Will Shao at REMAX Executive Realty (969 Concord Street, Framingham,
              MA 01701). By using this site or submitting a form on it, you agree to these terms.
            </p>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Use of This Site
              </h2>
              <p>
                This website is provided for informational purposes to help you learn about buying and
                selling real estate in Greater Boston and MetroWest Massachusetts. Content, market data,
                and neighborhood information are provided "as is" and are not a substitute for advice
                from a licensed real estate professional, attorney, lender, or financial advisor for
                your specific situation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                No Guarantee of Results
              </h2>
              <p>
                Home valuations, market reports, mortgage calculator estimates, and similar tools on
                this site are estimates for informational purposes only and do not constitute an
                appraisal, guarantee of sale price, or loan offer.
              </p>
            </div>

            <div id="sms-terms">
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                SMS Terms &amp; Conditions
              </h2>
              <p>
                By providing your phone number on any form on this site, you agree that Firefly Real
                Estate, Inc., d/b/a Will Shao at REMAX Executive Realty ("we," "us") may contact you by call or text message (SMS) at the number
                provided, using automated technology, for real estate services — including responding to
                your inquiry, providing home valuation or buyer/seller consultation follow-up, listing
                alerts, and market updates. Specifically, we use SMS to confirm appointments, send
                reminders, and notify you of schedule updates or important changes.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1.5">
                <li>Consent to receive text messages is <strong>not</strong> a condition of using our services or submitting any form on this site.</li>
                <li>You can cancel the SMS service at any time by texting <strong>STOP</strong>. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time, and we will start sending SMS messages to you again.</li>
                <li>If you are experiencing issues with the messaging program, reply with the keyword <strong>HELP</strong> for more assistance, or get help directly at <a href="mailto:will@willshao.com" className="text-[#C89B3C] hover:underline">will@willshao.com</a> or <a href="tel:+17814563541" className="text-[#C89B3C] hover:underline">(781) 456-3541</a>.</li>
                <li>Carriers are not liable for delayed or undelivered messages.</li>
                <li>As always, message and data rates may apply for any messages sent to you from us and to us from you. Message frequency may vary. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.</li>
                <li>No mobile opt-in data or phone numbers will be shared with, or sold to, any third party or affiliate for marketing or promotional purposes.</li>
              </ul>
              <p className="mt-3">
                If you have any questions regarding privacy, please read our{" "}
                <Link href="/privacy-policy" className="text-[#C89B3C] hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Intellectual Property
              </h2>
              <p>
                The content, design, photography, and neighborhood guides on this site are the property
                of Firefly Real Estate, Inc. / Will Shao / REMAX Executive Realty or their respective licensors and may not be
                copied or reproduced without permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Third-Party Links &amp; Tools
              </h2>
              <p>
                This site links to and embeds third-party tools (such as property search widgets,
                scheduling tools, and social media). We are not responsible for the content, privacy
                practices, or availability of third-party sites.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Equal Housing Opportunity
              </h2>
              <p>
                Will Shao and REMAX Executive Realty are committed to Equal Housing Opportunity and
                comply with the Fair Housing Act.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Changes to These Terms
              </h2>
              <p>
                We may update these Terms &amp; Conditions from time to time. Changes will be posted on
                this page with an updated "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0D2137] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Contact Us
              </h2>
              <p>
                Firefly Real Estate, Inc., d/b/a Will Shao at REMAX Executive Realty<br />
                969 Concord Street, Framingham, MA 01701<br />
                <a href="mailto:will@willshao.com" className="text-[#C89B3C] hover:underline">will@willshao.com</a>{" "}
                · <a href="tel:+17814563541" className="text-[#C89B3C] hover:underline">(781) 456-3541</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
