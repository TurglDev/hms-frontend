import { z } from "zod";

export const addressSchema = z
  .object({
    addressLine1: z.string().min(1, { message: "Address is required" }),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().min(1, { message: "State is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    postalCode: z.string().optional(),
    addressType: z.string().min(1, { message: "Address Type is required" }),
  });

export type AddressFormValues = z.infer<typeof addressSchema>;
