import Link from "next/link";
import Icon from "@/components/b2b/Icon";

export interface LegalContent {
  title: string;
  subtitle: string;
  sections: { heading: string; id?: string; html: string }[];
}

/** Info / legal page layout from the b2b sub-pages (ueber-uns.html, agb.html, …). */
export default function LegalPage({ content, children }: { content: LegalContent; children?: React.ReactNode }) {
  return (
    <div className="bg-surface-subtle">
      <div className="mx-auto max-w-5xl px-space-md py-space-2xl sm:px-space-lg md:py-space-3xl">
        <Link
          href="/"
          className="mb-space-md inline-flex items-center gap-1 text-sm text-steel transition-colors hover:text-primary"
        >
          <Icon name="arrow_back" size={18} />
          Zurück zur Startseite
        </Link>

        <article className="legal rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl">
          <h1 className="mb-1 text-3xl font-extrabold text-surface-navy">{content.title}</h1>
          <p className="mb-6 text-sm text-steel">{content.subtitle}</p>

          {content.sections.map((section) => (
            <section key={section.heading} id={section.id} className="scroll-mt-24">
              <h2>{section.heading}</h2>
              {/* Trusted first-party copy from content/*.json */}
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </section>
          ))}
        </article>

        {children}
      </div>
    </div>
  );
}
