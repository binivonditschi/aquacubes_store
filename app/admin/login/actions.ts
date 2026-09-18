"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function adminSignIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    redirect(`/admin/login?error=${encodeURIComponent(error?.message ?? "Invalid credentials")}`);
  }

  const profile = await prisma.profile.findUnique({ where: { id: data.user.id } });
  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    redirect(`/admin/login?error=${encodeURIComponent("This account does not have admin access.")}`);
  }

  redirect("/admin/dashboard");
}
