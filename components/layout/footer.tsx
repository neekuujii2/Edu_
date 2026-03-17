import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { navItems, socialLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold text-primary">Aspire Education Consultancy</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Trusted admission support for UG, PG, distance learning, and open schooling programs.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-primary">Quick Links</h4>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-primary">Contact</h4>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> 9711104179</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> consultancyaspireeducation@gmail.com</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Mohan Garden, Uttam Nagar</p>
            <div className="flex items-center gap-3 pt-2">
              <Link href={socialLinks.instagram} target="_blank" aria-label="Instagram" className="rounded-full border border-border p-2 text-primary">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href={socialLinks.facebook} target="_blank" aria-label="Facebook" className="rounded-full border border-border p-2 text-primary">
                <Facebook className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
