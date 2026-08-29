import { useId, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { ORG } from "../lib/content";

const API_BASE=(process.env.REACT_APP_BACKEND_URL||"").replace(/\/$/,"");
const API=API_BASE?`${API_BASE}/api`:"";

const ALL_INTERESTS=[
  {key:"volunteer",label:"Volunteer"},
  {key:"mentor",label:"Mentor"},
  {key:"mentee",label:"Apply for Mentorship"},
  {key:"partner",label:"Partner"},
  {key:"general",label:"General"},
];

const inputCls="w-full bg-transparent border-b border-[#CFE4EE] py-4 text-[#25292C] placeholder:text-[#667A86] focus:outline-none focus:border-[#006DAA] transition-colors duration-300";
const labelCls="block text-xs uppercase tracking-widest text-[#424B52] font-bold mb-2";

export default function ApplicationForm({interests=["volunteer","mentor","mentee","partner","general"],defaultInterest="volunteer",submitLabel="Send message",messagePlaceholder="Tell us how you'd like to help, or ask us anything…",testidPrefix="form"}){
  const uid=useId().replace(/:/g,"");
  const options=ALL_INTERESTS.filter(i=>interests.includes(i.key));
  const [form,setForm]=useState({name:"",email:"",phone:"",interest:defaultInterest,message:"",website:""});
  const [loading,setLoading]=useState(false);
  const update=k=>e=>setForm(f=>({...f,[k]:e.target.value}));
  const ids={name:`${uid}-name`,email:`${uid}-email`,phone:`${uid}-phone`,message:`${uid}-message`,website:`${uid}-website`};

  const submit=async e=>{
    e.preventDefault();
    if(!form.name.trim()||!form.email.trim()||!form.message.trim()){toast.error("Please fill in your name, email, and message.");return;}
    if(!API){
      const selectedInterest=ALL_INTERESTS.find(item=>item.key===form.interest)?.label||form.interest;
      const subject=`${selectedInterest} inquiry from ${form.name.trim()}`;
      const body=[`Name: ${form.name.trim()}`,`Email: ${form.email.trim()}`,`Phone: ${form.phone.trim()||"Not provided"}`,`Interest: ${selectedInterest}`,"",form.message.trim()].join("\n");
      toast.success("Your email app is opening so you can send your message.");
      window.location.href=`mailto:${ORG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setLoading(true);
    try{
      const {data}=await axios.post(`${API}/contact`,{...form,name:form.name.trim(),email:form.email.trim(),phone:form.phone.trim(),message:form.message.trim()});
      toast.success(data.message||"Thank you — we'll be in touch soon.");
      setForm({name:"",email:"",phone:"",interest:defaultInterest,message:"",website:""});
    }catch(err){
      if(err?.response?.status===429)toast.error("Too many submissions. Please try again shortly.");
      else toast.error("Something went wrong. Please try again or email us directly.");
    }finally{setLoading(false)}
  };

  return <form onSubmit={submit} data-testid={`${testidPrefix}-form`} className="space-y-10">
    {options.length>1&&<fieldset><legend className={labelCls}>I’m interested in</legend><div className="flex flex-wrap gap-3 mt-3">{options.map(it=><button key={it.key} type="button" aria-pressed={form.interest===it.key} data-testid={`interest-${it.key}`} onClick={()=>setForm(f=>({...f,interest:it.key}))} className={`px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-300 ${form.interest===it.key?"bg-[#6FD3FF] text-[#25292C] border-[#007BC2]":"bg-transparent text-[#25292C] border-[#CFE4EE] hover:border-[#006DAA]"}`}>{it.label}</button>)}</div></fieldset>}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div><label htmlFor={ids.name} className={labelCls}>Full name</label><input id={ids.name} autoComplete="name" required maxLength={120} data-testid={`${testidPrefix}-name`} className={inputCls} value={form.name} onChange={update("name")} placeholder="Your name"/></div><div><label htmlFor={ids.email} className={labelCls}>Email</label><input id={ids.email} autoComplete="email" required data-testid={`${testidPrefix}-email`} type="email" className={inputCls} value={form.email} onChange={update("email")} placeholder="you@email.com"/></div></div>

    <div><label htmlFor={ids.phone} className={labelCls}>Phone (optional)</label><input id={ids.phone} autoComplete="tel" maxLength={40} data-testid={`${testidPrefix}-phone`} className={inputCls} value={form.phone} onChange={update("phone")} placeholder="(504) 000-0000"/></div>

    <div><label htmlFor={ids.message} className={labelCls}>Your message</label><textarea id={ids.message} required maxLength={5000} data-testid={`${testidPrefix}-message`} rows={5} className={`${inputCls} resize-none`} value={form.message} onChange={update("message")} placeholder={messagePlaceholder}/><p className="mt-2 text-xs text-[#59636A]">Please do not include Social Security numbers, passwords, medical records, financial-account credentials, or other highly sensitive records.</p></div>

    <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor={ids.website}>Website</label><input id={ids.website} tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")}/></div>

    <div><button type="submit" data-testid={`${testidPrefix}-submit`} disabled={loading} className="group flex w-full sm:w-auto items-center justify-center gap-2 bg-[#6FD3FF] text-[#25292C] px-9 py-4 rounded-full font-extrabold tracking-wide hover:bg-[#B8ECFF] transition-colors duration-300 disabled:opacity-60">{loading?<><Loader2 size={18} className="animate-spin"/>Sending…</>:<>{submitLabel}<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></>}</button><p className="mt-4 text-xs text-[#59636A]">Information submitted here is handled according to our <Link to="/privacy" className="font-bold text-[#006DAA] hover:underline">Privacy Policy</Link>.</p></div>
  </form>
}
