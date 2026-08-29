import Seo from "../components/Seo";
import { ORG } from "../lib/content";

const Section=({title,children})=><section className="mt-10"><h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#25292C]">{title}</h2><div className="mt-4 space-y-4 text-[#59636A] leading-relaxed">{children}</div></section>;

export default function Safeguarding(){return <><Seo title="Youth Safeguarding" description="Consecrated Hands youth safeguarding commitment."/><div className="pt-40 pb-24 bg-white"><div className="max-w-4xl mx-auto px-6 md:px-12"><p className="text-xs uppercase tracking-[.28em] text-[#A66F00] font-bold">Youth Safety</p><h1 className="mt-5 font-heading text-[2.65rem] sm:text-5xl md:text-7xl font-semibold text-[#25292C]">Youth Safeguarding Commitment</h1><p className="mt-8 text-lg text-[#424B52] leading-relaxed">Young people deserve ministry and mentorship environments that protect their dignity, safety, privacy, and God-given worth. Consecrated Hands is committed to building youth programs around appropriate boundaries, responsible adult conduct, transparency, and prompt action when safety concerns arise.</p>

<Section title="Screening and role readiness"><p>Youth-facing volunteer and mentor roles may require an application, identity verification, reference review, background screening where appropriate, training, role matching, and agreement to conduct and safeguarding expectations before unsupervised or ongoing service.</p></Section>

<Section title="Healthy adult-youth boundaries"><p>Adults serving with youth are expected to maintain appropriate physical, emotional, digital, transportation, and communication boundaries. Private or secretive relationships, sexualized conduct, grooming behavior, harassment, exploitation, violence, substance use around youth, or retaliation for raising a concern are incompatible with service through Consecrated Hands.</p></Section>

<Section title="Visibility and accountability"><p>Programs should be structured to reduce avoidable isolation and increase accountability. Depending on the activity, this can include approved meeting locations, parent or guardian awareness, multiple adults, documented transportation arrangements, supervisor visibility, and clear communication channels.</p></Section>

<Section title="Digital communication"><p>Communication with minors should be appropriate to the mentoring role, transparent, and consistent with parent or guardian expectations and organizational guidance. Adults should not use disappearing messages, secret accounts, sexual content, coercive communication, or private digital contact intended to evade oversight.</p></Section>

<Section title="Photos, stories, and privacy"><p>Photos, testimonials, personal stories, school information, prayer needs, or identifying details about youth should be handled carefully. Permission and privacy considerations should guide public sharing, and sensitive information should not be published merely because it was disclosed during mentorship.</p></Section>

<Section title="Reporting concerns"><p>Safety concerns should be taken seriously and escalated promptly. Consecrated Hands will not ask someone to keep suspected abuse, neglect, exploitation, or imminent danger "inside the ministry." Reports should be made to appropriate leadership and, when required or appropriate, to law enforcement, child-protection authorities, emergency services, or other responsible agencies.</p><p>If a child or any person is in immediate danger, call 911 or the appropriate local emergency service.</p></Section>

<Section title="No retaliation"><p>Good-faith reports of safety concerns should not result in retaliation. A person raising a concern may be asked for details necessary to respond responsibly, but intimidation or punishment for reporting a genuine concern is not acceptable.</p></Section>

<Section title="Continuous improvement"><p>Safeguarding is not a one-time form. As programs grow, Consecrated Hands intends to review training, supervision, screening, incident-response procedures, transportation practices, digital communication, and youth privacy so safeguards remain appropriate to the work being performed.</p></Section>

<Section title="Contact"><p>Questions about youth safety or this commitment may be sent to <a className="font-bold text-[#006DAA] hover:underline" href={`mailto:${ORG.email}`}>{ORG.email}</a>. Emergency or legally reportable concerns should be directed to the appropriate authorities rather than waiting for an email response.</p></Section>
</div></div></>}
