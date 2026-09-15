import { Link } from "react-router-dom";
import { ArrowRight, Building2, Cross, HandHeart, ShieldCheck, Users } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { IMAGES, ORG, VALUES } from "../lib/content";

const identity=[
  {icon:Cross,title:"Christ-centered",body:"Our faith is not a side note. Jesus, grace, truth, prayer, purpose, and service shape the way we approach young people and the responsibility of mentorship."},
  {icon:Users,title:"Youth-centered",body:"We focus on young people and the relationships, support, skills, and opportunities that can strengthen their development over time."},
  {icon:Building2,title:"Community-connected",body:"We work to connect families, mentors, churches, schools, businesses, and community resources rather than pretending one organization can meet every need."},
];

export default function About(){return <>
  <Seo title="About" description={ORG.mission}/>

  <section className="pt-24 md:pt-28 bg-white overflow-hidden"><div className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
    <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">About Consecrated Hands</p><h1 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl lg:text-[5.2rem] font-semibold text-[#25292C]">A Christ-centered nonprofit built around <span className="italic text-[#007BC2]">consistent mentorship.</span></h1><p className="mt-7 max-w-3xl text-xl text-[#424B52] leading-relaxed">Consecrated Hands exists to help young people discover who God created them to become and connect that identity to practical support, healthy relationships, and real opportunity.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/mission" className="inline-flex items-center gap-2 rounded-full bg-[#6FD3FF] text-[#25292C] px-7 py-3.5 font-extrabold">Our Mission <ArrowRight size={17}/></Link><Link to="/mentorship" className="inline-flex items-center gap-2 rounded-full border border-[#D8EEF8] px-7 py-3.5 font-bold text-[#25292C]">How We Mentor <ArrowRight size={17}/></Link></div></div></Reveal>
    <Reveal delay={.08}><img src={IMAGES.kidsSun} alt="Young people together in community" className="w-full aspect-[4/4.6] object-cover rounded-[2.25rem] shadow-[0_28px_70px_rgba(35,105,145,.14)]"/></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Who We Are</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Faithful presence. Practical support. Connected community.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed max-w-3xl">The About page is about the organization itself: what guides us, how we see our role, and the standards we want to carry as the work grows.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-3 gap-5">{identity.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.05}><div className="h-full bg-white rounded-3xl border border-[#D8EEF8] p-8"><div className="w-12 h-12 rounded-2xl bg-[#EAF9FF] flex items-center justify-center"><Icon className="text-[#006DAA]"/></div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#25292C]">{title}</h3><p className="mt-4 text-[#59636A] leading-relaxed">{body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[.8fr_1.2fr] gap-12">
    <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Our Foundation</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Values that shape the organization.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed">These values guide mentorship, service, stewardship, partnership, and the responsibility of working around young people.</p></div></Reveal>
    <div className="grid md:grid-cols-2 gap-5">{VALUES.map((v,i)=><Reveal key={v.n} delay={(i%2)*.04}><div className="h-full bg-[#F4FBFF] rounded-3xl border border-[#D8EEF8] p-7"><span className="text-sm font-extrabold text-[#A66F00]">{v.n}</span><h3 className="mt-4 font-heading text-3xl font-semibold text-[#25292C]">{v.title}</h3><p className="mt-3 text-[#59636A] leading-relaxed">{v.body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="pb-16 sm:pb-20 md:pb-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12"><Reveal><img src={IMAGES.classroomReal} alt="Students participating in a classroom lesson" loading="lazy" className="w-full aspect-[16/7] min-h-[18rem] object-cover rounded-[2rem]"/></Reveal></div></section>

  <section className="py-16 sm:py-20 md:py-24 bg-[#25292C] text-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-10 items-center">
    <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#FFE066] font-bold">Public Charity & Stewardship</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold">Faith and accountability belong together.</h2><p className="mt-6 text-lg text-white/80 leading-relaxed">Consecrated Hands is a federally recognized 501(c)(3) public charity. We are committed to responsible stewardship, safe youth-centered practices, transparent communication, and continued improvement as programs grow.</p><p className="mt-5 text-white/80">EIN: <strong className="text-white">{ORG.ein}</strong></p></div></Reveal>
    <Reveal delay={.05}><div className="grid sm:grid-cols-2 gap-4"><Link to="/safeguarding" className="rounded-3xl border border-white/15 bg-white/[.07] p-6 hover:bg-white/[.1] transition"><ShieldCheck className="text-[#B8ECFF]"/><h3 className="mt-4 font-heading text-3xl">Youth Safeguarding</h3><p className="mt-2 text-white/75">Read our public commitment to safe, responsible youth-centered work.</p></Link><Link to="/privacy" className="rounded-3xl border border-white/15 bg-white/[.07] p-6 hover:bg-white/[.1] transition"><HandHeart className="text-[#FFE066]"/><h3 className="mt-4 font-heading text-3xl">Privacy</h3><p className="mt-2 text-white/75">See how website submissions and personal information are handled.</p></Link></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-28 bg-[#F4FBFF]"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Learn More</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">See the mission in action.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed max-w-3xl mx-auto">The Mission page explains what we are trying to change. The Mentorship page explains how the Web of Consecration™ works.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link to="/mission" className="inline-flex items-center gap-2 rounded-full bg-[#6FD3FF] text-[#25292C] px-7 py-3.5 font-extrabold">Read Our Mission <ArrowRight size={17}/></Link><Link to="/mentorship" className="inline-flex items-center gap-2 rounded-full bg-white border border-[#D8EEF8] text-[#25292C] px-7 py-3.5 font-bold">Explore Mentorship <ArrowRight size={17}/></Link></div></Reveal></div></section>
</>}
