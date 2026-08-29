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
const input="w-full rounded-2xl border border-[#D8EEF8] bg-white px-4 py-3.5 text-[#25292C] placeholder:text-[#667A86] focus:outline-none focus:ring-2 focus:ring-[#007BC2] focus:border-[#007BC2]";

const prayerValues=[
  {icon:Cross,title:"Prayer is welcome here",body:"You can ask for prayer for peace, wisdom, healing, strength, grief, direction, family, school, work, or someone you love."},
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

    <section className="relative pt-24 md:pt-28 overflow-hidden"><div className="absolute inset-0"><img src={IMAGES.heroFaith} alt="Faith-centered encouragement" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-[#25292C]/88"/></div><div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center text-white"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#FFE066] font-bold">Prayer Requests</p><h1 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl lg:text-[5.4rem] font-semibold">Let us pray <span className="italic text-[#B8ECFF]">with you.</span></h1><p className="mt-7 max-w-3xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">Whatever you are carrying, you do not have to carry it alone. Share only what you are comfortable providing and our team will lift your request up in prayer.</p></Reveal></div></section>

    <section className="py-16 sm:py-20 md:py-24 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12"><Reveal><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Prayer Answers</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Share what is on your heart.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed">This page is simply for prayer. You can send a request, keep it private, or allow it to be shared anonymously with the prayer community.</p></div></Reveal><div className="mt-10 grid md:grid-cols-3 gap-5">{prayerValues.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.04}><div className="h-full bg-white border border-[#D8EEF8] rounded-3xl p-7"><div className="w-12 h-12 rounded-2xl bg-[#EAF9FF] flex items-center justify-center"><Icon className="text-[#006DAA]"/></div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#25292C]">{title}</h3><p className="mt-3 text-[#59636A] leading-relaxed">{body}</p></div></Reveal>)}</div></div></section>

    <section className="py-16 sm:py-20 md:py-24 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[.7fr_1.3fr] gap-10 items-start">
      <Reveal><aside className="rounded-[2rem] bg-[#25292C] text-white p-7 md:p-9 lg:sticky lg:top-28"><HandHeart className="text-[#B8ECFF]" size={34}/><h2 className="mt-5 font-heading text-4xl font-semibold">You can keep it simple.</h2><p className="mt-4 text-white/75 leading-relaxed">A prayer request can be a few words or a fuller story. Your name and email are optional.</p><div className="mt-7 pt-6 border-t border-white/15 space-y-4 text-sm text-white/75 leading-relaxed"><p><strong className="text-white">Please avoid highly sensitive records.</strong> Do not submit passwords, Social Security numbers, bank credentials, medical records, or similar private documents.</p><p><strong className="text-white">Immediate danger needs immediate help.</strong> A website prayer form is not an emergency service. Contact emergency services or an appropriate crisis resource if someone is in immediate danger.</p></div><Link to="/privacy" className="inline-flex mt-6 text-[#B8ECFF] font-bold hover:underline">Read our Privacy Policy</Link></aside></Reveal>
      <Reveal delay={.05}><div className="rounded-[2rem] bg-white border border-[#D8EEF8] shadow-[0_20px_60px_rgba(35,105,145,.08)] p-7 md:p-10">{done?<div className="text-center py-10"><div className="w-16 h-16 rounded-full bg-[#EAF9FF] flex items-center justify-center mx-auto"><Check className="text-[#006DAA]" size={30}/></div><h2 className="mt-5 font-heading text-4xl md:text-5xl font-semibold text-[#25292C]">Your request has been received.</h2><p className="mt-3 text-[#59636A]">Our team is honored to pray with you.</p><button type="button" onClick={()=>setDone(false)} className="mt-6 text-[#006DAA] font-bold hover:underline">Submit another request</button></div>:<form onSubmit={submit} className="space-y-6"><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Share What Is on Your Heart</p><h2 className="mt-3 font-heading text-4xl md:text-5xl font-semibold text-[#25292C]">Prayer Request</h2></div>
        <div className="grid md:grid-cols-2 gap-5"><label htmlFor="prayer-name" className="text-sm font-semibold text-[#424B52]">Name <span className="font-normal text-[#59636A]">optional</span><input id="prayer-name" autoComplete="name" maxLength={120} className={`${input} mt-2`} value={form.name} onChange={update("name")} placeholder="Your name"/></label><label htmlFor="prayer-email" className="text-sm font-semibold text-[#424B52]">Email <span className="font-normal text-[#59636A]">optional</span><input id="prayer-email" autoComplete="email" type="email" className={`${input} mt-2`} value={form.email} onChange={update("email")} placeholder="you@email.com"/></label></div>
        <label htmlFor="prayer-request" className="block text-sm font-semibold text-[#424B52]">Your prayer request<textarea id="prayer-request" required maxLength={5000} rows={7} className={`${input} mt-2 resize-none`} value={form.request} onChange={update("request")} placeholder="Share what is on your heart…"/></label>
        <label className="flex gap-3 items-start text-sm text-[#59636A]"><input type="checkbox" checked={form.is_public} onChange={e=>setForm(f=>({...f,is_public:e.target.checked}))} className="mt-1 accent-[#006DAA]"/>You may share this request anonymously with the broader prayer community. Checking this box gives permission but does not require us to publish it.</label>
        <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="prayer-website">Website</label><input id="prayer-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")}/></div>
        <button disabled={loading} className="w-full rounded-full bg-[#6FD3FF] text-[#25292C] py-4 font-extrabold flex items-center justify-center gap-2 hover:bg-[#B8ECFF] transition disabled:opacity-60">{loading?<><Loader2 className="animate-spin" size={18}/>Sending…</>:<><HandHeart size={18}/>Send Prayer Request</>}</button>
        <p className="text-center text-xs text-[#59636A]">Prayer requests are handled according to our <Link to="/privacy" className="font-bold text-[#006DAA] hover:underline">Privacy Policy</Link>.</p>
      </form>}</div></Reveal>
    </div></section>

    <section className="py-16 sm:py-20 md:py-24 bg-[#F4FBFF]"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">After You Submit</p><h2 className="mt-4 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">We receive it. We pray. We protect your privacy.</h2><p className="mt-6 text-lg text-[#59636A] max-w-2xl mx-auto leading-relaxed">If you include your email, someone may follow up when appropriate. If you leave your name blank, your request can still be received as anonymous.</p><Link to="/privacy" className="inline-flex items-center gap-2 mt-8 bg-[#6FD3FF] text-[#25292C] px-7 py-3.5 rounded-full font-extrabold">Read Privacy Policy</Link></Reveal></div></section>
  </>
}
