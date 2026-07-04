import { z } from "zod";

export const patientSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required"}),
  middleName: z.string().optional(),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.date({ message: "Date of birth is required" })
    .min(new Date(1900, 0, 1), { message: "Date of birth is invalid" }),
  phoneNumber: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
