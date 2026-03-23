/*
 * seo.ts — Lightweight per-page SEO without external dependencies
 * Sets document.title, meta description, canonical, and OG tags dynamically
 */
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: object;
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setSchema(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({ title, description, canonical, schema }: SEOProps) {
  useEffect(() => {
    const SITE = "BostonHomeGuide.com";
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;

    document.title = fullTitle;
    setMeta("description", description);

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");

    // Twitter
    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");

    // Canonical
    const canonicalHref = canonical ?? window.location.origin + window.location.pathname;
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalHref;

    // Structured data
    if (schema) {
      setSchema("page-schema", schema);
    }
  }, [title, description, canonical, schema]);
}
