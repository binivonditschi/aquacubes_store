import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r border-border bg-card flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/" className="text-heading-3 font-medium text-foreground">
            Aquacubes
          </Link>
          <p className="text-caption text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-body-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-body-sm font-medium text-foreground bg-muted"
              >
                <Package className="h-4 w-4" strokeWidth={1.5} />
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-body-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-body-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Settings className="h-4 w-4" strokeWidth={1.5} />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-border bg-card px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-heading-3 font-medium text-foreground">Aquacubes</Link>
        <span className="text-caption text-muted-foreground">Admin</span>
      </div>

      <main className="flex-1 overflow-auto md:pt-0 pt-14">
        {children}
      </main>
    </div>
  );
}
