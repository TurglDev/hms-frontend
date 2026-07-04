// routes/_authenticated/patient-cards/details/$patientCardId/index.tsx

import { PatientCardDetails } from '@/features/patient-card/details/index'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/patient-cards/details/$patientCardId'
)({
  component: PatientCardDetails,
  staticData: { mode: 'patient-card' } as const,
})
