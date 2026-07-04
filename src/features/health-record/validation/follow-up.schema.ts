import { z } from "zod";

export const followUpSchema = z
  .object({
    followUpDate: z.date().optional(),
    followUpNote: z.string().optional(),
    healthRecordId: z.uuid().optional(),
  })
  .refine(
    (data) => {
      const hasFollowUpDate = !!data.followUpDate;
      const hasNote = !!data.followUpNote?.trim();

      return hasFollowUpDate || hasNote;
    },
    {
      message:
        "Either follow-up date or follow-up note is required",
      path: ["followUpNote"],
    }
  );

export type FollowUpFormValues = z.infer<typeof followUpSchema>;
