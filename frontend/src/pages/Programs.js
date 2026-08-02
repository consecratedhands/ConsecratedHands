import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, MaskedLines } from "../components/Reveal";
import { PROGRAMS } from "../lib/content";

function ProgramsHero() {
  return (
    <section className="pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 flex items-center gap-3">
          <span className="w-10 h-px bg-gold inline-block" /> Our Programs
        </p>
        <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight leading-[1.02] text-ink max-w-4xl">
          <MaskedLines lines={["Mentorship for the", <span key="2">whole <span className="italic text-gold">person.</span></span>]} />
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-8 text-lg md:text-xl font-light text-stone max-w-2xl leading-relaxed">
            Six connected paths of growth — spiritual, personal, and practical — designed to guide young
            people from where they are toward where God is calling them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProgramBlock({ p, i }) {
  const flip = i % 2 === 1;
  return (
    <section className={`py-16 md:py-24 ${i % 2 === 1 ? "bg-surface border-y border-line" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
            <Reveal className="relative aspect-[4/5] overflow-hidden border border-line">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </Reveal>
          </div>
          <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
            <Reveal>
              <span className="font-heading text-5xl md:text-6xl italic text-gold/60">{p.n}</span>
              <h2 className="font-heading text-3xl md:text-5xl font-light text-ink mt-4 mb-6">{p.title}</h2>
              <p className="text-lg text-stone leading-relaxed font-light max-w-xl">{p.desc}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsCTA() {
  return (
    <section className="py-24 md:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <Reveal>
          <h2 className="font-heading text-4xl md:text-6xl font-light text-cream max-w-3xl leading-tight">
            Walk with a young person on their journey.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/get-involved" data-testid="programs-cta-mentor" className="bg-gold text-white px-8 py-4 font-medium hover:bg-cream hover:text-charcoal transition-colors duration-500 inline-flex items-center gap-2">
              Become a mentor <ArrowRight size={16} />
            </Link>
            <Link to="/donate" data-testid="programs-cta-donate" className="px-8 py-4 border border-cream/30 text-cream hover:bg-cream hover:text-charcoal transition-colors duration-500 font-medium">
              Fund a program
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Programs() {
  return (
    <>
      <Seo title="Programs" description="Spiritual growth, confidence building, practical life skills, educational guidance, financial mentorship, and purposeful living." />
      <ProgramsHero />
      {PROGRAMS.map((p, i) => <ProgramBlock key={p.n} p={p} i={i} />)}
      <ProgramsCTA />
    </>
  );
}
