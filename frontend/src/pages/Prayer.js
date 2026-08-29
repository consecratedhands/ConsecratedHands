import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Check, HandHeart, Loader2 } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { ORG } from "../lib/content";

const API_BASE=(process.env.REACT_APP_BACKEND_URL||"").replace(/\/$/,"");
const API=API_BASE?`${API_BASE}/api`:"";
const input="w-full rounded-2xl border border-[#D5E4EC] bg-white px-4 py-3.5 text-[#17364B] placeholder:text-[#708795] focus:outline-none focus:ring-2 focus:ring-[#2E86B7] focus:border-[#2E86B7]";

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

  return <><Seo title="Prayer Requests" description="Share a prayer request with Consecrated Hands."/>
    <section className="pt-40 pb-20 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#9B7412] font-bold">Prayer Requests</p><h1 className="mt-5 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">Let us pray <span className="italic text-[#2F8FC7]">with you.</span></h1><p className="mt-6 max-w-2xl mx-auto text-lg text-[#526B7A] leading-relaxed">Whatever you are carrying, you do not have to carry it alone. Share only what you are comfortable providing and our team will lift your request up in prayer.</p></Reveal></div></section>

    <section className="pb-24 bg-[#F8FCFF]"><div className="max-w-2xl mx-auto px-6 -mt-4"><Reveal><div className="rounded-[2rem] bg-white border border-[#DCE8EF] shadow-[0_20px_60px_rgba(41,91,123,.08)] p-7 md:p-10">{done?<div className="text-center py-8"><div className="w-16 h-16 rounded-full bg-[#EAF7FF] flex items-center justify-center mx-auto"><Check className="text-[#176F9F]" size={30}/></div><h2 className="mt-5 font-heading text-4xl font-semibold text-[#17364B]">Your request has been received.</h2><p className="mt-3 text-[#526B7A]">Our team is honored to pray with you.</p><button type="button" onClick={()=>setDone(false)} className="mt-6 text-[#176F9F] font-bold hover:underline">Submit another request</button></div>:<form onSubmit={submit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5"><label htmlFor="prayer-name" className="text-sm font-semibold text-[#405E70]">Name <span className="font-normal text-[#526B7A]">optional</span><input id="prayer-name" autoComplete="name" maxLength={120} className={`${input} mt-2`} value={form.name} onChange={update("name")} placeholder="Your name"/></label><label htmlFor="prayer-email" className="text-sm font-semibold text-[#405E70]">Email <span className="font-normal text-[#526B7A]">optional</span><input id="prayer-email" autoComplete="email" type="email" className={`${input} mt-2`} value={form.email} onChange={update("email")} placeholder="you@email.com"/></label></div>
      <label htmlFor="prayer-request" className="block text-sm font-semibold text-[#405E70]">Your prayer request<textarea id="prayer-request" required maxLength={5000} rows={6} className={`${input} mt-2 resize-none`} value={form.request} onChange={update("request")} placeholder="Share what is on your heart…"/></label>
      <p className="text-xs leading-relaxed text-[#526B7A]">Please do not include Social Security numbers, passwords, medical records, financial-account credentials, or other highly sensitive records. If someone is in immediate danger, contact emergency services rather than waiting for a website response.</p>
      <label className="flex gap-3 items-start text-sm text-[#526B7A]"><input type="checkbox" checked={form.is_public} onChange={e=>setForm(f=>({...f,is_public:e.target.checked}))} className="mt-1 accent-[#176F9F]"/>You may share this request anonymously with the broader prayer community. Checking this box gives permission but does not require us to publish it.</label>
      <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="prayer-website">Website</label><input id="prayer-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")}/></div>
      <button disabled={loading} className="w-full rounded-full bg-[#73C8FF] text-[#17364B] py-4 font-extrabold flex items-center justify-center gap-2 hover:bg-[#9AD8FF] transition disabled:opacity-60">{loading?<><Loader2 className="animate-spin" size={18}/>Sending…</>:<><HandHeart size={18}/>Send Prayer Request</>}</button>
      <p className="text-center text-xs text-[#526B7A]">Prayer requests are handled according to our <Link to="/privacy" className="font-bold text-[#176F9F] hover:underline">Privacy Policy</Link>.</p>
    </form>}</div></Reveal></div></section>
  </>
}
