/*
 * Blog.tsx — BostonHomeGuide.com
 * SEO-optimized blog with articles and lead capture CTAs
 */
import { Fragment, useState } from "react";
import { Link, useParams } from "wouter";
import { Search, ArrowLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { toast } from "sonner";
import { useSEO } from "@/lib/seo";
import { trackLead } from "@/lib/analytics";
import { articles } from "@/data/blogPosts";

const HERO_IMAGE = "/images/site/boston-hero.webp";

const categories = ["All", "Buyer Guide", "Seller Guide", "Finance", "Strategy", "Neighborhoods", "Local Guide", "Life Stage", "Lifestyle"];

function ctaForCategory(category: string) {
  switch (category) {
    case "Seller Guide":
      return {
        heading: "Thinking About Selling?",
        body: "Our team has nearly 20 years of experience helping sellers price, prepare, and market their homes across Greater Boston. Send us a message and we'll follow up with a free home valuation.",
        primaryLabel: "Get a Free Home Valuation",
        primaryHref: "/sell",
      };
    case "Life Stage":
      return {
        heading: "Weighing Your Next Move?",
        body: "Whether you're downsizing, upsizing, or just starting to think it through, send us a message — we can help you map out what it actually looks like for your situation.",
        primaryLabel: "Send Us a Message",
        primaryHref: "/contact",
      };
    case "Lifestyle":
    case "Local Guide":
      return {
        heading: "Thinking of Making This Area Home?",
        body: "Our team has nearly 20 years of experience helping people find the right town and the right home across Greater Boston. Send us a message about what you're looking for.",
        primaryLabel: "Send Us a Message",
        primaryHref: "/contact",
      };
    default:
      return {
        heading: "Ready to Take the Next Step?",
        body: "Our team has nearly 20 years of experience helping buyers and sellers navigate the Greater Boston market. Send us a message and we'll follow up personally.",
        primaryLabel: "Send Us a Message",
        primaryHref: "/contact",
      };
  }
}

const townLinks: Record<string, string> = {
  "Newton": "/neighborhoods/newton",
  "Wellesley": "/neighborhoods/wellesley",
  "Brookline": "/neighborhoods/brookline",
  "Natick": "/neighborhoods/natick",
  "Lexington": "/neighborhoods/lexington",
  "Needham": "/neighborhoods/needham",
  "Framingham": "/neighborhoods/framingham",
  "Waltham": "/neighborhoods/waltham",
  "Concord": "/neighborhoods/concord",
  "Cambridge": "/neighborhoods/cambridge",
  "Arlington": "/neighborhoods/arlington",
  "Belmont": "/neighborhoods/belmont",
  "Medford": "/neighborhoods/medford",
  "Quincy": "/neighborhoods/quincy",
};

function ArticleDetail({ slug }: { slug: string }) {
  const article = articles.find((a) => a.slug === slug);
  const [email, setEmail] = useState("");

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FAF8F4]">
        <Navigation />
        <div className="container pt-40 pb-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D2137]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Article Not Found
          </h1>
          <Link href="/blog" className="mt-6 btn-gold inline-block">Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("You're subscribed to Will's Boston Real Estate Newsletter!");
    trackLead("blog-newsletter-signup");
    setEmail("");
  };

  const cta = ctaForCategory(article.category);
  const paragraphs = article.content.split("\n\n");
  const faqHeadingIndex = paragraphs.findIndex((p) => p.trim() === "**Frequently Asked Questions**");
  const inlineImages = article.images ?? [];
  const imageAfterIndex = new Map(
    inlineImages.map((src, k) => [Math.floor(((k + 1) * paragraphs.length) / (inlineImages.length + 1)), src])
  );

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      <section
        className="relative pt-32 pb-16 min-h-[40vh] flex items-end"
        style={{ backgroundImage: `url(${article.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2137]/90 via-[#0D2137]/50 to-[#0D2137]/30" />
        <div className="relative z-10 container pb-8">
          <Link href="/blog" className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-body mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs bg-[#C89B3C] text-[#0D2137] font-bold px-2.5 py-1 rounded font-body">{article.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            {article.title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-sm prose prose-sm max-w-none">
                {paragraphs.map((para, i) => {
                  const formatLine = (line: string) => {
                    let formatted = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

                    // Manual [text](url) links go first, pulled out behind placeholders so the
                    // townLinks auto-linker below can't match a town name inside the link text
                    // and nest a second <a> inside it.
                    const manualLinks: string[] = [];
                    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => {
                      const external = /^https?:\/\//.test(href);
                      manualLinks.push(
                        `<a href="${href}" class="text-[#C89B3C] font-semibold hover:underline"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`
                      );
                      return `@@LINK${manualLinks.length - 1}@@`;
                    });

                    Object.entries(townLinks).forEach(([town, href]) => {
                      formatted = formatted.replace(
                        new RegExp(`\\b${town}\\b`, "g"),
                        `<a href="${href}" class="text-[#C89B3C] font-semibold hover:underline">${town}</a>`
                      );
                    });

                    formatted = formatted.replace(/@@LINK(\d+)@@/g, (_m, idx) => manualLinks[Number(idx)]);
                    return formatted;
                  };

                  const isFaqItem = faqHeadingIndex !== -1 && i > faqHeadingIndex;
                  const faqMatch = isFaqItem ? para.match(/^(.+?\?)\s+([\s\S]+)$/) : null;

                  let node: React.ReactNode;
                  if (para.startsWith("**") && para.endsWith("**")) {
                    node = (
                      <h3 className="text-lg font-bold text-[#0D2137] mt-6 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {para.replace(/\*\*/g, "")}
                      </h3>
                    );
                  } else if (faqMatch) {
                    const [, question, answer] = faqMatch;
                    node = (
                      <div className={`py-4 border-t border-gray-100 ${i === faqHeadingIndex + 1 ? "border-t-0 pt-0" : ""}`}>
                        <p className="font-bold text-[#0D2137] font-body text-base mb-1.5" dangerouslySetInnerHTML={{ __html: formatLine(question) }} />
                        <p className="text-gray-600 font-body text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formatLine(answer) }} />
                      </div>
                    );
                  } else {
                    const lines = para.split("\n");
                    const isBulletList = lines.length > 1 && lines.every((line) => /^-\s+/.test(line.trim()));
                    node = isBulletList ? (
                      <ul className="list-disc pl-5 text-gray-600 font-body text-base leading-relaxed mb-4 space-y-1.5">
                        {lines.map((line, j) => (
                          <li key={j} dangerouslySetInnerHTML={{ __html: formatLine(line.trim().replace(/^-\s+/, "")) }} />
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 font-body text-base leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: formatLine(para) }} />
                    );
                  }

                  const inlineImg = imageAfterIndex.get(i);
                  if (!inlineImg) return <Fragment key={i}>{node}</Fragment>;
                  return (
                    <Fragment key={i}>
                      {node}
                      <img
                        src={inlineImg}
                        alt=""
                        className="w-full aspect-[16/9] object-cover rounded-lg my-6"
                      />
                    </Fragment>
                  );
                })}
              </div>

              {/* Article CTA */}
              <div className="mt-8 bg-[#0D2137] rounded-lg p-8">
                <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {cta.heading}
                </h3>
                <p className="text-white/70 font-body text-base mb-5">
                  {cta.body}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href={cta.primaryHref} className="btn-gold text-sm">
                    {cta.primaryLabel}
                  </Link>
                  <a href="tel:+17814563541" className="btn-outline-gold text-sm">
                    Call (781) 456-3541
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-[#0D2137] rounded-lg p-6">
                <h3 className="text-white font-bold text-base mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Get More Insights
                </h3>
                <p className="text-white/60 text-base font-body mb-4">
                  Subscribe to Will's monthly market report and real estate guides.
                </p>
                <form onSubmit={handleSignup} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-[#1A3A5C] border border-white/20 rounded px-4 py-3 text-base font-body text-white placeholder-white/40 focus:outline-none focus:border-[#C89B3C]"
                  />
                  <button type="submit" className="btn-gold w-full text-sm text-center">Subscribe Free</button>
                </form>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <h3 className="text-[#0D2137] font-bold text-base mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Related Articles
                </h3>
                <div className="space-y-3">
                  {articles.filter((a) => a.slug !== slug && a.category === article.category).slice(0, 3).map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="flex items-start gap-3 group">
                      <img src={a.img} alt="" className="w-14 h-14 rounded object-cover shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-[#0D2137] group-hover:text-[#C89B3C] transition-colors font-body leading-snug">
                          {a.title}
                        </p>
                        <p className="text-sm text-gray-400 font-body mt-1">{a.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function BlogPage() {
  useSEO({
    title: "Greater Boston Real Estate Blog | Market Insights | Will Shao",
    description: "Real estate tips, market insights, and neighborhood guides for Greater Boston and MetroWest MA homebuyers and sellers. Expert advice from Will Shao, REMAX Executive Realty.",
    canonical: "https://bostonhomeguide.com/blog",
  });
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  if (slug) return <ArticleDetail slug={slug} />;

  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || a.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />
      <FloatingCTA />

      <section
        className="relative pt-32 pb-20 min-h-[40vh] flex items-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0D2137]/80" />
        <div className="relative z-10 container text-center">
          <p className="section-label mb-3">Knowledge Center</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Greater Boston Real Estate Guides
          </h1>
          <p className="text-white/80 font-body text-lg max-w-2xl mx-auto mb-8">
            Expert insights, local market analysis, and practical guides for buyers and sellers
            in Greater Boston and MetroWest Massachusetts.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded text-[#0D2137] font-body text-sm focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-30">
        <div className="container py-3 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded text-sm font-body font-medium whitespace-nowrap transition-colors ${
                category === cat ? "bg-[#0D2137] text-white" : "bg-[#FAF8F4] text-[#0D2137] hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm card-hover"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-[#C89B3C] text-[#0D2137] font-bold px-2.5 py-1 rounded font-body">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="font-bold text-[#0D2137] text-base mb-2 group-hover:text-[#1976A8] transition-colors leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-base text-gray-500 font-body leading-relaxed">{article.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#C89B3C] text-sm font-semibold font-body">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
