import { useEffect } from "react";
import { ORG } from "../lib/content";

const SITE_URL=(process.env.REACT_APP_SITE_URL||"https://consecratedhands.com").replace(/\/$/,"");
const DEFAULT_DESCRIPTION="Consecrated Hands is a Christ-centered youth mentorship nonprofit helping young people grow in faith, stability, education, life skills, opportunity, character, leadership, and service.";

function upsertMeta(attribute,key,content){let tag=document.querySelector(`meta[${attribute}="${key}"]`);if(!tag){tag=document.createElement("meta");tag.setAttribute(attribute,key);document.head.appendChild(tag)}tag.setAttribute("content",content)}
function upsertCanonical(url){let link=document.querySelector('link[rel="canonical"]');if(!link){link=document.createElement("link");link.setAttribute("rel","canonical");document.head.appendChild(link)}link.setAttribute("href",url)}

export default function Seo({title,description,socialImage="/img/hero.webp",noindex=false}){
  useEffect(()=>{
    const pageTitle=title?`${title} | Consecrated Hands`:"Consecrated Hands | Christ-Centered Youth Mentorship";
    const pageDescription=description||DEFAULT_DESCRIPTION;
    const canonical=`${SITE_URL}${window.location.pathname}`;
    const imageUrl=socialImage.startsWith("http")?socialImage:`${SITE_URL}${socialImage}`;

    document.title=pageTitle;
    upsertMeta("name","description",pageDescription);
    upsertMeta("name","robots",noindex?"noindex,nofollow":"index,follow");
    upsertMeta("property","og:type","website");
    upsertMeta("property","og:site_name",ORG.name);
    upsertMeta("property","og:title",pageTitle);
    upsertMeta("property","og:description",pageDescription);
    upsertMeta("property","og:url",canonical);
    upsertMeta("property","og:image",imageUrl);
    upsertMeta("property","og:image:alt",`${ORG.name} — Christ-centered youth mentorship`);
    upsertMeta("name","twitter:card","summary_large_image");
    upsertMeta("name","twitter:title",pageTitle);
    upsertMeta("name","twitter:description",pageDescription);
    upsertMeta("name","twitter:image",imageUrl);
    upsertCanonical(canonical);

    let schema=document.getElementById("consecrated-hands-schema");
    if(!schema){schema=document.createElement("script");schema.id="consecrated-hands-schema";schema.type="application/ld+json";document.head.appendChild(schema)}
    schema.textContent=JSON.stringify({
      "@context":"https://schema.org",
      "@type":"Organization",
      name:ORG.name,
      url:SITE_URL,
      logo:`${SITE_URL}${ORG.logo}`,
      description:ORG.mission,
      email:ORG.email,
      telephone:ORG.contacts[0]?.phone,
      taxID:ORG.ein,
      nonprofitStatus:"Nonprofit501c3",
      sameAs:ORG.socials.map(social=>social.href),
    });
  },[title,description,socialImage,noindex]);
  return null;
}
