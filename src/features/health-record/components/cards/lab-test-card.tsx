/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ChevronDown, Pencil, Plus, Stethoscope, Trash, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useLabTestByHealthRecordQuery } from '../../hooks/lab-test/use-lab-test-by-health-record-query'
import { useLabTestMutation } from '../../hooks/lab-test/use-lab-test-mutation'
import type { LabTest } from '../../types/lab-test.types'
import { ConfirmAlertDialog } from '@/components/ui/confirm-alert-dialog'
import { useModal } from '@/hooks/modal/useModal'
import { LabTestFormModel } from '../models/lab-test-form-model'
import { toast } from 'sonner'

const fmt = (iso: Date) => format(new Date(iso), 'MMM d, yyyy · h:mm a')

type LabTestCardProps = {
  healthRecordId: string
}

export function LabTestCard({ healthRecordId }: LabTestCardProps) {
  
  const { labTests } = useLabTestByHealthRecordQuery(healthRecordId)
  const { handleDelete, isDeleting} = useLabTestMutation()

  const [selectedLabTest, setSelectedLabTest] =
      useState<LabTest | null>(null)
  const { isOpen, openModal } = useModal('lab-test-form')
  const [open, setOpen] = useState(labTests.length === 0 ? false : true)
  const [openDelete, setOpenDelete] = useState(false)

  const onEdit = (labTest: LabTest) => {
    setSelectedLabTest(labTest)
    openModal()
  }

  const onDelete = (labTest: LabTest) => {
    setSelectedLabTest(labTest)
    setOpenDelete(true)
  }

  const onDeleteConfirm = () => {
    if (!selectedLabTest) return

    toast.promise(handleDelete(selectedLabTest.id), {
      loading: 'Deleting lab test...',
      success: (res: any) => {
        setOpenDelete(false)
        setSelectedLabTest(null)
        return res?.message ?? 'Lab test deleted successfully!'
      },
      error: (err: any) => {
        return (
          err?.data?.message ?? err?.message ?? 'Error deleting lab test'
        )
      },
    })
    setOpenDelete(false)
    setSelectedLabTest(null)
  }
  
  return (
    <Card className='flex flex-col'>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CardHeader className='flex flex-row items-center justify-between gap-4 space-y-0 pb-3'>
          <div className='flex min-w-0 items-center gap-2.5'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'>
              <Stethoscope className='h-4 w-4' />
            </div>
            <CardTitle className='truncate text-base font-semibold'>
              LabTest
            </CardTitle>
            <Badge variant='outline' className='ml-1 font-normal'>
              {labTests?.length}
            </Badge>
          </div>
          <div className='flex shrink-0 items-center gap-1'>
            <Button 
              size='sm' 
              className='shrink-0'
              onClick={() => {
                setSelectedLabTest(null)
                openModal()
              }}
            >
              <Plus className='h-4 w-4' />
              Add
            </Button>
            <CollapsibleTrigger asChild>
              <Button
                size='icon'
                variant='ghost'
                aria-label={open ? 'Collapse section' : 'Expand section'}
              >
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    !open && '-rotate-90'
                  )}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className='flex-1'>
            {labTests.length === 0 ? (
              <div className='flex flex-col items-center justify-center rounded-md border border-dashed border-border py-10 text-center'>
                <Stethoscope className='h-6 w-6 text-muted-foreground/60' />
                <p className='mt-3 text-sm font-medium text-foreground'>
                  No lab test records yet
                </p>
                <p className='mt-1 text-xs text-muted-foreground'>
                  Click “Add” to create the first entry.
                </p>
              </div>
            ) : (
              <div className='space-y-3'>
                {labTests.map((d) => (
                  <div className='rounded-md border border-border bg-card p-3'>
                      <div className='mb-2 flex items-start justify-between gap-2'>
                        <p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
                          {fmt(d.recordedAt)}
                        </p>
                        <div className='-my-1 flex items-center gap-1'>
                          <Button
                            size='icon'
                            variant='ghost'
                            className='h-7 w-7'
                            aria-label='Edit entry'
                            onClick={() => onEdit(d)}
                          >
                            <Pencil className='h-3.5 w-3.5' />
                          </Button>

                          <Button
                            size='icon'
                            variant='ghost'
                            className='h-7 w-7 text-muted-foreground hover:text-destructive'
                            aria-label='Delete entry'
                            onClick={() => onDelete(d)}
                          >
                            <Trash2 className='h-3.5 w-3.5' />
                          </Button>
                          <ConfirmAlertDialog
                            open={openDelete}
                            onOpenChange={setOpenDelete}
                            title='Delete labTest?'
                            description='This action cannot be undone. The lab test will be permanently removed.'
                            confirmText='Delete'
                            Icon={Trash}
                            onConfirm={onDeleteConfirm}
                            variant='destructive'
                            isLoading={isDeleting}
                          />
                        </div>
                      </div>
                      <div className='space-y-2 text-sm text-foreground'>
                        {d.labTests.length > 0 ? (
                          <div className='flex flex-wrap gap-1.5'>
                            {d.labTests.map((item, i) => (
                              <Badge
                                key={`${item}-${i}`}
                                variant='secondary'
                                className='font-normal'
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                        {d.labTestNote ? (
                          <p className='text-muted-foreground'>
                            {d.labTestNote}
                          </p>
                        ) : null}
                      </div>
                  </div>
                ))}
              </div>
            )}
            
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
      {isOpen && (
        <LabTestFormModel
          healthRecordId={healthRecordId}
          defaultValues={selectedLabTest || undefined}
        />
      )}
    </Card>
  )
}
