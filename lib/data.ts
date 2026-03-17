import { formatMonthKey } from "@/lib/utils";
import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";

export async function getApprovedTestimonials() {
  const supabase = createServiceRoleClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(6);

  return data ?? [];
}

export async function getCurrentUser() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function getAdminDashboardData() {
  const supabase = createServiceRoleClient();
  const [leadsResult, testimonialsResult] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: false }),
    supabase.from("testimonials").select("*").order("created_at", { ascending: false })
  ]);

  const leads = leadsResult.data ?? [];
  const testimonials = testimonialsResult.data ?? [];
  const approvedTestimonials = testimonials.filter((item) => item.approved).length;
  const monthMap = new Map<string, number>();

  for (let index = 5; index >= 0; index -= 1) {
    const date = new Date();
    date.setMonth(date.getMonth() - index);
    monthMap.set(formatMonthKey(date), 0);
  }

  for (const lead of leads) {
    const key = formatMonthKey(new Date(lead.created_at));
    if (monthMap.has(key)) {
      monthMap.set(key, (monthMap.get(key) ?? 0) + 1);
    }
  }

  return {
    totalLeads: leads.length,
    totalTestimonials: testimonials.length,
    approvedTestimonials,
    conversionRate: leads.length ? Math.round((approvedTestimonials / leads.length) * 100) : 0,
    monthlyLeads: Array.from(monthMap.entries()).map(([month, count]) => ({
      month,
      leads: count
    })),
    leads,
    testimonials
  };
}
