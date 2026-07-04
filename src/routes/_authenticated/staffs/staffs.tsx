import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  page: z.number().catch(1),
  q: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/staffs/')({
  component: StaffsLayout,
  validateSearch: searchSchema,
})

function StaffsLayout() {
  return <Outlet />
}
