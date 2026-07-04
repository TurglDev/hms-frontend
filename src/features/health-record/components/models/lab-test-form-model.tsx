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
import type { LabTest } from '../../types/lab-test.types'
import {
  labTestSchema,
  type LabTestFormValues,
} from '../../validation/lab-test.schema'
import { Badge } from '@/components/ui/badge'
import { useLabTestMutation } from '../../hooks/lab-test/use-lab-test-mutation'

interface LabTestFormModelProps {
  healthRecordId?: string
  defaultValues?: LabTest & { id?: string }
}

export function LabTestFormModel({
  healthRecordId,
  defaultValues,
}: LabTestFormModelProps) {
  const { isOpen, closeModal } = useModal('lab-test-form')
  const [input, setInput] = React.useState('')

  const { handleCreate, handleUpdate, isAdding, isUpdating } = useLabTestMutation()

  const form = useForm<LabTestFormValues>({
    resolver: zodResolver(labTestSchema),
    defaultValues: {
      labTests: defaultValues?.labTests ?? [],
      labTestNote: defaultValues?.labTestNote ?? '',
    },
  })

  const isEdit = !!defaultValues?.id

  const onSubmit = async (values: LabTestFormValues) => {
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
          loading: isEdit ? 'Updating lab test...' : 'Adding lab test...',
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
      console.error('Lab test creation/updating failed', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Lab Test' : 'Add Lab Test'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify lab test with optional clinical notes.'
              : 'Record lab test with optional clinical notes.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Controller
            name='labTests'
            control={form.control}
            render={({ field }) => {
              const addLabTest = () => {
                if (!input.trim()) return

                const updated = [...(field.value || []), input.trim()]
                field.onChange(updated)
                setInput('')
              }

              const removeLabTest = (item: string) => {
                const updated = field.value?.filter((d: string) => d !== item)
                field.onChange(updated)
              }

              return (
                <Field>
                  <FieldLabel>LabTest</FieldLabel>

                  <div className='relative'>
                    <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

                    <Input
                      value={input}
                      placeholder='Type lab test and press Enter'
                      className='pl-9'
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addLabTest()
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
                              onClick={() => removeLabTest(item)}
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
            name='labTestNote'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Additional Notes</FieldLabel>

                <Textarea
                  {...field}
                  placeholder='Enter additional lab test notes...'
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
