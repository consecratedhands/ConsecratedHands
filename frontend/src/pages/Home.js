import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "react-fast-marquee";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, MaskedLines } from "../components/Reveal";
import { ORG, IMAGES, PROGRAMS, IMPACT, MANIFESTO } from "../lib/content";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7 z-10">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-stone mb-6 flex items-center gap-3"
          >
            <span className="w-10 h-px bg-gold inline-block" /> Christ-centered youth mentorship
          </motion.p>
          <h1 className="font-heading font-light tracking-tight leading-[0.98] text-5xl md:text-7xl lg:text-[5.4rem] text-ink">
            <MaskedLines lines={["Hands consecrated", "to guide the ones"]} />
            <MaskedLines
              lines={[<span key="k">who need it <span className="italic text-gold">most.</span></span>]}
              delay={0.24}
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9 }}
            className="mt-8 text-lg md:text-xl font-light text-stone max-w-xl leading-relaxed"
          >
            Guiding young people spiritually, educationally, and financially as they overcome life’s hardships — and discover a path built on purpose.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/donate" data-testid="hero-donate-btn" className="group bg-gold text-white px-8 py-4 font-medium tracking-wide hover:bg-charcoal transition-colors duration-500 flex items-center gap-2">
              Donate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/get-involved" data-testid="hero-involved-btn" className="px-8 py-4 border border-line text-ink hover:border-ink transition-colors duration-500 font-medium tracking-wide">
              Get Involved
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] overflow-hidden arch-top border border-line"
          >
            <motion.img
              src={IMAGES.heroFaith}
              alt="A young person reaching toward the light in hope"
              style={{ scale: imgScale, y: imgY }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MissionStatement() {
  return (
    <section className="py-24 md:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Our Mission</p>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-light leading-[1.25] text-ink text-balance">
                We help young people grow closer to Christ, build confidence, develop practical life
                skills, and discover a <span className="italic text-gold">healthier, more purposeful</span> path forward.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsPreview() {
  return (
    <section className="py-24 md:py-32 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-ink">
              Six ways we<br /> walk alongside youth
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/programs" data-testid="programs-viewall-btn" className="inline-flex items-center gap-2 text-ink hover:text-gold transition-colors group">
              View all programs <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.n} delay={(i % 3) * 0.08}>
              <Link to="/programs" className="group block bg-surface p-8 md:p-10 h-full hover:bg-cream transition-colors duration-500">
                <span className="font-heading text-4xl italic text-gold/70">{p.n}</span>
                <h3 className="font-heading text-2xl md:text-3xl mt-5 mb-3 text-ink">{p.title}</h3>
                <p className="text-stone leading-relaxed text-[15px]">{p.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-gold transition-colors">
                  Learn more <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal className="relative aspect-[4/5] overflow-hidden border border-line">
              <img src={IMAGES.mentorship} alt="A mentor guiding students" className="w-full h-full object-cover" />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Impact & Trust</p>
              <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight text-ink mb-10">
                A relationship-driven ministry, built on trust.
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
              {IMPACT.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <p className="font-heading text-4xl md:text-5xl text-ink">{s.value}</p>
                  <p className="text-sm text-stone mt-2 leading-snug">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoMarquee() {
  return (
    <section className="py-16 md:py-20 bg-charcoal overflow-hidden">
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

function DonateCTA() {
  return (
    <section className="relative py-28 md:py-40 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Get Involved</p>
            <h2 className="font-heading text-4xl md:text-6xl font-light leading-[1.05] text-ink">
              Your generosity becomes a<br />
              <span className="italic text-gold">turning point</span> in a young life.
            </h2>
            <p className="mt-8 text-lg text-stone font-light max-w-xl">
              Every gift funds mentorship, guidance, and hope for the youth who need it most.
              Consecrated Hands is a 501(c)(3) nonprofit — your donation may be tax-deductible.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/donate" data-testid="cta-donate-btn" className="bg-gold text-white px-8 py-4 font-medium hover:bg-charcoal transition-colors duration-500">
                Give today
              </Link>
              <Link to="/get-involved" data-testid="cta-volunteer-btn" className="px-8 py-4 border border-line hover:border-ink transition-colors duration-500 font-medium">
                Volunteer or mentor
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.1} className="relative aspect-square overflow-hidden arch-top border border-line">
            <img src={IMAGES.volunteering} alt="Volunteers serving the community" className="w-full h-full object-cover" />
          </Reveal>
        </div>
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
      <ProgramsPreview />
      <Impact />
      <ManifestoMarquee />
      <DonateCTA />
    </>
  );
}
