import { z } from "zod";

export const treatmentPlanSchema = z
  .object({
    treatmentPlan: z.string().min(1, {message: "Treatment plan note is required"}),
    healthRecordId: z.uuid().optional(),
  });

export type TreatmentPlanFormValues = z.infer<typeof treatmentPlanSchema>;
