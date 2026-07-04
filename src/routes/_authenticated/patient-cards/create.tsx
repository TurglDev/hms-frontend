import { CreatePatientCard } from '@/features/patient-card/create'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/patient-cards/create')({
  component: CreatePatientCard,
})
