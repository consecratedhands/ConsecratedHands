// Consecrated Hands 2.0 — central public-facing content.
export const ORG = {
  name: "Consecrated Hands",
  logo: "/img/logo.png",
  ein: "33-4903145",
  taxStatus: "Federally recognized 501(c)(3) public charity",
  donationUrl: process.env.REACT_APP_STRIPE_PAYMENT_LINK || "",
  mission: "Consecrated Hands is a Christ-centered youth mentorship nonprofit helping young people discover who God created them to become through connected support in faith, stability, education, life skills, opportunity, character, and service.",
  contacts: [{ name: "Justin Mata", title: "Founder & Executive Director", phone: "504-539-1771" }],
  email: "OurConsecratedHands@Gmail.com",
  socials: [],
};

export const TRUTH = {
  eyebrow: "Created Intentionally",
  headline: "Don't wait until someone is broken to try to rebuild them.",
  body: "Every young person has God-given value before we ever meet them. We build relationships that help youth discover their identity in Christ, strengthen the areas of life around them, and move from needing support to becoming someone who can strengthen others.",
  verse: "\"For you formed my inmost being… I praise you, for I am fearfully and wonderfully made.\" — Psalm 139:13–14",
};

export const PILLARS = [
  { n:"01", title:"Faith & Identity", desc:"Knowing Christ, understanding God-given worth, and building a spiritual foundation for every other area of life.", image:"/img/faith.webp" },
  { n:"02", title:"Stability & Essential Needs", desc:"Helping young people find safety, consistency, support, and the steady relationships required to grow.", image:"/img/family.webp" },
  { n:"03", title:"Education & Development", desc:"Tutoring, academic encouragement, GED pathways, confidence, and habits that keep learning moving forward.", image:"/img/finance.webp" },
  { n:"04", title:"Life & Financial Skills", desc:"Budgeting, saving, stewardship, decision-making, responsibility, and practical preparation for adulthood.", image:"/img/fitness.webp" },
  { n:"05", title:"Career & Opportunity", desc:"Career exposure, job readiness, employment connections, and a vision for meaningful work and long-term opportunity.", image:"/img/future.webp" },
  { n:"06", title:"Health, Relationships & Character", desc:"Strengthening wellness, healthy relationships, discipline, integrity, confidence, and resilience.", image:"/img/about.webp" },
  { n:"07", title:"Service, Leadership & Giving Back", desc:"Turning growth outward so the young person once supported can lead, serve, encourage, and eventually mentor someone else.", image:"/img/serve.webp" },
];

export const VALUES = [
  { n:"01", title:"Christ at the Center", body:"Everything we do flows from the love of Jesus. Faith-centered does not mean unprofessional; it means our purpose has a foundation." },
  { n:"02", title:"Relationship First", body:"Young people need someone who listens, shows up, stays consistent, and earns trust before lasting growth can happen." },
  { n:"03", title:"Whole-Life Mentorship", body:"The Web of Consecration™ connects the areas of life that strengthen one another instead of treating each need in isolation." },
  { n:"04", title:"From Help to Leadership", body:"The long-term goal is movement from “help me” to “now I can help somebody else.”" },
];

export const IMPACT = [];
export const TESTIMONIALS = [];
export const EVENTS = [];
export const FAQ = [
  { q:"Who does Consecrated Hands serve?", a:"We focus on young people roughly ages 7–17, especially youth who are underserved, fatherless, at risk, exposed to substance abuse or instability, struggling behaviorally, or simply in need of positive mentorship and opportunity." },
  { q:"Is Consecrated Hands Christian?", a:"Yes. Consecrated Hands is unapologetically Christ-centered while providing practical, professional whole-life mentorship that parents, schools, churches, community partners, donors, and funders can understand." },
  { q:"What is The Web of Consecration™?", a:"It is our connected whole-life mentorship framework. Each strand strengthens another — from faith and stability through education, life skills, opportunity, character, leadership, and giving back." },
  { q:"Is my donation tax-deductible?", a:"Consecrated Hands is a federally recognized 501(c)(3) public charity. Contributions may be tax-deductible to the fullest extent allowed by law." },
  { q:"How do I become a mentor?", a:"Visit the Mentorship or Volunteer page and submit an application. Mentor and volunteer roles are designed around appropriate screening, training, safeguarding, and program needs." },
];
export const MANIFESTO = ["Faith & Identity","Education & Development","Career & Opportunity","Leadership & Service","Become Who God Set You Apart to Be"];
export const HERO_BG = "/img/hero.webp";
export const STAINED_GLASS = "/img/faith.webp";
export const IMAGES = { heroFaith:"/img/faith.webp", stainedGlass:"/img/faith.webp", mentorship:"/img/impact.webp", youthStudying:"/img/finance.webp", youthPortrait:"/img/future.webp", volunteering:"/img/serve.webp", kidsSun:"/img/about.webp", sportsMentor:"/img/mission.webp" };
