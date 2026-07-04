import { z } from "zod";

export const userSchema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    roles: z.array(z.uuid()).optional(),
    permissions: z.array(z.uuid()).optional(),
  });

export type UserFormValues = z.infer<typeof userSchema>;
