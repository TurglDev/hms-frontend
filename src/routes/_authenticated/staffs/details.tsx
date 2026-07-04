import { createFileRoute } from '@tanstack/react-router'
import { StaffDetails } from '@/features/staff/details.$id'

export const Route = createFileRoute('/_authenticated/staffs/details/$id')({
  component: StaffDetails,
})
