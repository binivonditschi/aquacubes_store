import type { Metadata } from "next";
import LegalPage from "@/components/b2b/LegalPage";
import content from "@/content/ueber-uns.json";

export const metadata: Metadata = { title: `${content.title} · Aquacubes` };

export default function UeberUnsPage() {
  return <LegalPage content={content} />;
}
