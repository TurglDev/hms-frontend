import { z } from "zod";

export const labTestSchema = z
  .object({
    labTests: z.array(z.string()),
    labTestNote: z.string().optional(),
    healthRecordId: z.uuid().optional(),
  })
  .refine(
    (data) => {
      const hasLabTests = data.labTests.length > 0;
      const hasNote = !!data.labTestNote?.trim();

      return hasLabTests || hasNote;
    },
    {
      message:
        "Either lab tests or lab test note is required",
      path: ["labTestNote"],
    }
  );

export type LabTestFormValues = z.infer<typeof labTestSchema>;
