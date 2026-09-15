import { Link } from "react-router-dom";
import { ArrowRight, HandHeart, HeartHandshake, Sparkles } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { ORG, PILLARS, TRUTH } from "../lib/content";

function PrimaryButton({to,children}){return <Link to={to} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#6FD3FF] text-[#25292C] px-7 py-3.5 font-extrabold shadow-sm hover:bg-[#B8ECFF] hover:-translate-y-0.5 transition">{children}<ArrowRight size={17}/></Link>}
function SecondaryButton({to,children}){return <Link to={to} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white text-[#25292C] border border-[#D8EEF8] px-7 py-3.5 font-bold hover:border-[#6FD3FF] hover:-translate-y-0.5 transition">{children}<ArrowRight size={17}/></Link>}

export default function Home(){return <>
  <Seo title="Home" description={ORG.mission}/>

  <section className="relative overflow-hidden light-glow pt-24 md:pt-28">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-[#EAF9FF]/70"/>
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid lg:grid-cols-[1.08fr_.92fr] gap-12 items-center">
      <Reveal><div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#D8EEF8] px-4 py-2 text-xs font-bold tracking-[.18em] uppercase text-[#006DAA]"><Sparkles size={14} className="text-[#A66F00]"/> Christ-centered youth mentorship</div>
        <h1 className="mt-7 font-heading text-[2.75rem] sm:text-[3.35rem] leading-[.96] md:text-7xl lg:text-[5.8rem] font-semibold tracking-tight text-[#25292C]">Become Who God Set You Apart to <span className="italic text-[#A66F00]">Be.</span></h1>
        <p className="mt-7 text-lg md:text-xl leading-relaxed text-[#424B52] max-w-2xl">Consecrated Hands walks with young people before crisis defines them—helping them grow in faith, stability, education, life skills, opportunity, character, leadership, and service.</p>
        <div className="mt-9 flex flex-wrap gap-3"><PrimaryButton to="/mentorship">Explore Mentorship</PrimaryButton><SecondaryButton to="/donate">Support the Mission</SecondaryButton></div>
      </div></Reveal>
      <Reveal delay={.1}><div className="relative lg:justify-self-end"><div className="absolute inset-8 rounded-full bg-[#EAF9FF] blur-3xl opacity-80"/><div className="relative rounded-[2.5rem] border border-white bg-white/95 shadow-[0_30px_90px_rgba(35,105,145,.18)] p-5 md:p-8"><img src={ORG.logo} alt="Consecrated Hands official logo" className="w-full max-h-[31rem] object-contain"/></div></div></Reveal>
    </div>
  </section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[.65fr_1.35fr] gap-12 md:gap-16 items-center">
    <Reveal><div className="rounded-[2rem] bg-white border border-[#D8EEF8] p-8 md:p-10 shadow-[0_20px_55px_rgba(35,105,145,.08)]"><HeartHandshake className="text-[#006DAA]" size={34}/><p className="mt-5 font-heading text-4xl text-[#25292C]">Relationship first.</p><p className="mt-4 text-lg leading-relaxed text-[#59636A]">The activity opens the door. Consistency builds trust.</p></div></Reveal>
    <Reveal delay={.06}><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Why We Exist</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Reach them early. Walk with them fully.</h2><p className="mt-6 text-xl leading-relaxed text-[#424B52]">Young people are more than the hardest thing happening around them. Consecrated Hands exists to help them discover their God-given worth and move toward a future shaped by purpose instead of crisis.</p><div className="mt-8"><SecondaryButton to="/mission">Read Our Mission</SecondaryButton></div></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">The Web of Consecration™</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Seven connected strands. One whole young life.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed max-w-3xl">Our framework looks at the whole person. The Mentorship page explains each strand in full; here is the big picture.</p></div></Reveal>
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{PILLARS.map((p,i)=><Reveal key={p.n} delay={(i%4)*.03}><Link to="/mentorship" className="group flex h-full items-center gap-4 rounded-2xl border border-[#D8EEF8] bg-[#F4FBFF] p-5 hover:-translate-y-1 hover:border-[#6FD3FF] transition"><span className="inline-flex w-11 h-11 rounded-full bg-white items-center justify-center text-[#006DAA] font-extrabold shrink-0">{p.n}</span><span className="font-heading text-2xl font-semibold text-[#25292C]">{p.title}</span></Link></Reveal>)}</div>
    <Reveal><div className="mt-10"><PrimaryButton to="/mentorship">See the Full Framework</PrimaryButton></div></Reveal>
  </div></section>

  <section className="relative overflow-hidden py-16 sm:py-20 md:py-32 bg-[#25292C] text-white"><div className="max-w-5xl mx-auto px-6 md:px-12 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#FFE066] font-bold">{TRUTH.eyebrow}</p><h2 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold">{TRUTH.headline}</h2><p className="mt-7 max-w-3xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">{TRUTH.body}</p><p className="mt-8 font-heading italic text-2xl md:text-3xl text-[#FFE066] max-w-3xl mx-auto">{TRUTH.verse}</p></Reveal></div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><HandHeart className="mx-auto text-[#A66F00]" size={38}/><p className="mt-5 text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Choose Your Next Step</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Give. Mentor. Volunteer. Pray.</h2><p className="mt-6 max-w-2xl mx-auto text-lg text-[#59636A] leading-relaxed">There is more than one way to become part of a young person’s future.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><PrimaryButton to="/donate">Give Today</PrimaryButton><SecondaryButton to="/volunteer">Volunteer or Mentor</SecondaryButton><SecondaryButton to="/prayer">Request Prayer</SecondaryButton></div></Reveal></div></section>

  <section className="py-14 sm:py-16 md:py-20 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12"><Reveal><figure><img src="/img/consecrated-hands-park-van.webp" alt="Consecrated Hands transportation van parked at a park" loading="lazy" className="w-full aspect-[16/9] object-cover rounded-[2rem] shadow-[0_24px_60px_rgba(35,105,145,.12)]"/><figcaption className="mt-4 text-center text-sm text-[#59636A]">Transportation assistance may be available under certain circumstances.</figcaption></figure></Reveal></div></section>
</>}
