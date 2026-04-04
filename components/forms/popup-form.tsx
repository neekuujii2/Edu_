"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitInquiryAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Sparkles } from "lucide-react";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-14 rounded-xl text-base font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
    >
      {pending ? (
        "Submitting..."
      ) : (
        <>
          Get Free Guidance <Sparkles className="h-5 w-5 animate-pulse" />
        </>
      )}
    </Button>
  );
}

export function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useFormState(submitInquiryAction, { success: false, message: "" });

  useEffect(() => {
    // Show popup after 3 seconds if not already closed/submitted in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
    const isSubmitted = sessionStorage.getItem("inquirySubmitted");
    
    if (!hasSeenPopup && !isSubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Thank you! We will contact you soon.");
      setIsOpen(false);
      sessionStorage.setItem("hasSeenPopup", "true");
      sessionStorage.setItem("inquirySubmitted", "true");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenPopup", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300 rounded-[2rem] bg-white p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] my-auto max-h-[95vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={closePopup}
          type="button"
          className="absolute right-6 top-6 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-all z-10"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* LOGO & BRAND */}
          <div className="mb-4 flex flex-col items-center gap-1">
            <div className="rounded-xl bg-primary/5 p-2 ring-1 ring-primary/10">
              <Image
                src="/logo.png"
                alt="Aspire Education Logo"
                width={40}
                height={40}
                className="rounded-lg object-contain"
              />
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Aspire Education
              </h3>
            </div>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
            Quick Inquiry
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 max-w-[280px]">
            Fill your details below for <span className="font-bold text-blue-600">Free guidance</span>.
          </p>
        </div>

        <form action={formAction} className="mt-6 space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="popup-name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</Label>
              <Input id="popup-name" name="name" className="h-10 rounded-lg border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="Rahul Sharma" required />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="popup-phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Phone Number</Label>
              <Input id="popup-phone" name="phone" type="tel" className="h-10 rounded-lg border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="10-digit mobile" required />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Course Interest */}
            <div className="space-y-1.5">
              <Label htmlFor="popup-course" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Course Interest</Label>
              <Input id="popup-course" name="course" className="h-10 rounded-lg border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="MBA / NIOS" required />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="popup-email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Email</Label>
              <Input id="popup-email" name="email" type="email" className="h-10 rounded-lg border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="name@email.com" required />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <Label htmlFor="popup-location" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Your Location</Label>
            <Input id="popup-location" name="location" className="h-10 rounded-lg border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 text-sm" placeholder="New Delhi, India" required />
          </div>

          {/* Date & Time (Hidden) */}
          <input type="hidden" name="date_time" value={new Date().toLocaleString()} />

          <div className="pt-2">
            <SubmitButton />
          </div>
          
          <div className="flex items-center justify-center gap-4 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Safe & Secure</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Expert Guidance</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
