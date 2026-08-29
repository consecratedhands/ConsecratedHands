import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Loader2, Heart, XCircle } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";
import { ORG } from "../lib/content";

const API_BASE=(process.env.REACT_APP_BACKEND_URL||"").replace(/\/$/,"");
const API=API_BASE?`${API_BASE}/api`:"";
const MAX_TRIES=8;

export default function DonationSuccess(){
  const [params]=useSearchParams();
  const sessionId=params.get("session_id");
  const [state,setState]=useState("polling");

  useEffect(()=>{
    if(!sessionId||!API){setState("error");return;}
    let tries=0;
    let active=true;
    let timer;

    const poll=async()=>{
      if(!active)return;
      try{
        const {data}=await axios.get(`${API}/payments/status/${encodeURIComponent(sessionId)}`);
        if(data.payment_status==="paid"){
          setState("paid");
          return;
        }
      }catch(e){
        if(e?.response?.status===404){setState("error");return;}
      }
      tries+=1;
      if(tries>=MAX_TRIES){setState("timeout");return;}
      timer=setTimeout(poll,2000);
    };

    poll();
    return()=>{active=false;if(timer)clearTimeout(timer)};
  },[sessionId]);

  return <>
    <Seo title="Thank You" description="Thank you for supporting Consecrated Hands."/>
    <section className="min-h-[80vh] flex items-center pt-32 pb-24 bg-white">
      <div className="max-w-2xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {state==="polling"&&<><Loader2 size={48} className="text-[#9A6B00] animate-spin mb-8"/><h1 className="font-heading text-4xl md:text-5xl font-semibold text-[#25292C]">Confirming your gift…</h1><p className="mt-4 text-[#59636A]">One moment while we securely confirm your donation.</p></>}

        {state==="paid"&&<Reveal className="flex flex-col items-center"><CheckCircle2 size={64} className="text-[#F6C945] mb-8"/><p className="text-xs uppercase tracking-[0.3em] text-[#9A6B00] font-bold mb-4">Gift Received</p><h1 className="font-heading text-[2.6rem] sm:text-5xl md:text-6xl font-semibold text-[#25292C] leading-tight">Thank you.</h1><p className="mt-6 text-lg text-[#59636A] max-w-lg">Your generosity helps strengthen a young person’s future through Christ-centered mentorship, trusted relationships, and practical support.</p><p className="mt-4 text-sm text-[#59636A]">Consecrated Hands is a federally recognized 501(c)(3) public charity. Your donation acknowledgment will be sent to the email used at checkout.</p><Link to="/" className="mt-10 inline-flex items-center gap-2 bg-[#F6C945] text-[#25292C] px-8 py-4 rounded-full font-extrabold hover:bg-[#FFD968] transition"><Heart size={16}/>Back to home</Link></Reveal>}

        {state==="timeout"&&<><Loader2 size={48} className="text-[#59636A] mb-8"/><h1 className="font-heading text-4xl font-semibold text-[#25292C]">Still processing…</h1><p className="mt-4 text-[#59636A] max-w-md">Your payment may still be processing. Please do not submit another gift unless Stripe shows that the first attempt failed. If you need help, email <a href={`mailto:${ORG.email}`} className="font-bold text-[#1683BD]">{ORG.email}</a>.</p><Link to="/" className="mt-8 text-[#1683BD] font-bold hover:underline">Return home</Link></>}

        {state==="error"&&<><XCircle size={48} className="text-[#59636A] mb-8"/><h1 className="font-heading text-4xl font-semibold text-[#25292C]">We couldn’t confirm this gift</h1><p className="mt-4 text-[#59636A] max-w-md">If Stripe shows a successful charge, please do not donate again. Contact us at <a href={`mailto:${ORG.email}`} className="font-bold text-[#1683BD]">{ORG.email}</a> and we’ll help verify it.</p><Link to="/donate" className="mt-8 bg-[#70CCFF] text-[#25292C] px-8 py-4 rounded-full font-extrabold">Return to giving</Link></>}
      </div>
    </section>
  </>
}
