import type { Metadata } from "next";
import LegalPage from "@/components/b2b/LegalPage";
import { SalesForm } from "@/components/embeds";
import content from "@/content/kontakt.json";

export const metadata: Metadata = { title: `${content.title} · Aquacubes` };

export default function KontaktPage() {
  return (
    <LegalPage content={content}>
      <section className="mt-space-lg rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl">
        <div className="mb-space-xs text-label-technical font-semibold uppercase text-primary">Anfrage</div>
        <h2 className="mb-space-md text-headline-lg text-surface-navy">Schreiben Sie unserem Vertriebsteam</h2>
        <SalesForm />
      </section>
    </LegalPage>
  );
}
