import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { HandHeart, Loader2, Check } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, MaskedLines } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full bg-transparent border-b border-line py-4 text-ink placeholder:text-stone/50 focus:outline-none focus:border-gold transition-colors duration-300";
const labelCls = "block text-xs uppercase tracking-widest text-stone mb-2";

export default function Prayer() {
  const [form, setForm] = useState({ name: "", email: "", request: "", is_public: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.request.trim()) {
      toast.error("Please share your prayer request.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/prayer`, form);
      toast.success(data.message || "Thank you — our team will be praying for you.");
      setDone(true);
      setForm({ name: "", email: "", request: "", is_public: false });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Prayer Requests" description="Submit a prayer request to Consecrated Hands. Our team would be honored to pray with you and for you." />
      <section className="pt-40 pb-16 md:pt-48 light-glow">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Prayer Requests</p>
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] text-ink">
            <MaskedLines lines={["Let us pray", <span key="2">with <span className="italic text-gold">you.</span></span>]} className="inline-block" />
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-8 text-lg font-light text-stone max-w-xl">
              Whatever you’re carrying, you don’t have to carry it alone. Share your request and our team
              will lift it up in prayer. Nothing is too big or too small for God.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <Reveal>
            <div className="bg-surface rounded-3xl border border-line p-8 md:p-12 shadow-sm" data-testid="prayer-card">
              {done ? (
                <div className="text-center py-10 flex flex-col items-center" data-testid="prayer-thanks">
                  <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                    <Check className="text-gold" size={30} />
                  </div>
                  <h2 className="font-heading text-3xl text-ink mb-3">Your request has been received.</h2>
                  <p className="text-stone max-w-md">Our team is honored to pray with you. May God’s peace, which surpasses all understanding, guard your heart.</p>
                  <button onClick={() => setDone(false)} className="mt-8 text-gold hover:underline font-medium" data-testid="prayer-again">Submit another request</button>
                </div>
              ) : (
                <form onSubmit={submit} data-testid="prayer-form" className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className={labelCls}>Name (optional)</label>
                      <input data-testid="prayer-name" className={inputCls} value={form.name} onChange={update("name")} placeholder="Your name or anonymous" />
                    </div>
                    <div>
                      <label className={labelCls}>Email (optional)</label>
                      <input data-testid="prayer-email" type="email" className={inputCls} value={form.email} onChange={update("email")} placeholder="you@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Your prayer request</label>
                    <textarea data-testid="prayer-request" rows={5} className={`${inputCls} resize-none`} value={form.request} onChange={update("request")} placeholder="Share what's on your heart…" />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer select-none" data-testid="prayer-public">
                    <input
                      type="checkbox"
                      checked={form.is_public}
                      onChange={(e) => setForm((f) => ({ ...f, is_public: e.target.checked }))}
                      className="w-5 h-5 accent-gold"
                    />
                    <span className="text-sm text-stone">You may share this request (anonymously) with our prayer team community.</span>
                  </label>

                  <button
                    type="submit"
                    data-testid="prayer-submit"
                    disabled={loading}
                    className="w-full bg-gold text-white py-4 rounded-full font-semibold tracking-wide hover:bg-charcoal transition-colors duration-500 flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <><HandHeart size={18} /> Send prayer request</>}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
