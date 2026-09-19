"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccountMenu({ variant = "light" }: { variant?: "light" | "dark" }) {
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
    if (variant === "dark") {
      return (
        <>
          <Link
            href={`/login?next=${encodeURIComponent(pathname)}`}
            className="font-tesla rounded-full border border-white/40 px-4 py-2 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white hover:text-navy sm:text-sm"
          >
            Sign In
          </Link>
          <Link
            href={`/login?mode=signup&next=${encodeURIComponent(pathname)}`}
            className="font-tesla rounded-full bg-white px-4 py-2 text-xs font-medium text-navy transition-colors hover:bg-white/90 sm:text-sm"
          >
            Sign Up
          </Link>
        </>
      );
    }
    return (
      <Link
        href={`/login?next=${encodeURIComponent(pathname)}`}
        aria-label="Sign in"
        title="Sign in"
        className="rounded-full border border-navy/20 px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-gray-50"
      >
        Sign In
      </Link>
    );
  }

  const initial = (name?.trim()?.[0] ?? email[0]).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Account menu"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          {initial}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate font-normal text-gray-500">{name || email}</DropdownMenuLabel>
        {name && <DropdownMenuLabel className="-mt-2 truncate text-xs font-normal text-gray-400">{email}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-error">
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
