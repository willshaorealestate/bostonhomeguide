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
    // Google cuts titles off around 60 characters, so the name is only added when it fits.
    const SUFFIX = " | Will Shao";
    const fullTitle =
      /Will Shao|BostonHomeGuide/.test(title) || title.length + SUFFIX.length > 60 ? title : title + SUFFIX;

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
    setMeta("og:url", canonicalHref, "property");

    // Structured data
    if (schema) {
      setSchema("page-schema", schema);
    } else {
      document.getElementById("page-schema")?.remove();
    }
  }, [title, description, canonical, schema]);
}
