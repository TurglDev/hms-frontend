/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from '@tanstack/react-table'
import type { PatientCard } from '../types/patient-card.types'
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
import { usePatientCards } from '../hooks/usePatientCards'
import { ConfirmAlertDialog } from '@/components/ui/confirm-alert-dialog'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

const columns = (
  onView: (patientCard: PatientCard) => void,
  onDelete: (patientCard: PatientCard) => void
): ColumnDef<PatientCard>[] => [
  {
    accessorKey: 'patientCardUUID',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='PatientCard No' />
    ),
    cell: ({ row }) => (
      <LongText className='ps-3'>{row.getValue('patientCardUUID')}</LongText>
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
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='ps-3 capitalize'>{row.getValue('fullName')}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'cardType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Card Type' />
    ),
    cell: ({ row }) => (
      <div className='ps-3 capitalize'>{row.getValue('cardType')}</div>
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
export function PatientCardsTable() {
  const navigate = useNavigate()
  const { patientCards, handleDelete, isDeleting } = usePatientCards()

  const [selectedPatientCard, setSelectedPatientCard] = useState<PatientCard | null>(null)
  const [openDelete, setOpenDelete] = useState(false)

  const onView = (patientCard: PatientCard) => {
    if(patientCard.cardType == 'individual') {
      const firstPatientId = Array.isArray(patientCard.patients) ? patientCard.patients[0]?.id : undefined;
      navigate({
        to: `/patient-cards/details/${patientCard.id}/patient/${firstPatientId}`,
      })
    } else {
      navigate({
        to: `/patient-cards/details/${patientCard.id}`,
      })
    }
  }

  const onDelete = (patientCard: PatientCard) => {
    setSelectedPatientCard(patientCard)
    setOpenDelete(true)
  }

  const onDeleteConfirm = () => {
    if (!selectedPatientCard) return

    toast.promise(
      handleDelete(selectedPatientCard.id),
      {
        loading: 'Deleting patientCard...',
        success: (res: any) => {
          setOpenDelete(false)
          setSelectedPatientCard(null)
          return res?.message ?? "PatientCard deleted successfully!"
        },
        error: (err: any) => {
          return err?.data?.message ?? err?.message ?? "Error deleting patientCard";
        },
      }
    );
    setOpenDelete(false)
    setSelectedPatientCard(null)
  }

  return (
    <>
      <DataTable columns={columns(onView, onDelete)} data={patientCards} />
      <ConfirmAlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title='Delete PatientCard?'
        description='This action cannot be undone. The patient card will be permanently removed.'
        confirmText='Delete'
        Icon={Trash}
        onConfirm={onDeleteConfirm}
        variant='destructive'
        isLoading={isDeleting}
      />
    </>
  )
}
