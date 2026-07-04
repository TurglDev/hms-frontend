import { createFileRoute } from '@tanstack/react-router'
import { SetPassword } from '@/features/auth/set-password'
import z from 'zod'

const searchSchema = z.object({
  token: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/set-password')({
  component: SetPassword,
  validateSearch: searchSchema,
})
