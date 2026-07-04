/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { DataTable } from '@/components/data-table/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePatients } from '@/features/patient/hooks/usePatients'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { Eye, Mars, MoreHorizontal, Pencil, Plus, Trash, Trash2, Venus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { Patient } from '@/features/patient/types/patient.types'
import { useModal } from '@/hooks/modal/useModal'
import { PatientsFormModel } from '@/features/patient/components/models/patients-form-model'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { ConfirmAlertDialog } from '@/components/ui/confirm-alert-dialog'

const calculateAge = (dob?: string | Date): number | null => {
  if (!dob) return null

  const birthDate = new Date(dob)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

const columns = (
  onView: (patient: Patient) => void,
  onEdit: (patient: Patient) => void,
  onDelete: (patient: Patient) => void
): ColumnDef<Patient>[] => [
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const patient = row.original
      const age = calculateAge(patient.dateOfBirth)

      return (
        <div className='flex items-center space-x-3 ps-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500'>
            {patient.firstName[0]} {patient.lastName[0]}
          </div>
          <div className='flex flex-col'>
            <span className='font-medium'>
              {patient.firstName}{' '}
              {patient.middleName ? patient.middleName + ' ' : ''}
              {patient.lastName}
            </span>

            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              {patient.gender === 'male' ? (
                <Mars className='h-4 w-4 text-blue-500' />
              ) : patient.gender === 'female' ? (
                <Venus className='h-4 w-4 text-pink-500' />
              ) : null}

              <span className='capitalize'>
                {patient.gender}
                {age !== null && ` • ${age} yrs`}
              </span>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='flex size-8 text-muted-foreground data-[state=open]:bg-muted'
            >
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[160px]' align='end'>
            <DropdownMenuItem onClick={() => onView(patient)}>
              <Eye />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(patient)}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant='destructive' onClick={() => onDelete(patient)}>
              <Trash2 />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface MembersTabProps {
  patientCardId: string
}

export function MembersTab({ patientCardId }: MembersTabProps) {
  const { isOpen, openModal } = useModal('patient-form')
  const [openDelete, setOpenDelete] = useState(false)
  
  const { patientsByPatientCard, handleDelete, isDeleting} = usePatients(
    undefined,
    patientCardId
  )

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const navigate = useNavigate()

  const onView = (patient: Patient) => {
    navigate({
      to: `/patient-cards/details/${patientCardId}/patient/${patient.id}`,
    })
  }

  const onEdit = (patient: Patient) => {
    setSelectedPatient(patient)
    openModal()
  }

  const onDelete = (patient: Patient) => {
    setSelectedPatient(patient)
    setOpenDelete(true)
  }

  const onDeleteConfirm = () => {
      if (!selectedPatient) return
  
      toast.promise(
        handleDelete(selectedPatient.id),
        {
          loading: 'Deleting patient...',
          success: (res: any) => {
            setOpenDelete(false)
            setSelectedPatient(null)
            return res?.message ?? "Member remove successfully!"
          },
          error: (err: any) => {
            return err?.data?.message ?? err?.message ?? "Error deleting patient";
          },
        }
      );
      setOpenDelete(false)
      setSelectedPatient(null)
    }

  return (
    <Card className='relative flex flex-col gap-3 rounded-xl border bg-card py-4 text-card-foreground'>
      <CardHeader className='flex flex-row items-center justify-between px-6'>
        <CardTitle>Members</CardTitle>
        <Button
          className='gap-3'
          variant='outline'
          size='sm'
          onClick={() => {
            setSelectedPatient(null)
            openModal()
          }}
        >
          <Plus className='h-4 w-4' />
          Add
        </Button>
      </CardHeader>

      <CardContent className='px-6'>
        <div className='space-y-12'>
          <DataTable
            className='rounded-none border-none'
            columns={columns(onView, onEdit, onDelete)}
            data={patientsByPatientCard}
          />
          <ConfirmAlertDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            title='Remove member?'
            description='This action cannot be undone. The member will be permanently removed.'
            confirmText='Delete'
            Icon={Trash}
            onConfirm={onDeleteConfirm}
            variant='destructive'
            isLoading={isDeleting}
          />
        </div>
        {isOpen &&  (
          <PatientsFormModel  
            patientCardId={patientCardId}
            defaultValues={selectedPatient || undefined}
          />
        )}
      </CardContent>
    </Card>
  )
}
