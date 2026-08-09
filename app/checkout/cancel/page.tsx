import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-muted p-4">
          <XCircle className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Payment cancelled
        </h1>
        <p className="max-w-md text-base text-muted-foreground leading-relaxed">
          Your payment was not completed. No charges have been made. 
          You can return to your cart and try again whenever you&apos;re ready.
        </p>
        <div className="flex gap-3">
          <Link href="/checkout">
            <Button variant="outline" className="rounded-md">
              Try Again
            </Button>
          </Link>
          <Link href="/">
            <Button className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
