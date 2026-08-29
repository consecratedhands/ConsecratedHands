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

function Nav(){
  const [open,setOpen]=useState(false);
  const loc=useLocation();
  useEffect(()=>setOpen(false),[loc.pathname]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  return <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E7F0F6]">
    <div className="max-w-7xl mx-auto px-5 md:px-10 h-24 flex items-center justify-between">
      <Link to="/" className="flex items-center" aria-label="Consecrated Hands home">
        <img src={ORG.logo} alt="Consecrated Hands" className="h-[4.8rem] md:h-[5.2rem] w-auto object-contain"/>
      </Link>
      <nav className="hidden lg:flex items-center gap-6">
        {NAV.map(n=><NavLink key={n.to} to={n.to} className={({isActive})=>`text-sm font-semibold transition-colors ${isActive?"text-[#3A9FD9]":"text-[#4E6878] hover:text-[#3A9FD9]"}`}>{n.label}</NavLink>)}
        <Link to="/donate" className="ml-2 rounded-full bg-[#73C8FF] text-white px-6 py-3 text-sm font-bold shadow-sm hover:-translate-y-0.5 transition">Donate</Link>
      </nav>
      <button onClick={()=>setOpen(v=>!v)} className="lg:hidden p-2 text-[#17364B]" aria-label={open?"Close menu":"Open menu"} aria-expanded={open}>{open?<X/>:<Menu/>}</button>
    </div>
    <AnimatePresence>{open&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="lg:hidden fixed top-24 inset-x-0 bottom-0 bg-white border-t border-[#E7F0F6] overflow-y-auto">
      <div className="px-6 py-6 flex flex-col">
        {NAV.map(n=><NavLink key={n.to} to={n.to} className={({isActive})=>`py-4 border-b border-[#ECF3F7] text-xl font-semibold ${isActive?"text-[#3A9FD9]":"text-[#17364B]"}`}>{n.label}</NavLink>)}
        <Link to="/donate" className="mt-6 bg-[#73C8FF] text-white text-center py-4 rounded-full font-bold">Donate</Link>
      </div>
    </motion.div>}</AnimatePresence>
  </header>
}

function Footer(){return <footer className="bg-[#16384F] text-white">
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
    <div className="grid md:grid-cols-[1.3fr_.7fr_.8fr] gap-12">
      <div><img src={ORG.logo} alt="Consecrated Hands" className="h-28 w-auto object-contain bg-white rounded-2xl p-2"/><h3 className="mt-5 font-heading text-3xl max-w-md">Become Who God Set You Apart to Be.</h3><p className="mt-4 text-white/70 max-w-lg leading-relaxed">Christ-centered youth mentorship built around faith, relationships, practical growth, opportunity, leadership, and service.</p><Link to="/donate" className="inline-flex items-center gap-2 mt-6 bg-[#73C8FF] text-white px-6 py-3 rounded-full font-bold"><Heart size={17}/> Support the Mission</Link></div>
      <div><p className="text-xs uppercase tracking-[.25em] text-[#F0C95C] font-bold mb-5">Explore</p><div className="space-y-3">{NAV.concat({to:"/donate",label:"Donate"}).map(n=><div key={n.to}><Link to={n.to} className="text-white/75 hover:text-white">{n.label}</Link></div>)}</div></div>
      <div><p className="text-xs uppercase tracking-[.25em] text-[#F0C95C] font-bold mb-5">Contact</p>{ORG.contacts.map(c=><div key={c.name} className="text-white/75 leading-relaxed"><strong className="text-white">{c.name}</strong><br/>{c.title}<br/><a href={`tel:${c.phone.replace(/-/g,"")}`}>{c.phone}</a></div>)}<a href={`mailto:${ORG.email}`} className="block mt-4 text-white/75 break-all">{ORG.email}</a></div>
    </div>
    <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 justify-between text-sm text-white/50"><span>© {new Date().getFullYear()} Consecrated Hands</span><span>{ORG.taxStatus}</span></div>
  </div>
</footer>}

export default function Layout({children}){const loc=useLocation();useEffect(()=>window.scrollTo(0,0),[loc.pathname]);return <div className="min-h-screen bg-white"><Nav/><main>{children}</main><Footer/></div>}
