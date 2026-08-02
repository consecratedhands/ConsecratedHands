import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "../components/Seo";
import ApplicationForm from "../components/ApplicationForm";
import { Reveal, MaskedLines } from "../components/Reveal";
import { PILLARS, TRUTH } from "../lib/content";

function Hero() {
  return (
    <section className="pt-40 pb-16 md:pt-48 md:pb-24 light-glow">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 flex items-center gap-3">
          <span className="w-10 h-px bg-gold inline-block" /> The Mentorship Program
        </p>
        <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] text-ink max-w-4xl">
          <MaskedLines lines={["Mentorship for the", <span key="2">whole <span className="italic text-gold">person.</span></span>]} />
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-8 text-lg md:text-xl font-light text-stone max-w-2xl leading-relaxed">
            Built on <strong className="text-ink font-medium">The 5 Pillars</strong> — Faith, Family, Finance, Fitness, and Future —
            we walk with young people through every part of their lives, rooted in the love and Truth of Jesus.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function TruthBlurb() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="glass rounded-3xl border border-white/70 p-10 md:p-14 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-5">{TRUTH.eyebrow}</p>
            <p className="font-heading text-2xl md:text-3xl font-normal text-ink leading-snug text-balance">
              {TRUTH.headline}
            </p>
            <p className="mt-6 text-stone leading-relaxed">{TRUTH.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PillarBlock({ p, i }) {
  const flip = i % 2 === 1;
  return (
    <section className={`py-16 md:py-24 ${i % 2 === 1 ? "bg-surface border-y border-line" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </Reveal>
          </div>
          <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
            <Reveal>
              <span className="font-heading text-5xl md:text-6xl italic text-gold/60">{p.n}</span>
              <h2 className="font-heading text-3xl md:text-5xl font-medium text-ink mt-4 mb-6">{p.title}</h2>
              <p className="text-lg text-stone leading-relaxed font-light max-w-xl">{p.desc}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplySection() {
  return (
    <section className="py-24 md:py-32 bg-sky-soft/50">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 text-center">Apply</p>
          <h2 className="font-heading text-4xl md:text-5xl font-medium text-ink text-center mb-4">
            Apply for mentorship
          </h2>
          <p className="text-stone text-center max-w-xl mx-auto mb-12">
            Whether you’re a young person seeking a mentor, or an adult ready to serve as one — start here.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bg-surface rounded-3xl border border-line p-8 md:p-12 shadow-sm">
            <ApplicationForm
              interests={["mentee", "mentor"]}
              defaultInterest="mentee"
              submitLabel="Submit application"
              messagePlaceholder="Tell us a little about yourself and why you'd like to be part of the program…"
              testidPrefix="mentorship"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 md:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <Reveal>
          <h2 className="font-heading text-4xl md:text-6xl font-medium text-cream max-w-3xl leading-tight">
            Help fund a young person’s journey.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/donate" data-testid="mentorship-cta-donate" className="bg-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-cream hover:text-charcoal transition-colors duration-500 inline-flex items-center gap-2">
              Fund a pillar <ArrowRight size={16} />
            </Link>
            <Link to="/volunteer" data-testid="mentorship-cta-volunteer" className="px-8 py-4 rounded-full border border-cream/30 text-cream hover:bg-cream hover:text-charcoal transition-colors duration-500 font-semibold">
              Become a mentor
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Mentorship() {
  return (
    <>
      <Seo title="Mentorship Program" description="The 5 Pillars — Faith, Family, Finance, Fitness, and Future. Christ-centered whole-person mentorship for young people." />
      <Hero />
      <TruthBlurb />
      {PILLARS.map((p, i) => <PillarBlock key={p.n} p={p} i={i} />)}
      <ApplySection />
      <CTA />
    </>
  );
}
