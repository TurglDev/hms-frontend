import { z } from "zod";

export const patientCardSchema = z
  .object({
    cardType: z.string().min(1, "Card is required"),
    fullName: z.string().min(1, {message: "Family Name is required"}),
    phoneNumber: z
      .string()
      .nonempty('Phone number is required')
      .transform((val) => val.trim())
      .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
        message: 'Invalid phone number format',
      }),
    email: z
      .email({ message: 'Invalid email address' })
      .optional()
      .or(z.literal('')),
    patients: z.array(
      z.object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        middleName: z.string().optional(),
        gender: z.string().min(1, { message: "Gender is required" }),
        dateOfBirth: z
          .date({ message: "Date of birth is required" })
          .min(new Date(1900, 0, 1), { message: "Date of birth is invalid" }),
        phoneNumber: z
          .string()
          .optional(),
      }),
    ).optional(),
    address: z.object({
      addressLine1: z.string().min(1, { message: "Address is required" }),
      addressLine2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().min(1, { message: "State is required" }),
      country: z.string().min(1, { message: "Country is required" }),
      postalCode: z.string().optional()
    }),
    nextOfKin: z.object({
      fullName: z.string().min(1, { message: "Full name is required" }),
      relationship: z.string().min(1, { message: "Full name is required" }),
      phoneNumber: z
        .string()
        .nonempty('Phone number is required')
        .transform((val) => val.trim())
        .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
          message: 'Invalid phone number format',
        }),
    }).optional()
  });

export type PatientCardFormValues = z.infer<typeof patientCardSchema>;

export const updatePatientCardSchema = z
  .object({
    fullName: z.string().min(1, "First name is required").optional(),
    phoneNumber: z
      .string()
      .nonempty("Phone number is required")
      .transform((val) => val.trim())
      .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
        message: "Invalid phone number format",
      })
      .optional(),
    email: z
      .email({ message: 'Invalid email address' })
      .optional()
      .or(z.literal('')),
  });

export type UpdatePatientCardFormValues = z.infer<typeof updatePatientCardSchema>;
