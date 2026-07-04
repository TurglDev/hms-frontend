/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Plus, Trash } from 'lucide-react'
import type { HealthRecord } from '@/features/health-record/types/health-record.types'
import { useHealthRecordsByPatientCardAndPatientQuery } from '@/features/health-record/hooks/use-health-records-by-patient-card-and-patient-query'
import { toast } from 'sonner'
import { ConfirmAlertDialog } from '@/components/ui/confirm-alert-dialog'
import { HealthRecordCard } from '@/features/health-record/components/cards/health-record-card'
import { useHealthRecordMutation } from '@/features/health-record/hooks/use-health-record-mutation'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { CreateHealthRecord } from '@/features/health-record/create'

interface HealthRecordTabProps {
  patientCardId: string
  cardNumber: string
  patientId: string
}

export const HealthRecordTab: React.FC<HealthRecordTabProps> = ({
  patientCardId,
  cardNumber,
  patientId,
}) => {
  const { healthRecords } = useHealthRecordsByPatientCardAndPatientQuery(
    patientCardId,
    patientId
  )
  const { handleDelete, isDeleting } = useHealthRecordMutation()

  const [openDelete, setOpenDelete] = useState(false)

  const [selectedHealthRecord, setSelectedHealthRecord] =
    useState<HealthRecord | null>(null)

  const [dateFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    const now = Date.now()
    return healthRecords
      .filter((healthRecord) => {
        if (dateFilter !== 'all') {
          const days =
            (now - new Date(healthRecord.createdAt).getTime()) / 86400000
          if (dateFilter === '7' && days > 7) return false
          if (dateFilter === '30' && days > 30) return false
          if (dateFilter === '90' && days > 90) return false
        }
        return true
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }, [healthRecords, dateFilter])

  const onDeleteConfirm = () => {
    if (!selectedHealthRecord) return

    toast.promise(handleDelete(selectedHealthRecord.id), {
      loading: 'Deleting health record...',
      success: (res: any) => {
        setOpenDelete(false)
        setSelectedHealthRecord(null)
        return res?.message ?? 'Health record deleted successfully!'
      },
      error: (err: any) => {
        return (
          err?.data?.message ?? err?.message ?? 'Error deleting health record'
        )
      },
    })
    setOpenDelete(false)
    setSelectedHealthRecord(null)
  }

  return (
    <Card className='relative flex flex-col gap-3 rounded-xl border bg-card py-4 text-card-foreground'>
      <CardHeader className='flex flex-row items-center justify-between px-6'>
        <CardTitle>Health Records</CardTitle>
      </CardHeader>

      <CardContent className='px-6'>
        <div className='space-y-12'>
          {filtered.length === 0 ? (
            healthRecords.length === 0 ? (
              <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-16 text-center transition-colors'>
                <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary/10'>
                  <Activity className='h-7 w-7 text-primary' />
                </div>

                <h3 className='mt-5 text-lg font-semibold text-foreground'>
                  No Health Records Yet
                </h3>

                <p className='mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground'>
                  Start documenting patient diagnoses, medications, lab tests,
                  and follow-up care by creating the first health record.
                </p>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button className='shadow-sm'>
                      <Plus className='mr-2 h-4 w-4' />
                      New Health Record
                    </Button>
                  </SheetTrigger>
                  <CreateHealthRecord
                    patientCardId={patientCardId}
                    cardNumber={cardNumber}
                    patientId={patientId}
                  />
                </Sheet>
              </div>
            ) : (
              <div className='rounded-xl border border-dashed border-border bg-card/50 p-10 text-center text-sm text-muted-foreground'>
                No records match your filters.
              </div>
            )
          ) : (
            <div className='pt-2'>
              {filtered.map((r, i) => (
                <HealthRecordCard
                  key={r.id}
                  healthRecord={r}
                  isLast={i === filtered.length - 1}
                />
              ))}
            </div>
          )}

          <ConfirmAlertDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            title='Delete Health Record?'
            description='This action cannot be undone. The health record will be permanently removed.'
            confirmText='Delete'
            Icon={Trash}
            onConfirm={onDeleteConfirm}
            variant='destructive'
            isLoading={isDeleting}
          />
        </div>
      </CardContent>
    </Card>
  )
}
