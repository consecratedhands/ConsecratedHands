import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { IMAGES, PILLARS } from "../lib/content";

const settings=[
  {icon:BookOpen,title:"Study & learning",body:"Homework, reading, study habits, academic confidence, GED preparation, and learning how to keep going when school feels difficult."},
  {icon:Briefcase,title:"Work & opportunity",body:"Career conversations, workplace expectations, job-readiness, introductions, exposure, and seeing pathways a young person may not have known existed."},
  {icon:Users,title:"Community & experiences",body:"Sports, meals, church, service, outings, community events, and positive experiences that build belonging and broaden perspective."},
  {icon:HeartHandshake,title:"Life conversations",body:"Faith, family, money, discipline, friendships, decisions, confidence, responsibility, goals, mistakes, forgiveness, and what comes next."},
];

const fit=[
  "Young people roughly ages 7–17 who would benefit from consistent positive mentorship.",
  "Youth navigating instability, fatherlessness, behavioral challenges, difficult environments, or limited access to opportunity.",
  "Young people who need encouragement with school, life skills, identity, confidence, work, relationships, or direction.",
  "Families looking for another healthy, Christ-centered strand of support around their child.",
];

export default function Mentorship(){return <>
  <Seo title="Mentorship" description="The Web of Consecration™ whole-life mentorship framework."/>

  <section className="pt-32 md:pt-36 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
    <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Whole-Life Mentorship</p><h1 className="mt-5 font-heading text-5xl md:text-7xl lg:text-[5.3rem] font-semibold text-[#17364B]">The Web of Consecration™</h1><p className="mt-7 max-w-3xl text-xl text-[#405E70] leading-relaxed">A young person’s life is connected. Faith affects identity. Stability affects learning. Education affects opportunity. Relationships affect character. Character affects leadership. We strengthen the whole web instead of treating one need in isolation.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/contact" className="inline-flex items-center gap-2 bg-[#73C8FF] text-[#17364B] px-7 py-3.5 rounded-full font-extrabold">Ask About Mentorship <ArrowRight size={17}/></Link><Link to="/volunteer" className="inline-flex items-center gap-2 bg-white border border-[#DCE8EF] text-[#17364B] px-7 py-3.5 rounded-full font-bold">Become a Mentor <ArrowRight size={17}/></Link></div></div></Reveal>
    <Reveal delay={.08}><img src={IMAGES.mentorship} alt="Mentorship and positive youth development" className="w-full aspect-[4/4.6] object-cover rounded-[2.25rem] shadow-[0_28px_70px_rgba(32,89,124,.14)]"/></Reveal>
  </div></section>

  <section className="py-24 md:py-32 bg-[#F8FCFF]"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">The Seven Strands</p><h2 className="mt-4 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">Strengthen one strand. Strengthen the web.</h2><p className="mt-6 text-lg text-[#526B7A] leading-relaxed max-w-3xl">Every young person will need different support at different times. The framework gives mentors a whole-life view without reducing a relationship to a checklist.</p></div></Reveal>
    <div className="mt-12 space-y-5">{PILLARS.map((p,i)=><Reveal key={p.n} delay={(i%2)*.03}><div className={`grid md:grid-cols-[.25fr_.75fr] gap-5 items-start rounded-[1.8rem] border border-[#DCE8EF] p-7 md:p-8 ${i%2===0?"bg-white":"bg-[#F3FAFE]"}`}><div><span className="inline-flex w-14 h-14 rounded-full bg-[#EAF7FF] items-center justify-center text-[#176F9F] font-extrabold">{p.n}</span></div><div><h3 className="font-heading text-3xl md:text-4xl font-semibold text-[#17364B]">{p.title}</h3><p className="mt-3 text-lg text-[#526B7A] leading-relaxed">{p.desc}</p></div></div></Reveal>)}</div>
  </div></section>

  <section className="py-24 md:py-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">How It Feels in Real Life</p><h2 className="mt-4 font-heading text-5xl md:text-6xl font-semibold text-[#17364B]">Relationship first. Program second.</h2><p className="mt-6 text-lg text-[#526B7A] leading-relaxed">The activity is not the mission. The relationship is what makes growth possible.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">{settings.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.04}><div className="h-full rounded-3xl border border-[#DCE8EF] bg-white p-7 shadow-[0_12px_35px_rgba(44,94,126,.05)]"><div className="w-12 h-12 rounded-2xl bg-[#EAF7FF] flex items-center justify-center"><Icon className="text-[#176F9F]"/></div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#17364B]">{title}</h3><p className="mt-3 text-[#526B7A] leading-relaxed">{body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="py-24 md:py-32 bg-[#16384F] text-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
    <Reveal><img src={IMAGES.youthPortrait} alt="Young person looking toward the future" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[2rem]"/></Reveal>
    <Reveal delay={.05}><div><p className="text-xs uppercase tracking-[.28em] text-[#F5D875] font-bold">Who It Is For</p><h2 className="mt-4 font-heading text-5xl md:text-6xl font-semibold">A healthy strand before a breaking point.</h2><div className="mt-7 space-y-4">{fit.map((item,i)=><div key={item} className="flex gap-4"><div className="w-8 h-8 rounded-full bg-[#73C8FF] text-[#17364B] flex items-center justify-center font-extrabold shrink-0">{i+1}</div><p className="text-white/80 leading-relaxed">{item}</p></div>)}</div></div></Reveal>
  </div></section>

  <section className="py-24 bg-[#F8FCFF]"><div className="max-w-6xl mx-auto px-6 md:px-12"><Reveal><div className="rounded-[2rem] bg-white border border-[#DCE8EF] p-8 md:p-12 grid lg:grid-cols-[.75fr_1.25fr] gap-10 items-center shadow-[0_18px_55px_rgba(38,91,123,.06)]"><div><ShieldCheck className="text-[#8A650C]" size={36}/><h2 className="mt-5 font-heading text-4xl md:text-5xl font-semibold text-[#17364B]">Safeguarding is part of mentorship.</h2></div><div><p className="text-lg text-[#526B7A] leading-relaxed">Mentor placement should include appropriate screening, role matching, training, boundaries, supervision, guardian communication, and a clear process for raising concerns. Youth safety is not separate from the mission—it is part of faithful stewardship.</p><Link to="/safeguarding" className="inline-flex items-center gap-2 mt-6 text-[#176F9F] font-extrabold">Read our Youth Safeguarding Commitment <ArrowRight size={17}/></Link></div></div></Reveal></div></section>

  <section className="py-24 md:py-32 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Take the Next Step</p><h2 className="mt-4 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">A young person may need one more person who keeps showing up.</h2><p className="mt-6 text-lg text-[#526B7A] max-w-2xl mx-auto leading-relaxed">Ask about mentorship for a young person, volunteer to mentor, or partner with us to create more opportunity.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link to="/contact" className="inline-flex items-center gap-2 bg-[#73C8FF] text-[#17364B] px-7 py-3.5 rounded-full font-extrabold">Ask About the Program <ArrowRight size={17}/></Link><Link to="/volunteer" className="inline-flex items-center gap-2 border border-[#DCE8EF] bg-white text-[#17364B] px-7 py-3.5 rounded-full font-bold">Volunteer or Mentor <ArrowRight size={17}/></Link></div></Reveal></div></section>
</>}
