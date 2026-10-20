import type { Metadata } from "next";
import LeasingConfigurator from "@/components/leasing/LeasingConfigurator";

export const metadata: Metadata = { title: "Leasing bestellen · Aquacubes" };

export default function LeasingPage() {
  return <LeasingConfigurator />;
}
