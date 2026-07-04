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
import { ChevronDown, HeartPulse, Pencil, Plus, Trash, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useVitalSignByHealthRecordQuery } from '../../hooks/vital-sign/use-vital-sign-by-health-record-query'
import { useVitalSignMutation } from '../../hooks/vital-sign/use-vital-sign-mutation'
import type { VitalSign } from '../../types/vital-sign.types'
import { ConfirmAlertDialog } from '@/components/ui/confirm-alert-dialog'
import { useModal } from '@/hooks/modal/useModal'
import { VitalSignFormModel } from '../models/vital-sign-form-model'
import { toast } from 'sonner'

const fmt = (iso: Date) => format(new Date(iso), 'MMM d, yyyy · h:mm a')

type VitalSignCardProps = {
  healthRecordId: string
}

export function VitalSignCard({ healthRecordId }: VitalSignCardProps) {
  
  const { vitalSigns } = useVitalSignByHealthRecordQuery(healthRecordId)
  const { handleDelete, isDeleting} = useVitalSignMutation()

  const [selectedVitalSign, setSelectedVitalSign] =
      useState<VitalSign | null>(null)
  const { isOpen, openModal } = useModal('vital-sign-form')
  const [open, setOpen] = useState(vitalSigns.length === 0 ? false : true)
  const [openDelete, setOpenDelete] = useState(false)

  const onEdit = (vitalSign: VitalSign) => {
    setSelectedVitalSign(vitalSign)
    openModal()
  }

  const onDelete = (vitalSign: VitalSign) => {
    setSelectedVitalSign(vitalSign)
    setOpenDelete(true)
  }

  const onDeleteConfirm = () => {
    if (!selectedVitalSign) return

    toast.promise(handleDelete(selectedVitalSign.id), {
      loading: 'Deleting vital sign...',
      success: (res: any) => {
        setOpenDelete(false)
        setSelectedVitalSign(null)
        return res?.message ?? 'Vital sign deleted successfully!'
      },
      error: (err: any) => {
        return (
          err?.data?.message ?? err?.message ?? 'Error deleting vital sign'
        )
      },
    })
    setOpenDelete(false)
    setSelectedVitalSign(null)
  }
  
  return (
    <Card className='flex flex-col'>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CardHeader className='flex flex-row items-center justify-between gap-4 space-y-0 pb-3'>
          <div className='flex min-w-0 items-center gap-2.5'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'>
              <HeartPulse className='h-4 w-4' />
            </div>
            <CardTitle className='truncate text-base font-semibold'>
              VitalSign
            </CardTitle>
            <Badge variant='outline' className='ml-1 font-normal'>
              {vitalSigns.length}
            </Badge>
          </div>
          <div className='flex shrink-0 items-center gap-1'>
            <Button 
              size='sm' 
              className='shrink-0'
              onClick={() => {
                setSelectedVitalSign(null)
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
            {vitalSigns.length === 0 ? (
              <div className='flex flex-col items-center justify-center rounded-md border border-dashed border-border py-10 text-center'>
                <HeartPulse className='h-6 w-6 text-muted-foreground/60' />
                <p className='mt-3 text-sm font-medium text-foreground'>
                  No vital sign records yet
                </p>
                <p className='mt-1 text-xs text-muted-foreground'>
                  Click “Add” to create the first entry.
                </p>
              </div>
            ) : (
              <div className='space-y-3'>
                {vitalSigns.map((vitalSign) => {
                  const rows: Array<[string, string | number | undefined]> = [
                    ["Temperature", vitalSign.temperature],
                    ["Blood pressure", vitalSign.bloodPressure],
                    ["Heart rate", vitalSign.heartRate],
                    ["Respiratory rate", vitalSign.respiratoryRate],
                    ["Oxygen saturation", vitalSign.oxygenSaturation],
                    ["Weight", vitalSign.weight],
                  ];
                  const filteredRows = rows.filter(
                    ([, v]) => v !== undefined && v !== null && v !== ""
                  );
                  return (
                      <div className='rounded-md border border-border bg-card p-3'>
                          <div className='mb-2 flex items-start justify-between gap-2'>
                            <p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
                              {fmt(vitalSign.recordedAt)}
                            </p>
                            <div className='-my-1 flex items-center gap-1'>
                              <Button
                                size='icon'
                                variant='ghost'
                                className='h-7 w-7'
                                aria-label='Edit entry'
                                onClick={() => onEdit(vitalSign)}
                              >
                                <Pencil className='h-3.5 w-3.5' />
                              </Button>

                              <Button
                                size='icon'
                                variant='ghost'
                                className='h-7 w-7 text-muted-foreground hover:text-destructive'
                                aria-label='Delete entry'
                                onClick={() => onDelete(vitalSign)}
                              >
                                <Trash2 className='h-3.5 w-3.5' />
                              </Button>
                              <ConfirmAlertDialog
                                open={openDelete}
                                onOpenChange={setOpenDelete}
                                title='Delete vitalSign?'
                                description='This action cannot be undone. The vitalSign will be permanently removed.'
                                confirmText='Delete'
                                Icon={Trash}
                                onConfirm={onDeleteConfirm}
                                variant='destructive'
                                isLoading={isDeleting}
                              />
                            </div>
                          </div>
                          <div className='space-y-2 text-sm text-foreground'>
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
                              {filteredRows ? (
                                filteredRows
                                .filter(([, v]) => v)
                                .map(([label, v]) => (
                                  <div key={label} className="flex justify-between gap-3">
                                    <dt className="text-muted-foreground">{label}</dt>
                                    <dd className="font-medium text-foreground">{v}</dd>
                                  </div>
                                ))) : null}
                            </dl>
                            {vitalSign.vitalSignNote ? (
                              <p className='text-muted-foreground'>
                                {vitalSign.vitalSignNote}
                              </p>
                            ) : null}
                          </div>
                      </div>
                  )
                })}
              </div>
            )}
            
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
      {isOpen && (
        <VitalSignFormModel
          healthRecordId={healthRecordId}
          defaultValues={selectedVitalSign || undefined}
        />
      )}
    </Card>
  )
}
