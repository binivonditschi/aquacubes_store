import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYou from "@/components/leasing/ThankYou";

export const metadata: Metadata = { title: "Vielen Dank · Aquacubes" };

export default function DankePage() {
  return (
    <Suspense fallback={null}>
      <ThankYou />
    </Suspense>
  );
}
