import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">Aquacubes</h4>
            <p className="text-sm text-muted-foreground max-w-xs">
              A quiet approach to everyday objects. Designed for clarity, built to last.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-medium text-foreground uppercase tracking-wide mb-3">Shop</h5>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-medium text-foreground uppercase tracking-wide mb-3">Support</h5>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2025 Aquacubes. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
