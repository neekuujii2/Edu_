import Image from "next/image";
import { Card } from "@/components/ui/card";
import { trustMetrics } from "@/lib/site";

export function TrustSection() {
  return (
    <section className="section-padding">
      <div className="container">
        
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
          Recognized & Approved By
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustMetrics.map((item) => (
            <Card
              key={item.label}
              className="p-6 text-center hover:shadow-xl transition"
            >
              {item.icon && (
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={40}
                  height={40}
                  className="mx-auto mb-4 object-contain"
                />
              )}

              <p className="text-2xl font-semibold text-primary">
                {item.value}
              </p>

              <h3 className="mt-1 text-lg font-semibold text-primary">
                {item.label}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}