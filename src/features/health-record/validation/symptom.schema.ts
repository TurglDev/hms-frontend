import { z } from "zod";

export const symptomSchema = z
  .object({
    symptoms: z.array(z.string()),
    symptomNote: z.string().optional(),
    healthRecordId: z.uuid().optional(),
  })
  .refine(
    (data) => {
      const hasSymptoms = data.symptoms.length > 0;
      const hasNote = !!data.symptomNote?.trim();

      return hasSymptoms || hasNote;
    },
    {
      message:
        "Either symptoms or symptom note is required",
      path: ["symptomNote"],
    }
  );

export type SymptomFormValues = z.infer<typeof symptomSchema>;
