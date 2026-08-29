import { useEffect, useId, useState } from "react";
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
  const navigationId=useId();
  const loc=useLocation();
  useEffect(()=>{
    setOpen(false);
  },[loc.pathname]);
  useEffect(()=>{
    document.body.style.overflow=open?"hidden":"";
    return()=>{document.body.style.overflow=""};
  },[open]);
  useEffect(()=>{
    const closeOnEscape=(event)=>{if(event.key==="Escape")setOpen(false)};
    document.addEventListener("keydown",closeOnEscape);
    return()=>document.removeEventListener("keydown",closeOnEscape);
  },[]);

  return <>
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#D8EEF8] shadow-[0_8px_30px_rgba(37,41,44,.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-24 flex items-center justify-between">
        <Link to="/" className="flex min-w-0 items-center" aria-label="Consecrated Hands home">
          <img src={ORG.logo} alt="Consecrated Hands" className="h-[4.4rem] sm:h-[5.1rem] w-auto max-w-[calc(100vw-5.5rem)] sm:max-w-[16.5rem] object-contain"/>
        </Link>
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
          {NAV.map(n=><NavLink key={n.to} to={n.to} end={n.to==="/"} className={({isActive})=>`text-sm font-semibold transition-colors ${isActive?"text-[#006DAA]":"text-[#424B52] hover:text-[#006DAA]"}`}>{n.label}</NavLink>)}
          <Link to="/donate" className="ml-2 rounded-full bg-[#FFD21F] text-[#25292C] px-6 py-3 text-sm font-extrabold shadow-[0_10px_24px_-14px_rgba(210,156,0,.75)] hover:bg-[#FFE066] hover:-translate-y-0.5 transition">Donate</Link>
        </nav>
        <button
          type="button"
          onClick={()=>setOpen(v=>!v)}
          className="lg:hidden ml-3 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D8EEF8] bg-[#F4FBFF] text-[#25292C] shadow-sm"
          aria-label={open?"Close menu":"Open menu"}
          aria-expanded={open}
          aria-controls={navigationId}
        >{open?<X size={25}/>:<Menu size={25}/>}</button>
      </div>
    </header>

    <AnimatePresence>
      {open&&<motion.aside
        id={navigationId}
        initial={{opacity:0,y:-14}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,y:-14}}
        transition={{duration:.22,ease:[.16,1,.3,1]}}
        className="lg:hidden fixed inset-x-0 top-24 z-40 h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain bg-white"
        aria-label="Mobile menu"
      >
        <nav className="mx-auto flex min-h-full max-w-xl flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5" aria-label="Mobile navigation">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[.22em] text-[#A66F00]">Explore Consecrated Hands</p>
          <div className="rounded-3xl border border-[#D8EEF8] bg-[#F4FBFF] px-4">
            {NAV.map(n=><NavLink
              key={n.to}
              to={n.to}
              end={n.to==="/"}
              onClick={()=>setOpen(false)}
              className={({isActive})=>`flex min-h-14 items-center border-b border-[#D8EEF8] px-2 py-3 text-lg font-bold last:border-b-0 ${isActive?"text-[#006DAA]":"text-[#25292C]"}`}
            >{n.label}</NavLink>)}
          </div>
          <Link to="/donate" onClick={()=>setOpen(false)} className="mt-5 flex min-h-14 items-center justify-center rounded-full bg-[#FFD21F] px-6 py-4 text-center text-lg font-extrabold text-[#25292C] shadow-[0_14px_30px_-16px_rgba(210,156,0,.8)]">Donate Securely</Link>
          <p className="mt-auto pt-8 text-center font-heading text-2xl font-semibold text-[#25292C]">Become Who God Set You Apart to Be.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#59636A]">
            {LEGAL.map(item=><Link key={item.to} to={item.to} onClick={()=>setOpen(false)}>{item.label}</Link>)}
          </div>
        </nav>
      </motion.aside>}
    </AnimatePresence>
  </>
}

function Footer(){return <footer className="bg-[#25292C] text-white">
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
    <div className="grid md:grid-cols-[1.3fr_.7fr_.8fr] gap-12">
      <div><img src={ORG.logo} alt="Consecrated Hands" loading="lazy" className="h-28 w-auto max-w-full object-contain bg-white rounded-2xl p-2"/><h2 className="mt-5 font-heading text-3xl max-w-md">Become Who God Set You Apart to Be.</h2><p className="mt-4 text-white/80 max-w-lg leading-relaxed">Christ-centered youth mentorship built around faith, relationships, practical growth, opportunity, leadership, and service.</p><Link to="/donate" className="inline-flex items-center gap-2 mt-6 bg-[#FFD21F] text-[#25292C] px-6 py-3 rounded-full font-extrabold"><Heart size={17}/>Support the Mission</Link></div>
      <div><p className="text-xs uppercase tracking-[.25em] text-[#FFE066] font-bold mb-5">Explore</p><div className="space-y-3">{NAV.concat({to:"/donate",label:"Donate"}).map(n=><div key={n.to}><Link to={n.to} className="text-white/80 hover:text-white">{n.label}</Link></div>)}</div></div>
      <div><p className="text-xs uppercase tracking-[.25em] text-[#FFE066] font-bold mb-5">Contact</p>{ORG.contacts.map(c=><div key={c.name} className="text-white/80 leading-relaxed"><strong className="text-white">{c.name}</strong><br/>{c.title}<br/><a className="hover:text-white" href={`tel:${c.phone.replace(/-/g,"")}`}>{c.phone}</a></div>)}<a href={`mailto:${ORG.email}`} className="block mt-4 text-sm md:text-base text-white/80 hover:text-white break-words">{ORG.email}</a></div>
    </div>
    <div className="mt-14 pt-6 border-t border-white/15 flex flex-col lg:flex-row gap-5 justify-between text-sm text-white/70"><div className="flex flex-col sm:flex-row gap-2 sm:gap-5"><span>© {new Date().getFullYear()} Consecrated Hands</span><span>{ORG.taxStatus}</span></div><nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal information">{LEGAL.map(item=><Link key={item.to} to={item.to} className="hover:text-white">{item.label}</Link>)}</nav></div>
  </div>
</footer>}

export default function Layout({children}){
  const loc=useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[loc.pathname]);
  return <div className="min-h-screen bg-white"><a href="#main-content" className="skip-link">Skip to main content</a><Nav/><main id="main-content" tabIndex="-1">{children}</main><Footer/></div>
}
