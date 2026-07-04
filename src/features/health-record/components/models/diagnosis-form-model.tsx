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
import type { Diagnosis } from '../../types/diagnosis.types'
import {
  diagnosisSchema,
  type DiagnosisFormValues,
} from '../../validation/diagnosis.schema'
import { Badge } from '@/components/ui/badge'
import { useDiagnosisMutation } from '../../hooks/diagnosis/use-diagnosis-mutation'

interface DiagnosisFormModelProps {
  healthRecordId?: string
  defaultValues?: Diagnosis & { id?: string }
}

export function DiagnosisFormModel({
  healthRecordId,
  defaultValues,
}: DiagnosisFormModelProps) {
  const { isOpen, closeModal } = useModal('diagnosis-form')
  const [input, setInput] = React.useState('')

  const { handleCreate, handleUpdate, isAdding, isUpdating } = useDiagnosisMutation()

  const form = useForm<DiagnosisFormValues>({
    resolver: zodResolver(diagnosisSchema),
    defaultValues: {
      diagnosis: defaultValues?.diagnosis ?? [],
      diagnosisNote: defaultValues?.diagnosisNote ?? '',
    },
  })

  const isEdit = !!defaultValues?.id

  const onSubmit = async (values: DiagnosisFormValues) => {
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
          loading: isEdit ? 'Updating diagnosis...' : 'Adding diagnosis...',
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
      console.error('Diagnosis creation/updating failed', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit diagnosis' : 'Add diagnosis'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify diagnosis with optional clinical notes.'
              : 'Record diagnosis with optional clinical notes.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Controller
            name='diagnosis'
            control={form.control}
            render={({ field }) => {
              const addDiagnosis = () => {
                if (!input.trim()) return

                const updated = [...(field.value || []), input.trim()]
                field.onChange(updated)
                setInput('')
              }

              const removeDiagnosis = (item: string) => {
                const updated = field.value?.filter((d: string) => d !== item)
                field.onChange(updated)
              }

              return (
                <Field>
                  <FieldLabel>Diagnosis</FieldLabel>

                  <div className='relative'>
                    <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

                    <Input
                      value={input}
                      placeholder='Type diagnosis and press Enter'
                      className='pl-9'
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addDiagnosis()
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
                              onClick={() => removeDiagnosis(item)}
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
            name='diagnosisNote'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Additional Notes</FieldLabel>

                <Textarea
                  {...field}
                  placeholder='Enter additional diagnostic notes...'
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
