import { z } from "zod";

export const medicationSchema = z
  .object({
    medications: z.array(z.string()),
    medicationNote: z.string().optional(),
    healthRecordId: z.uuid().optional(),
  })
  .refine(
    (data) => {
      const hasMedications = data.medications.length > 0;
      const hasNote = !!data.medicationNote?.trim();

      return hasMedications || hasNote;
    },
    {
      message:
        "Either medications or medication note is required",
      path: ["medicationNote"],
    }
  );

export type MedicationFormValues = z.infer<typeof medicationSchema>;
