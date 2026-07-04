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
import type { FollowUp } from '../../types/follow-up.types'
import {
  followUpSchema,
  type FollowUpFormValues,
} from '../../validation/follow-up.schema'
import { useFollowUpMutation } from '../../hooks/follow-up/use-follow-up-mutation'
import { addDays, format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

const quickPresets = [
  { label: "1 Week", value: 7 },
  { label: "2 Weeks", value: 14 },
  { label: "1 Month", value: 30 },
  { label: "3 Months", value: 90 },
];

interface FollowUpFormModelProps {
  healthRecordId?: string
  defaultValues?: FollowUp & { id?: string }
}

export function FollowUpFormModel({
  healthRecordId,
  defaultValues,
}: FollowUpFormModelProps) {
  const { isOpen, closeModal } = useModal('follow-up-form')
  const isEdit = !!defaultValues?.id
  
  const { handleCreate, handleUpdate, isAdding, isUpdating } = useFollowUpMutation()

  const form = useForm<FollowUpFormValues>({
    resolver: zodResolver(followUpSchema),
    defaultValues: {
      followUpDate: defaultValues?.followUpDate ?? undefined,
      followUpNote: defaultValues?.followUpNote ?? '',
    },
  })

  const followUpDate = form.watch("followUpDate");

  const setQuickDate = (days: number) => {
    form.setValue("followUpDate", addDays(new Date(), days));
  };

  const onSubmit = async (values: FollowUpFormValues) => {
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
          loading: isEdit ? 'Updating follow up...' : 'Adding follow up...',
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
      console.error('Follow up creation/updating failed', error)
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
              ? 'Modify follow up with optional clinical notes.'
              : 'Record follow up with optional clinical notes.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className="space-y-2">
            <Controller
              name="followUpDate"
              control={form.control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="followUp">Follow-up Date</FieldLabel>
                  <div className="flex flex-wrap gap-2">
                    {quickPresets.map((preset) => (
                      <Button
                        key={preset.label}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickDate(preset.value)}
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
                          !followUpDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {followUpDate ? format(followUpDate, "PPP") : "Select custom date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={followUpDate}
                        onSelect={(date) => form.setValue("followUpDate", date)}
                        disabled={(date) => date < new Date()}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="space-y-2">
            <Controller
              name="followUpNote"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="followUpNotes">
                    Follow-up Notes
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="followUpNotes"
                    aria-invalid={fieldState.invalid}
                    placeholder="Instructions for follow-up visit..."
                    className="min-h-[80px] resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
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
