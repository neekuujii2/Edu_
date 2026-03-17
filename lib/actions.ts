"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { appendToSheet, updateTestimonialSheetStatus } from "@/lib/google-sheets";
import { requireAdmin, requireUser } from "@/lib/auth";
import { inquirySchema, testimonialSchema } from "@/lib/validations";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

function isMissingColumnError(message: string, column: string, table: string) {
  return message.includes(`Could not find the '${column}' column of '${table}'`);
}

export async function signInWithOtpAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
) {
  const email = String(formData.get("email") ?? "").trim();
  const requestedRedirectTo = String(formData.get("redirectTo") ?? "/");
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const redirectTo =
    adminEmail && email.toLowerCase() === adminEmail ? "/admin" : requestedRedirectTo;
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
  let { error } = await supabase.from("leads").insert([
    {
      name: parsed.data.name,
      email: user.email ?? "",
      phone: parsed.data.phone,
      course: parsed.data.course,
      course_interest: parsed.data.course,
      message: null
    }
  ]);

  if (
    error &&
    (isMissingColumnError(error.message, "email", "leads") ||
      isMissingColumnError(error.message, "course_interest", "leads") ||
      isMissingColumnError(error.message, "message", "leads"))
  ) {
    const fallbackResult = await supabase.from("leads").insert([
      {
        ...parsed.data,
        user_id: user.id
      }
    ]);

    error = fallbackResult.error;
  }

  if (error) {
    if (isMissingColumnError(error.message, "course", "leads")) {
      return {
        success: false,
        message: "Your Supabase leads table is missing the course column. Run the latest SQL from supabase/schema.sql, then try again."
      };
    }

    if (isMissingColumnError(error.message, "user_id", "leads")) {
      return {
        success: false,
        message: "Your Supabase leads table does not support the old user_id field anymore. Restart the server and try again."
      };
    }

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
    course: formData.get("course"),
    rating: formData.get("rating"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid testimonial." };
  }

  const supabase = createServiceRoleClient();
  let { error } = await supabase.from("testimonials").insert([
    {
      ...parsed.data,
      status: "pending"
    }
  ]);

  if (
    error &&
    (isMissingColumnError(error.message, "course", "testimonials") ||
      isMissingColumnError(error.message, "rating", "testimonials") ||
      isMissingColumnError(error.message, "status", "testimonials"))
  ) {
    const fallbackResult = await supabase.from("testimonials").insert([
      {
        name: parsed.data.name,
        message: parsed.data.message,
        approved: false,
        user_id: user.id
      }
    ]);

    error = fallbackResult.error;
  }

  if (error) {
    return { success: false, message: error.message };
  }

  await appendToSheet("Testimonials!A:F", [
    parsed.data.name,
    parsed.data.course,
    String(parsed.data.rating),
    parsed.data.message,
    "pending",
    new Date().toISOString()
  ]);

  revalidatePath("/admin");

  return { success: true, message: "Testimonial received and pending approval." };
}

export async function approveTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = createServiceRoleClient();

  let { error, data } = await supabase
    .from("testimonials")
    .update({ status: "approved" })
    .eq("id", id)
    .select("*")
    .single();

  if (error && isMissingColumnError(error.message, "status", "testimonials")) {
    const fallbackResult = await supabase
      .from("testimonials")
      .update({ approved: true })
      .eq("id", id)
      .select("*")
      .single();

    error = fallbackResult.error;
    data = fallbackResult.data;
  }

  if (error) {
    console.error(error.message);
    return;
  }

  const approvedState = data.status ?? (data.approved ? "approved" : "pending");

  await updateTestimonialSheetStatus({
    name: data.name,
    course: data.course ?? "",
    rating: data.rating ?? 5,
    review: data.message,
    status: approvedState,
    date: new Date().toISOString()
  });

  revalidatePath("/");
  revalidatePath("/admin");

  
}

export async function signOutAction() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}
