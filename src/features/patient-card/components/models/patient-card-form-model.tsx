/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { toast } from 'sonner'
import {
  updatePatientCardSchema,
  type UpdatePatientCardFormValues,
} from '../../validation/patient-card.schema'
import { usePatientCards } from '../../hooks/usePatientCards'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import type { PatientCard } from '../../types/patient-card.types'
import { useModal } from '@/hooks/modal/useModal'

interface PatientCardFormModelProps {
  defaultValues: PatientCard
}

export function PatientCardFormModel({
  defaultValues,
}: PatientCardFormModelProps) {
  const { isOpen, closeModal } = useModal('edit-patient-card-form')
  const { handleUpdate, isUpdating } = usePatientCards()

  const form = useForm<UpdatePatientCardFormValues>({
    resolver: zodResolver(updatePatientCardSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  })

  const onSubmit = async (values: UpdatePatientCardFormValues) => {
    try {
      toast.promise(
        async () => {
          return await handleUpdate(defaultValues.id, values)
        },
        {
          loading: 'Updating patient card...',
          success: (res: any) => {
            form.reset()
            closeModal()
            return res?.message
          },
          error: (err: any) =>
            err?.data?.message ?? err?.message ?? 'Error updating patient card',
        }
      )
    } catch (error) {
      console.error('Patient card updating failed', error)
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
      <DialogContent className='data-[state=open]:duration-600 data-[state=open]:!zoom-in-0 sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Edit Staff Details</DialogTitle>
          <DialogDescription>Modify staff details.</DialogDescription>
        </DialogHeader>
        <div className='py-1'>
          <form
            id='patient-card-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 px-0.5'
          >
            <FieldGroup>
              <Controller
                name='fullName'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='fullName'>
                      {defaultValues.cardType === 'family'
                        ? 'Family Name'
                        : defaultValues.cardType === 'corporate'
                          ? 'Company Name'
                          : 'Full Name'}
                    </FieldLabel>
                    <Input
                      {...field}
                      id='fullName'
                      aria-invalid={fieldState.invalid}
                      placeholder={
                        defaultValues.cardType === 'family'
                          ? 'Family Name'
                          : defaultValues.cardType === 'corporate'
                            ? 'Company Name'
                            : 'Full Name'
                      }
                      autoComplete='off'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <Controller
                  name='phoneNumber'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='phoneNumber'>
                        Phone Number
                      </FieldLabel>
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
                <Controller
                  name='email'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='email'>Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type='email'
                        aria-invalid={fieldState.invalid}
                        placeholder='you@example.com'
                        autoComplete='off'
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
          <Button type='submit' form='patient-card-form' disabled={isUpdating}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
