/*
 * Blog.tsx — BostonHomeGuide.com
 * SEO-optimized blog with articles and lead capture CTAs
 */
import { useState } from "react";
import { Link, useParams } from "wouter";
import { Search, Clock, Tag, ArrowLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { toast } from "sonner";
import { useSEO } from "@/lib/seo";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407135735/Z2wQnep3yL9xkjTo8ZMRtX/boston-neighborhood-DGmdQCZgdpvwWuXmyhsZGU.webp";

const articles = [
  {
    slug: "best-neighborhoods-families",
    title: "Best Neighborhoods for Families in Greater Boston",
    excerpt: "From top-rated schools to community parks, we break down the best towns for raising a family in the Boston metro area.",
    category: "Buyer Guide",
    readTime: "8 min",
    date: "March 1, 2026",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    content: `Greater Boston is one of the best regions in the country for families, thanks to its world-class school districts, safe communities, and abundant recreational opportunities. Whether you're relocating from out of state or moving from the city to the suburbs, choosing the right town is one of the most important decisions you'll make.

**Newton** consistently ranks as one of the best towns for families in Massachusetts. With a top-rated public school system, the Green Line T access, and multiple village centers offering restaurants, shops, and community events, Newton offers the perfect blend of suburban comfort and urban convenience. Median home prices hover around $1.5M.

**Lexington** offers exceptional schools — consistently ranked among the top 5 in Massachusetts — along with a charming historic town center and a strong sense of community. The town's Revolutionary War heritage adds a unique cultural dimension that families appreciate. Median prices are around $1.27M.

**Natick** is one of the best values in MetroWest for families. With excellent schools, the Natick Collection mall, Lake Cochituate for recreation, and commuter rail access to South Station, Natick offers a high quality of life at a more accessible price point — with median prices around $933K.

**Wellesley** is perhaps the gold standard for school districts in Greater Boston. The Wellesley Public Schools consistently rank #1 in Massachusetts, and the town's beautiful neighborhoods, Wellesley College campus, and upscale shopping make it one of the most desirable communities in the region.

When choosing a town for your family, consider these key factors: school district ratings (GreatSchools.org is a good resource), commute time to your workplace, proximity to recreational facilities, and the community culture. Will Shao has helped hundreds of families find their perfect Greater Boston community — contact him for personalized guidance.`,
  },
  {
    slug: "how-much-to-buy-home-massachusetts",
    title: "How Much Do I Need to Buy a Home in Massachusetts?",
    excerpt: "A detailed breakdown of down payments, closing costs, and monthly expenses for Boston-area home buyers in 2026.",
    category: "Finance",
    readTime: "6 min",
    date: "February 20, 2026",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    content: `Buying a home in Greater Boston requires careful financial planning. Here's a comprehensive breakdown of what you'll need.

**Down Payment**
The minimum down payment depends on your loan type:
- Conventional loan: 5-20% (less than 20% requires PMI)
- FHA loan: 3.5% with 580+ credit score
- VA loan: 0% for eligible veterans
- MassHousing: As low as 3% for first-time buyers

For a median-priced Greater Boston home at $813,000, a 20% down payment is $162,600. Many buyers in the $500K-$800K range put down 10-15%.

**Closing Costs**
Massachusetts closing costs typically run 2-4% of the purchase price:
- Lender fees: $1,500-$3,000
- Title insurance: $1,000-$2,500
- Attorney fees: $800-$1,500
- Recording fees: $200-$400
- Prepaid items (taxes, insurance): $3,000-$6,000

**Monthly Expenses**
Beyond your mortgage payment, budget for:
- Property taxes: Massachusetts averages 1.0-1.5% of assessed value annually
- Homeowner's insurance: $1,200-$2,500/year
- HOA fees (if applicable): $0-$800/month
- Maintenance: Budget 1% of home value annually

**First-Time Buyer Programs**
Massachusetts offers several programs for first-time buyers:
- MassHousing: Below-market rate mortgages with low down payments
- ONE Mortgage: 3% down, no PMI for income-eligible buyers
- MHFA Down Payment Assistance: Up to $15,000 in assistance

Will can connect you with trusted local lenders who specialize in Massachusetts first-time buyer programs. Contact him for a free consultation.`,
  },
  {
    slug: "win-bidding-war-boston",
    title: "How to Win a Bidding War in Greater Boston",
    excerpt: "Proven strategies that have helped Will's clients win competitive offers — without overpaying.",
    category: "Strategy",
    readTime: "5 min",
    date: "February 10, 2026",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    content: `Greater Boston's real estate market is consistently competitive, with well-priced homes in desirable communities often receiving multiple offers within days of listing. Here are the strategies Will uses to help his clients win.

**1. Get Fully Pre-Approved Before You Start**
A pre-approval letter from a reputable local lender signals to sellers that you're a serious, qualified buyer. Will recommends working with local lenders who can close quickly and communicate directly with listing agents.

**2. Move Fast**
In Greater Boston's market, hesitation costs you homes. When Will identifies a strong property, he moves quickly — scheduling showings within hours and preparing offers the same day if needed.

**3. Offer a Strong Price**
In competitive situations, offering at or above asking price is often necessary. Will analyzes recent comparable sales to help you understand true market value and make an informed offer.

**4. Use an Escalation Clause**
An escalation clause automatically increases your offer by a set amount above competing offers, up to a maximum. This can be effective in multiple-offer situations while protecting you from overpaying.

**5. Minimize Contingencies Strategically**
While contingencies protect buyers, excessive contingencies can make your offer less competitive. Will helps clients understand which contingencies are essential (inspection, financing) and which can be modified.

**6. Write a Personal Letter**
In some situations, a heartfelt letter to the sellers about why you love their home can make a difference — particularly with long-time homeowners who care about who buys their home.

**7. Be Flexible on Closing Date**
Offering flexibility on the closing date — whether a quick close or a leaseback to give sellers time to move — can make your offer stand out.

Will has helped dozens of clients win competitive offers in Greater Boston. Contact him to discuss your specific situation.`,
  },
  {
    slug: "first-time-buyer-programs-massachusetts",
    title: "First-Time Home Buyer Programs in Massachusetts",
    excerpt: "A complete guide to state and federal programs that can help first-time buyers in Massachusetts afford their first home.",
    category: "Finance",
    readTime: "7 min",
    date: "January 28, 2026",
    img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80",
    content: `Massachusetts offers several excellent programs to help first-time home buyers enter the market. Here's what you need to know.

**MassHousing**
MassHousing is Massachusetts' affordable housing bank, offering below-market interest rates and down payment assistance to first-time buyers. Key programs include:
- MassHousing Mortgage: Competitive rates with as little as 3% down
- Down Payment Assistance: Up to $15,000 for eligible buyers in certain communities
- MI Plus: Mortgage insurance that includes job loss protection

**ONE Mortgage Program**
The ONE Mortgage Program, administered by MHP (Massachusetts Housing Partnership), offers:
- 3% down payment
- No private mortgage insurance (PMI)
- Below-market interest rates
- Income limits apply

**Federal Programs**
- FHA Loans: 3.5% down with 580+ credit score, more flexible qualification requirements
- VA Loans: 0% down for eligible veterans and active military
- USDA Loans: 0% down for eligible rural areas (some MetroWest towns qualify)

**First-Time Buyer Tax Benefits**
- Mortgage Interest Deduction: Deduct mortgage interest on your federal taxes
- Property Tax Deduction: Deduct property taxes paid
- Capital Gains Exclusion: Exclude up to $250K ($500K married) in gains when you sell

**How to Qualify**
Most first-time buyer programs define "first-time buyer" as someone who hasn't owned a home in the past 3 years. Income and purchase price limits vary by program and location.

Will works closely with lenders who specialize in first-time buyer programs. Contact him for a free consultation and lender referrals.`,
  },
  {
    slug: "boston-vs-suburbs",
    title: "Boston vs. Suburbs: Where Should You Buy?",
    excerpt: "A data-driven comparison of city living vs. suburban life in Greater Boston — schools, commute, value, and lifestyle.",
    category: "Buyer Guide",
    readTime: "9 min",
    date: "January 15, 2026",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    content: `One of the most common questions Will hears from buyers is: "Should we buy in Boston or move to the suburbs?" The answer depends on your priorities, lifestyle, and life stage.

**The Case for Boston**
Boston proper offers walkability, cultural amenities, and proximity to world-class restaurants, museums, and entertainment. Neighborhoods like South End, Back Bay, and Jamaica Plain offer vibrant urban lifestyles. However, space comes at a premium — a 3-bedroom condo in Back Bay can cost $1.5M+.

**The Case for the Suburbs**
For families with children, the suburbs offer compelling advantages: more space for the money, top-rated school districts, and a quieter lifestyle. A $813K budget that buys a 2-bedroom condo in Boston can buy a 4-bedroom colonial in Natick or Framingham.

**The Commute Question**
Greater Boston's commuter rail network connects many suburbs directly to South Station and North Station. Newton, Wellesley, and Natick offer Green Line or commuter rail access. Many MetroWest towns are 35-50 minutes from downtown Boston by train.

**School Districts**
This is often the deciding factor for families. Greater Boston's suburban school districts are among the best in the country. Newton, Wellesley, Lexington, and Concord consistently rank in the top 10 in Massachusetts.

**Value Comparison**
For the same budget, you'll get significantly more space in the suburbs. A $1M budget in Newton buys a 3-4 bedroom colonial; the same budget in Back Bay buys a 2-bedroom condo.

**Will's Recommendation**
There's no universal right answer. Will helps clients evaluate their priorities — commute, schools, lifestyle, budget — and find the community that fits their life. Contact him for a personalized consultation.`,
  },
  {
    slug: "top-school-districts-metrowest",
    title: "Top School Districts in MetroWest Massachusetts",
    excerpt: "A comprehensive ranking of MetroWest school districts, with data on test scores, programs, and home prices.",
    category: "Neighborhoods",
    readTime: "6 min",
    date: "January 5, 2026",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    content: `MetroWest Massachusetts is home to some of the best school districts in the state. Here's a comprehensive overview.

**Acton-Boxborough Regional**
Consistently ranked #1 or #2 in Massachusetts, Acton-Boxborough offers exceptional academics, strong STEM programs, and a diverse student body. Home prices in Acton range from $800K-$1.2M.

**Wellesley Public Schools**
Wellesley's schools are legendary — the district consistently ranks among the top 5 in Massachusetts. The high school offers 27 AP courses and has a 99% college acceptance rate. Median home prices: $1.65M.

**Sudbury-Lincoln (Lincoln-Sudbury Regional)**
Lincoln-Sudbury Regional High School is one of the most respected high schools in Massachusetts, known for its academic rigor and strong arts programs. Median prices in Sudbury: $1.05M.

**Natick Public Schools**
Natick offers excellent schools at a more accessible price point than Wellesley or Newton. The district has strong academic programs and excellent extracurricular activities. Median prices: $933K.

**Hopkinton Public Schools**
Hopkinton has rapidly improved its school system over the past decade. The district offers excellent academics, newer school facilities, and great value — with median prices around $800K.

**Framingham Public Schools**
Framingham's schools have improved significantly in recent years. The district offers strong bilingual programs and diverse academic offerings. Best value in MetroWest with median prices around $672K.

**Choosing Based on Schools**
When choosing a town based on schools, consider: GreatSchools ratings, MCAS scores, AP course offerings, extracurricular programs, and special education services. Will can provide detailed school data for any community you're considering.`,
  },
  {
    slug: "selling-home-massachusetts-guide",
    title: "Selling Your Home in Massachusetts: Complete Guide",
    excerpt: "Everything you need to know about selling your home in Massachusetts — from pricing strategy to closing day.",
    category: "Seller Guide",
    readTime: "10 min",
    date: "December 20, 2025",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    content: `Selling a home in Massachusetts involves several unique steps and considerations. Here's Will's complete guide.

**Step 1: Determine Your Home's Value**
The most important decision in selling your home is pricing. Price too high and you'll sit on the market; price too low and you'll leave money on the table. Will provides a comprehensive Comparative Market Analysis (CMA) using real-time MLSPIN data.

**Step 2: Prepare Your Home**
First impressions matter enormously. Will's pre-listing checklist includes:
- Deep cleaning and decluttering
- Fresh paint in neutral colors
- Landscaping and curb appeal improvements
- Minor repairs (leaky faucets, cracked tiles, etc.)
- Professional staging consultation

**Step 3: Professional Photography**
In today's market, 95% of buyers start their search online. Professional photography — including 3D virtual tours — is essential for maximizing your home's digital presence.

**Step 4: Strategic Pricing**
Will uses a data-driven pricing strategy that considers recent comparable sales, current market conditions, and your home's unique features. The goal is to attract maximum buyer interest while achieving top dollar.

**Step 5: Marketing Launch**
Will's marketing plan includes MLS listing, Zillow/Realtor.com syndication, social media advertising, email campaigns to his buyer database, and Chinese-language marketing materials.

**Step 6: Reviewing Offers**
In Greater Boston's competitive market, well-priced homes often receive multiple offers. Will helps you evaluate each offer based on price, contingencies, financing, and closing timeline.

**Step 7: The Purchase & Sale Agreement**
The P&S Agreement is the binding contract for your sale. Will works with your attorney to ensure all terms protect your interests.

**Step 8: Closing**
Massachusetts closings typically take 30-60 days from accepted offer. Will coordinates inspections, appraisal, and all closing logistics to ensure a smooth transaction.

Contact Will for a free listing consultation and home valuation.`,
  },
  {
    slug: "home-inspection-massachusetts",
    title: "What to Expect at a Home Inspection in MA",
    excerpt: "A complete guide to the Massachusetts home inspection process — what inspectors check, common issues, and how to negotiate repairs.",
    category: "Buyer Guide",
    readTime: "7 min",
    date: "December 10, 2025",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    content: `A home inspection is one of the most important steps in the Massachusetts home buying process. Here's what you need to know.

**What Does a Home Inspector Check?**
A licensed Massachusetts home inspector examines:
- Foundation and structural components
- Roof, gutters, and exterior
- Electrical systems (panels, wiring, outlets)
- Plumbing (pipes, water heater, fixtures)
- HVAC systems (heating, cooling, ventilation)
- Insulation and ventilation
- Windows and doors
- Interior components (walls, ceilings, floors)

**Additional Inspections to Consider**
- Radon testing: Massachusetts has elevated radon levels in many areas
- Oil tank inspection: Many older homes have underground oil tanks
- Sewer scope: Recommended for homes with older sewer lines
- Chimney inspection: Important for homes with fireplaces
- Lead paint inspection: Required for homes built before 1978 in certain situations

**Common Issues in Greater Boston Homes**
- Older electrical panels (Federal Pacific, Zinsco)
- Knob-and-tube wiring in older homes
- Underground oil tanks
- Asbestos insulation in homes built before 1980
- Basement moisture issues
- Aging HVAC systems

**How to Negotiate After an Inspection**
The inspection report gives buyers leverage to negotiate repairs or price reductions. Will helps clients distinguish between major issues (structural, safety) and minor cosmetic items, and advises on appropriate negotiation strategies.

**Massachusetts-Specific Considerations**
Massachusetts has a unique inspection contingency period. Buyers typically have 7-10 days to complete inspections and either accept the property, request repairs, or withdraw. Will manages this timeline carefully to protect your interests.

Contact Will for referrals to trusted home inspectors in Greater Boston.`,
  },
];

const categories = ["All", "Buyer Guide", "Seller Guide", "Finance", "Strategy", "Neighborhoods"];

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
    setEmail("");
  };

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

  const paragraphs = article.content.split("\n\n");

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
            <span className="text-white/60 text-xs font-body">{article.readTime} read · {article.date}</span>
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
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <h3 key={i} className="text-lg font-bold text-[#0D2137] mt-6 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {para.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }
                  let formatted = para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
                  Object.entries(townLinks).forEach(([town, href]) => {
                    formatted = formatted.replace(
                      new RegExp(`\\b${town}\\b`, "g"),
                      `<a href="${href}" class="text-[#C89B3C] font-semibold hover:underline">${town}</a>`
                    );
                  });
                  return (
                    <p key={i} className="text-gray-600 font-body text-base leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: formatted }} />
                  );
                })}
              </div>

              {/* Article CTA */}
              <div className="mt-8 bg-[#0D2137] rounded-lg p-8">
                <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Ready to Take the Next Step?
                </h3>
                <p className="text-white/70 font-body text-base mb-5">
                  Will Shao has nearly 20 years of experience helping buyers and sellers navigate the
                  Greater Boston market. Get personalized guidance today.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://calendar.app.google/sGPHDTZGiH9zdE8x5" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
                    Book a Free Consultation
                  </a>
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
                        <p className="text-sm text-gray-400 font-body mt-1">{a.readTime} read</p>
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
    description: "Real estate tips, market insights, and neighborhood guides for Greater Boston and MetroWest MA homebuyers and sellers. Expert advice from Will Shao, RE/MAX Executive Realty.",
    canonical: "https://bostonhomeguide.com/blog",
  });
  const params = useParams<{ slug?: string }>();
  const slug = params?.slug;

  if (slug) return <ArticleDetail slug={slug} />;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 text-sm text-gray-400 font-body">
                      <Clock className="w-3 h-3" />{article.readTime} read
                    </span>
                    <span className="text-sm text-gray-400 font-body">{article.date}</span>
                  </div>
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
