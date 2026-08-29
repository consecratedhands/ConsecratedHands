import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase, HandHeart, HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { FAQ, IMAGES, ORG, PILLARS, TRUTH } from "../lib/content";

const realLife=[
  {icon:BookOpen,title:"Learning & development",body:"Tutoring, reading, study habits, GED pathways, confidence-building, and encouragement to keep learning."},
  {icon:Briefcase,title:"Career & opportunity",body:"Career exposure, job-readiness conversations, workplace expectations, employment connections, and a bigger vision for the future."},
  {icon:HeartHandshake,title:"Consistency & relationships",body:"A trustworthy adult who listens, follows through, prays, encourages, and stays present long enough for real trust to grow."},
  {icon:Users,title:"Community & experiences",body:"Sports, meals, outings, service, church and community connections, and positive experiences that expand what a young person can imagine."},
];

const pathway=[
  {n:"01",title:"Connect",body:"Start with relationship, listening, safety, and understanding what the young person is carrying and where support is needed."},
  {n:"02",title:"Strengthen",body:"Build the strands around faith, stability, education, practical skills, opportunity, character, and healthy relationships."},
  {n:"03",title:"Equip",body:"Turn encouragement into practical capability through habits, skills, exposure, accountability, and real opportunities."},
  {n:"04",title:"Send Forward",body:"Help young people grow from receiving support into leadership, service, generosity, and strengthening someone else."},
];

function PrimaryButton({to,children}){return <Link to={to} className="inline-flex items-center gap-2 rounded-full bg-[#73C8FF] text-[#17364B] px-7 py-3.5 font-extrabold shadow-sm hover:bg-[#9AD8FF] hover:-translate-y-0.5 transition">{children}<ArrowRight size={17}/></Link>}
function SecondaryButton({to,children}){return <Link to={to} className="inline-flex items-center gap-2 rounded-full bg-white text-[#17364B] border border-[#DCE8EF] px-7 py-3.5 font-bold hover:border-[#7FC7EE] hover:-translate-y-0.5 transition">{children}<ArrowRight size={17}/></Link>}

export default function Home(){return <>
  <Seo title="Home" description={ORG.mission}/>

  <section className="relative overflow-hidden bg-white pt-32 md:pt-36">
    <div className="absolute inset-0"><img src={IMAGES.kidsSun} alt="Young people spending time together" className="w-full h-full object-cover object-center"/><div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/55"/></div>
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid lg:grid-cols-[1.08fr_.92fr] gap-12 items-center">
      <Reveal><div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#DCEFFA] px-4 py-2 text-xs font-bold tracking-[.18em] uppercase text-[#365F77]"><Sparkles size={14} className="text-[#9B7412]"/> Christ-centered youth mentorship</div>
        <h1 className="mt-7 font-heading text-[3.35rem] leading-[.96] md:text-7xl lg:text-[5.8rem] font-semibold tracking-tight text-[#17364B]">Become Who God Set You Apart to <span className="italic text-[#9B7412]">Be.</span></h1>
        <p className="mt-7 text-lg md:text-xl leading-relaxed text-[#405E70] max-w-2xl">Consecrated Hands walks with young people before crisis defines them—strengthening faith, stability, education, life skills, opportunity, healthy relationships, character, leadership, and service.</p>
        <div className="mt-9 flex flex-wrap gap-3"><PrimaryButton to="/mentorship">Explore Mentorship</PrimaryButton><SecondaryButton to="/donate">Support the Mission</SecondaryButton></div>
      </div></Reveal>
      <Reveal delay={.1}><div className="relative lg:justify-self-end"><div className="absolute inset-8 rounded-full bg-[#DDF3FF] blur-3xl opacity-80"/><div className="relative rounded-[2.5rem] border border-white bg-white/95 shadow-[0_30px_90px_rgba(32,89,124,.18)] p-5 md:p-8"><img src={ORG.logo} alt="Consecrated Hands official logo" className="w-full max-h-[31rem] object-contain"/></div></div></Reveal>
    </div>
  </section>

  <section className="py-24 md:py-32 bg-[#F8FCFF]"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[.85fr_1.15fr] gap-12 md:gap-16 items-center">
    <Reveal><div className="relative"><img src={IMAGES.sportsMentor} alt="Mentorship and community activity" loading="lazy" className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-[0_24px_60px_rgba(32,89,124,.12)]"/><div className="absolute -bottom-5 -right-5 hidden md:block bg-white border border-[#DCE8EF] rounded-3xl p-6 max-w-[15rem] shadow-xl"><p className="font-heading text-2xl text-[#17364B]">Relationship first.</p><p className="mt-2 text-sm text-[#526B7A]">The activity opens the door. Consistency changes the trajectory.</p></div></div></Reveal>
    <Reveal delay={.06}><div><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Why We Exist</p><h2 className="mt-4 font-heading text-5xl md:text-6xl font-semibold text-[#17364B]">Reach them early. Walk with them fully.</h2><p className="mt-6 text-xl leading-relaxed text-[#405E70]">A young person is more than the problem happening around them. We help them see their God-given worth and surround that identity with practical support that makes purpose possible.</p><p className="mt-5 text-lg leading-relaxed text-[#526B7A]">That can mean prayer and Scripture one day, tutoring the next, a conversation about money or work, a meal, an outing, a hard truth, a ride toward opportunity, or simply keeping a promise to show up.</p><div className="mt-8"><SecondaryButton to="/mission">Read Our Mission</SecondaryButton></div></div></Reveal>
  </div></section>

  <section className="py-24 md:py-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">The Web of Consecration™</p><h2 className="mt-4 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">Seven connected strands. One whole young life.</h2><p className="mt-6 text-lg text-[#526B7A] leading-relaxed max-w-3xl">Faith affects identity. Stability affects learning. Education affects opportunity. Relationships shape character. Character shapes leadership. We strengthen the whole web instead of treating one need in isolation.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{PILLARS.map((p,i)=><Reveal key={p.n} delay={(i%3)*.04}><Link to="/mentorship" className="group block h-full rounded-[1.8rem] border border-[#DCE8EF] bg-white p-7 md:p-8 shadow-[0_12px_35px_rgba(44,94,126,.06)] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(44,94,126,.11)] transition"><div className="w-12 h-12 rounded-full bg-[#EAF7FF] flex items-center justify-center text-[#176F9F] font-extrabold">{p.n}</div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#17364B]">{p.title}</h3><p className="mt-3 text-[#526B7A] leading-relaxed">{p.desc}</p><span className="inline-flex items-center gap-1 mt-5 text-sm font-bold text-[#176F9F]">Learn more <ArrowRight size={15} className="group-hover:translate-x-1 transition"/></span></Link></Reveal>)}</div>
    <Reveal><div className="mt-10"><PrimaryButton to="/mentorship">See the Full Framework</PrimaryButton></div></Reveal>
  </div></section>

  <section className="py-24 md:py-32 bg-[#16384F] text-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.28em] text-[#F5D875] font-bold">What Mentorship Can Look Like</p><h2 className="mt-4 font-heading text-5xl md:text-7xl font-semibold">Real life. Real relationships. Practical growth.</h2><p className="mt-5 text-lg text-white/75 leading-relaxed">There is no single activity that defines mentorship. The relationship is the foundation; the support changes with the young person.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">{realLife.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.04}><div className="h-full rounded-3xl bg-white/[.07] border border-white/15 p-7"><Icon className="text-[#9AD8FF]" size={27}/><h3 className="mt-5 font-heading text-3xl font-semibold">{title}</h3><p className="mt-3 text-white/75 leading-relaxed">{body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="relative overflow-hidden py-24 md:py-32"><div className="absolute inset-0"><img src={IMAGES.heroFaith} alt="Faith-centered mentorship materials" loading="lazy" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-[#16384F]/85"/></div><div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center text-white"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#F5D875] font-bold">{TRUTH.eyebrow}</p><h2 className="mt-5 font-heading text-5xl md:text-7xl font-semibold">{TRUTH.headline}</h2><p className="mt-7 max-w-3xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">{TRUTH.body}</p><p className="mt-8 font-heading italic text-2xl md:text-3xl text-[#F5D875] max-w-3xl mx-auto">{TRUTH.verse}</p></Reveal></div></section>

  <section className="py-24 md:py-32 bg-[#F8FCFF]"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">The Growth Path</p><h2 className="mt-4 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">From “help me” to “now I can help somebody else.”</h2></div></Reveal>
    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">{pathway.map((s,i)=><Reveal key={s.n} delay={i*.04}><div className="h-full bg-white rounded-3xl border border-[#DCE8EF] p-7"><span className="text-sm font-extrabold text-[#8A650C]">{s.n}</span><h3 className="mt-4 font-heading text-3xl font-semibold text-[#17364B]">{s.title}</h3><p className="mt-3 text-[#526B7A] leading-relaxed">{s.body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="py-24 bg-white"><div className="max-w-4xl mx-auto px-6"><Reveal><div className="flex items-center gap-3 justify-center"><ShieldCheck className="text-[#8A650C]"/><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Trust & Safety</p></div><h2 className="mt-4 font-heading text-4xl md:text-6xl font-semibold text-[#17364B] text-center">Faith-filled does not mean informal about safety.</h2><p className="mt-6 text-lg text-[#526B7A] leading-relaxed text-center max-w-3xl mx-auto">Youth-centered work requires appropriate screening, boundaries, supervision, guardian involvement, responsible information handling, and clear reporting expectations. Christian conviction and professional accountability belong together.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><SecondaryButton to="/safeguarding">Youth Safeguarding</SecondaryButton><SecondaryButton to="/about">About Consecrated Hands</SecondaryButton></div></Reveal></div></section>

  <section className="py-24 bg-[#F8FCFF]"><div className="max-w-3xl mx-auto px-6"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold text-center">Questions</p><h2 className="mt-4 font-heading text-4xl md:text-6xl font-semibold text-[#17364B] text-center">Start here.</h2></Reveal><Reveal delay={.05}><Accordion type="single" collapsible className="mt-9">{FAQ.map((f,i)=><AccordionItem key={f.q} value={`home-faq-${i}`} className="border-b border-[#DCE8EF]"><AccordionTrigger className="text-left font-heading text-xl md:text-2xl text-[#17364B] hover:text-[#176F9F] hover:no-underline py-6">{f.q}</AccordionTrigger><AccordionContent className="text-[#526B7A] leading-relaxed text-base pb-6">{f.a}</AccordionContent></AccordionItem>)}</Accordion></Reveal></div></section>

  <section className="py-24 md:py-32 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><HandHeart className="mx-auto text-[#8A650C]" size={38}/><p className="mt-5 text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Build the Next Strand</p><h2 className="mt-4 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">Give. Mentor. Volunteer. Pray.</h2><p className="mt-6 max-w-2xl mx-auto text-lg text-[#526B7A] leading-relaxed">Every faithful connection can become part of a young person’s future.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><PrimaryButton to="/donate">Give Today</PrimaryButton><SecondaryButton to="/volunteer">Volunteer or Mentor</SecondaryButton><SecondaryButton to="/prayer">Request Prayer</SecondaryButton></div></Reveal></div></section>
</>}
