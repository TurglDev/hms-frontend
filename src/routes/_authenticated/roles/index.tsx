import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Roles } from '@/features/role'

const rolesSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  // role: z
  //   .array(z.enum(roles.map((r) => r.value as (typeof roles)[number]['value'])))
  //   .optional()
  //   .catch([]),
  // Per-column text filter (example for username)
  name: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/roles/')({
  validateSearch: rolesSearchSchema,
  component: Roles,
})
