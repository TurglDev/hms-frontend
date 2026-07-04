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
import { Textarea } from '@/components/ui/textarea'
import type { TreatmentPlan } from '../../types/treatment-plan.types'
import {
  treatmentPlanSchema,
  type TreatmentPlanFormValues,
} from '../../validation/treatment-plan.schema'
import { useTreatmentPlanMutation } from '../../hooks/treatment-plan/use-treatment-plan-mutation'

interface TreatmentPlanFormModelProps {
  healthRecordId?: string
  defaultValues?: TreatmentPlan & { id?: string }
}

export function TreatmentPlanFormModel({
  healthRecordId,
  defaultValues,
}: TreatmentPlanFormModelProps) {
  const { isOpen, closeModal } = useModal('treatment-plan-form')

  const { handleCreate, handleUpdate, isAdding, isUpdating } = useTreatmentPlanMutation()

  const form = useForm<TreatmentPlanFormValues>({
    resolver: zodResolver(treatmentPlanSchema),
    defaultValues: {
      treatmentPlan: defaultValues?.treatmentPlan ?? ""
    },
  })

  const isEdit = !!defaultValues?.id

  const onSubmit = async (values: TreatmentPlanFormValues) => {
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
          loading: isEdit ? 'Updating treatment plan...' : 'Adding treatment plan...',
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
      console.error('Treatment plan creation/updating failed', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Treatment Plan' : 'Add Treatment Plan'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify treatment plan with optional clinical notes.'
              : 'Record treatment plan with optional clinical notes.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Controller
            name="treatmentPlan"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="treatmentPlan" hidden>
                  Treatment Plan
                </FieldLabel>
                <Textarea
                  {...field}
                  id="treatmentPlan"
                  aria-invalid={fieldState.invalid}
                  placeholder="Describe the treatment plan, care instructions, lifestyle recommendations..."
                  className="min-h-[120px] resize-none"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
