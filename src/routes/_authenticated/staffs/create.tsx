import { createFileRoute } from '@tanstack/react-router'
import { CreateStaff } from '@/features/staff/create'

export const Route = createFileRoute('/_authenticated/staffs/create')({
  component: CreateStaff,
})
