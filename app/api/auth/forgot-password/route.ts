import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    // Check if user exists
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (fetchError || !user) {
      // Return success even if user doesn't exist (security best practice)
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, a password reset link has been sent."
      });
    }

    // Generate reset token (32 bytes = 64 chars hex)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    
    // Token expires in 1 hour
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Update user with reset token
    const { error: updateError } = await supabase
      .from("users")
      .update({
        password_reset_token: resetTokenHash,
        password_reset_expires_at: expiresAt.toISOString()
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating reset token:", updateError);
      return NextResponse.json(
        { error: "Failed to generate reset link" },
        { status: 500 }
      );
    }

    // Send email with reset link
    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`;
    
    try {
      await sendPasswordResetEmail(email, resetLink);
    } catch (emailError) {
      console.error("Error sending reset email:", emailError);
      // Even if email fails, we've stored the token, inform user
      return NextResponse.json({
        success: true,
        message: "Password reset link generated. Please check your email (or contact support if you don't receive it)."
      });
    }

    return NextResponse.json({
      success: true,
      message: "Password reset link has been sent to your email. Please check your inbox."
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
