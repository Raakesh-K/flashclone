import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must contain at least 2 characters"),

  lastName: z
    .string()
    .min(2, "Last name must contain at least 2 characters"),

  companyName: z
    .string()
    .optional(),

  designation: z
    .string()
    .min(2, "Designation is required"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must contain at least 10 digits"),

  address1: z
    .string()
    .min(5, "Address is required"),

  address2: z
    .string()
    .optional(),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  country: z
    .string()
    .min(2, "Country is required"),

  postalCode: z
    .string()
    .min(4, "Postal code is required"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain at least one number"
    ),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);