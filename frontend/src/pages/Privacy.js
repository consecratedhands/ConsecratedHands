import Seo from "../components/Seo";
import { ORG } from "../lib/content";

const Section=({title,children})=><section className="mt-10"><h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#25292C]">{title}</h2><div className="mt-4 space-y-4 text-[#59636A] leading-relaxed">{children}</div></section>;

export default function Privacy(){return <><Seo title="Privacy Policy" description="Privacy Policy for Consecrated Hands."/><main className="pt-40 pb-24 bg-white"><div className="max-w-4xl mx-auto px-6 md:px-12"><p className="text-xs uppercase tracking-[.28em] text-[#9A6B00] font-bold">Privacy</p><h1 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Privacy Policy</h1><p className="mt-5 text-sm text-[#59636A]">Effective August 29, 2026</p><p className="mt-8 text-lg text-[#47535B] leading-relaxed">Consecrated Hands respects the privacy of young people, families, volunteers, donors, prayer-request submitters, and community partners. This policy explains the information our website may collect, why we collect it, and the choices available to you.</p>

<Section title="Information we may collect"><p>When you contact us, volunteer, ask about mentorship, submit a prayer request, or make a donation, you may provide information such as your name, email address, phone number, message, area of interest, prayer request, and donation-related details.</p><p>Payment card information is handled by our payment processor, Stripe. Consecrated Hands does not intend to store full payment-card numbers on this website.</p><p>Our website may also receive basic technical information such as browser type, device information, pages visited, referral information, approximate location derived from network information, and website-performance data.</p></Section>

<Section title="How we use information"><p>We may use information to respond to inquiries, coordinate mentorship and volunteer interest, receive and respond to prayer requests, process and acknowledge donations, improve the website, protect the site from abuse, maintain organizational records, and comply with legal or financial obligations.</p><p>We do not sell personal information to advertisers.</p></Section>

<Section title="Youth and children"><p>Consecrated Hands serves young people, so privacy around youth information matters deeply. This public website is not designed to collect unnecessary sensitive information directly from children. Parents, guardians, or responsible adults should assist minors when submitting detailed personal information through the site.</p><p>Please do not submit Social Security numbers, medical records, school records, passwords, financial-account credentials, or other highly sensitive information through ordinary website forms.</p></Section>

<Section title="Prayer requests"><p>Prayer requests can contain deeply personal information. Please share only what you are comfortable providing. A request marked for anonymous sharing may be shared without identifying information, but submitting that option does not require Consecrated Hands to publish the request.</p></Section>

<Section title="Analytics and website technology"><p>The website may use analytics and performance tools to understand how visitors use the site and to improve reliability and user experience. These services may use cookies or similar technologies. We aim to avoid intentionally recording sensitive form-field contents through analytics tools.</p></Section>

<Section title="Service providers"><p>We may use trusted providers for website hosting, analytics, email delivery, database services, payment processing, and security. These providers process information only as needed to provide their services and are subject to their own terms and privacy practices.</p></Section>

<Section title="Data retention and security"><p>We retain information only as reasonably necessary for the purposes described here, organizational recordkeeping, donor acknowledgment, safeguarding, dispute resolution, or legal requirements. No online system can guarantee absolute security, but we use reasonable technical and organizational safeguards appropriate to the information handled.</p></Section>

<Section title="Your choices"><p>You may contact us to ask about personal information you previously submitted through this website, request a correction, or ask us to delete information when we are not required to retain it for legal, financial, safeguarding, or operational reasons.</p></Section>

<Section title="External links"><p>Our website may link to third-party services. Consecrated Hands is not responsible for the privacy practices of websites or services we do not control.</p></Section>

<Section title="Changes to this policy"><p>We may update this policy as our programs, technology, or legal obligations change. The effective date above will be updated when material revisions are published.</p></Section>

<Section title="Contact us"><p>Questions about privacy can be sent to <a className="font-bold text-[#1683BD] hover:underline" href={`mailto:${ORG.email}`}>{ORG.email}</a>.</p></Section>
</div></main></>}
