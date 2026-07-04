import { z } from "zod";

export const nextOfKinSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    relationship: z.string().min(1, { message: "Relationship is required" }),
    phoneNumber: z
      .string()
      .nonempty('Phone number is required')
      .transform((val) => val.trim())
      .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
        message: 'Invalid phone number format',
      }),
    address: z.object({
      addressLine1: z.string().min(1, { message: "Address Lin1 is required" }),
      addressLine2: z.string().optional(),
      city: z.string().optional(),
      state: z.string().min(1, { message: "State is required" }),
      country: z.string().min(1, { message: "Country is required" }),
      postalCode: z.string().optional()
    })
    .nullable()
    .optional(),
    nextOfKinType: z.string().min(1, { message: "NextOfKin Type is required" }),
  });

export type NextOfKinFormValues = z.infer<typeof nextOfKinSchema>;
