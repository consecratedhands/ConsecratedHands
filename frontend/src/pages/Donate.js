import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Heart, HandHeart, Loader2, Lock, Receipt, ShieldCheck, WalletCards } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { IMAGES, ORG } from "../lib/content";

const API_BASE=(process.env.REACT_APP_BACKEND_URL||"").replace(/\/$/,"");
const API=API_BASE?`${API_BASE}/api`:"";
const SUGGESTED=[25,50,100,250,500,1000];
const input="w-full rounded-2xl border border-[#D8EEF8] bg-white px-4 py-3.5 text-[#25292C] placeholder:text-[#667A86] focus:outline-none focus:ring-2 focus:ring-[#007BC2] focus:border-[#007BC2]";

const givingDetails=[
  {icon:Lock,title:"Secure checkout",body:"Online gifts are handled through Stripe so donors can give through a trusted payment processor."},
  {icon:Receipt,title:"501(c)(3) giving",body:"Consecrated Hands is a federally recognized public charity. Contributions may be tax-deductible as allowed by law."},
  {icon:WalletCards,title:"One-time or monthly",body:"Choose the gift that fits your budget. A single gift helps, and recurring support helps with planning."},
  {icon:HandHeart,title:"Responsible stewardship",body:"Gifts support the real costs of operating youth-centered work with care, clarity, and accountability."},
];

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

   <section className="pt-24 md:pt-28 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
     <Reveal><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Give With Purpose</p><h1 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl lg:text-[5.2rem] font-semibold text-[#25292C]">Support the work with a gift that <span className="italic text-[#007BC2]">matters.</span></h1><p className="mt-7 max-w-3xl text-xl text-[#424B52] leading-relaxed">This page is for giving. Choose a one-time or monthly donation, use secure checkout, and support Consecrated Hands with confidence.</p><p className="mt-5 text-[#59636A] leading-relaxed">We do not use made-up “$25 equals exactly X outcome” claims. Needs vary. Gifts support real program and operating costs with responsible stewardship.</p></div></Reveal>
     <Reveal delay={.08}><img src={IMAGES.volunteering} alt="Community service and youth support" className="w-full aspect-[4/4.2] object-cover rounded-[2.25rem] shadow-[0_28px_70px_rgba(35,105,145,.14)]"/></Reveal>
   </div></section>

   <section className="py-16 sm:py-20 md:py-24 bg-[#F4FBFF]"><div className="max-w-7xl mx-auto px-6 md:px-12"><Reveal><div className="max-w-4xl"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Giving Details</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Clear, secure, and donor-focused.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed max-w-3xl">Before you give, here are the details that matter most: secure checkout, tax status, gift options, and stewardship.</p></div></Reveal><div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">{givingDetails.map(({icon:Icon,title,body},i)=><Reveal key={title} delay={i*.04}><div className="h-full bg-white rounded-3xl border border-[#D8EEF8] p-7"><div className="w-12 h-12 rounded-2xl bg-[#EAF9FF] flex items-center justify-center"><Icon className="text-[#006DAA]"/></div><h3 className="mt-5 font-heading text-3xl font-semibold text-[#25292C]">{title}</h3><p className="mt-3 text-[#59636A] leading-relaxed">{body}</p></div></Reveal>)}</div></div></section>

   <section className="py-16 sm:py-20 md:py-24 bg-white"><div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-[.7fr_1.3fr] gap-10 items-start">
     <Reveal><aside className="rounded-[2rem] bg-[#25292C] text-white p-7 md:p-9 lg:sticky lg:top-28"><ShieldCheck className="text-[#FFE066]" size={36}/><h2 className="mt-5 font-heading text-4xl font-semibold">Give with confidence.</h2><p className="mt-4 text-white/75 leading-relaxed">Consecrated Hands is a federally recognized 501(c)(3) public charity. Contributions may be tax-deductible to the fullest extent allowed by law.</p><div className="mt-6 pt-6 border-t border-white/15 space-y-3 text-sm text-white/75"><p><strong className="text-white">EIN:</strong> {ORG.ein}</p><p><strong className="text-white">Payments:</strong> Secure checkout is processed by Stripe.</p><p><strong className="text-white">Stewardship:</strong> We believe faith and professional accountability belong together.</p></div><div className="mt-6 flex flex-col gap-3"><Link to="/about" className="text-[#B8ECFF] font-bold hover:underline">About Consecrated Hands</Link><Link to="/privacy" className="text-[#B8ECFF] font-bold hover:underline">Privacy Policy</Link><Link to="/terms" className="text-[#B8ECFF] font-bold hover:underline">Terms of Use</Link></div></aside></Reveal>

     <Reveal delay={.05}><div className="bg-white rounded-[2rem] border border-[#D8EEF8] shadow-[0_20px_60px_rgba(35,105,145,.08)] p-7 md:p-10"><div className="text-center mb-8"><Heart className="mx-auto text-[#A66F00]"/><p className="mt-4 text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Secure Giving</p><h2 className="mt-3 font-heading text-4xl md:text-5xl font-semibold text-[#25292C]">Choose your gift.</h2></div>
       {fallbackOnly?<>
         <div className="text-center py-4"><Lock className="mx-auto text-[#A66F00]"/><h3 className="mt-4 font-heading text-3xl font-semibold text-[#25292C]">Secure giving through Stripe</h3><p className="mt-3 text-[#59636A]">Continue to our secure Stripe donation page to choose your amount.</p></div>
       </>:<>
         <fieldset><legend className="sr-only">Donation frequency</legend><div className="flex bg-[#ECF8FE] rounded-full p-1 max-w-xs mx-auto mb-8">{[{k:"one_time",l:"One-time"},{k:"monthly",l:"Monthly"}].map(o=><button type="button" aria-pressed={frequency===o.k} key={o.k} onClick={()=>setFrequency(o.k)} className={`flex-1 py-2.5 rounded-full text-sm font-bold transition ${frequency===o.k?"bg-[#6FD3FF] text-[#25292C] shadow-sm":"text-[#59636A]"}`}>{o.l}</button>)}</div></fieldset>
         <fieldset><legend className="text-sm font-semibold text-[#424B52] mb-3">Choose an amount</legend><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{SUGGESTED.map(a=><button type="button" aria-pressed={!custom&&amount===a} key={a} onClick={()=>{setAmount(a);setCustom("")}} className={`py-3.5 rounded-2xl border font-bold transition ${!custom&&amount===a?"bg-[#EAF9FF] border-[#007BC2] text-[#006DAA]":"border-[#D8EEF8] text-[#25292C] hover:border-[#007BC2]"}`}>${a}</button>)}</div></fieldset>
         <div className="mt-5"><label htmlFor="donation-custom" className="sr-only">Custom donation amount</label><input id="donation-custom" type="number" min="1" max="100000" className={input} value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Custom amount" inputMode="decimal"/></div>
         <div className="grid md:grid-cols-2 gap-5 mt-7"><label htmlFor="donor-name" className="text-sm font-semibold text-[#424B52]">Full name<input id="donor-name" autoComplete="name" className={`${input} mt-2`} value={donor.name} onChange={e=>setDonor(d=>({...d,name:e.target.value}))} placeholder="Your name" maxLength={120}/></label><label htmlFor="donor-email" className="text-sm font-semibold text-[#424B52]">Email<input id="donor-email" autoComplete="email" type="email" className={`${input} mt-2`} value={donor.email} onChange={e=>setDonor(d=>({...d,email:e.target.value}))} placeholder="you@email.com"/></label></div>
         <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="donation-website">Website</label><input id="donation-website" tabIndex={-1} autoComplete="off" value={donor.website} onChange={e=>setDonor(d=>({...d,website:e.target.value}))}/></div>
       </>}

       <button onClick={donate} disabled={loading} className="mt-7 w-full rounded-full bg-[#FFD21F] text-[#25292C] py-4 font-extrabold flex items-center justify-center gap-2 shadow-[0_14px_30px_-16px_rgba(210,156,0,.8)] hover:bg-[#FFE066] transition disabled:opacity-60">{loading?<><Loader2 size={18} className="animate-spin"/>Redirecting…</>:<><Heart size={18}/>{fallbackOnly?"Continue to Secure Giving":`Give ${chosenAmount?`$${chosenAmount}`:""} ${frequency==="monthly"?"monthly":"now"}`}</>}</button>
       <div className="mt-4 flex justify-center gap-2 text-sm text-[#59636A]"><Lock size={14}/>Secure payment processed by Stripe</div>
       <p className="mt-5 text-center text-xs leading-relaxed text-[#59636A]">By continuing, you acknowledge our <Link to="/privacy" className="font-bold text-[#006DAA] hover:underline">Privacy Policy</Link> and <Link to="/terms" className="font-bold text-[#006DAA] hover:underline">Terms of Use</Link>.</p>
     </div></Reveal>
   </div></section>

   <section className="py-16 sm:py-20 md:py-24 bg-[#F4FBFF]"><div className="max-w-6xl mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1fr] gap-12 items-center"><Reveal><img src={IMAGES.youthPortrait} alt="Young person looking toward the future" loading="lazy" className="w-full aspect-[4/3] object-cover rounded-[2rem] shadow-[0_24px_60px_rgba(35,105,145,.12)]"/></Reveal><Reveal delay={.06}><div><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Why Monthly Giving Matters</p><h2 className="mt-4 font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C]">Consistency helps fund consistency.</h2><p className="mt-6 text-lg text-[#59636A] leading-relaxed">Mentorship works through relationships over time. Recurring support can help an organization plan more responsibly around ongoing program needs instead of depending only on one-time gifts.</p><p className="mt-5 text-[#59636A] leading-relaxed">Choose monthly giving only if it fits your budget and intention. One-time gifts are equally appreciated and meaningful.</p></div></Reveal></div></section>
 </>
}
