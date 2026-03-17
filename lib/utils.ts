import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMonthKey(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric"
  }).format(date);
}

export function buildWhatsAppUrl(message = "Hello I want admission guidance.") {
  const number = process.env.WHATSAPP_NUMBER ?? "9711104179";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
