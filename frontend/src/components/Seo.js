import { useEffect } from "react";

// Basic SEO: sets document title + meta description per page.
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} · Consecrated Hands` : "Consecrated Hands";
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
}
