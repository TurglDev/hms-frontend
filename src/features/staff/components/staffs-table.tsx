/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from '@tanstack/react-table'
import type { Staff } from '../types/staff.types'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { LongText } from '@/components/long-text'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash, Trash2, UserPen } from 'lucide-react'
import { useState } from 'react'
import { useStaffs } from '../hooks/useStaffs'
import { ConfirmAlertDialog } from '@/components/ui/confirm-alert-dialog'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

const columns = (
  onView: (staff: Staff) => void,
  onDelete: (staff: Staff) => void
): ColumnDef<Staff>[] => [
  {
    accessorKey: 'staffUUID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Staff ID' />
    ),
    cell: ({ row }) => (
      <LongText className='ps-3'>{row.getValue('staffUUID')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'ps-0.5 max-md:sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const staff = row.original
      return (
        <div className='flex items-center space-x-3 ps-3'>
          {/* Photo */}
          {staff.photo ? (
            <img
              src={staff.photo}
              alt={`${staff.firstName} ${staff.lastName}`}
              className='h-10 w-10 rounded-full object-cover'
            />
          ) : (
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500'>
              {staff.firstName[0]} {staff.lastName[0]}
            </div>
          )}
          <div className='flex flex-col'>
            <span className='font-medium'>
              {staff.firstName} {staff.middleName ? staff.middleName + ' ' : ''}
              {staff.lastName}
            </span>
            {staff.email && (
              <span className='text-sm text-gray-500'>{staff.email}</span>
            )}
          </div>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Gender' />
    ),
    cell: ({ row }) => (
      <div className='ps-3 capitalize'>{row.getValue('gender')}</div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone Number' />
    ),
    cell: ({ row }) => (
      <div className='ps-3'>{row.getValue('phoneNumber')}</div>
    ),
  },
  {
    accessorKey: 'department',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Department' />
    ),
    cell: ({ row }) => {
      const staff = row.original
      const departmentNames = staff.departments?.map((d) => d.name).join(', ')
      return <div className='flex flex-col ps-3'>{departmentNames || '-'}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
              >
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
              <DropdownMenuItem onClick={() => onView(row.original)}>
                View
                <DropdownMenuShortcut>
                  <UserPen size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(row.original)}
                className='text-red-500!'
              >
                Delete
                <DropdownMenuShortcut>
                  <Trash2 size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
export function StaffsTable() {
  const { staffs, handleDelete, isDeleting } = useStaffs()

  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [openDelete, setOpenDelete] = useState(false)

  const navigate = useNavigate()

  const onView = (staff: Staff) => {
    navigate({
      to: `/staffs/details/${staff.id}`,
    })
  }

  const onDelete = (staff: Staff) => {
    setSelectedStaff(staff)
    setOpenDelete(true)
  }

  const onDeleteConfirm = () => {
    if (!selectedStaff) return

    toast.promise(
      handleDelete(selectedStaff.id),
      {
        loading: 'Deleting staff...',
        success: (res: any) => {
          setOpenDelete(false)
          setSelectedStaff(null)
          return res?.message ?? "Staff deleted successfully!"
        },
        error: (err: any) => {
          return err?.data?.message ?? err?.message ?? "Error deleting staff";
        },
      }
    );
    setOpenDelete(false)
    setSelectedStaff(null)
  }

  return (
    <>
      <DataTable columns={columns(onView, onDelete)} data={staffs} />
      <ConfirmAlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title='Delete Staff?'
        description='This action cannot be undone. The staff will be permanently removed.'
        confirmText='Delete'
        Icon={Trash}
        onConfirm={onDeleteConfirm}
        variant='destructive'
        isLoading={isDeleting}
      />
    </>
  )
}
