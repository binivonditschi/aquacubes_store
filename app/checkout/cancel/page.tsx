import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-off-white px-6 py-24">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-gray-50 p-4">
          <XCircle className="h-12 w-12 text-gray-300" strokeWidth={1.5} />
        </div>
        <h1 className="text-h2 font-heading text-navy">Payment cancelled</h1>
        <p className="max-w-md text-body leading-relaxed text-gray-500">
          Your payment was not completed. No charges have been made. You can return to your cart and try again whenever you&apos;re ready.
        </p>
        <div className="flex gap-3">
          <Link href="/checkout">
            <Button variant="outline" className="rounded-button border-navy text-navy hover:bg-navy hover:text-white">
              Try Again
            </Button>
          </Link>
          <Link href="/shop">
            <Button className="rounded-button bg-teal text-navy hover:bg-teal-dark">Back to Shop</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
