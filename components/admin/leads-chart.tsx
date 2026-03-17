"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

export function LeadsChart({ data }: { data: { month: string; leads: number }[] }) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-primary">Monthly leads</h2>
        <p className="text-sm text-muted-foreground">Recent lead trends across the last 6 months.</p>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d7dde7" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="leads" fill="#163b73" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
