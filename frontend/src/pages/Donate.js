import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Lock, Heart, Loader2, ShieldCheck } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal, MaskedLines } from "../components/Reveal";
import { ORG } from "../lib/content";

const API_BASE = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
const API = API_BASE ? `${API_BASE}/api` : "";
const SUGGESTED = [25, 50, 100, 250, 500, 1000];

export default function Donate() {
  const [params] = useSearchParams();
  const [frequency, setFrequency] = useState("one_time");
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [donor, setDonor] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get("canceled")) toast("Donation canceled — no charge was made.");
  }, [params]);

  const chosenAmount = custom ? parseFloat(custom) : amount;

  const donate = async () => {
    if (ORG.donationUrl) {
      window.location.assign(ORG.donationUrl);
      return;
    }

    if (!donor.name || !donor.email) {
      toast.error("Please enter your name and email.");
      return;
    }
    if (!chosenAmount || chosenAmount < 1) {
      toast.error("Please choose a donation amount of at least $1.");
      return;
    }
    if (!API) {
      toast.error(`Online giving is being connected. Please contact us at ${ORG.email}.`);
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/donations/checkout`, {
        amount: chosenAmount,
        frequency,
        donor_name: donor.name,
        donor_email: donor.email,
        origin_url: window.location.origin,
      });
      window.location.href = data.checkout_url;
    } catch (err) {
      toast.error("Unable to start checkout. Please try again.");
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-line py-4 text-ink placeholder:text-stone/50 focus:outline-none focus:border-gold transition-colors duration-300";
  const labelCls = "block text-xs uppercase tracking-widest text-stone mb-2";

  return (
    <>
      <Seo title="Donate" description="Give a secure, tax-deductible one-time or monthly gift to Consecrated Hands, a Christ-centered 501(c)(3) nonprofit." />
      <section className="pt-40 pb-12 md:pt-48">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Give with purpose</p>
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] text-ink">
            <MaskedLines lines={["Plant hope in", <span key="2">a young <span className="italic text-gold">life.</span></span>]} className="inline-block" />
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-8 text-lg font-light text-stone max-w-xl">
              Your gift supports mentorship, educational resources, community outreach, and faith-based
              programs — directly helping the youth and families who need it most.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Reveal>
            <div className="bg-surface border border-line rounded-3xl shadow-sm p-8 md:p-12" data-testid="donation-card">
              {/* Frequency toggle */}
              <div className="flex bg-cream border border-line rounded-full p-1 w-full max-w-xs mx-auto mb-10">
                {[
                  { k: "one_time", l: "One-time" },
                  { k: "monthly", l: "Monthly" },
                ].map((o) => (
                  <button
                    key={o.k}
                    data-testid={`freq-${o.k}`}
                    onClick={() => setFrequency(o.k)}
                    className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      frequency === o.k ? "bg-gold text-white" : "text-stone hover:text-ink"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>

              {/* Suggested amounts */}
              <label className={labelCls}>Choose an amount</label>
              <div className="grid grid-cols-3 gap-3 mt-3 mb-6">
                {SUGGESTED.map((a) => (
                  <button
                    key={a}
                    data-testid={`amount-${a}`}
                    onClick={() => { setAmount(a); setCustom(""); }}
                    className={`py-4 rounded-full border font-medium transition-all duration-300 ${
                      !custom && amount === a
                        ? "bg-gold text-white border-gold"
                        : "border-line text-ink hover:border-gold"
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>

              <div className="relative mb-10">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-ink text-lg">$</span>
                <input
                  data-testid="custom-amount"
                  type="number"
                  min="1"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="Enter a custom amount"
                  className={`${inputCls} pl-6`}
                />
              </div>

              {/* Donor info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <label className={labelCls}>Full name</label>
                  <input data-testid="donor-name" className={inputCls} value={donor.name} onChange={(e) => setDonor((d) => ({ ...d, name: e.target.value }))} placeholder="Your name" />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input data-testid="donor-email" type="email" className={inputCls} value={donor.email} onChange={(e) => setDonor((d) => ({ ...d, email: e.target.value }))} placeholder="you@email.com" />
                </div>
              </div>

              <button
                onClick={donate}
                disabled={loading}
                data-testid="donate-submit"
                className="w-full bg-gold text-white py-5 rounded-full font-semibold tracking-wide hover:bg-charcoal transition-colors duration-500 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Redirecting to secure checkout…</> : <><Heart size={18} /> Give {chosenAmount ? `$${chosenAmount}` : ""} {frequency === "monthly" ? "monthly" : "now"}</>}
              </button>

              {ORG.donationUrl || API ? (
                <div className="flex items-center justify-center gap-2 mt-5 text-sm text-stone">
                  <Lock size={14} /> Secure payment processed by Stripe
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-sky-soft border border-line px-5 py-4 text-center text-sm text-stone">
                  Online giving is currently being connected. Please contact{" "}
                  <a href={`mailto:${ORG.email}`} className="text-gold font-medium hover:underline">
                    {ORG.email}
                  </a>{" "}
                  for giving information.
                </div>
              )}
            </div>
          </Reveal>

          {/* Tax messaging */}
          <Reveal delay={0.1}>
            <div className="mt-8 bg-sky-soft border border-line rounded-3xl p-8 flex gap-4">
              <ShieldCheck className="text-gold shrink-0 mt-1" size={24} />
              <p className="text-sm text-ink/80 leading-relaxed">
                <strong className="text-ink">Tax-deductible.</strong> Consecrated Hands is a Christ-centered
                501(c)(3) nonprofit organization. Your contribution may be tax-deductible to the fullest
                extent allowed by law. A receipt will be emailed to you upon completion — no goods or
                services are provided in exchange for your gift.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
