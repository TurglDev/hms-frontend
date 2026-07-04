import { z } from "zod";

export const staffSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, { message: "Last name is required" }),
    middleName: z.string().optional(),
    gender: z.string().min(1, { message: "Gender is required" }),
    dateOfBirth: z
      .date({ message: "Date of birth is required" })
      .min(new Date(1900, 0, 1), { message: "Date of birth is invalid" }),
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
    photo: z
      .any()
      .optional(),
    departments: z.array(z.uuid()).optional(),
    user: z.object({
      systemUser: z.boolean(),
      roles: z.array(z.uuid()).optional(),
      permissions: z.array(z.uuid()).optional(),
    }),
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
      relationship: z.string().min(1, { message: "Relationship is required" }),
      phoneNumber: z
        .string()
        .nonempty('Phone number is required')
        .transform((val) => val.trim())
        .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
          message: 'Invalid phone number format',
        }),
      address: z.object({
        addressLine1: z.string().min(1, { message: "Address is required" }),
        addressLine2: z.string().optional(),
        city: z.string().optional(),
        state: z.string().min(1, { message: "State is required" }),
        country: z.string().min(1, { message: "Country is required" }),
        postalCode: z.string().optional()
      })
    })
  })
  .superRefine((data, ctx) => {
    if (data.user.systemUser && (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) {
      ctx.addIssue({
        path: ['email'],
        code: "custom",
        message: "A valid email is required when creating a system user",
      });
    }
  });

export type StaffFormValues = z.infer<typeof staffSchema>;

export const updateStaffSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, { message: "Last name is required" }).optional(),
    middleName: z.string().optional(),
    gender: z.string().min(1, { message: "Gender is required" }).optional(),
    dateOfBirth: z
      .date({ message: "Date of birth is required" })
      .min(new Date(1900, 0, 1), { message: "Date of birth is invalid" })
      .optional(),
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

export type UpdateStaffFormValues = z.infer<typeof updateStaffSchema>;

export const assignDepartmentsSchema = z
  .object({
    departments: z.array(z.uuid())
  });


export type AssignDepartmentsFormValues = z.infer<typeof assignDepartmentsSchema>;