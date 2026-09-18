"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

function safeNext(next: FormDataEntryValue | null): string {
  const path = typeof next === "string" ? next : "";
  return path.startsWith("/") && !path.startsWith("//") ? path : "/";
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const next = safeNext(formData.get("next"));

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const next = safeNext(formData.get("next"));

  if (password !== confirmPassword) {
    redirect(
      `/login?mode=signup&next=${encodeURIComponent(next)}&error=${encodeURIComponent("Passwords do not match.")}`
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) {
    redirect(`/login?mode=signup&next=${encodeURIComponent(next)}&error=${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    const userEmail = data.user.email ?? email;
    await prisma.profile.upsert({
      where: { email: userEmail },
      update: { id: data.user.id, name },
      create: { id: data.user.id, email: userEmail, name, role: "customer" },
    });
  }

  revalidatePath("/", "layout");

  if (!data.session) {
    // Email confirmation is still required on the Supabase project.
    redirect("/login?message=Check your email to confirm your account");
  }

  redirect(next);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
