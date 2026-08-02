import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Seo from "../components/Seo";
import ApplicationForm from "../components/ApplicationForm";
import { Reveal, MaskedLines } from "../components/Reveal";
import { ORG, FAQ } from "../lib/content";

const SOCIAL_ICON = { facebook: Facebook, instagram: Instagram, youtube: Youtube };

export default function Contact() {
  return (
    <>
      <Seo title="Contact" description="Get in touch with Consecrated Hands — for volunteering, mentorship, partnerships, prayer, or general inquiries." />
      <section className="pt-40 pb-16 md:pt-48 light-glow">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 flex items-center gap-3">
            <span className="w-10 h-px bg-gold inline-block" /> Contact
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] text-ink max-w-4xl">
            <MaskedLines lines={["We'd love to", <span key="2">hear <span className="italic text-gold">from you.</span></span>]} />
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <ApplicationForm
                interests={["general", "volunteer", "mentor", "mentee", "partner"]}
                defaultInterest="general"
                submitLabel="Send message"
                messagePlaceholder="How can we help? Ask us anything…"
                testidPrefix="contact"
              />
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="bg-surface border border-line rounded-3xl p-10 shadow-sm">
                <h2 className="font-heading text-3xl text-ink mb-8">Reach us directly</h2>
                <div className="space-y-6">
                  {ORG.contacts.map((c) => (
                    <div key={c.name} className="flex items-start gap-4">
                      <Phone size={18} className="text-gold mt-1 shrink-0" />
                      <div>
                        <p className="text-ink font-medium">{c.name}</p>
                    <p className="text-stone text-sm mb-1">{c.title}</p>
                        <a href={`tel:${c.phone.replace(/-/g, "")}`} className="text-stone hover:text-gold transition-colors">{c.phone}</a>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="text-ink font-medium">Email</p>
                      <a href={`mailto:${ORG.email}`} className="text-stone hover:text-gold transition-colors text-sm whitespace-nowrap">{ORG.email}</a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-line">
                  <p className="text-xs uppercase tracking-widest text-stone mb-4">Follow along</p>
                  <div className="flex gap-3">
                    {ORG.socials.map((s) => {
                      const Icon = SOCIAL_ICON[s.icon];
                      return (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                           data-testid={`contact-social-${s.icon}`}
                           className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink hover:bg-gold hover:border-gold hover:text-white transition-colors duration-400">
                          <Icon size={17} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-surface border-t border-line">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 text-center">FAQ</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-ink text-center mb-12">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {FAQ.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-line">
                  <AccordionTrigger data-testid={`faq-trigger-${i}`} className="text-left font-heading text-lg md:text-xl text-ink hover:text-gold hover:no-underline py-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone leading-relaxed text-base pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
