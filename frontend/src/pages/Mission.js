import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cross, Compass, Users } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, MaskedLines } from "../components/Reveal";
import { ORG, TRUTH, PILLARS, IMAGES } from "../lib/content";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  return (
    <section ref={ref} className="relative h-[75vh] min-h-[520px] flex items-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={IMAGES.sportsMentor} alt="A mentor playing sports with kids on a field" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/50" />
      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-soft mb-6">Our Mission</p>
        <h1 className="font-heading text-5xl md:text-7xl font-medium leading-[1.02] text-cream max-w-4xl">
          <MaskedLines lines={["To lead the next", <span key="2">generation to <span className="italic text-gold-soft">Christ.</span></span>]} />
        </h1>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <Reveal><p className="text-xs uppercase tracking-[0.3em] text-gold">Mission Statement</p></Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-heading text-2xl md:text-4xl font-normal leading-[1.3] text-ink text-balance">
              {ORG.mission}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const HOW = [
  { icon: Cross, title: "Rooted in Christ", body: "We introduce young people to Jesus and disciple them in a real, living faith that becomes the foundation for everything else." },
  { icon: Users, title: "Present in Hardship", body: "We meet youth in the middle of hardship — not with judgment, but with presence, patience, and practical help across all 5 Pillars." },
  { icon: Compass, title: "Pointed to Purpose", body: "We help them replace the lie that they aren't enough with the Truth of who God says they are — and walk them toward their purpose." },
];

function HowWeHelp() {
  return (
    <section className="py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <h2 className="font-heading text-4xl md:text-5xl font-medium text-ink mb-16 max-w-2xl">
            How we help youth overcome hardship.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.1}>
              <div className="bg-cream rounded-3xl p-8 md:p-10 border border-line h-full">
                <h.icon className="text-gold mb-6" size={30} />
                <h3 className="font-heading text-2xl text-ink mb-3">{h.title}</h3>
                <p className="text-stone leading-relaxed">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TruthBlock() {
  return (
    <section className="py-24 md:py-36 bg-charcoal text-cream">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">{TRUTH.eyebrow}</p>
          <h2 className="font-heading text-4xl md:text-6xl font-medium leading-[1.08] text-cream text-balance">
            {TRUTH.headline}
          </h2>
          <p className="mt-8 text-lg md:text-xl font-light text-cream/80 leading-relaxed">{TRUTH.body}</p>
          <p className="mt-10 font-heading italic text-xl md:text-2xl text-gold-soft">{TRUTH.verse}</p>
        </Reveal>
      </div>
    </section>
  );
}

function PillarStrip() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 text-center">Built on The 5 Pillars</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {PILLARS.map((p) => (
              <span key={p.n} className="font-heading text-2xl md:text-4xl text-ink border border-line rounded-full px-7 py-3 hover:border-gold hover:text-gold transition-colors duration-500">
                {p.title}
              </span>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/mentorship" data-testid="mission-explore-btn" className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-semibold hover:bg-charcoal transition-colors duration-500">
              Explore the program <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Mission() {
  return (
    <>
      <Seo title="Our Mission" description="Consecrated Hands exists to lead young people to Christ and mentor them through The 5 Pillars — Faith, Family, Finance, Fitness, and Future." />
      <Hero />
      <Statement />
      <HowWeHelp />
      <TruthBlock />
      <PillarStrip />
    </>
  );
}
