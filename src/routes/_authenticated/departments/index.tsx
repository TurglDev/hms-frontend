import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Departments } from '@/features/department'

const departmentsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  // department: z
  //   .array(z.enum(departments.map((r) => r.value as (typeof departments)[number]['value'])))
  //   .optional()
  //   .catch([]),
  // Per-column text filter (example for username)
  name: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/departments/')({
  validateSearch: departmentsSearchSchema,
  component: Departments,
})
