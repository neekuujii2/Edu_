import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/site";
import { getCurrentUser } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-background/90 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Aspire Education Consultancy"
            width={45}
            height={45}
            className="rounded-md"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Aspire
            </p>
            <p className="text-lg font-semibold text-primary">
              Education Consultancy
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Apply Now Button */}
          <Button asChild size="sm" className="bg-primary text-white hover:opacity-90">
            <Link href="/contact">Apply Now</Link>
          </Button>

          {/* Auth */}
          {user ? (
            <form action={signOutAction}>
              <Button variant="secondary" size="sm" type="submit">
                Sign out
              </Button>
            </form>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
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