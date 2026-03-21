import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { isOtpValid } from "@/lib/crypto";
import { sendWelcomeEmail } from "@/lib/email";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    // Get user
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (fetchError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if OTP is correct and not expired
    if (user.otp_code !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    if (!isOtpValid(user.otp_expires_at)) {
      return NextResponse.json(
        { error: "OTP has expired" },
        { status: 400 }
      );
    }

    // Update user to verified
    const { error: updateError } = await supabase
      .from("users")
      .update({
        is_verified: true,
        otp_code: null,
        otp_expires_at: null
      })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to verify OTP" },
        { status: 500 }
      );
    }

    // Send welcome email
    await sendWelcomeEmail(email, user.email);

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully. You can now log in.",
      userId: user.id
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
