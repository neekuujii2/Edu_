import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const supabaseAuth = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabaseAuth.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  // Also check auth_token cookie for custom admin session
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  let decodedToken = null;
  if (authToken) {
    try {
      decodedToken = jwt.verify(
        authToken,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "secret"
      ) as { email?: string; role?: string };
    } catch (e) {
      // invalid token
    }
  }

  const isSupabaseAdmin = user && adminEmail && user.email?.toLowerCase() === adminEmail;
  const isTokenAdmin = decodedToken && decodedToken.role === "admin";

  if (!isSupabaseAdmin && !isTokenAdmin) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = ["Name,Phone,Course,Date"];
  for (const lead of data ?? []) {
    rows.push(
      [lead.name, lead.phone, lead.course, new Date(lead.created_at).toISOString()]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );
  }

  return new NextResponse(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="aspire-leads.csv"'
    }
  });
}
