import { z } from "zod";

export const patientDocumentSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    documentDate: z.date({ message: "Document date is required" })
      .min(new Date(1900, 0, 1), { message: "Document date is required" }),
    file: z.instanceof(File, { message: 'File is required' }),
    note: z.string().optional(),
    patientId: z.string(),
    patientCardId: z.string(),
  });

export type PatientDocumentFormValues = z.infer<typeof patientDocumentSchema>;
