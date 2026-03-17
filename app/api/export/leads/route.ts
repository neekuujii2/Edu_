import { NextResponse } from "next/server";
import { createServiceRoleClient, createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const supabaseAuth = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabaseAuth.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) {
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
