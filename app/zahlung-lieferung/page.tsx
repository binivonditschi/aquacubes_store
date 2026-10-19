import type { Metadata } from "next";
import LegalPage from "@/components/b2b/LegalPage";
import content from "@/content/zahlung-lieferung.json";

export const metadata: Metadata = { title: `${content.title} · Aquacubes` };

export default function ZahlungLieferungPage() {
  return <LegalPage content={content} />;
}
