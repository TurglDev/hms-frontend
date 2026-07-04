// routes/_authenticated/patient-cards/details/$patientCardId/patient/$patientId.tsx
import { PatientCardDetails } from '@/features/patient-card/details/patient/details'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/patient-cards/details/$patientCardId/patient/$patientId'
)({
  component: PatientCardDetails,
  staticData: { mode: 'patient' } as const,
})
