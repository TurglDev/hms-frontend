/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { useModal } from '@/hooks/modal/useModal'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { VitalSign } from '../../types/vital-sign.types'
import {
  vitalSignSchema,
  type VitalSignFormValues,
} from '../../validation/vital-sign.schema'
import { useVitalSignMutation } from '../../hooks/vital-sign/use-vital-sign-mutation'

interface VitalSignFormModelProps {
  healthRecordId?: string
  defaultValues?: VitalSign & { id?: string }
}

export function VitalSignFormModel({
  healthRecordId,
  defaultValues,
}: VitalSignFormModelProps) {
  const { isOpen, closeModal } = useModal('vital-sign-form')

  const { handleCreate, handleUpdate, isAdding, isUpdating } =
    useVitalSignMutation()

  const form = useForm<VitalSignFormValues>({
    resolver: zodResolver(vitalSignSchema),
    defaultValues: {
      temperature: defaultValues?.temperature ?? undefined,
      bloodPressure: defaultValues?.bloodPressure ?? '',
      heartRate: defaultValues?.heartRate ?? undefined,
      respiratoryRate: defaultValues?.respiratoryRate ?? undefined,
      oxygenSaturation: defaultValues?.oxygenSaturation ?? undefined,
      weight: defaultValues?.weight ?? undefined,
      vitalSignNote: defaultValues?.vitalSignNote ?? '',
    },
  })

  const isEdit = !!defaultValues?.id

  const onSubmit = async (values: VitalSignFormValues) => {
    try {
      toast.promise(
        async () => {
          if (isEdit && defaultValues!.id) {
            return await handleUpdate(defaultValues.id, values)
          } else {
            values.healthRecordId = healthRecordId
            return await handleCreate(values)
          }
        },
        {
          loading: isEdit ? 'Updating vital sign...' : 'Adding vital sign...',
          success: (res: any) => {
            closeModal()
            form.reset()
            return res?.message
          },
          error: (err: any) => {
            console.error(err)
            return err?.data?.message ?? err?.message ?? 'Error'
          },
        }
      )
    } catch (error) {
      console.error('Vital sign creation/updating failed', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Vital Signs' : 'Add Vital Signs'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify vital sign with optional clinical notes.'
              : 'Record vital sign with optional clinical notes.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <Controller
              name='temperature'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='temperature'>Temperature (°F)</FieldLabel>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='temperature'
                    aria-invalid={fieldState.invalid}
                    placeholder='e.g. 98.6 °F'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='bloodPressure'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='bloodPressure'>Blood pressure (mmHg)</FieldLabel>
                  <Input
                    {...field}
                    id='bloodPressure'
                    aria-invalid={fieldState.invalid}
                    placeholder='e.g. 120/80 mmHg'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='heartRate'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='heartRate'>Heart Rate (bpm)</FieldLabel>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='heartRate'
                    aria-invalid={fieldState.invalid}
                    placeholder='e.g. 72 bpm'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='respiratoryRate'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='respiratoryRate'>Respiratory rate (breaths/min)</FieldLabel>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='respiratoryRate'
                    aria-invalid={fieldState.invalid}
                    placeholder='e.g. 16 /min'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='oxygenSaturation'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='oxygenSaturation'>Oxygen Saturation (%)</FieldLabel>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='oxygenSaturation'
                    aria-invalid={fieldState.invalid}
                    placeholder='e.g. 98 %'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='weight'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='weight'>Weight (kg)</FieldLabel>
                  <Input
                    {...field}
                    type='number'
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(
                        Number.isNaN(e.target.valueAsNumber)
                          ? undefined
                          : e.target.valueAsNumber
                      )
                    }
                    id='weight'
                    aria-invalid={fieldState.invalid}
                    placeholder='e.g. 70 kg'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name='vitalSignNote'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Additional Notes</FieldLabel>

                <Textarea
                  {...field}
                  placeholder='Enter additional vital sign notes...'
                  className='min-h-[80px] resize-none'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' onClick={closeModal}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='button'
              onClick={form.handleSubmit(onSubmit)}
              disabled={isAdding || isUpdating}
            >
              {!isEdit ? 'Save' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
