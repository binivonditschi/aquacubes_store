import type { Metadata } from "next";
import LegalPage from "@/components/b2b/LegalPage";
import content from "@/content/impressum.json";

export const metadata: Metadata = { title: `${content.title} · Aquacubes` };

export default function ImpressumPage() {
  return <LegalPage content={content} />;
}
