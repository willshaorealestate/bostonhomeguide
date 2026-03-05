/*
 * ExitIntentPopup.tsx — BostonHomeGuide.com
 * Exit intent popup: "Before you go — get our free Boston Market Report"
 */
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const alreadyShown = sessionStorage.getItem("exitPopupShown");
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setVisible(true);
        sessionStorage.setItem("exitPopupShown", "1");
      }
    };

    // Also show after 45 seconds on page
    const timer = setTimeout(() => {
      if (!dismissed) {
        setVisible(true);
        sessionStorage.setItem("exitPopupShown", "1");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [dismissed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed! Check your inbox for the Boston Market Report.");
    setVisible(false);
    setDismissed(true);
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
        {/* Navy header */}
        <div
          className="relative h-40 bg-[#0D2137] flex flex-col items-center justify-center text-center px-6"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-skyline-night-k5Nv97BwMFAzzw7y57EB26.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0D2137]/70" />
          <div className="relative z-10">
            <p className="text-[#C89B3C] text-xs font-body tracking-widest uppercase mb-2">
              Free Resource
            </p>
            <h3
              className="text-white text-2xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Before You Go...
            </h3>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/70 hover:text-white z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <p className="text-[#0D2137] font-body text-sm mb-1 font-semibold">
            Get the Free Boston Market Report
          </p>
          <p className="text-gray-500 text-sm mb-5 font-body">
            Monthly data on prices, inventory, and trends across 37+ Greater Boston
            communities — delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full border border-gray-200 rounded px-4 py-2.5 text-sm font-body text-[#0D2137] focus:outline-none focus:border-[#C89B3C]"
            />
            <button type="submit" className="btn-gold text-sm text-center w-full">
              Send Me the Report
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3 font-body text-center">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
