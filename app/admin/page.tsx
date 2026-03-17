import { requireAdmin } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/data";
import { AnalyticsCards } from "@/components/admin/analytics-cards";
import { LeadsChart } from "@/components/admin/leads-chart";
import { LeadsTable } from "@/components/admin/leads-table";
import { TestimonialsManager } from "@/components/admin/testimonials-manager";

export default async function AdminPage() {
  await requireAdmin();
  const dashboard = await getAdminDashboardData();

  return (
    <div className="section-padding">
      <div className="container space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Admin Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">Lead analytics and approvals</h1>
        </div>
        <AnalyticsCards dashboard={dashboard} />
        <LeadsChart data={dashboard.monthlyLeads} />
        <LeadsTable leads={dashboard.leads} />
        <TestimonialsManager testimonials={dashboard.testimonials} />
      </div>
    </div>
  );
}
