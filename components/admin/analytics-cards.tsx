import { Card } from "@/components/ui/card";

export function AnalyticsCards({ dashboard }: { dashboard: any }) {
  const cards = [
    { label: "Total Leads", value: dashboard.totalLeads },
    { label: "Total Testimonials", value: dashboard.totalTestimonials },
    { label: "Approved Testimonials", value: dashboard.approvedTestimonials },
    { label: "Conversion Rate", value: `${dashboard.conversionRate}%` }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="p-6">
          <p className="text-sm text-muted-foreground">{card.label}</p>
          <p className="mt-3 text-3xl font-semibold text-primary">{card.value}</p>
        </Card>
      ))}
    </div>
  );
}
