import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { ORG } from "../lib/content";

const NAV=[
  {to:"/",label:"Home"},{to:"/about",label:"About"},{to:"/mission",label:"Mission"},
  {to:"/mentorship",label:"Mentorship"},{to:"/volunteer",label:"Volunteer"},
  {to:"/prayer",label:"Prayer"},{to:"/contact",label:"Contact"}
];
const LEGAL=[
  {to:"/privacy",label:"Privacy Policy"},
  {to:"/terms",label:"Terms of Use"},
  {to:"/safeguarding",label:"Youth Safeguarding"},
];

function Nav(){
  const [open,setOpen]=useState(false);
  const loc=useLocation();
  useEffect(()=>setOpen(false),[loc.pathname]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  return <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#DCE8EF]">
    <div className="max-w-7xl mx-auto px-5 md:px-10 h-24 flex items-center justify-between">
      <Link to="/" className="flex items-center" aria-label="Consecrated Hands home">
        <img src={ORG.logo} alt="Consecrated Hands" className="h-[4.8rem] md:h-[5.2rem] w-auto object-contain"/>
      </Link>
      <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
        {NAV.map(n=><NavLink key={n.to} to={n.to} className={({isActive})=>`text-sm font-semibold transition-colors ${isActive?"text-[#176F9F]":"text-[#405E70] hover:text-[#176F9F]"}`}>{n.label}</NavLink>)}
        <Link to="/donate" className="ml-2 rounded-full bg-[#73C8FF] text-[#17364B] px-6 py-3 text-sm font-extrabold shadow-sm hover:bg-[#9AD8FF] hover:-translate-y-0.5 transition">Donate</Link>
      </nav>
      <button type="button" onClick={()=>setOpen(v=>!v)} className="lg:hidden p-3 text-[#17364B] rounded-full" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="mobile-navigation">{open?<X/>:<Menu/>}</button>
    </div>
    <AnimatePresence>{open&&<motion.div id="mobile-navigation" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="lg:hidden fixed top-24 inset-x-0 bottom-0 bg-white border-t border-[#DCE8EF] overflow-y-auto">
      <nav className="px-6 py-6 flex flex-col" aria-label="Mobile navigation">
        {NAV.map(n=><NavLink key={n.to} to={n.to} className={({isActive})=>`py-4 border-b border-[#E5EEF3] text-xl font-semibold ${isActive?"text-[#176F9F]":"text-[#17364B]"}`}>{n.label}</NavLink>)}
        <Link to="/donate" className="mt-6 bg-[#73C8FF] text-[#17364B] text-center py-4 rounded-full font-extrabold">Donate</Link>
      </nav>
    </motion.div>}</AnimatePresence>
  </header>
}

function Footer(){return <footer className="bg-[#16384F] text-white">
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
    <div className="grid md:grid-cols-[1.3fr_.7fr_.8fr] gap-12">
      <div><img src={ORG.logo} alt="Consecrated Hands" loading="lazy" className="h-28 w-auto max-w-full object-contain bg-white rounded-2xl p-2"/><h2 className="mt-5 font-heading text-3xl max-w-md">Become Who God Set You Apart to Be.</h2><p className="mt-4 text-white/80 max-w-lg leading-relaxed">Christ-centered youth mentorship built around faith, relationships, practical growth, opportunity, leadership, and service.</p><Link to="/donate" className="inline-flex items-center gap-2 mt-6 bg-[#73C8FF] text-[#17364B] px-6 py-3 rounded-full font-extrabold"><Heart size={17}/>Support the Mission</Link></div>
      <div><p className="text-xs uppercase tracking-[.25em] text-[#F5D875] font-bold mb-5">Explore</p><div className="space-y-3">{NAV.concat({to:"/donate",label:"Donate"}).map(n=><div key={n.to}><Link to={n.to} className="text-white/80 hover:text-white">{n.label}</Link></div>)}</div></div>
      <div><p className="text-xs uppercase tracking-[.25em] text-[#F5D875] font-bold mb-5">Contact</p>{ORG.contacts.map(c=><div key={c.name} className="text-white/80 leading-relaxed"><strong className="text-white">{c.name}</strong><br/>{c.title}<br/><a className="hover:text-white" href={`tel:${c.phone.replace(/-/g,"")}`}>{c.phone}</a></div>)}<a href={`mailto:${ORG.email}`} className="block mt-4 text-sm md:text-base text-white/80 hover:text-white break-words">{ORG.email}</a></div>
    </div>
    <div className="mt-14 pt-6 border-t border-white/15 flex flex-col lg:flex-row gap-5 justify-between text-sm text-white/70"><div className="flex flex-col sm:flex-row gap-2 sm:gap-5"><span>© {new Date().getFullYear()} Consecrated Hands</span><span>{ORG.taxStatus}</span></div><nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal information">{LEGAL.map(item=><Link key={item.to} to={item.to} className="hover:text-white">{item.label}</Link>)}</nav></div>
  </div>
</footer>}

export default function Layout({children}){
  const loc=useLocation();
  useEffect(()=>window.scrollTo(0,0),[loc.pathname]);
  return <div className="min-h-screen bg-white"><a href="#main-content" className="skip-link">Skip to main content</a><Nav/><main id="main-content" tabIndex="-1">{children}</main><Footer/></div>
}
