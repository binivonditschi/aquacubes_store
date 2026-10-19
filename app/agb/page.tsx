import type { Metadata } from "next";
import LegalPage from "@/components/b2b/LegalPage";
import content from "@/content/agb.json";

export const metadata: Metadata = { title: `${content.title} · Aquacubes` };

export default function AgbPage() {
  return <LegalPage content={content} />;
}
