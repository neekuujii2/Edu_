import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { verifyPassword } from "@/lib/crypto";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

    // Check if login is for admin
    const isAdminAttempt = email.toLowerCase() === adminEmail;

    if (isAdminAttempt) {
      // Admin login - verify against password
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (password !== adminPassword) {
        return NextResponse.json(
          { error: "Invalid admin credentials" },
          { status: 401 }
        );
      }

      // Create a session token for admin
      const token = jwt.sign(
        {
          email: adminEmail,
          role: "admin"
        },
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "secret",
        { expiresIn: "7d" }
      );

      const response = NextResponse.json({
        success: true,
        message: "Admin login successful",
        user: {
          email: adminEmail,
          role: "admin"
        },
        token
      });

      // Set token in cookie for server-side access
      response.cookies.set("auth_token", token, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        httpOnly: true,
        sameSite: "lax"
      });

      return response;
    }

    // Regular user login - check database
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email.toLowerCase())
      .single();

    if (fetchError || !user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.is_verified) {
      return NextResponse.json(
        { error: "Please verify your email first" },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await verifyPassword(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create a session token
    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "secret",
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token
    });

    // Set token in cookie for server-side access
    response.cookies.set("auth_token", token, {
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      httpOnly: true,
      sameSite: "lax"
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
