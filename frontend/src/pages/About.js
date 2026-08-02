import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, MaskedLines } from "../components/Reveal";
import { ORG, IMAGES, VALUES } from "../lib/content";

function AboutHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  return (
    <section ref={ref} className="relative h-[80vh] min-h-[560px] flex items-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={IMAGES.kidsSun} alt="A joyful child smiling in the sunlight" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/50" />
      </motion.div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-soft mb-6">About Consecrated Hands</p>
        <h1 className="font-heading text-5xl md:text-7xl font-light leading-[1.02] text-cream max-w-4xl">
          <MaskedLines lines={["A ministry of presence,", <span key="2">patience, and <span className="italic text-gold-soft">hope.</span></span>]} />
        </h1>
      </div>
    </section>
  );
}

function MissionBlock() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <Reveal><p className="text-xs uppercase tracking-[0.3em] text-gold">The Mission</p></Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-heading text-2xl md:text-4xl font-light leading-[1.3] text-ink text-balance">
              {ORG.mission}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ValuesChapters() {
  return (
    <section className="py-16 md:py-24 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-5">Faith & Values</p>
              <h2 className="font-heading text-4xl md:text-5xl font-light leading-tight text-ink">
                Everything begins with Christ.
              </h2>
              <p className="mt-6 text-stone leading-relaxed">
                Our foundation is the gospel — grace, truth, and unshakable hope. From that foundation,
                we mentor the whole person: spirit, mind, and future.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="divide-y divide-line border-t border-line">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.05}>
                <div className="py-10 flex gap-8">
                  <span className="font-heading text-3xl md:text-4xl italic text-gold/70 shrink-0">{v.n}</span>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl text-ink mb-3">{v.title}</h3>
                    <p className="text-stone leading-relaxed">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NonprofitTrust() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="bg-sky-soft border border-line p-10 md:p-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-5 text-ink">
                <ShieldCheck className="text-gold" size={28} />
                <p className="text-xs uppercase tracking-[0.3em]">Nonprofit Status</p>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-ink mb-4">
                A 501(c)(3) nonprofit organization.
              </h2>
              <p className="text-stone leading-relaxed max-w-2xl">
                Consecrated Hands operates as a Christ-centered 501(c)(3) nonprofit. Contributions may be
                tax-deductible to the fullest extent allowed by law. We are committed to transparency and
                faithful stewardship of every gift entrusted to us.
              </p>
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <Link to="/donate" data-testid="about-donate-btn" className="inline-flex items-center gap-2 bg-gold text-white px-7 py-4 font-medium hover:bg-charcoal transition-colors duration-500">
                Support us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <Seo title="About" description="Consecrated Hands is a Christ-centered 501(c)(3) mentorship program guiding young people spiritually, educationally, and financially." />
      <AboutHero />
      <MissionBlock />
      <ValuesChapters />
      <NonprofitTrust />
    </>
  );
}
