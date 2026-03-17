"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { appendToSheet } from "@/lib/google-sheets";
import { requireAdmin, requireUser } from "@/lib/auth";
import { inquirySchema, testimonialSchema } from "@/lib/validations";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

export async function signInWithOtpAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
) {
  const email = String(formData.get("email") ?? "").trim();
  const redirectTo = String(formData.get("redirectTo") ?? "/");
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback?next=${encodeURIComponent(redirectTo)}`
    }
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Check your email for the secure sign-in link." };
}

export async function submitInquiryAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
) {
  const user = await requireUser();
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    course: formData.get("course")
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid inquiry." };
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("leads").insert([
    {
      ...parsed.data,
      user_id: user.id
    }
  ]);

  if (error) {
    return { success: false, message: error.message };
  }

  await appendToSheet("Leads!A:E", [
    parsed.data.name,
    parsed.data.phone,
    parsed.data.course,
    user.email ?? "",
    new Date().toISOString()
  ]);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/contact");

  return { success: true, message: "Inquiry submitted successfully." };
}

export async function submitTestimonialAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
) {
  const user = await requireUser();
  const parsed = testimonialSchema.safeParse({
    name: formData.get("name"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid testimonial." };
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("testimonials").insert([
    {
      ...parsed.data,
      approved: false,
      user_id: user.id
    }
  ]);

  if (error) {
    return { success: false, message: error.message };
  }

  await appendToSheet("Testimonials!A:E", [
    parsed.data.name,
    parsed.data.message,
    "pending",
    user.email ?? "",
    new Date().toISOString()
  ]);

  revalidatePath("/admin");

  return { success: true, message: "Testimonial received and pending approval." };
}

export async function approveTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = createServiceRoleClient();

  const { error, data } = await supabase
    .from("testimonials")
    .update({ approved: true })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  await appendToSheet("Testimonials!A:E", [
    data.name,
    data.message,
    "approved",
    data.user_id ?? "",
    new Date().toISOString()
  ]);

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true, message: "Testimonial approved." };
}

export async function signOutAction() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}
