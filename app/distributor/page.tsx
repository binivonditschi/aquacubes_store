import type { Metadata } from "next";
import LegalPage from "@/components/b2b/LegalPage";
import content from "@/content/distributor.json";

export const metadata: Metadata = { title: `${content.title} · Aquacubes` };

export default function DistributorPage() {
  return <LegalPage content={content} />;
}
