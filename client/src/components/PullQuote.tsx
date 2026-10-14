/*
 * PullQuote.tsx — a short client testimonial set between sections.
 * Quotes are verbatim excerpts from Will's public reviews (full versions live on the About page).
 */
import { Star } from "lucide-react";

export const QUOTES = {
  jake: { text: "Will Shao is attentive, knowledgeable, and tenacious.", name: "Jake Uminski", role: "Buyer · Google review" },
  mengju: {
    text: "From the start, Will provided clear, honest guidance and helped us understand every step, from house hunting to closing.",
    name: "Meng-Ju Wu",
    role: "First-time buyer · Google review",
  },
  vr: { text: "Throughout this process, Will was super engaged, prompt, and courteous.", name: "V.R.", role: "Buyer · Google review" },
  shang: {
    text: "Will is a consummate professional who went above and beyond to make sure I sold my house.",
    name: "Shang S.",
    role: "Seller · Yelp review",
  },
  baker: {
    text: "His professionalism is second to none — I wouldn't want to purchase a home with anyone else.",
    name: "Michael Baker",
    role: "Buyer · Google review",
  },
  mark: {
    text: "The seller said 'you got this house because of your agent — he really knows what he is doing.'",
    name: "Mark Fung-a-fat",
    role: "Buyer · Google review",
  },
  philip: {
    text: "18 groups visited during our 1-hour open house and we received two offers the same day — one of which we closed on above asking price.",
    name: "Philip S.",
    role: "Seller",
  },
  jason: {
    text: "He is patient, calm, knowledgeable, and honest. He won't push you to do something you are not comfortable doing.",
    name: "Jason Hou",
    role: "Buyer · Google review",
  },
} as const;

type QuoteKey = keyof typeof QUOTES;

/** A compact navy card version, for sidebars and corners of a page. */
export function QuoteCard({ quote, className = "" }: { quote: QuoteKey; className?: string }) {
  const q = QUOTES[quote];
  return (
    <figure className={`m-0 bg-[#0D2137] rounded-2xl p-6 ${className}`}>
      <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars" role="img">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="w-4 h-4 fill-[#C89B3C] text-[#C89B3C]" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="m-0 text-lg font-medium leading-snug text-white">“{q.text}”</blockquote>
      <figcaption className="mt-3 text-sm text-white/65">
        <span className="font-semibold text-white">{q.name}</span> · {q.role}
      </figcaption>
    </figure>
  );
}

export default function PullQuote({
  quote,
  align = "left",
  className = "",
}: {
  quote: QuoteKey;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  const q = QUOTES[quote];
  const position =
    align === "right" ? "ml-auto text-left md:text-right" : align === "center" ? "mx-auto text-center" : "mr-auto text-left";
  const starsPosition = align === "right" ? "md:justify-end" : align === "center" ? "justify-center" : "";
  return (
    <aside aria-label="Client testimonial" className={`container ${className}`}>
      <figure className={`m-0 max-w-xl ${position}`}>
        <div className={`flex gap-0.5 mb-3 ${starsPosition}`} aria-label="5 out of 5 stars" role="img">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="w-4 h-4 fill-[#C89B3C] text-[#C89B3C]" aria-hidden="true" />
          ))}
        </div>
        <blockquote className="m-0 text-xl md:text-2xl font-medium leading-snug tracking-tight text-[#0D2137]">
          “{q.text}”
        </blockquote>
        <figcaption className="mt-3 text-sm text-[#5B6270]">
          <span className="font-semibold text-[#0D2137]">{q.name}</span> · {q.role}
        </figcaption>
      </figure>
    </aside>
  );
}
