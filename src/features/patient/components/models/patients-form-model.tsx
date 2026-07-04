/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { usePatients } from '../../hooks/usePatients'
import { toast } from 'sonner'
import {
  patientSchema,
  type PatientFormValues,
} from '../../validation/patient.schema'
import { CalendarIcon} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Patient } from '@/features/patient/types/patient.types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/modal/useModal'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { PhoneInput } from '@/components/ui/phone-input'
import { usePatientCards } from '@/features/patient-card/hooks/usePatientCards'

interface PatientsFormModelProps {
  patientCardId: string
  defaultValues?: Patient & { id?: string }
}

export function PatientsFormModel({
  patientCardId,
  defaultValues,
}: PatientsFormModelProps) {
  const { isOpen, closeModal } = useModal('patient-form')
  const { handleUpdate, isUpdating } = usePatients()
  const { handleAddPatient, isAdding } = usePatientCards()

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: defaultValues?.firstName ?? '',
      lastName: defaultValues?.lastName ?? '',
      middleName: defaultValues?.middleName ?? '',
      gender: defaultValues?.gender ?? '',
      dateOfBirth: defaultValues?.dateOfBirth ?? undefined,
      phoneNumber: defaultValues?.phoneNumber ?? '',
    },
    mode: 'onChange',
  })

  const isEdit = !!defaultValues?.id

  const onSubmit = (values: PatientFormValues) => {
    console.log(values);
    try {
      toast.promise(
        async () => {
          if (isEdit && defaultValues!.id) {
            return await handleUpdate(defaultValues.id, values)
          } else {
            return await handleAddPatient(patientCardId, values)
          }
        },
        {
          loading: isEdit ? 'Updating patient...' : 'Creating patient...',
          success: (res: any) => {
            form.reset()
            closeModal()
            return res?.message
          },
          error: (err: any) =>
            err?.data?.message ?? 
            err?.message ?? 
            (isEdit ? 'Error updating patient' : 'Error creating patient'),
        }
      )
    } catch (error) {
      console.error('Patient creation/updating failed', error)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset()
        closeModal()
      }}
    >
      <DialogContent className='data-[state=open]:duration-600 data-[state=open]:!zoom-in-0 sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit patient' : 'Create patient'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Modify patient details.' : 'Add a patient.'}
          </DialogDescription>
        </DialogHeader>

        <div className='py-1'>
          <form
            id='patient-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 px-0.5'
          >
            <FieldGroup>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <Controller
                  name='firstName'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='firstName'>First Name</FieldLabel>
                      <Input
                        {...field}
                        id='firstName'
                        aria-invalid={fieldState.invalid}
                        placeholder='First Name'
                        autoComplete='off'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name='lastName'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='lastName'>Last Name</FieldLabel>
                      <Input
                        {...field}
                        id='lastName'
                        aria-invalid={fieldState.invalid}
                        placeholder='Last Name'
                        autoComplete='off'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name='middleName'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='middleName'>Middle Name</FieldLabel>
                      <Input
                        {...field}
                        id='middleName'
                        aria-invalid={fieldState.invalid}
                        placeholder='Middle Name'
                        autoComplete='off'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name='gender'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='gender'>Gender</FieldLabel>
                      <Select
                        {...field}
                        aria-invalid={fieldState.invalid}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a gender' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value='male'>Male</SelectItem>
                            <SelectItem value='female'>Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name='dateOfBirth'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='dateOfBirth'>Date of birth</FieldLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            captionLayout='dropdown'
                          />
                        </PopoverContent>
                      </Popover>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name='phoneNumber'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='phoneNumber'>Phone Number</FieldLabel>
                      <PhoneInput
                        {...field}
                        id='phoneNumber'
                        aria-invalid={fieldState.invalid}
                        defaultCountry='NG'
                        placeholder='Enter a phone number'
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </form>
        </div>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              form.reset()
              closeModal()
            }}
          >
            Cancel
          </Button>
          <Button type='submit' form='patient-form' disabled={isAdding || isUpdating}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
