import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Loader2, Heart, XCircle } from "lucide-react";
import Seo from "../components/Seo";
import { Reveal } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const MAX_TRIES = 8;

export default function DonationSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState("polling"); // polling | paid | timeout | error
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!sessionId) { setState("error"); return; }
    let tries = 0;
    let active = true;

    const poll = async () => {
      if (!active) return;
      try {
        const { data } = await axios.get(`${API}/payments/status/${sessionId}`);
        if (data.payment_status === "paid") {
          setInfo(data);
          setState("paid");
          return;
        }
      } catch (e) { /* keep trying */ }
      tries += 1;
      if (tries >= MAX_TRIES) { setState("timeout"); return; }
      setTimeout(poll, 2000);
    };
    poll();
    return () => { active = false; };
  }, [sessionId]);

  return (
    <>
      <Seo title="Thank You" description="Thank you for supporting Consecrated Hands." />
      <section className="min-h-[80vh] flex items-center pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          {state === "polling" && (
            <>
              <Loader2 size={48} className="text-gold animate-spin mb-8" />
              <h1 className="font-heading text-4xl md:text-5xl font-light text-ink">Confirming your gift…</h1>
              <p className="mt-4 text-stone">One moment while we confirm your donation.</p>
            </>
          )}

          {state === "paid" && (
            <Reveal className="flex flex-col items-center">
              <CheckCircle2 size={64} className="text-gold mb-8" />
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Gift Received</p>
              <h1 className="font-heading text-5xl md:text-6xl font-light text-ink leading-tight">
                Thank you{info?.donor_name ? `, ${info.donor_name}` : ""}.
              </h1>
              <p className="mt-6 text-lg text-stone font-light max-w-lg">
                Your {info?.frequency === "monthly" ? "monthly" : "one-time"} gift{info?.amount ? ` of $${info.amount}` : ""} helps guide a young person
                toward a purposeful path. A receipt is on its way to your inbox.
              </p>
              <p className="mt-4 text-sm text-stone">
                Consecrated Hands is a 501(c)(3) nonprofit — your gift may be tax-deductible.
              </p>
              <Link to="/" data-testid="success-home-btn" className="mt-10 inline-flex items-center gap-2 bg-gold text-white px-8 py-4 font-medium hover:bg-charcoal transition-colors duration-500">
                <Heart size={16} /> Back to home
              </Link>
            </Reveal>
          )}

          {state === "timeout" && (
            <>
              <Loader2 size={48} className="text-stone mb-8" />
              <h1 className="font-heading text-4xl font-light text-ink">Still processing…</h1>
              <p className="mt-4 text-stone max-w-md">Your payment is being processed. If you were charged, you’ll receive a receipt by email shortly.</p>
              <Link to="/" className="mt-8 text-gold hover:underline">Return home</Link>
            </>
          )}

          {state === "error" && (
            <>
              <XCircle size={48} className="text-stone mb-8" />
              <h1 className="font-heading text-4xl font-light text-ink">Something went wrong</h1>
              <p className="mt-4 text-stone">We couldn’t find this donation. Please try again.</p>
              <Link to="/donate" className="mt-8 bg-gold text-white px-8 py-4 font-medium">Try again</Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
