import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase, Building2, HandHeart, ShieldCheck, Users } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { IMAGES } from "../lib/content";

const roles=[
  {icon:HandHeart,title:"Mentor a young person",body:"Be a consistent, trustworthy adult who listens, encourages, prays, tells the truth with grace, and walks with a young person over time."},
  {icon:BookOpen,title:"Support learning",body:"Help with tutoring, reading, study habits, GED preparation, confidence, academic encouragement, and practical learning support."},
  {icon:Briefcase,title:"Open a door",body:"Share career knowledge, job-readiness support, workplace exposure, internships, employment opportunities, or a view into a profession."},
  {icon:Users,title:"Serve at events",body:"Help create safe, positive experiences through sports, outings, meals, activities, outreach, service projects, and community events."},
];

const standards=[
  "Role matching based on the needs of the young person and the volunteer’s strengths.",
  "Appropriate screening and background-check practices for youth-facing roles.",
  "Training on boundaries, communication, reporting concerns, and expectations.",
  "Guardian involvement and clear supervision practices when working with minors.",
  "Consistency, reliability, humility, and respect for the young person and family.",
];

const partners=[
  {icon:Building2,title:"Businesses",body:"Create career exposure, workplace tours, internships, job-readiness support, employment connections, sponsorships, supplies, meals, or event support."},
  {icon:Users,title:"Churches & community groups",body:"Provide volunteers, prayer support, gathering space, mentoring relationships, activities, transportation help, and community connections."},
  {icon:BookOpen,title:"Schools & educators",body:"Help identify learning needs, reinforce academic goals, connect tutoring resources, and strengthen communication around student growth."},
];

export default function Volunteer(){return <>
  <Seo title="Volunteer" description="Mentor, volunteer, or partner with Consecrated Hands."/>

  <section className="pt-24 md:pt-28 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
    <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#9A6B00] font-bold">Get Involved</p><h1 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl lg:text-[5.2rem] font-semibold text-[#25292C]">Be the person who <span className="italic text-[#168CCB]">shows up.</span></h1><p className="mt-7 max-w-3xl text-xl text-[#47535B] leading-relaxed">Young people remember consistency. Whether you mentor, tutor, share a career, serve at an event, partner as a church or business, or help behind the scenes, your presence can strengthen the web around a young life.</p><Link to="/contact" className="inline-flex items-center gap-2 mt-8 bg-[#70CCFF] text-[#25292C] px-7 py-3.5 rounded-full font-extrabold">Start the Conversation <ArrowRight size={17}/></Link></div></Reveal>
    <Reveal delay={.08}><img src={IMAGES.volunteering} alt="Volunteers serving together" className="w-full aspect-[4/4.6] object-cover rounded-[2.25rem] shadow-[0_28px_70px_rgba(32,89,124,.14)]"/></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F5FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#9A6B00] font-bold">Ways to Serve</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">There is more than one way to become a strand.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed max-w-3xl">Not every volunteer needs to fill the same role. The strongest network has people bringing different gifts in the right places.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-2 gap-5">{roles.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={(i%2)*.05}><div className="h-full bg-white rounded-3xl border border-[#D9EBF4] p-8 shadow-[0_12px_35px_rgba(44,94,126,.05)]"><div className="w-12 h-12 rounded-2xl bg-[#E8F7FF] flex items-center justify-center"><Icon className="text-[#1683BD]"/></div><h3 className="mt-5 font-heading text-3xl md:text-4xl font-semibold text-[#25292C]">{title}</h3><p className="mt-3 text-[#59636A] leading-relaxed">{body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[.9fr_1.1fr] gap-12 items-center">
    <Reveal><div><ShieldCheck className="text-[#9A6B00]" size={38}/><p className="mt-5 text-xs uppercase tracking-[.28em] text-[#9A6B00] font-bold">Serving Young People Responsibly</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Good intentions are the beginning—not the whole standard.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed">Youth-facing service should be thoughtful, accountable, and appropriate to the role. We want volunteers to understand expectations before they are placed around young people.</p><Link to="/safeguarding" className="inline-flex items-center gap-2 mt-7 text-[#1683BD] font-extrabold">Read our Youth Safeguarding Commitment <ArrowRight size={17}/></Link></div></Reveal>
    <Reveal delay={.06}><div className="rounded-[2rem] bg-[#F5FBFF] border border-[#D9EBF4] p-7 md:p-9"><div className="space-y-4">{standards.map((s,i)=><div key={s} className="flex gap-4"><div className="w-9 h-9 rounded-full bg-[#70CCFF] text-[#25292C] flex items-center justify-center font-extrabold shrink-0">{i+1}</div><p className="text-[#47535B] leading-relaxed pt-1">{s}</p></div>)}</div></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#25292C] text-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#FFE38A] font-bold">Partner With Us</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold">A community can offer what one mentor cannot.</h2><p className="mt-6 text-lg text-white/75 leading-relaxed max-w-3xl">Businesses, churches, schools, civic groups, tradespeople, professionals, and community organizations can create access to places, people, knowledge, and opportunities that change what a young person sees as possible.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-3 gap-5">{partners.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.04}><div className="h-full rounded-3xl border border-white/15 bg-white/[.07] p-7"><Icon className="text-[#A8E1FF]"/><h3 className="mt-5 font-heading text-3xl font-semibold">{title}</h3><p className="mt-3 text-white/75 leading-relaxed">{body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F5FBFF]"><div className="max-w-6xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
    <Reveal><img src={IMAGES.sportsMentor} alt="Mentor spending time with young people" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[2rem] shadow-[0_24px_60px_rgba(32,89,124,.12)]"/></Reveal>
    <Reveal delay={.06}><div><p className="text-xs uppercase tracking-[.28em] text-[#9A6B00] font-bold">The Commitment That Matters</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Consistency over performance.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed">Young people do not need volunteers trying to look impressive. They need dependable adults who are willing to listen, keep appropriate boundaries, follow through, be teachable, and stay connected.</p><p className="mt-5 text-lg text-[#59636A] leading-relaxed">Some roles may be occasional. Mentorship roles ask for something deeper: relationship over time.</p></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-24 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#9A6B00] font-bold">Ready to Serve?</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Tell us how you want to help.</h2><p className="mt-6 text-lg text-[#59636A] max-w-2xl mx-auto leading-relaxed">Start with a conversation. We can learn about your interests, skills, availability, and the kind of role that may fit.</p><Link to="/contact" className="inline-flex items-center gap-2 mt-8 bg-[#70CCFF] text-[#25292C] px-7 py-3.5 rounded-full font-extrabold">Contact Consecrated Hands <ArrowRight size={17}/></Link></Reveal></div></section>
</>}
