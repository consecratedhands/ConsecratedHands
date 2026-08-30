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

function PrimaryButton({to,children}){return <Link to={to} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#6FD3FF] text-[#25292C] px-7 py-3.5 font-extrabold shadow-sm hover:bg-[#B8ECFF] hover:-translate-y-0.5 transition">{children}<ArrowRight size={17}/></Link>}
function SecondaryButton({to,children}){return <Link to={to} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white text-[#25292C] border border-[#D8EEF8] px-7 py-3.5 font-bold hover:border-[#6FD3FF] hover:-translate-y-0.5 transition">{children}<ArrowRight size={17}/></Link>}

export default function Home(){return <>
  <Seo title="Home" description={ORG.mission}/>

  <section className="relative overflow-hidden bg-white pt-24 md:pt-28">
    <div className="absolute inset-0"><img src={IMAGES.kidsSun} alt="Young people spending time together" className="w-full h-full object-cover object-center"/><div className="absolute inset-0 bg-white/90 lg:bg-gradient-to-r lg:from-white lg:via-white/95 lg:to-white/55"/></div>
    <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid lg:grid-cols-[1.08fr_.92fr] gap-12 items-center">
      <Reveal><div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#D8EEF8] px-4 py-2 text-xs font-bold tracking-[.18em] uppercase text-[#006DAA]"><Sparkles size={14} className="text-[#A66F00]"/> Christ-centered youth mentorship</div>
        <h1 className="mt-7 font-heading text-[2.75rem] sm:text-[3.35rem] leading-[.96] md:text-7xl lg:text-[5.8rem] font-semibold tracking-tight text-[#25292C]">Become Who God Set You Apart to <span className="italic text-[#A66F00]">Be.</span></h1>
        <p className="mt-7 text-lg md:text-xl leading-relaxed text-[#424B52] max-w-2xl">Consecrated Hands walks with young people before crisis defines them—strengthening faith, stability, education, life skills, opportunity, healthy relationships, character, leadership, and service.</p>
        <div className="mt-9 flex flex-wrap gap-3"><PrimaryButton to="/mentorship">Explore Mentorship</PrimaryButton><SecondaryButton to="/donate">Support the Mission</SecondaryButton></div>
      </div></Reveal>
      <Reveal delay={.1}><div className="relative lg:justify-self-end"><div className="absolute inset-8 rounded-full bg-[#EAF9FF] blur-3xl opacity-80"/><div className="relative rounded-[2.5rem] border border-white bg-white/95 shadow-[0_30px_90px_rgba(35,105,145,.18)] p-5 md:p-8"><img src={ORG.logo} alt="Consecrated Hands official logo" className="w-full max-h-[31rem] object-contain"/></div></div></Reveal>
    </div>
  </section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[.85fr_1.15fr] gap-12 md:gap-16 items-center">
    <Reveal><div className="relative"><img src={IMAGES.sportsMentor} alt="Mentorship and community activity" loading="lazy" className="w-full aspect-[4/5] object-cover rounded-[2rem] shadow-[0_24px_60px_rgba(35,105,145,.12)]"/><div className="absolute -bottom-5 -right-5 hidden md:block bg-white border border-[#D8EEF8] rounded-3xl p-6 max-w-[15rem] shadow-xl"><p className="font-heading text-2xl text-[#25292C]">Relationship first.</p><p className="mt-2 text-sm text-[#59636A]">The activity opens the door. Consistency changes the trajectory.</p></div></div></Reveal>
    <Reveal delay={.06}><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Why We Exist</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Reach them early. Walk with them fully.</h2><p className="mt-6 text-xl leading-relaxed text-[#424B52]">A young person is more than the problem happening around them. We help them see their God-given worth and surround that identity with practical support that makes purpose possible.</p><p className="mt-5 text-lg leading-relaxed text-[#59636A]">That can mean prayer and Scripture one day, tutoring the next, a conversation about money or work, a meal, an outing, a hard truth, a ride toward opportunity, or simply keeping a promise to show up.</p><div className="mt-8"><SecondaryButton to="/mission">Read Our Mission</SecondaryButton></div></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">The Web of Consecration™</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Seven connected strands. One whole young life.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed max-w-3xl">Faith affects identity. Stability affects learning. Education affects opportunity. Relationships shape character. Character shapes leadership. We strengthen the whole web instead of treating one need in isolation.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{PILLARS.map((p,i)=><Reveal key={p.n} delay={(i%3)*.04}><Link to="/mentorship" className="group block h-full rounded-[1.8rem] border border-[#D8EEF8] bg-white p-7 md:p-8 shadow-[0_12px_35px_rgba(35,105,145,.06)] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(35,105,145,.11)] transition"><div className="w-12 h-12 rounded-full bg-[#EAF9FF] flex items-center justify-center text-[#006DAA] font-extrabold">{p.n}</div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#25292C]">{p.title}</h3><p className="mt-3 text-[#59636A] leading-relaxed">{p.desc}</p><span className="inline-flex items-center gap-1 mt-5 text-sm font-bold text-[#006DAA]">Learn more <ArrowRight size={15} className="group-hover:translate-x-1 transition"/></span></Link></Reveal>)}</div>
    <Reveal><div className="mt-10"><PrimaryButton to="/mentorship">See the Full Framework</PrimaryButton></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#25292C] text-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.28em] text-[#FFE066] font-bold">What Mentorship Can Look Like</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold">Real life. Real relationships. Practical growth.</h2><p className="mt-5 text-lg text-white/75 leading-relaxed">There is no single activity that defines mentorship. The relationship is the foundation; the support changes with the young person.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">{realLife.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.04}><div className="h-full rounded-3xl bg-white/[.07] border border-white/15 p-7"><Icon className="text-[#B8ECFF]" size={27}/><h3 className="mt-5 font-heading text-3xl font-semibold">{title}</h3><p className="mt-3 text-white/75 leading-relaxed">{body}</p></div></Reveal>)}</div>
    <Reveal><img src={IMAGES.basketballReal} alt="Children at an outdoor basketball practice" loading="lazy" className="mt-10 w-full aspect-[16/7] min-h-[18rem] object-cover rounded-[2rem] border border-white/15"/></Reveal>
  </div></section>

  <section className="relative overflow-hidden py-16 sm:py-20 md:py-32"><div className="absolute inset-0"><img src={IMAGES.heroFaith} alt="Faith-centered mentorship materials" loading="lazy" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-[#25292C]/85"/></div><div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center text-white"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#FFE066] font-bold">{TRUTH.eyebrow}</p><h2 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold">{TRUTH.headline}</h2><p className="mt-7 max-w-3xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">{TRUTH.body}</p><p className="mt-8 font-heading italic text-2xl md:text-3xl text-[#FFE066] max-w-3xl mx-auto">{TRUTH.verse}</p></Reveal></div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">The Growth Path</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">From “help me” to “now I can help somebody else.”</h2></div></Reveal>
    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">{pathway.map((s,i)=><Reveal key={s.n} delay={i*.04}><div className="h-full bg-white rounded-3xl border border-[#D8EEF8] p-7"><span className="text-sm font-extrabold text-[#A66F00]">{s.n}</span><h3 className="mt-4 font-heading text-3xl font-semibold text-[#25292C]">{s.title}</h3><p className="mt-3 text-[#59636A] leading-relaxed">{s.body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="py-16 sm:py-20 md:py-24 bg-white"><div className="max-w-4xl mx-auto px-6"><Reveal><div className="flex items-center gap-3 justify-center"><ShieldCheck className="text-[#A66F00]"/><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Trust & Safety</p></div><h2 className="mt-4 font-heading text-4xl md:text-6xl font-semibold text-[#25292C] text-center">Faith-filled does not mean informal about safety.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed text-center max-w-3xl mx-auto">Youth-centered work requires appropriate screening, boundaries, supervision, guardian involvement, responsible information handling, and clear reporting expectations. Christian conviction and professional accountability belong together.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><SecondaryButton to="/safeguarding">Youth Safeguarding</SecondaryButton><SecondaryButton to="/about">About Consecrated Hands</SecondaryButton></div></Reveal></div></section>

  <section className="py-16 sm:py-20 md:py-24 bg-[#F4FBFF]"><div className="max-w-3xl mx-auto px-6"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold text-center">Questions</p><h2 className="mt-4 font-heading text-4xl md:text-6xl font-semibold text-[#25292C] text-center">Start here.</h2></Reveal><Reveal delay={.05}><Accordion type="single" collapsible className="mt-9">{FAQ.map((f,i)=><AccordionItem key={f.q} value={`home-faq-${i}`} className="border-b border-[#D8EEF8]"><AccordionTrigger className="text-left font-heading text-xl md:text-2xl text-[#25292C] hover:text-[#006DAA] hover:no-underline py-6">{f.q}</AccordionTrigger><AccordionContent className="text-[#59636A] leading-relaxed text-base pb-6">{f.a}</AccordionContent></AccordionItem>)}</Accordion></Reveal></div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><HandHeart className="mx-auto text-[#A66F00]" size={38}/><p className="mt-5 text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Build the Next Strand</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Give. Mentor. Volunteer. Pray.</h2><p className="mt-6 max-w-2xl mx-auto text-lg text-[#59636A] leading-relaxed">Every faithful connection can become part of a young person’s future.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><PrimaryButton to="/donate">Give Today</PrimaryButton><SecondaryButton to="/volunteer">Volunteer or Mentor</SecondaryButton><SecondaryButton to="/prayer">Request Prayer</SecondaryButton></div></Reveal></div></section>

  <section className="py-14 sm:py-16 md:py-20 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12"><Reveal><figure><img src="/img/consecrated-hands-park-van.webp" alt="Consecrated Hands youth transportation concept parked at a park" loading="lazy" className="w-full aspect-[16/9] object-cover rounded-[2rem] shadow-[0_24px_60px_rgba(35,105,145,.12)]"/><figcaption className="mt-3 text-xs text-center text-[#7A858C]">Transportation concept — building toward safe, reliable access to outings, mentorship, and opportunity.</figcaption></figure></Reveal></div></section>
</>}