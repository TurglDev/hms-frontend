import { z } from "zod";

export const diagnosisSchema = z
  .object({
    diagnosis: z.array(z.string()),
    diagnosisNote: z.string().optional(),
    healthRecordId: z.uuid().optional(),
  })
  .refine(
    (data) => {
      const hasDiagnosis = data.diagnosis.length > 0;
      const hasNote = !!data.diagnosisNote?.trim();

      return hasDiagnosis || hasNote;
    },
    {
      message:
        "Either diagnosis or diagnosis note is required",
      path: ["diagnosisNote"],
    }
  );

export type DiagnosisFormValues = z.infer<typeof diagnosisSchema>;
