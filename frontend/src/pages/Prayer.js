import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Check, Cross, HandHeart, Heart, Loader2, ShieldCheck } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { IMAGES, ORG } from "../lib/content";

const API_BASE=(process.env.REACT_APP_BACKEND_URL||"").replace(/\/$/,"");
const API=API_BASE?`${API_BASE}/api`:"";
const input="w-full rounded-2xl border border-[#D5E4EC] bg-white px-4 py-3.5 text-[#17364B] placeholder:text-[#708795] focus:outline-none focus:ring-2 focus:ring-[#2E86B7] focus:border-[#2E86B7]";

const prayerValues=[
  {icon:Cross,title:"Christ at the center",body:"Prayer is not an extra feature beside the mission. We believe Jesus is the source of identity, hope, wisdom, forgiveness, strength, and purpose."},
  {icon:Heart,title:"You can be honest",body:"You do not need polished words. Share only what you are comfortable sharing. A simple sentence is enough."},
  {icon:ShieldCheck,title:"Privacy matters",body:"Prayer requests may contain personal information. We ask you not to include highly sensitive records and we handle submissions under our Privacy Policy."},
];

export default function Prayer(){
  const [form,setForm]=useState({name:"",email:"",request:"",is_public:false,website:""});
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);
  const update=k=>e=>setForm(f=>({...f,[k]:e.target.value}));

  const submit=async e=>{
    e.preventDefault();
    if(!form.request.trim()){toast.error("Please share your prayer request.");return;}
    if(!API){
      const subject="Prayer request submitted through ConsecratedHands.com";
      const body=[`Name: ${form.name.trim()||"Anonymous"}`,`Email: ${form.email.trim()||"Not provided"}`,`May be shared anonymously: ${form.is_public?"Yes":"No"}`,"",form.request.trim()].join("\n");
      toast.success("Your email app is opening so you can send the prayer request.");
      window.location.href=`mailto:${ORG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setLoading(true);
    try{
      const payload={...form,name:form.name.trim(),email:form.email.trim()||null,request:form.request.trim()};
      const {data}=await axios.post(`${API}/prayer`,payload);
      toast.success(data.message||"Thank you — our team will be praying for you.");
      setDone(true);
      setForm({name:"",email:"",request:"",is_public:false,website:""});
    }catch(err){
      if(err?.response?.status===429)toast.error("Too many submissions. Please try again shortly.");
      else toast.error("Something went wrong. Please try again or email us directly.");
    }finally{setLoading(false)}
  };

  return <>
    <Seo title="Prayer Requests" description="Share a prayer request with Consecrated Hands."/>

    <section className="relative pt-32 md:pt-36 overflow-hidden"><div className="absolute inset-0"><img src={IMAGES.heroFaith} alt="Faith-centered encouragement" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-[#16384F]/88"/></div><div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center text-white"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#F5D875] font-bold">Prayer Requests</p><h1 className="mt-5 font-heading text-5xl md:text-7xl lg:text-[5.4rem] font-semibold">Let us pray <span className="italic text-[#9AD8FF]">with you.</span></h1><p className="mt-7 max-w-3xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">Whatever you are carrying, you do not have to carry it alone. Share only what you are comfortable providing and our team will lift your request up in prayer.</p></Reveal></div></section>

    <section className="py-24 bg-[#F8FCFF]"><div className="max-w-7xl mx-auto px-6 md:px-12"><Reveal><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Why Prayer Has a Place Here</p><h2 className="mt-4 font-heading text-5xl md:text-6xl font-semibold text-[#17364B]">Practical help and prayer belong together.</h2><p className="mt-6 text-lg text-[#526B7A] leading-relaxed">Consecrated Hands is built to offer practical mentorship while remaining openly Christ-centered. We can talk about school, work, money, relationships, opportunity, and life skills while also praying for wisdom, strength, healing, direction, and peace.</p></div></Reveal><div className="mt-10 grid md:grid-cols-3 gap-5">{prayerValues.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.04}><div className="h-full bg-white border border-[#DCE8EF] rounded-3xl p-7"><div className="w-12 h-12 rounded-2xl bg-[#EAF7FF] flex items-center justify-center"><Icon className="text-[#176F9F]"/></div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#17364B]">{title}</h3><p className="mt-3 text-[#526B7A] leading-relaxed">{body}</p></div></Reveal>)}</div></div></section>

    <section className="py-24 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[.7fr_1.3fr] gap-10 items-start">
      <Reveal><aside className="rounded-[2rem] bg-[#16384F] text-white p-7 md:p-9 lg:sticky lg:top-28"><HandHeart className="text-[#9AD8FF]" size={34}/><h2 className="mt-5 font-heading text-4xl font-semibold">You can keep it simple.</h2><p className="mt-4 text-white/75 leading-relaxed">A prayer request can be a few words or a fuller story. Your name and email are optional.</p><div className="mt-7 pt-6 border-t border-white/15 space-y-4 text-sm text-white/75 leading-relaxed"><p><strong className="text-white">Please avoid highly sensitive records.</strong> Do not submit passwords, Social Security numbers, bank credentials, medical records, or similar private documents.</p><p><strong className="text-white">Immediate danger needs immediate help.</strong> A website prayer form is not an emergency service. Contact emergency services or an appropriate crisis resource if someone is in immediate danger.</p></div><Link to="/privacy" className="inline-flex mt-6 text-[#9AD8FF] font-bold hover:underline">Read our Privacy Policy</Link></aside></Reveal>
      <Reveal delay={.05}><div className="rounded-[2rem] bg-white border border-[#DCE8EF] shadow-[0_20px_60px_rgba(41,91,123,.08)] p-7 md:p-10">{done?<div className="text-center py-10"><div className="w-16 h-16 rounded-full bg-[#EAF7FF] flex items-center justify-center mx-auto"><Check className="text-[#176F9F]" size={30}/></div><h2 className="mt-5 font-heading text-4xl md:text-5xl font-semibold text-[#17364B]">Your request has been received.</h2><p className="mt-3 text-[#526B7A]">Our team is honored to pray with you.</p><button type="button" onClick={()=>setDone(false)} className="mt-6 text-[#176F9F] font-bold hover:underline">Submit another request</button></div>:<form onSubmit={submit} className="space-y-6"><div><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Share What Is on Your Heart</p><h2 className="mt-3 font-heading text-4xl md:text-5xl font-semibold text-[#17364B]">Prayer Request</h2></div>
        <div className="grid md:grid-cols-2 gap-5"><label htmlFor="prayer-name" className="text-sm font-semibold text-[#405E70]">Name <span className="font-normal text-[#526B7A]">optional</span><input id="prayer-name" autoComplete="name" maxLength={120} className={`${input} mt-2`} value={form.name} onChange={update("name")} placeholder="Your name"/></label><label htmlFor="prayer-email" className="text-sm font-semibold text-[#405E70]">Email <span className="font-normal text-[#526B7A]">optional</span><input id="prayer-email" autoComplete="email" type="email" className={`${input} mt-2`} value={form.email} onChange={update("email")} placeholder="you@email.com"/></label></div>
        <label htmlFor="prayer-request" className="block text-sm font-semibold text-[#405E70]">Your prayer request<textarea id="prayer-request" required maxLength={5000} rows={7} className={`${input} mt-2 resize-none`} value={form.request} onChange={update("request")} placeholder="Share what is on your heart…"/></label>
        <label className="flex gap-3 items-start text-sm text-[#526B7A]"><input type="checkbox" checked={form.is_public} onChange={e=>setForm(f=>({...f,is_public:e.target.checked}))} className="mt-1 accent-[#176F9F]"/>You may share this request anonymously with the broader prayer community. Checking this box gives permission but does not require us to publish it.</label>
        <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="prayer-website">Website</label><input id="prayer-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")}/></div>
        <button disabled={loading} className="w-full rounded-full bg-[#73C8FF] text-[#17364B] py-4 font-extrabold flex items-center justify-center gap-2 hover:bg-[#9AD8FF] transition disabled:opacity-60">{loading?<><Loader2 className="animate-spin" size={18}/>Sending…</>:<><HandHeart size={18}/>Send Prayer Request</>}</button>
        <p className="text-center text-xs text-[#526B7A]">Prayer requests are handled according to our <Link to="/privacy" className="font-bold text-[#176F9F] hover:underline">Privacy Policy</Link>.</p>
      </form>}</div></Reveal>
    </div></section>

    <section className="py-24 bg-[#F8FCFF]"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#8A650C] font-bold">Need More Than Prayer?</p><h2 className="mt-4 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">Prayer can be the beginning of a conversation.</h2><p className="mt-6 text-lg text-[#526B7A] max-w-2xl mx-auto leading-relaxed">If your request is connected to mentorship, volunteering, a family need, partnership, or another practical question, you can also contact us directly.</p><Link to="/contact" className="inline-flex items-center gap-2 mt-8 bg-[#73C8FF] text-[#17364B] px-7 py-3.5 rounded-full font-extrabold">Contact Consecrated Hands</Link></Reveal></div></section>
  </>
}
