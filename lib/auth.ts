import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  if (!authToken) {
    redirect("/auth");
  }

  try {
    // Decode JWT token to get role
    const decoded = jwt.decode(authToken) as { role?: string } | null;
    
    if (!decoded || decoded.role !== "admin") {
      redirect("/access-denied");
    }

    return decoded;
  } catch (error) {
    redirect("/auth");
  }
}

export async function validateAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  return password === adminPassword;
}
