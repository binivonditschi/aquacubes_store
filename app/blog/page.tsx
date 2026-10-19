import type { Metadata } from "next";
import LegalPage from "@/components/b2b/LegalPage";
import content from "@/content/blog.json";

export const metadata: Metadata = { title: `${content.title} · Aquacubes` };

export default function BlogPage() {
  return <LegalPage content={content} />;
}
