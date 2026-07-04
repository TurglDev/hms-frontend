import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Save } from 'lucide-react'
import { DiagnosisCard } from './components/cards/diagnosis-card'
import { useHealthRecordQuery } from './hooks/use-health-record-query'
import { SymptomCard } from './components/cards/symptom-card'
import { LabTestCard } from './components/cards/lab-test-card'
import { TreatmentPlanCard } from './components/cards/treatment-plan-card'
import { MedicationCard } from './components/cards/medication-card'
import { FollowUpCard } from './components/cards/follow-up-card'
import { calculateAge } from '@/lib/utils'
import { VitalSignCard } from './components/cards/vital-card'

type HealthRecordDetailsProps = {
  healthRecordId: string
}

export function HealthRecordDetails({
  healthRecordId,
}: HealthRecordDetailsProps) {
  const { healthRecord, isLoading, error } =
    useHealthRecordQuery(healthRecordId)

  if (isLoading) {
    return (
      <SheetContent className='w-full sm:max-w-6xl'>
        <div className='flex h-full items-center justify-center'>
          Loading...
        </div>
      </SheetContent>
    )
  }

  if (error || !healthRecord) {
    return (
      <SheetContent className='w-full sm:max-w-6xl'>
        <div className='flex h-full items-center justify-center'>
          Failed to load health record.
        </div>
      </SheetContent>
    )
  }

  return (
    <SheetContent className='w-full sm:max-w-6xl'>
      <SheetHeader>
        <SheetTitle>Health Record Details</SheetTitle>
        <header className='sticky top-0 z-10 flex flex-col gap-4 rounded-xl border bg-card py-4 text-card-foreground shadow-sm'>
          <div className='px-6'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar className='size-16 shrink-0 overflow-hidden rounded-full'>
                  <AvatarFallback>
                    {healthRecord?.patient?.firstName?.[0]}
                    {healthRecord?.patient?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className='grid text-sm leading-tight'>
                  <span className='text-lg font-semibold'>
                    {healthRecord?.patient?.firstName}{' '}
                    {healthRecord?.patient?.lastName}
                  </span>

                  <span className='text-xs text-muted-foreground'>
                    Card No: {healthRecord?.patientCard?.patientCardUUID}
                  </span>

                  <span className='text-xs text-muted-foreground'>
                    Health Record No: {healthRecord?.healthRecordNo}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 lg:grid-cols-2'>
                <div className='rounded-lg border p-3'>
                  <p className='text-xs text-muted-foreground'>Gender</p>
                  <p className='font-medium'>
                    {healthRecord?.patient?.gender || '-'}
                  </p>
                </div>

                <div className='rounded-lg border p-3'>
                  <p className='text-xs text-muted-foreground'>Age</p>
                  <p className='font-medium'>
                    {calculateAge(healthRecord?.patient?.dateOfBirth)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </SheetHeader>

      <ScrollArea className='overflow-y-auto'>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-6 lg:grid-cols-3'>
            <div className='space-y-6 lg:col-span-2'>
              <VitalSignCard healthRecordId={healthRecord.id} />
              <DiagnosisCard healthRecordId={healthRecord.id} />
              <SymptomCard healthRecordId={healthRecord.id} />
              <TreatmentPlanCard healthRecordId={healthRecord.id} />
              <MedicationCard healthRecordId={healthRecord.id} />
              <LabTestCard healthRecordId={healthRecord.id} />
              <FollowUpCard healthRecordId={healthRecord.id} />
            </div>
            <div className='space-y-6'>
              <div className='sticky top-0 space-y-3'>
                <Button type='button' variant='outline' className='w-full'>
                  <Save className='mr-2 h-4 w-4' />
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </SheetContent>
  )
}
