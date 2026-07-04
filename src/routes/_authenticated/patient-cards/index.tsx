import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { PatientCardsList } from '@/features/patient-card'

const patientCardsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  // staff: z
  //   .array(z.enum(staffs.map((r) => r.value as (typeof staffs)[number]['value'])))
  //   .optional()
  //   .catch([]),
  // Per-column text filter (example for username)
  name: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/patient-cards/')({
  validateSearch: patientCardsSearchSchema,
  component: PatientCardsList,
})
