/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
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
import { Search, X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import type { Medication } from '../../types/medication.types'
import {
  medicationSchema,
  type MedicationFormValues,
} from '../../validation/medication.schema'
import { Badge } from '@/components/ui/badge'
import { useMedicationMutation } from '../../hooks/medication/use-medication-mutation'

interface MedicationFormModelProps {
  healthRecordId?: string
  defaultValues?: Medication & { id?: string }
}

export function MedicationFormModel({
  healthRecordId,
  defaultValues,
}: MedicationFormModelProps) {
  const { isOpen, closeModal } = useModal('medication-form')
  const [input, setInput] = React.useState('')

  const { handleCreate, handleUpdate, isAdding, isUpdating } = useMedicationMutation()

  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      medications: defaultValues?.medications ?? [],
      medicationNote: defaultValues?.medicationNote ?? '',
    },
  })

  const isEdit = !!defaultValues?.id

  const onSubmit = async (values: MedicationFormValues) => {
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
          loading: isEdit ? 'Updating medication...' : 'Adding medication...',
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
      console.error('Medication creation/updating failed', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit medication' : 'Add medication'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify medication with optional clinical notes.'
              : 'Record medication with optional clinical notes.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Controller
            name='medications'
            control={form.control}
            render={({ field }) => {
              const addMedication = () => {
                if (!input.trim()) return

                const updated = [...(field.value || []), input.trim()]
                field.onChange(updated)
                setInput('')
              }

              const removeMedication = (item: string) => {
                const updated = field.value?.filter((d: string) => d !== item)
                field.onChange(updated)
              }

              return (
                <Field>
                  <FieldLabel>Medication</FieldLabel>

                  <div className='relative'>
                    <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

                    <Input
                      value={input}
                      placeholder='Type medication and press Enter'
                      className='pl-9'
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addMedication()
                        }
                      }}
                    />
                  </div>

                  {/* Selected Diagnoses */}
                  {!field.value?.length ||
                    (field.value?.length > 0 && (
                      <div className='mt-3 flex flex-wrap gap-2'>
                        {field.value?.map((item: string) => (
                          <Badge
                            key={item}
                            variant='secondary'
                            className='gap-1 pr-1'
                          >
                            {item}

                            <button
                              type='button'
                              onClick={() => removeMedication(item)}
                              className='ml-1 rounded p-0.5 hover:bg-muted'
                            >
                              <X className='h-3 w-3' />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    ))}
                </Field>
              )
            }}
          />

          <Controller
            name='medicationNote'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Additional Notes</FieldLabel>

                <Textarea
                  {...field}
                  placeholder='Enter additional medication notes...'
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
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
