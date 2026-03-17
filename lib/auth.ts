import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  if (!adminEmail || user.email?.toLowerCase() !== adminEmail) {
    redirect("/access-denied");
  }

  return user;
}
