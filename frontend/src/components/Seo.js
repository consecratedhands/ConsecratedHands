import { useEffect } from "react";
import { ORG } from "../lib/content";

const SITE_URL = "https://consecratedhands.com";
const DEFAULT_DESCRIPTION =
  "Consecrated Hands is a Christ-centered nonprofit mentoring young people spiritually, educationally, financially, and personally.";

function upsertMeta(attribute, key, content) {
  let tag = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export default function Seo({ title, description }) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | Consecrated Hands`
      : "Consecrated Hands | Christ-Centered Youth Mentorship";

    const pageDescription = description || DEFAULT_DESCRIPTION;
    const canonical = `${SITE_URL}${window.location.pathname}`;
    const socialImage = `${SITE_URL}/img/hero.webp`;

    document.title = pageTitle;

    upsertMeta("name", "description", pageDescription);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", ORG.name);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", pageDescription);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", socialImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", pageDescription);
    upsertMeta("name", "twitter:image", socialImage);
    upsertCanonical(canonical);

    let schema = document.getElementById("consecrated-hands-schema");

    if (!schema) {
      schema = document.createElement("script");
      schema.id = "consecrated-hands-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NonprofitOrganization",
      name: ORG.name,
      url: SITE_URL,
      logo: `${SITE_URL}${ORG.logo}`,
      description: ORG.mission,
      email: ORG.email,
      telephone: ORG.contacts[0]?.phone,
      taxID: ORG.ein,
      sameAs: ORG.socials.map((social) => social.href),
    });
  }, [title, description]);

  return null;
}
