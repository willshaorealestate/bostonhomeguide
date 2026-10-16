/*
 * author.ts — Will's author identity, shared by the blog byline, the author box and the
 * Person JSON-LD on the About page and blog posts. `sameAs` ties his public profiles to one
 * person so search engines and AI tools recognize them as the same Will Shao.
 */
export const AUTHOR = {
  name: "Will Shao",
  jobTitle: "Real Estate Agent",
  brokerage: "REMAX Executive Realty",
  url: "https://bostonhomeguide.com/about",
  headshot: "/images/site/photo.jpg",
  bio: "Will Shao has helped buyers and sellers across Greater Boston for nearly 20 years, with 200+ homes sold and $120M+ in transactions.",
  sameAs: [
    "https://zillow.com/profile/willshao",
    "https://www.google.com/maps?cid=7820308737361883358",
    "https://www.linkedin.com/in/willshao",
    "https://www.instagram.com/willshaorealestate/",
    "https://facebook.com/shaorealestate",
    "https://www.remax.com/realestateagentoffice/framingham-ma-01701-williamshao-id21746906.html",
  ],
} as const;

/** schema.org Person for Will, used as a blog post's author and on the About page. */
export function authorPerson() {
  return {
    "@type": "Person",
    "@id": `${AUTHOR.url}#will-shao`,
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: AUTHOR.url,
    image: `https://bostonhomeguide.com${AUTHOR.headshot}`,
    worksFor: { "@type": "Organization", name: AUTHOR.brokerage },
    sameAs: [...AUTHOR.sameAs],
  };
}
