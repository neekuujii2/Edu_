import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  course: z.string().min(2, "Course is required"),
  email: z.string().email("Invalid email"),
  location: z.string().min(2, "Location is required"),
  date_time: z.string().optional()
});

export const testimonialSchema = z.object({
  name: z.string().min(2, "Name is required"),
  course: z.string().min(2, "Course is required"),
  rating: z.coerce.number().int().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
  message: z.string().min(20, "Please share a little more feedback")
});
