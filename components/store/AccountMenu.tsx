"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Icon from "@/components/b2b/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccountMenu() {
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
      setName((session?.user?.user_metadata?.full_name as string) ?? null);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const supabase = createClient();
    // Re-read on every navigation: sign-in/out via server actions (e.g. the
    // login form) sets cookies server-side, which this browser client's
    // onAuthStateChange never sees since it wasn't the one that changed them.
    // getSession() reads the cached session from storage instantly, avoiding a
    // network round-trip that would otherwise flash "Sign In" on every page load.
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email ?? null);
      setName((data.session?.user?.user_metadata?.full_name as string) ?? null);
    });
  }, [pathname]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (!email) {
    return (
      <Link
        href={`/login?next=${encodeURIComponent(pathname)}`}
        aria-label="Anmelden"
        title="Anmelden"
        className="inline-flex items-center gap-1 rounded px-1 py-2 text-body-md font-semibold text-surface-navy transition-colors hover:text-primary sm:px-2"
      >
        <Icon name="account_circle" size={22} />
        <span className="hidden md:inline">Anmelden</span>
      </Link>
    );
  }

  const initial = (name?.trim()?.[0] ?? email[0]).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Kontomenü"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-navy text-body-md font-semibold text-on-primary transition-transform hover:scale-105"
        >
          {initial}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate font-normal text-steel">{name || email}</DropdownMenuLabel>
        {name && <DropdownMenuLabel className="-mt-2 truncate text-xs font-normal text-steel/70">{email}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-error">
          <LogOut className="h-4 w-4" />
          Abmelden
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
