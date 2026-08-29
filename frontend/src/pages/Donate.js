import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Heart, Loader2, Lock, ShieldCheck } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { ORG } from "../lib/content";

const API_BASE=(process.env.REACT_APP_BACKEND_URL||"").replace(/\/$/,"");
const API=API_BASE?`${API_BASE}/api`:"";
const SUGGESTED=[25,50,100,250,500,1000];
const input="w-full rounded-2xl border border-[#D5E4EC] bg-white px-4 py-3.5 text-[#17364B] placeholder:text-[#708795] focus:outline-none focus:ring-2 focus:ring-[#2E86B7] focus:border-[#2E86B7]";

export default function Donate(){
 const [params]=useSearchParams();
 const [frequency,setFrequency]=useState("one_time");
 const [amount,setAmount]=useState(100);
 const [custom,setCustom]=useState("");
 const [donor,setDonor]=useState({name:"",email:"",website:""});
 const [loading,setLoading]=useState(false);
 const fallbackOnly=!API&&Boolean(ORG.donationUrl);

 useEffect(()=>{if(params.get("canceled"))toast("Donation canceled — no charge was made.")},[params]);
 const chosenAmount=custom?parseFloat(custom):amount;

 const donate=async()=>{
   if(fallbackOnly){window.location.assign(ORG.donationUrl);return;}
   if(!donor.name.trim()||!donor.email.trim()){toast.error("Please enter your name and email.");return;}
   if(!chosenAmount||chosenAmount<1){toast.error("Please choose a donation amount of at least $1.");return;}
   if(!API){toast.error(`Online giving is being connected. Please contact us at ${ORG.email}.`);return;}
   setLoading(true);
   try{
     const {data}=await axios.post(`${API}/donations/checkout`,{
       amount:chosenAmount,
       frequency,
       donor_name:donor.name.trim(),
       donor_email:donor.email.trim(),
       website:donor.website,
     });
     window.location.assign(data.checkout_url);
   }catch(err){
     if(err?.response?.status===429) toast.error("Too many attempts. Please try again shortly.");
     else toast.error("Unable to start checkout. Please try again or contact us directly.");
     setLoading(false);
   }
 };

 return <>
   <Seo title="Donate" description="Support Consecrated Hands with a secure tax-deductible gift."/>
   <section className="pt-40 pb-20 bg-white"><div className="max-w-5xl mx-auto px-6 text-center"><Reveal><p className="text-xs uppercase tracking-[.28em] text-[#9B7412] font-bold">Give With Purpose</p><h1 className="mt-5 font-heading text-5xl md:text-7xl font-semibold text-[#17364B]">Help build the next <span className="italic text-[#2F8FC7]">strand.</span></h1><p className="mt-6 max-w-2xl mx-auto text-lg text-[#526B7A] leading-relaxed">Your gift helps create mentorship, educational support, life-skills development, career exposure, community experiences, and Christ-centered guidance for young people.</p></Reveal></div></section>

   <section className="pb-24 bg-[#F8FCFF]"><div className="max-w-3xl mx-auto px-6"><Reveal><div className="bg-white rounded-[2rem] border border-[#DCE8EF] shadow-[0_20px_60px_rgba(41,91,123,.08)] p-7 md:p-10">
     {fallbackOnly?<>
       <div className="text-center py-4">
         <Lock className="mx-auto text-[#9B7412]"/>
         <h2 className="mt-4 font-heading text-3xl font-semibold text-[#17364B]">Secure giving through Stripe</h2>
         <p className="mt-3 text-[#526B7A]">Choose your amount and giving frequency on our secure Stripe donation page.</p>
       </div>
     </>:<>
       <fieldset>
         <legend className="sr-only">Donation frequency</legend>
         <div className="flex bg-[#F1F8FC] rounded-full p-1 max-w-xs mx-auto mb-8">{[{k:"one_time",l:"One-time"},{k:"monthly",l:"Monthly"}].map(o=><button type="button" aria-pressed={frequency===o.k} key={o.k} onClick={()=>setFrequency(o.k)} className={`flex-1 py-2.5 rounded-full text-sm font-bold transition ${frequency===o.k?"bg-[#73C8FF] text-[#17364B] shadow-sm":"text-[#526B7A]"}`}>{o.l}</button>)}</div>
       </fieldset>
       <fieldset>
         <legend className="text-sm font-semibold text-[#405E70] mb-3">Choose an amount</legend>
         <div className="grid grid-cols-3 gap-3">{SUGGESTED.map(a=><button type="button" aria-pressed={!custom&&amount===a} key={a} onClick={()=>{setAmount(a);setCustom("")}} className={`py-3.5 rounded-2xl border font-bold transition ${!custom&&amount===a?"bg-[#EAF7FF] border-[#2F8FC7] text-[#176F9F]":"border-[#D5E4EC] text-[#17364B] hover:border-[#2F8FC7]"}`}>${a}</button>)}</div>
       </fieldset>
       <div className="mt-5"><label htmlFor="donation-custom" className="sr-only">Custom donation amount</label><input id="donation-custom" type="number" min="1" max="100000" className={input} value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Custom amount" inputMode="decimal"/></div>
       <div className="grid md:grid-cols-2 gap-5 mt-7"><label htmlFor="donor-name" className="text-sm font-semibold text-[#405E70]">Full name<input id="donor-name" autoComplete="name" className={`${input} mt-2`} value={donor.name} onChange={e=>setDonor(d=>({...d,name:e.target.value}))} placeholder="Your name" maxLength={120}/></label><label htmlFor="donor-email" className="text-sm font-semibold text-[#405E70]">Email<input id="donor-email" autoComplete="email" type="email" className={`${input} mt-2`} value={donor.email} onChange={e=>setDonor(d=>({...d,email:e.target.value}))} placeholder="you@email.com"/></label></div>
       <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="donation-website">Website</label><input id="donation-website" tabIndex={-1} autoComplete="off" value={donor.website} onChange={e=>setDonor(d=>({...d,website:e.target.value}))}/></div>
     </>}

     <button onClick={donate} disabled={loading} className="mt-7 w-full rounded-full bg-[#73C8FF] text-[#17364B] py-4 font-extrabold flex items-center justify-center gap-2 hover:bg-[#9AD8FF] transition disabled:opacity-60">{loading?<><Loader2 size={18} className="animate-spin"/>Redirecting…</>:<><Heart size={18}/>{fallbackOnly?"Continue to Secure Giving":`Give ${chosenAmount?`$${chosenAmount}`:""} ${frequency==="monthly"?"monthly":"now"}`}</>}</button>
     <div className="mt-4 flex justify-center gap-2 text-sm text-[#526B7A]"><Lock size={14}/>Secure payment processed by Stripe</div>
     <p className="mt-5 text-center text-xs leading-relaxed text-[#526B7A]">By continuing, you acknowledge our <Link to="/privacy" className="font-bold text-[#176F9F] hover:underline">Privacy Policy</Link> and <Link to="/terms" className="font-bold text-[#176F9F] hover:underline">Terms of Use</Link>.</p>
   </div></Reveal>

   <Reveal delay={.05}><div className="mt-6 rounded-3xl bg-white border border-[#DCE8EF] p-6 flex gap-4"><ShieldCheck className="text-[#9B7412] shrink-0"/><p className="text-sm text-[#526B7A] leading-relaxed"><strong className="text-[#17364B]">Tax-deductible.</strong> Consecrated Hands is a federally recognized 501(c)(3) public charity. Contributions may be tax-deductible to the fullest extent allowed by law.</p></div></Reveal></div></section>
 </>
}
