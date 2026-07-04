/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Department } from '../types/department.types'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useDepartments } from '../hooks/useDepartments'
import { toast } from 'sonner'

type DepartmentDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Department
}

export function DepartmentDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: DepartmentDeleteDialogProps) {
  const [value, setValue] = useState('')
   const { handleDelete } = useDepartments();

  const onDelete = () => {
    if (value.trim() !== currentRow.name) return

    onOpenChange(false)

    toast.promise(handleDelete(currentRow.id), {
        loading: 'Deleting department...',
        success: (res: any) => res?.message ?? "Department delete successfully!",
        error: (err: any) => {
          return err?.data?.message ?? err?.message ?? "Error deleting department";
        },
      }
    )
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={onDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Department
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove the department from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter department name to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
