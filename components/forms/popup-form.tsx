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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto pt-10 pb-10">
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300 rounded-[2.5rem] bg-white p-6 md:p-10 shadow-2xl my-auto max-h-[90vh] overflow-y-auto custom-scrollbar">
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
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="rounded-2xl bg-primary/5 p-3 ring-1 ring-primary/10">
              <Image
                src="/logo.png"
                alt="Aspire Education Logo"
                width={60}
                height={60}
                className="rounded-lg object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Aspire Education
              </h3>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                Consultancy & Career Solution
              </p>
            </div>
          </div>

          {/* MAIN CALL TO ACTION */}
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
            Free Expert Guidance
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 max-w-[280px]">
            Trusted by <span className="font-bold text-blue-600">5000+ students</span> for premium admission support.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="popup-name" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</Label>
            <Input id="popup-name" name="name" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20" placeholder="e.g. Rahul Sharma" required />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="popup-course" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Course Policy</Label>
              <Input id="popup-course" name="course" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20" placeholder="MBA / NIOS / B.Ed" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-phone" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Phone Number</Label>
              <Input id="popup-phone" name="phone" type="tel" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20" placeholder="10-digit number" required />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="popup-email" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email</Label>
              <Input id="popup-email" name="email" type="email" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20" placeholder="name@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="popup-location" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Your City</Label>
              <Input id="popup-location" name="location" className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20" placeholder="e.g. New Delhi" required />
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton />
          </div>
          
          <div className="flex items-center justify-center gap-4 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Safe & Secure</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Expert Advisors</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
