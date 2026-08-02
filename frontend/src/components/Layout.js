import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Facebook, Instagram, Youtube } from "lucide-react";
import { ORG } from "../lib/content";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/mission", label: "Our Mission" },
  { to: "/mentorship", label: "Mentorship" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/prayer", label: "Prayer" },
  { to: "/contact", label: "Contact" },
];

const SOCIAL_ICON = { facebook: Facebook, instagram: Instagram, youtube: Youtube };

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-line/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-32 md:h-40">
        <Link to="/" data-testid="logo-link" className="flex items-center group">
          <img src={ORG.logo} alt={`${ORG.name} logo`} className="h-28 md:h-36 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              data-testid={`nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-ink hover:text-gold"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Link
            to="/donate"
            data-testid="nav-donate-btn"
            className="bg-gold text-white text-sm font-semibold tracking-wide px-6 py-3 rounded-full hover:bg-charcoal transition-colors duration-500 shadow-sm"
          >
            Donate
          </Link>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden glass border-b border-line overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} className="text-lg font-semibold text-ink">
                  {n.label}
                </NavLink>
              ))}
              <Link to="/donate" data-testid="mobile-donate-btn" className="bg-gold text-white text-center py-3 mt-2 font-semibold rounded-full">
                Donate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-charcoal text-cream/90">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <img src={ORG.logo} alt={ORG.name} className="h-40 md:h-44 w-auto object-contain mb-6 brightness-110" />
            <h3 className="font-heading text-2xl md:text-3xl font-normal leading-tight text-cream max-w-sm">
              Guiding young people toward a purposeful path in Christ.
            </h3>
            <Link
              to="/donate"
              data-testid="footer-donate-btn"
              className="inline-flex items-center gap-2 mt-8 bg-gold text-white px-7 py-3.5 rounded-full hover:bg-cream hover:text-charcoal transition-colors duration-500"
            >
              <Heart size={16} /> Support the mission
            </Link>
            <div className="flex items-center gap-4 mt-8">
              {ORG.socials.map((s) => {
                const Icon = SOCIAL_ICON[s.icon];
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                     aria-label={s.label} data-testid={`social-${s.icon}`}
                     className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/80 hover:bg-gold hover:border-gold hover:text-white transition-colors duration-400">
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-xs uppercase tracking-widest text-gold mb-5">Explore</p>
            <ul className="space-y-3">
              {NAV.concat({ to: "/donate", label: "Donate" }).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-cream/70 hover:text-gold transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-gold mb-5">Contact</p>
            <ul className="space-y-3 text-cream/70">
              {ORG.contacts.map((c) => (
                <li key={c.name}>
                  {c.name}<br />
                  <a href={`tel:${c.phone.replace(/-/g, "")}`} className="hover:text-gold transition-colors">{c.phone}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${ORG.email}`} className="hover:text-gold transition-colors whitespace-nowrap">{ORG.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/15 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-cream/50">
          <p>© {new Date().getFullYear()} {ORG.name}. A Christ-centered nonprofit.</p>
          <p>{ORG.ein} · Donations may be tax-deductible.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingDonate() {
  const loc = useLocation();
  if (loc.pathname.startsWith("/donate") || loc.pathname.startsWith("/donation")) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        to="/donate"
        data-testid="floating-donate-btn"
        className="flex items-center gap-2 bg-gold text-white px-7 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <Heart size={18} /> Donate
      </Link>
    </motion.div>
  );
}

export default function Layout({ children }) {
  useLenis();
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingDonate />
    </div>
  );
}
