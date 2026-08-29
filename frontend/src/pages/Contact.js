import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, HandHeart, Mail, MessageCircle, Phone, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Seo from "../components/Seo";
import ApplicationForm from "../components/ApplicationForm";
import { Reveal } from "../components/Reveal";
import { FAQ, IMAGES, ORG } from "../lib/content";

const reasons=[
  {icon:HandHeart,title:"Mentorship for a young person",body:"Ask how the program works, who it is designed for, and how to begin a conversation about support."},
  {icon:Users,title:"Volunteer or mentor",body:"Tell us about your interests, experience, availability, and the type of role you feel called to explore."},
  {icon:Briefcase,title:"Business or community partnership",body:"Offer career exposure, internships, jobs, event support, space, supplies, meals, sponsorship, or another opportunity."},
  {icon:MessageCircle,title:"General questions",body:"Reach out about the mission, donations, church partnerships, schools, community events, prayer, or anything else."},
];

export default function Contact(){return <>
  <Seo title="Contact" description="Contact Consecrated Hands about mentorship, volunteering, partnerships, prayer, or general questions."/>

  <section className="pt-32 md:pt-36 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
    <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Contact Consecrated Hands</p><h1 className="mt-5 font-heading text-5xl md:text-7xl lg:text-[5.2rem] font-semibold text-[#17364B]">A stronger web can start with <span className="italic text-[#2F8FC7]">one conversation.</span></h1><p className="mt-7 max-w-3xl text-xl text-[#405E70] leading-relaxed">Whether you are a parent, young person, mentor, volunteer, church, school, business, donor, or community partner, tell us what brought you here and how we can connect.</p></div></Reveal>
    <Reveal delay={.08}><img src={IMAGES.kidsSun} alt="Young people connecting in community" className="w-full aspect-[4/4.2] object-cover rounded-[2.25rem] shadow-[0_28px_70px_rgba(32,89,124,.14)]"/></Reveal>
  </div></section>

  <section className="py-24 bg-[#F8FCFF]"><div className="max-w-7xl mx-auto px-6 md:px-12"><Reveal><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Why People Reach Out</p><h2 className="mt-4 font-heading text-5xl md:text-6xl font-semibold text-[#17364B]">There are many ways into the mission.</h2></div></Reveal><div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">{reasons.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.04}><div className="h-full bg-white rounded-3xl border border-[#DCE8EF] p-7"><div className="w-12 h-12 rounded-2xl bg-[#EAF7FF] flex items-center justify-center"><Icon className="text-[#176F9F]"/></div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#17364B]">{title}</h3><p className="mt-3 text-[#526B7A] leading-relaxed">{body}</p></div></Reveal>)}</div></div></section>

  <section className="py-24 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1.35fr_.65fr] gap-8 items-start">
    <Reveal><div className="bg-white rounded-[2rem] border border-[#DCE8EF] p-6 md:p-9 shadow-[0_18px_55px_rgba(41,91,123,.07)]"><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Send a Message</p><h2 className="mt-4 mb-7 font-heading text-4xl md:text-5xl font-semibold text-[#17364B]">Tell us where you want to begin.</h2><ApplicationForm interests={["general","volunteer","mentor","mentee","partner"]} defaultInterest="general" submitLabel="Send Message" messagePlaceholder="Tell us how we can help, how you want to serve, or what kind of partnership you have in mind." testidPrefix="contact"/></div></Reveal>
    <Reveal delay={.06}><aside className="bg-[#16384F] text-white rounded-[2rem] p-7 md:p-8 sticky top-28"><h2 className="font-heading text-3xl font-semibold">Reach us directly</h2><p className="mt-3 text-white/75 leading-relaxed">Prefer a direct call or email? Use the information below.</p><div className="mt-7 space-y-6">{ORG.contacts.map(c=><div key={c.name} className="flex gap-4"><Phone className="text-[#9AD8FF] shrink-0" size={19}/><div><p className="font-bold">{c.name}</p><p className="text-white/75 text-sm">{c.title}</p><a className="text-white/90 hover:text-white" href={`tel:${c.phone.replace(/-/g,"")}`}>{c.phone}</a></div></div>)}<div className="flex gap-4"><Mail className="text-[#9AD8FF] shrink-0" size={19}/><div className="min-w-0"><p className="font-bold">Email</p><a className="text-white/90 hover:text-white break-words" href={`mailto:${ORG.email}`}>{ORG.email}</a></div></div></div><div className="mt-8 pt-6 border-t border-white/15"><p className="text-sm text-white/70 leading-relaxed">Website submissions are handled according to our Privacy Policy. Please avoid sending highly sensitive records through a general contact form.</p><Link to="/privacy" className="inline-flex items-center gap-2 mt-4 text-[#9AD8FF] font-bold">Read Privacy Policy <ArrowRight size={16}/></Link></div></aside></Reveal>
  </div></section>

  <section className="py-24 bg-[#F8FCFF]"><div className="max-w-3xl mx-auto px-6"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold text-center">FAQ</p><h2 className="mt-4 font-heading text-4xl md:text-6xl font-semibold text-[#17364B] text-center">Frequently asked questions</h2></Reveal><Reveal delay={.05}><Accordion type="single" collapsible className="mt-10">{FAQ.map((f,i)=><AccordionItem key={i} value={`item-${i}`} className="border-b border-[#DCE8EF]"><AccordionTrigger className="text-left font-heading text-xl md:text-2xl text-[#17364B] hover:text-[#176F9F] hover:no-underline py-6">{f.q}</AccordionTrigger><AccordionContent className="text-[#526B7A] leading-relaxed text-base pb-6">{f.a}</AccordionContent></AccordionItem>)}</Accordion></Reveal></div></section>

  <section className="py-24 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Not Sure Which Option Fits?</p><h2 className="mt-4 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">Start with “general.” We’ll take it from there.</h2><p className="mt-6 text-lg text-[#526B7A] max-w-2xl mx-auto leading-relaxed">You do not need to know the perfect category before reaching out. Tell us what is on your mind and what kind of connection you are looking for.</p></Reveal></div></section>
</>}
