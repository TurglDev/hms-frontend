import { z } from "zod";

export const vitalSignSchema = z
  .object({
    temperature: z.number().optional(),
    bloodPressure: z.string().optional(),
    heartRate: z.number().optional(),
    respiratoryRate: z.number().optional(),
    oxygenSaturation: z.number().optional(),
    weight: z.number().optional(),

    vitalSignNote: z.string().optional(),
    healthRecordId: z.uuid().optional(),
  })
  .refine(
    (data) => {
      const hasVitalSigns = [
        data.temperature,
        data.bloodPressure,
        data.heartRate,
        data.respiratoryRate,
        data.oxygenSaturation,
        data.weight
      ].some(
        (value) =>
          value !== undefined &&
          value !== null &&
          value !== ""
      );

      const hasNote = !!data.vitalSignNote?.trim();

      return hasVitalSigns || hasNote;
    },
    {
      message: "Either at least one vital sign or a note is required",
      path: ["vitalSignNote"],
    }
  );
export type VitalSignFormValues = z.infer<typeof vitalSignSchema>;
