import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, Compass, Cross, Users } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { IMAGES, ORG } from "../lib/content";

const focus=[
  {icon:Cross,title:"Identity",body:"Young people need to know they are created intentionally, loved by God, and called toward a life with purpose—not defined by hardship, mistakes, or what others have said about them."},
  {icon:Users,title:"Stability",body:"Consistent adults, healthy community, trusted relationships, and a sense of belonging create room for honesty, accountability, learning, and growth."},
  {icon:Compass,title:"Direction",body:"Education, life skills, financial understanding, career exposure, character, and leadership help purpose move from an idea into a practical path."},
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
    <Reveal delay={.08}><img src={IMAGES.sportsMentor} alt="Mentorship relationship and community activity" className="w-full aspect-[4/4.6] object-cover rounded-[2.25rem] shadow-[0_28px_70px_rgba(35,105,145,.14)]"/></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">What We Want to Change</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Identity. Stability. Direction.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed max-w-3xl">Our mission is not built around one activity. It is built around helping young people develop a stronger sense of who they are, who is walking with them, and where they can go next.</p></div></Reveal>
    <div className="mt-12 grid md:grid-cols-3 gap-5">{focus.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.05}><div className="h-full rounded-3xl bg-white border border-[#D8EEF8] p-8"><div className="w-12 h-12 rounded-2xl bg-[#EAF9FF] flex items-center justify-center"><Icon className="text-[#006DAA]"/></div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#25292C]">{title}</h3><p className="mt-4 text-[#59636A] leading-relaxed">{body}</p></div></Reveal>)}</div>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12">
    <Reveal><div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12"><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">How We Carry the Mission</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Purpose needs truth and follow-through.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed">These four commitments keep the mission focused while the specific support changes from one young person to another.</p></div><div className="grid md:grid-cols-2 gap-4">{commitments.map((item,i)=><Reveal key={item.title} delay={(i%2)*.03}><div className="h-full rounded-3xl border border-[#D8EEF8] bg-[#F4FBFF] p-6"><Check className="text-[#006DAA]" size={26}/><h3 className="mt-4 font-heading text-2xl md:text-3xl font-semibold text-[#25292C]">{item.title}</h3><p className="mt-2 text-[#59636A] leading-relaxed">{item.body}</p></div></Reveal>)}</div></div></Reveal>
  </div></section>

  <section className="py-16 sm:py-20 md:py-32 bg-[#25292C] text-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
    <Reveal><img src={IMAGES.youthStudying} alt="Children learning together through a hands-on activity" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[2rem]"/></Reveal>
    <Reveal delay={.05}><div><BookOpen className="text-[#FFE066]" size={34}/><p className="mt-5 text-xs uppercase tracking-[.28em] text-[#FFE066] font-bold">The Long-Term Goal</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold">From receiving support to becoming someone who strengthens others.</h2><p className="mt-6 text-lg text-white/80 leading-relaxed">We want young people to grow into stable, capable, Christ-centered adults who lead, serve, give back, build healthy families and communities, and help the next person move forward.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/mentorship" className="inline-flex items-center gap-2 bg-[#6FD3FF] text-[#25292C] px-7 py-3.5 rounded-full font-extrabold">See The Web of Consecration™ <ArrowRight size={17}/></Link><Link to="/volunteer" className="inline-flex items-center gap-2 border border-white/25 bg-white/[.07] text-white px-7 py-3.5 rounded-full font-bold">Get Involved <ArrowRight size={17}/></Link></div></div></Reveal>
  </div></section>
</>}
