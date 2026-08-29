import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "../components/Seo";

export default function NotFound(){return <><Seo title="Page Not Found" description="The page you requested could not be found." noindex/><section className="min-h-[80svh] pt-40 pb-24 flex items-center bg-white"><div className="max-w-3xl mx-auto px-6 md:px-12 text-center"><p className="text-xs uppercase tracking-[0.3em] text-[#A66F00] font-bold mb-6">404</p><h1 className="font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">This page could not be found.</h1><p className="mt-6 text-lg text-[#59636A]">The link may have changed, but the mission continues.</p><Link to="/" className="inline-flex items-center gap-2 mt-10 bg-[#6FD3FF] text-[#25292C] px-8 py-4 rounded-full font-extrabold hover:bg-[#B8ECFF] transition-colors"><ArrowLeft size={18}/>Return home</Link></div></section></>}
