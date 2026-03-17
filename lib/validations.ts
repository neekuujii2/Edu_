import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  course: z.string().min(2, "Course is required")
});

export const testimonialSchema = z.object({
  name: z.string().min(2, "Name is required"),
  message: z.string().min(20, "Please share a little more feedback")
});
