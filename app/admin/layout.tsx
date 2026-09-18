import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { signOut } from "@/app/login/actions";
import content from "@/content/admin.json";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-off-white">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-gray-100 bg-white md:flex">
        <div className="border-b border-gray-100 p-6">
          <Link href="/" className="font-heading text-lg font-semibold text-navy">
            {content.layout.brandName}
          </Link>
          <p className="mt-1 text-xs text-gray-300">{content.layout.panelLabel}</p>
        </div>
        <nav className="flex-1 p-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2.5 text-sm font-medium text-navy"
          >
            <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} />
            {content.layout.dashboardLinkText}
          </Link>
        </nav>
        <div className="space-y-3 border-t border-gray-100 p-4">
          <Link href="/" className="block text-sm text-gray-500 transition-colors hover:text-navy">
            {content.layout.backToStoreText}
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-sm text-gray-500 transition-colors hover:text-navy">
              {content.layout.signOutText}
            </button>
          </form>
        </div>
      </aside>

      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3 md:hidden">
        <Link href="/" className="font-heading text-lg font-semibold text-navy">{content.layout.brandName}</Link>
        <span className="text-xs text-gray-300">{content.layout.mobileBadge}</span>
      </div>

      <main className="flex-1 overflow-auto pt-14 md:pt-0">{children}</main>
    </div>
  );
}
