import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "react-fast-marquee";
import { ArrowUpRight, ArrowRight, Calendar, HandHeart } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, MaskedLines } from "../components/Reveal";
import { ORG, PILLARS, EVENTS, TRUTH, MANIFESTO, HERO_BG } from "../lib/content";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img src={HERO_BG} alt="A smiling child holding his Bible at a Consecrated Hands event" className="w-full h-full object-cover object-[50%_22%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/85 md:via-cream/60 to-cream/35 md:to-cream/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 md:pt-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-stone mb-6 flex items-center gap-3"
          >
            <span className="w-10 h-px bg-gold inline-block" /> Christ-centered youth mentorship
          </motion.p>
          <h1 className="font-heading font-medium tracking-tight leading-[1.02] text-5xl md:text-7xl lg:text-[5rem] text-ink">
            <MaskedLines lines={["Consecrated to", "guide the ones"]} />
            <MaskedLines lines={[<span key="k">who need it <span className="italic text-gold">most.</span></span>]} delay={0.24} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-8 text-lg md:text-xl font-light text-ink/70 max-w-xl leading-relaxed"
          >
            Mentoring young people spiritually, educationally, financially, and personally —
            and leading them closer to Christ.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/donate" data-testid="hero-donate-btn" className="group bg-gold text-white px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-charcoal transition-colors duration-500 flex items-center gap-2 shadow-md">
              Donate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/mentorship" data-testid="hero-apply-btn" className="px-8 py-4 rounded-full glass border border-white/70 text-ink hover:border-gold transition-colors duration-500 font-semibold tracking-wide">
              Explore Mentorship
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionStatement() {
  return (
    <section className="py-24 md:py-40 bg-cream light-glow">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <Reveal><p className="text-xs uppercase tracking-[0.3em] text-gold">Our Mission</p></Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.25] text-ink text-balance">
                We help young people grow closer to Christ, build confidence, develop practical life
                skills, and discover a <span className="italic text-gold">healthier, more purposeful</span> path forward.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/mission" className="inline-flex items-center gap-2 mt-8 text-ink hover:text-gold transition-colors group">
                Read our full mission <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function TruthSection() {
  return (
    <section className="relative py-24 md:py-36 bg-charcoal text-cream overflow-hidden">
      <div className="absolute inset-0">
        <img src={PILLARS[0].image} alt="Faith cards handed out in backpacks" className="w-full h-full object-cover rotate-180" />
        <div className="absolute inset-0 bg-charcoal/30" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">{TRUTH.eyebrow}</p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium leading-[1.08] text-cream text-balance">
            {TRUTH.headline}
          </h2>
          <p className="mt-8 text-lg md:text-xl font-light text-cream/80 leading-relaxed max-w-2xl mx-auto">
            {TRUTH.body}
          </p>
          <p className="mt-10 font-heading italic text-xl md:text-2xl text-gold-soft max-w-2xl mx-auto">
            {TRUTH.verse}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PillarsPreview() {
  return (
    <section className="py-24 md:py-32 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">How We Mentor</p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-ink">
              The 5 Pillars
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/mentorship" data-testid="pillars-viewall-btn" className="inline-flex items-center gap-2 text-ink hover:text-gold transition-colors group">
              Explore the program <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={(i % 5) * 0.08}>
              <Link to="/mentorship" className="group block bg-cream rounded-3xl p-8 h-full border border-line hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <span className="font-heading text-4xl italic text-gold/70">{p.n}</span>
                <h3 className="font-heading text-2xl md:text-3xl mt-4 mb-3 text-ink">{p.title}</h3>
                <p className="text-stone leading-relaxed text-[15px]">{p.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingEvents() {
  return (
    <section className="py-24 md:py-32 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Upcoming Events</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-ink">Come be part of it.</h2>
          </Reveal>
        </div>
        <div className="space-y-4">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.06}>
              <div className="group grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-6 bg-cream rounded-2xl p-6 md:p-7 border border-line hover:border-gold transition-colors duration-500">
                <div className="md:col-span-2 flex items-center gap-3">
                  <Calendar size={18} className="text-gold shrink-0" />
                  <span className="font-heading text-2xl text-ink">{e.date}</span>
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-heading text-xl md:text-2xl text-ink">{e.title}</h3>
                </div>
                <div className="md:col-span-3 text-stone">{e.location}</div>
                <div className="md:col-span-1 md:text-right">
                  <span className="inline-block text-xs uppercase tracking-widest text-gold border border-gold/40 rounded-full px-3 py-1">{e.tag}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestoMarquee() {
  return (
    <section className="py-14 md:py-16 bg-charcoal overflow-hidden">
      <Marquee speed={40} gradient={false} autoFill>
        {MANIFESTO.map((m, i) => (
          <span key={i} className="marquee-item text-cream text-4xl md:text-6xl mx-8 flex items-center gap-8">
            {m} <span className="text-gold not-italic">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-28 md:py-40 bg-cream light-glow overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <Reveal>
          <HandHeart className="text-gold mx-auto mb-8" size={44} />
          <h2 className="font-heading text-4xl md:text-6xl font-medium leading-[1.05] text-ink text-balance">
            Your generosity becomes a <span className="italic text-gold">turning point</span> in a young life.
          </h2>
          <p className="mt-8 text-lg text-stone font-light max-w-2xl mx-auto">
            Give, volunteer, mentor, or simply pray. However you’re called, you help a young person
            discover their worth and their purpose in Christ.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/donate" data-testid="final-donate-btn" className="bg-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-charcoal transition-colors duration-500 shadow-md">
              Give today
            </Link>
            <Link to="/volunteer" data-testid="final-volunteer-btn" className="px-8 py-4 rounded-full border border-line hover:border-ink transition-colors duration-500 font-semibold">
              Volunteer or mentor
            </Link>
            <Link to="/prayer" data-testid="final-prayer-btn" className="px-8 py-4 rounded-full border border-line hover:border-ink transition-colors duration-500 font-semibold">
              Request prayer
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo title="Home" description={ORG.mission} />
      <Hero />
      <MissionStatement />
      <TruthSection />
      <PillarsPreview />
      <UpcomingEvents />
      <ManifestoMarquee />
      <FinalCTA />
    </>
  );
}
