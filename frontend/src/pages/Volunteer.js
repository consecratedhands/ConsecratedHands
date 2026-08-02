import { Link } from "react-router-dom";
import { HandHeart, GraduationCap, Users, Clock } from "lucide-react";
import Seo from "../components/Seo";
import ApplicationForm from "../components/ApplicationForm";
import { Reveal, MaskedLines } from "../components/Reveal";
import { ORG } from "../lib/content";

const REASONS = [
  { icon: HandHeart, title: "Mentor a young person", body: "Walk with a youth one-on-one across the 5 Pillars and become a steady, godly presence in their life." },
  { icon: GraduationCap, title: "Share a skill", body: "Teach a workshop on finances, fitness, study skills, or a trade you love — your expertise changes futures." },
  { icon: Users, title: "Serve at events", body: "Help run worship nights, cookouts, retreats, and outreach that bring our community together." },
  { icon: Clock, title: "Give your time", body: "Even a few hours a month makes a lasting difference. Every hand consecrated to this work matters." },
];

export default function Volunteer() {
  return (
    <>
      <Seo title="Volunteer" description="Volunteer or become a mentor with Consecrated Hands. Give your time and skills to guide young people toward Christ and a purposeful future." />
      <section className="pt-40 pb-16 md:pt-48 light-glow">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 flex items-center gap-3">
            <span className="w-10 h-px bg-gold inline-block" /> Volunteer
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] text-ink max-w-4xl">
            <MaskedLines lines={["Lend your hands", <span key="2">to the <span className="italic text-gold">mission.</span></span>]} />
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-8 text-lg md:text-xl font-light text-stone max-w-2xl leading-relaxed">
              You don’t have to have it all together to make a difference — you just have to show up.
              God uses ordinary people to speak His Truth into young lives.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <div className="bg-surface rounded-3xl p-8 border border-line h-full hover:shadow-md hover:-translate-y-1 transition-all duration-500">
                  <r.icon className="text-gold mb-6" size={30} />
                  <h3 className="font-heading text-xl md:text-2xl text-ink mb-3">{r.title}</h3>
                  <p className="text-stone leading-relaxed text-[15px]">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-heading text-3xl md:text-4xl font-medium text-ink mb-8">Sign up to serve</h2>
              <ApplicationForm
                interests={["volunteer", "mentor", "partner"]}
                defaultInterest="volunteer"
                submitLabel="Send application"
                messagePlaceholder="Tell us how you'd like to serve, your availability, and any skills you'd love to share…"
                testidPrefix="volunteer"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl border border-white/70 p-10 shadow-sm">
                <h3 className="font-heading text-2xl text-ink mb-6">Questions first?</h3>
                <p className="text-stone leading-relaxed mb-6">Reach out anytime — we’d love to talk through how you can be part of the work.</p>
                <div className="space-y-3">
                  {ORG.contacts.map((c) => (
                    <div key={c.name} className="text-ink">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-stone text-sm">{c.title}</p>
                    <a href={`tel:${c.phone.replace(/-/g, "")}`} className="text-gold hover:underline">{c.phone}</a>
                  </div>
                  ))}
                  <a href={`mailto:${ORG.email}`} className="block text-gold hover:underline break-all">{ORG.email}</a>
                </div>
                <Link to="/mentorship" className="inline-block mt-8 text-ink hover:text-gold transition-colors font-medium">Prefer to be mentored? Apply here →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
