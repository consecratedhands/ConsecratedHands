import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ALL_INTERESTS = [
  { key: "volunteer", label: "Volunteer" },
  { key: "mentor", label: "Mentor" },
  { key: "mentee", label: "Apply for Mentorship" },
  { key: "partner", label: "Partner" },
  { key: "general", label: "General" },
];

const inputCls =
  "w-full bg-transparent border-b border-line py-4 text-ink placeholder:text-stone/50 focus:outline-none focus:border-gold transition-colors duration-300";
const labelCls = "block text-xs uppercase tracking-widest text-stone mb-2";

export default function ApplicationForm({
  interests = ["volunteer", "mentor", "mentee", "partner", "general"],
  defaultInterest = "volunteer",
  submitLabel = "Send message",
  messagePlaceholder = "Tell us how you'd like to help, or ask us anything…",
  testidPrefix = "form",
}) {
  const options = ALL_INTERESTS.filter((i) => interests.includes(i.key));
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: defaultInterest, message: "" });
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
      setForm({ name: "", email: "", phone: "", interest: defaultInterest, message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} data-testid={`${testidPrefix}-form`} className="space-y-10">
      {options.length > 1 && (
        <div>
          <label className={labelCls}>I’m interested in</label>
          <div className="flex flex-wrap gap-3 mt-3">
            {options.map((it) => (
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelCls}>Full name</label>
          <input data-testid={`${testidPrefix}-name`} className={inputCls} value={form.name} onChange={update("name")} placeholder="Your name" />
        </div>
        <div>
          <label className={labelCls}>Email</label>
          <input data-testid={`${testidPrefix}-email`} type="email" className={inputCls} value={form.email} onChange={update("email")} placeholder="you@email.com" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Phone (optional)</label>
        <input data-testid={`${testidPrefix}-phone`} className={inputCls} value={form.phone} onChange={update("phone")} placeholder="(504) 000-0000" />
      </div>

      <div>
        <label className={labelCls}>Your message</label>
        <textarea data-testid={`${testidPrefix}-message`} rows={4} className={`${inputCls} resize-none`} value={form.message} onChange={update("message")} placeholder={messagePlaceholder} />
      </div>

      <button
        type="submit"
        data-testid={`${testidPrefix}-submit`}
        disabled={loading}
        className="group bg-gold text-white px-9 py-4 rounded-full font-semibold tracking-wide hover:bg-charcoal transition-colors duration-500 flex items-center gap-2 disabled:opacity-60"
      >
        {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <>{submitLabel} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
      </button>
    </form>
  );
}
