import { z } from "zod";

const vitalSignSchema = z.object({
  temperature: z.number().optional(),
  bloodPressure: z.string().optional(),
  heartRate: z.number().optional(),
  respiratoryRate: z.number().optional(),
  oxygenSaturation: z.number().optional(),
  weight: z.number().optional(),
  vitalSignNote: z.string().optional(),
});

export const healthRecordSchema = z.object({
  vitalSign: vitalSignSchema,
  diagnosis: z
    .object({
      diagnosis: z.array(z.string()),
      diagnosisNote: z.string().optional(),
    })
    .optional(),

  symptoms: z
    .object({
      symptoms: z.array(z.string()),
      symptomNote: z.string().optional(),
    })
    .optional(),

  treatmentPlan: z.string().optional(),

  medications: z
    .object({
      medications: z.array(z.string()),
      medicationNote: z.string().optional(),
    })
    .optional(),

  labTests: z
    .object({
      labTests: z.array(z.string()),
      labTestNote: z.string().optional(),
    })
    .optional(),

  document: z
    .object({
      documents: z
        .array(
          z.object({
            title: z.string().min(1, { message: "Title is required" }),
            documentDate: z
              .date({ message: "Document date is required" }),
            file: z.instanceof(File, { message: "File is required" }),
            category: z.string().optional(),
          }),
        )
        .min(1, { message: "At least one document is required" }),
      note: z.string().optional(),
    })
    .optional(),

  followUp: z
    .object({
      followUpDate: z.date().optional(),
      followUpNote: z.string().optional(),
    })
    .optional(),
  patientCardId: z.uuid().optional(),
  patientId: z.uuid().optional(),
});

// export const patientCardSchema = z
//   .object({
//     cardType: z.string().min(1, "Card is required"),
//     fullName: z.string().min(1, {message: "Family Name is required"}),
//     phoneNumber: z
//       .string()
//       .nonempty('Phone number is required')
//       .transform((val) => val.trim())
//       .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
//         message: 'Invalid phone number format',
//       }),
//     email: z
//       .email({ message: 'Invalid email address' })
//       .optional()
//       .or(z.literal('')),
//     patients: z.array(
//       z.object({
//         firstName: z.string().min(1, { message: "First name is required" }),
//         lastName: z.string().min(1, { message: "Last name is required" }),
//         middleName: z.string().optional(),
//         gender: z.string().min(1, { message: "Gender is required" }),
//         dateOfBirth: z
//           .date({ message: "Date of birth is required" })
//           .min(new Date(1900, 0, 1), { message: "Date of birth is invalid" }),
//         phoneNumber: z
//           .string()
//           .optional(),
//       }),
//     ).optional(),
//     address: z.object({
//       addressLine1: z.string().min(1, { message: "Address is required" }),
//       addressLine2: z.string().optional(),
//       city: z.string().optional(),
//       state: z.string().min(1, { message: "State is required" }),
//       country: z.string().min(1, { message: "Country is required" }),
//       postalCode: z.string().optional()
//     }),
//     nextOfKin: z.object({
//       fullName: z.string().min(1, { message: "Full name is required" }),
//       relationship: z.string().min(1, { message: "Full name is required" }),
//       phoneNumber: z
//         .string()
//         .nonempty('Phone number is required')
//         .transform((val) => val.trim())
//         .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
//           message: 'Invalid phone number format',
//         }),
//     }).optional()
//   });

export type HealthRecordFormValues = z.infer<typeof healthRecordSchema>;
