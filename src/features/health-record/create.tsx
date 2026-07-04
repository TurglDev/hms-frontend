/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { toast } from 'sonner'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  healthRecordSchema,
  type HealthRecordFormValues,
} from '@/features/health-record/validation/health-record.schema'
import { useHealthRecords } from './hooks/useHealthRecords'
import { DiagnosisForm } from './components/forms/diagnosis-form'
import { SymptomsForm } from './components/forms/symptoms-form'
import { TreatmentPlanForm } from './components/forms/treatment-plan-form'
import { MedicationsForm } from './components/forms/medications-form'
import { LabTestForm } from './components/forms/lab-test-form'
import { FollowUpForm } from './components/forms/follow-up-form'
import { usePatientQuery } from '../patient/hooks/use-patient-query'
import { calculateAge } from '@/lib/utils'
import { VitalSignForm } from './components/forms/vital-sign-form'
import { DocumentForm } from './components/forms/document-form'

type HealthRecordFormProps = {
  patientCardId: string
  cardNumber: string
  patientId: string
}

export function CreateHealthRecord({
  patientCardId,
  cardNumber,
  patientId,
}: HealthRecordFormProps) {

  const { patient, isLoading, error } = usePatientQuery(patientId)
  const { handleCreate, isCreating } = useHealthRecords()

  const form = useForm<HealthRecordFormValues>({
    resolver: zodResolver(healthRecordSchema),
    defaultValues: {
      vitalSign: {
        temperature: undefined,
        bloodPressure: '',
        heartRate: undefined,
        respiratoryRate: undefined,
        oxygenSaturation: undefined,
        weight: undefined,
        vitalSignNote: '',
      },
      diagnosis: {
        diagnosis: [],
        diagnosisNote: '',
      },
      symptoms: {
        symptoms: [],
        symptomNote: '',
      },
      treatmentPlan: '',
      medications: {
        medications: [],
        medicationNote: '',
      },
      labTests: {
        labTests: [],
        labTestNote: '',
      },
      followUp: {
        followUpDate: undefined,
        followUpNote: '',
      },
      patientCardId,
      patientId,
    },
    mode: 'onChange',
  })

  const onSubmit = (values: HealthRecordFormValues) => {
    try {
      toast.promise(
        async () => {
          return await handleCreate(values)
        },
        {
          loading: 'Creating health record...',
          success: (res: any) => {
            form.reset()
            return res?.message
          },
          error: (err: any) =>
            err?.data?.message ??
            err?.message ??
            'Error creating health record',
        }
      )
    } catch (error) {
      console.error('Health record creation/updating failed', error)
    }
  }

  if (isLoading) {
    return (
      <SheetContent className='w-full sm:max-w-6xl'>
        <div className='flex h-full items-center justify-center'>
          Loading...
        </div>
      </SheetContent>
    )
  }

  if (error || !patient) {
    return (
      <SheetContent className='w-full sm:max-w-6xl'>
        <div className='flex h-full items-center justify-center'>
          Failed to load patient details.
        </div>
      </SheetContent>
    )
  }

  return (
    <SheetContent className='w-full sm:max-w-7xl'>
      <SheetHeader>
        <SheetTitle>Create Health Record</SheetTitle>
        <header className='sticky top-0 z-10 flex flex-col gap-4 rounded-xl border bg-card py-4 text-card-foreground shadow-sm'>
          <div className='px-6'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar className='size-16 shrink-0 overflow-hidden rounded-full'>
                  <AvatarFallback>
                    {patient?.firstName?.[0]}
                    {patient?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className='grid text-sm leading-tight'>
                  <span className='text-lg font-semibold'>
                    {patient?.firstName} {patient?.lastName}
                  </span>

                  <span className='text-xs text-muted-foreground'>
                    Card No: {cardNumber}
                  </span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 lg:grid-cols-2'>
                <div className='rounded-lg border p-3'>
                  <p className='text-xs text-muted-foreground'>Gender</p>
                  <p className='font-medium'>{patient?.gender || '-'}</p>
                </div>

                <div className='rounded-lg border p-3'>
                  <p className='text-xs text-muted-foreground'>Age</p>
                  <p className='font-medium'>
                    {calculateAge(patient?.dateOfBirth)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </SheetHeader>
      <ScrollArea className='overflow-y-auto'>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <form action='' className='mt-4 space-y-6'>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="space-y-8 lg:col-span-8">
                <VitalSignForm form={form} />
                <DiagnosisForm form={form} />
                <SymptomsForm form={form} />
                <TreatmentPlanForm form={form} />
                <MedicationsForm form={form} />
                <LabTestForm form={form} />
                <DocumentForm form={form} />
                <FollowUpForm form={form} />
              </div>
              <div className='space-y-8 lg:col-span-4'>
                <div className='sticky top-0 space-y-3'>
                  <Button
                    type='button'
                    variant='outline'
                    className='w-full'
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={form.formState.isSubmitting && isCreating}
                  >
                    <Save className='mr-2 h-4 w-4' />
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </ScrollArea>
    </SheetContent>
  )
}
