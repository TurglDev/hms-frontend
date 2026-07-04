import { z } from "zod";
import { HospitalOwnership, HospitalType } from "../constants";

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Hospital name is required' }),
    phone: z
      .string()
      .nonempty('Phone number is required')
      .transform((val) => val.trim())
      .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
        message: 'Invalid phone number format',
      }),
    email: z.email({ message: "Invalid email address" }),
    ownership: z.enum(Object.values(HospitalOwnership) as [string, ...string[]]),
    hospitalType: z.enum(Object.values(HospitalType) as [string, ...string[]]),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
      .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Must contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Must contain at least one special character' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
    addressLine1: z.string().min(1, { message: 'Address line1 is required' }),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().min(1, { message: 'State is required' }),
    postalCode: z.string().optional(),
    country: z.string().min(1, { message: 'Country is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password must be at least 6 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const setPasswordSchema = z.object({
  token: z.string().optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
});

export type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;