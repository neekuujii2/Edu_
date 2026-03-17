import Link from "next/link";
import { Facebook, GraduationCap, Instagram } from "lucide-react";
import { navItems, socialLinks } from "@/lib/site";
import { getCurrentUser } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-background/90 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary p-2 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Aspire</p>
            <p className="text-lg font-semibold text-primary">Education Consultancy</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <Link href={socialLinks.instagram} target="_blank" aria-label="Instagram" className="rounded-full border border-border p-2 text-primary">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href={socialLinks.facebook} target="_blank" aria-label="Facebook" className="rounded-full border border-border p-2 text-primary">
              <Facebook className="h-4 w-4" />
            </Link>
          </div>
          {user ? (
            <form action={signOutAction}>
              <Button variant="secondary" size="sm" type="submit">Sign out</Button>
            </form>
          ) : (
            <Button asChild size="sm">
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
      <div className="border-t border-border/60 lg:hidden">
        <nav className="container flex gap-5 overflow-x-auto py-3 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
