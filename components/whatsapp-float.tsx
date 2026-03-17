import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <Link
      href={buildWhatsAppUrl()}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircleMore className="h-6 w-6" />
    </Link>
  );
}
