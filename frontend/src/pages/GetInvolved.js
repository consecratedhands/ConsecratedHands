import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, ArrowRight, Loader2 } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, MaskedLines } from "../components/Reveal";
import { ORG } from "../lib/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INTERESTS = [
  { key: "volunteer", label: "Volunteer" },
  { key: "mentor", label: "Mentor" },
  { key: "partner", label: "Partner" },
  { key: "general", label: "General" },
];

export default function GetInvolved() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "volunteer", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      toast.success(data.message || "Thank you — we'll be in touch soon.");
      setForm({ name: "", email: "", phone: "", interest: "volunteer", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-line py-4 text-ink placeholder:text-stone/50 focus:outline-none focus:border-gold transition-colors duration-300";
  const labelCls = "block text-xs uppercase tracking-widest text-stone mb-2";

  return (
    <>
      <Seo title="Get Involved" description="Volunteer, mentor, partner, or reach out to Consecrated Hands. Join us in guiding young people toward a purposeful path." />
      <section className="pt-40 pb-16 md:pt-48">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 flex items-center gap-3">
            <span className="w-10 h-px bg-gold inline-block" /> Get Involved
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-light tracking-tight leading-[1.02] text-ink max-w-4xl">
            <MaskedLines lines={["Lend your hands", <span key="2">to the <span className="italic text-gold">mission.</span></span>]} />
          </h1>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <form onSubmit={submit} data-testid="contact-form" className="space-y-10">
                <div>
                  <label className={labelCls}>I’m interested in</label>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {INTERESTS.map((it) => (
                      <button
                        key={it.key}
                        type="button"
                        data-testid={`interest-${it.key}`}
                        onClick={() => setForm((f) => ({ ...f, interest: it.key }))}
                        className={`px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
                          form.interest === it.key
                            ? "bg-gold text-white border-gold"
                            : "bg-transparent text-ink border-line hover:border-gold"
                        }`}
                      >
                        {it.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelCls}>Full name</label>
                    <input data-testid="contact-name" className={inputCls} value={form.name} onChange={update("name")} placeholder="Your name" />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input data-testid="contact-email" type="email" className={inputCls} value={form.email} onChange={update("email")} placeholder="you@email.com" />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Phone (optional)</label>
                  <input data-testid="contact-phone" className={inputCls} value={form.phone} onChange={update("phone")} placeholder="(504) 000-0000" />
                </div>

                <div>
                  <label className={labelCls}>Your message</label>
                  <textarea data-testid="contact-message" rows={4} className={`${inputCls} resize-none`} value={form.message} onChange={update("message")} placeholder="Tell us how you'd like to help, or ask us anything…" />
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={loading}
                  className="group bg-gold text-white px-9 py-4 font-medium tracking-wide hover:bg-charcoal transition-colors duration-500 flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <>Send message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </form>
            </Reveal>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="bg-surface border border-line p-10">
                <h2 className="font-heading text-3xl text-ink mb-8">Reach us directly</h2>
                <div className="space-y-6">
                  {ORG.contacts.map((c) => (
                    <div key={c.name} className="flex items-start gap-4">
                      <Phone size={18} className="text-gold mt-1 shrink-0" />
                      <div>
                        <p className="text-ink font-medium">{c.name}</p>
                        <a href={`tel:${c.phone.replace(/-/g, "")}`} className="text-stone hover:text-gold transition-colors">{c.phone}</a>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="text-ink font-medium">Email</p>
                      <a href={`mailto:${ORG.email}`} className="text-stone hover:text-gold transition-colors break-all">{ORG.email}</a>
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-line">
                  <p className="text-sm text-stone leading-relaxed">
                    Consecrated Hands is a Christ-centered 501(c)(3) nonprofit. Whether you give time, skill,
                    or resources — you help a young person find a purposeful path forward.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
