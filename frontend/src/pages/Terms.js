import Seo from "../components/Seo";
import { ORG } from "../lib/content";

const Section=({title,children})=><section className="mt-10"><h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#25292C]">{title}</h2><div className="mt-4 space-y-4 text-[#59636A] leading-relaxed">{children}</div></section>;

export default function Terms(){return <><Seo title="Terms of Use" description="Terms of Use for the Consecrated Hands website."/><main className="pt-40 pb-24 bg-white"><div className="max-w-4xl mx-auto px-6 md:px-12"><p className="text-xs uppercase tracking-[.28em] text-[#9A6B00] font-bold">Website Terms</p><h1 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Terms of Use</h1><p className="mt-5 text-sm text-[#59636A]">Effective August 29, 2026</p><p className="mt-8 text-lg text-[#47535B] leading-relaxed">These Terms of Use apply to your use of ConsecratedHands.com and the online forms, information, and services made available through this website.</p>

<Section title="Purpose of this website"><p>This website provides information about Consecrated Hands, our Christ-centered youth mentorship mission, ways to volunteer or partner, prayer requests, and charitable giving. Website content is general information and is not a substitute for professional medical, legal, mental-health, financial, emergency, or child-protection services.</p></Section>

<Section title="Emergency and safety situations"><p>Consecrated Hands is not an emergency response service. If someone is in immediate danger, call 911 or the appropriate local emergency service. Concerns involving suspected abuse, neglect, exploitation, or imminent harm should be reported to the appropriate authorities as required by law.</p></Section>

<Section title="Accurate and appropriate submissions"><p>When you use our forms, you agree not to submit knowingly false information, malicious code, unlawful content, spam, threats, harassment, or information you do not have the right to provide. Please avoid sending highly sensitive records through ordinary website forms.</p></Section>

<Section title="Mentorship and volunteer interest"><p>Submitting an interest form does not guarantee acceptance, placement, services, volunteer status, or a mentor match. Youth-facing roles may be subject to screening, training, reference checks, background checks, supervision requirements, safeguarding expectations, and role availability.</p></Section>

<Section title="Donations"><p>Donations are processed through third-party payment services such as Stripe. Unless otherwise required by law, charitable gifts are generally final once processed. If you believe a donation was made in error, contact us promptly so we can review the circumstances.</p><p>Tax treatment depends on individual circumstances. Donors should keep their records and consult a qualified tax professional when needed.</p></Section>

<Section title="Intellectual property"><p>Unless otherwise stated, the Consecrated Hands name, original website copy, program-framework language, branding, graphics, and other original materials are owned by or licensed to Consecrated Hands. You may share links to public pages, but you may not misrepresent our materials as your own or use our branding in a way that falsely implies endorsement.</p></Section>

<Section title="Third-party services and links"><p>Our website may link to or depend on third-party services. We are not responsible for the availability, security, content, or practices of services we do not control.</p></Section>

<Section title="Website availability"><p>We work to keep the website accurate and available, but we do not guarantee uninterrupted access or that every item will always be current or error-free. We may update, suspend, replace, or remove website features as needed.</p></Section>

<Section title="Limitation of responsibility"><p>To the extent permitted by law, Consecrated Hands is not responsible for indirect or consequential losses arising solely from use of this public website or reliance on general website information.</p></Section>

<Section title="Governing law"><p>These website terms are intended to be governed by applicable United States and Louisiana law, without overriding rights that cannot legally be waived.</p></Section>

<Section title="Changes to these terms"><p>We may update these terms as our website and programs evolve. The effective date above will reflect material revisions.</p></Section>

<Section title="Contact"><p>Questions about these terms may be sent to <a className="font-bold text-[#1683BD] hover:underline" href={`mailto:${ORG.email}`}>{ORG.email}</a>.</p></Section>
</div></main></>}
