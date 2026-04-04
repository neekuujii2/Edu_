"use client";

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
      className="w-full mt-6 h-14 rounded-2xl text-base font-bold shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {pending ? "Submitting..." : "Get Started Now"}
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

        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-4 text-primary">
            <Sparkles className="w-6 h-6 stroke-[2.5px]" />
          </div>
          <h2 className="text-2xl font-bold text-primary">Free Expert Guidance</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Trusted by 5000+ students for premium admission support.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="popup-name" className="text-sm font-semibold ml-1 text-primary/80">Full Name</Label>
            <Input id="popup-name" name="name" className="h-12 rounded-2xl border-border/50 focus:border-primary/30" placeholder="John Doe" required />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="popup-course" className="text-sm font-semibold ml-1 text-primary/80">Course</Label>
              <Input id="popup-course" name="course" className="h-12 rounded-2xl border-border/50 focus:border-primary/30" placeholder="MBA / NIOS" required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="popup-phone" className="text-sm font-semibold ml-1 text-primary/80">Phone</Label>
              <Input id="popup-phone" name="phone" type="tel" className="h-12 rounded-2xl border-border/50 focus:border-primary/30" placeholder="10-digit" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="popup-email" className="text-sm font-semibold ml-1 text-primary/80 text-foreground">Email (Optional)</Label>
            <Input id="popup-email" name="email" type="email" className="h-12 rounded-2xl border-border/50 focus:border-primary/30" placeholder="your@email.com" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="popup-location" className="text-sm font-semibold ml-1 text-primary/80 text-foreground">Location</Label>
            <Input id="popup-location" name="location" className="h-12 rounded-2xl border-border/50 focus:border-primary/30" placeholder="Specify your city" required />
          </div>

          <SubmitButton />
          
          <p className="text-[10px] text-center text-muted-foreground mt-4 leading-relaxed">
            Your data is 100% secure. By submitting, you agree to our Terms & Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}
