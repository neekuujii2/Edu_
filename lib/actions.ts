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
  try {
    const supabaseAuth = createServerSupabaseClient();
    const { data: { user } } = await supabaseAuth.auth.getUser();

    const parsed = inquirySchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      course: formData.get("course"),
      email: formData.get("email"),
      location: formData.get("location")
    });

    if (!parsed.success) {
      return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid inquiry." };
    }

    const supabase = createServiceRoleClient();
    const email = parsed.data.email || user?.email || "";
    
    // Attempt 1: Full data
    const fullLead: any = {
      name: parsed.data.name,
      phone: parsed.data.phone,
      course: parsed.data.course,
      email: email,
      location: parsed.data.location || "",
      course_interest: parsed.data.course,
      message: null
    };
    if (user?.id) fullLead.user_id = user.id;

    let { error } = await supabase.from("leads").insert([fullLead]);

    // Attempt 2: Strip new/extra columns if Attempt 1 fails
    if (error) {
      console.error("DEBUG: Inquiry Attempt 1 failed:", error.message);
      const basicLead: any = {
        name: parsed.data.name,
        phone: parsed.data.phone,
        course: parsed.data.course
      };
      
      // Try adding user_id separately if possible
      if (user?.id) basicLead.user_id = user.id;

      let retry = await supabase.from("leads").insert([basicLead]);
      
      // Attempt 3: absolute minimal
      if (retry.error) {
        console.error("DEBUG: Inquiry Attempt 2 failed:", retry.error.message);
        const minimalLead = {
          name: parsed.data.name,
          phone: parsed.data.phone
        };
        retry = await supabase.from("leads").insert([minimalLead]);
      }
      
      error = retry.error;
    }

    if (error) {
      return { success: false, message: `Database error: ${error.message}` };
    }

    // Still append to sheet even if some DB columns were missing
    try {
      await appendToSheet("Leads!A:G", [
        parsed.data.name,
        parsed.data.phone,
        parsed.data.course,
        email,
        parsed.data.location || "",
        new Date().toISOString()
      ]);
    } catch (sheetError: any) {
      console.error("Google Sheets Error (Leads):", sheetError.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/contact");

    return { success: true, message: `Thank you, ${parsed.data.name}! Your inquiry has been submitted. Our team will contact you soon.` };
  } catch (err: any) {
    return { success: false, message: err.message || "An unexpected error occurred." };
  }
}

export async function submitTestimonialAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
) {
  try {
    const supabaseAuth = createServerSupabaseClient();
    const { data: { user } } = await supabaseAuth.auth.getUser();

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
    
    // Attempt 1: Full data
    const fullTestimonial: any = {
      ...parsed.data,
      status: "pending"
    };
    if (user?.id) fullTestimonial.user_id = user.id;

    let { error } = await supabase.from("testimonials").insert([fullTestimonial]);

    // Attempt 2: Fallback for missing status/rating/course/user_id
    if (error) {
      console.error("DEBUG: Testimonial Attempt 1 failed:", error.message);
      const basicTestimonial: any = {
        name: parsed.data.name,
        message: parsed.data.message,
        approved: false
      };
      
      let retry = await supabase.from("testimonials").insert([basicTestimonial]);
      
      // Attempt 3: Minimal
      if (retry.error) {
        console.error("DEBUG: Testimonial Attempt 2 failed:", retry.error.message);
        retry = await supabase.from("testimonials").insert([{
          name: parsed.data.name,
          message: parsed.data.message
        }]);
      }
      
      error = retry.error;
    }

    if (error) {
      return { success: false, message: `Database error: ${error.message}` };
    }

    try {
      await appendToSheet("Testimonials!A:F", [
        parsed.data.name,
        parsed.data.course,
        String(parsed.data.rating),
        parsed.data.message,
        "pending",
        new Date().toISOString()
      ]);
    } catch (sheetError: any) {
      console.error("Google Sheets Error (Testimonials):", sheetError.message);
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: `Thank you, ${parsed.data.name}! Your testimonial has been submitted and is waiting for approval.` };
  } catch (err: any) {
    return { success: false, message: err.message || "An unexpected error occurred." };
  }
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

  try {
    await updateTestimonialSheetStatus({
      name: data.name,
      course: data.course ?? "",
      rating: data.rating ?? 5,
      review: data.message,
      status: approvedState,
      date: new Date().toISOString()
    });
  } catch (sheetError) {
    console.error("Google Sheets Error (Approve):", (sheetError as Error).message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function unapproveTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = createServiceRoleClient();

  let { error, data } = await supabase
    .from("testimonials")
    .update({ status: "pending" })
    .eq("id", id)
    .select("*")
    .single();

  if (error && isMissingColumnError(error.message, "status", "testimonials")) {
    const fallbackResult = await supabase
      .from("testimonials")
      .update({ approved: false })
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

  // Also update Google Sheet status
  try {
    await updateTestimonialSheetStatus({
      name: data.name,
      course: data.course ?? "",
      rating: data.rating ?? 5,
      review: data.message,
      status: "pending",
      date: new Date().toISOString()
    });
  } catch (sheetError) {
    console.error("Google Sheets Error (Unapprove):", (sheetError as Error).message);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function signOutAction() {
  const supabase = createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}
