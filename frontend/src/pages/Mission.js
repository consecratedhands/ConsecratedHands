import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, Compass, Cross, HeartHandshake, Users } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { IMAGES, ORG } from "../lib/content";

const focus=[
  {icon:Cross,title:"Faith that gives identity",body:"Young people need to know they are created intentionally, loved by God, and called toward a life with purpose—not defined by hardship, mistakes, or what others have said about them."},
  {icon:Users,title:"Relationships that create stability",body:"Consistent mentors, healthy community, trusted adults, and a sense of belonging create conditions where honesty, accountability, learning, and growth can take root."},
  {icon:Compass,title:"Skills and opportunity that create direction",body:"Education, life skills, financial understanding, career exposure, character, and leadership help purpose move from an idea into a practical path."},
];

const promises=[
  "See the whole young person, not one isolated problem.",
  "Lead with Christ while offering practical, real-life support.",
  "Build trust through consistency instead of one-time inspiration.",
  "Connect young people to healthy adults, experiences, skills, and opportunity.",
  "Help growth move outward into service, leadership, and giving back.",
];

const commitments=[
  {title:"Reach early",body:"Pay attention before a young person is known only by a crisis, a mistake, or a difficult season."},
  {title:"Stay consistent",body:"Build trust through presence, follow-through, prayer, listening, correction, and encouragement over time."},
  {title:"Keep support practical",body:"Let purpose become visible through habits, learning, life skills, opportunity, and real next steps."},
  {title:"Keep Christ central",body:"Point young people toward identity, hope, forgiveness, wisdom, and calling in Jesus."},
];

export default function Mission(){return <>
  <Seo title="Our Mission" description={ORG.mission}/>

  <section className="pt-24 md:pt-28 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
    <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Our Mission</p><h1 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl lg:text-[5.2rem] font-semibold text-[#25292C]">Reach them early. Walk with them fully. Point them toward <span className="italic text-[#007BC2]">purpose in Christ.</span></h1><p className="mt-7 max-w-3xl text-xl text-[#424B52] leading-relaxed">{ORG.mission}</p></div></Reveal>
    <Reveal delay={.08}><div className="relative"><img src={IMAGES.sportsMentor} alt="Mentorship relationship and community activity" className="w-full aspect-[4/4.6] object-cover rounded-[2.25rem] shadow-[0_28px_70px_rgba(35,105,145,.14)]"/></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">What We Believe Changes Trajectories</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Identity. Stability. Direction.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed max-w-3xl">Mentorship becomes powerful when spiritual truth, trusted relationships, practical capability, and real opportunity reinforce one another.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-3 gap-5">{focus.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.05}><div className="h-full rounded-3xl bg-white border border-[#D8EEF8] p-8"><div className="w-12 h-12 rounded-2xl bg-[#EAF9FF] flex items-center justify-center"><Icon className="text-[#006DAA]"/></div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#25292C]">{title}</h3><p className="mt-4 text-[#59636A] leading-relaxed">{body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12"><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">How We Carry the Mission</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Purpose needs both truth and follow-through.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed">The mission becomes real through steady choices: reaching early, staying consistent, keeping support practical, and keeping Christ central.</p></div><div className="grid md:grid-cols-2 gap-4">{commitments.map((item,i)=><Reveal key={item.title} delay={(i%2)*.03}><div className="h-full rounded-3xl border border-[#D8EEF8] bg-[#F4FBFF] p-6"><Check className="text-[#006DAA]" size={26}/><h3 className="mt-4 font-heading text-2xl md:text-3xl font-semibold text-[#25292C]">{item.title}</h3><p className="mt-2 text-[#59636A] leading-relaxed">{item.body}</p></div></Reveal>)}</div></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#25292C] text-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
    <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#FFE066] font-bold">What We Promise to Keep Central</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold">Relationship first. Purpose always.</h2><p className="mt-6 text-lg text-white/75 leading-relaxed">Programs matter, but people remember who showed up. Consecrated Hands is designed around consistent presence and practical follow-through.</p></div></Reveal>
    <Reveal delay={.05}><div className="space-y-4">{promises.map(p=><div key={p} className="flex gap-4 rounded-2xl border border-white/15 bg-white/[.06] p-5"><div className="w-9 h-9 rounded-full bg-[#6FD3FF] text-[#25292C] flex items-center justify-center shrink-0"><Check size={18}/></div><p className="text-white/85 leading-relaxed pt-1">{p}</p></div>)}</div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
    <Reveal><img src={IMAGES.youthStudying} alt="Children learning together through a hands-on activity" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[2rem] shadow-[0_24px_60px_rgba(35,105,145,.12)]"/></Reveal>
    <Reveal delay={.06}><div><BookOpen className="text-[#A66F00]" size={34}/><p className="mt-5 text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">The Long-Term Goal</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">From “help me” to <span className="italic text-[#007BC2]">“now I can help somebody else.”</span></h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed">We want young people to grow into stable, capable, Christ-centered adults who lead, serve, give back, build healthy families and communities, and strengthen the next person.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/mentorship" className="inline-flex items-center gap-2 bg-[#6FD3FF] text-[#25292C] px-7 py-3.5 rounded-full font-extrabold">See The Web of Consecration™ <ArrowRight size={17}/></Link><Link to="/volunteer" className="inline-flex items-center gap-2 border border-[#D8EEF8] bg-white text-[#25292C] px-7 py-3.5 rounded-full font-bold">Get Involved <ArrowRight size={17}/></Link></div></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-24 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><HeartHandshake className="mx-auto text-[#A66F00]" size={38}/><h2 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">A mission becomes real when people show up.</h2><p className="mt-6 text-lg text-[#59636A] max-w-2xl mx-auto leading-relaxed">Mentors, volunteers, families, churches, schools, businesses, donors, and community partners can all become part of the web around a young person.</p><Link to="/contact" className="inline-flex items-center gap-2 mt-8 bg-[#6FD3FF] text-[#25292C] px-7 py-3.5 rounded-full font-extrabold">Start a Conversation <ArrowRight size={17}/></Link></Reveal></div></section>
</>}
