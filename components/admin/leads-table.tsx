import Link from "next/link";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LeadsTable({ leads }: { leads: any[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-primary">Leads Manager</h2>
          <p className="text-sm text-muted-foreground">Every inquiry is stored in Supabase and synced to Google Sheets.</p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/api/export/leads">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-background text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Phone</th>
              <th className="px-6 py-4 font-medium">Course</th>
              <th className="px-6 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-border">
                <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{lead.phone}</td>
                <td className="px-6 py-4 text-muted-foreground">{lead.course}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {format(new Date(lead.created_at), "dd MMM yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
