/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
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
import { FieldGroup } from '@/components/ui/field'
import { toast } from 'sonner'
import {
  addressSchema,
  type AddressFormValues,
} from '@/features/address/validation/address.schema'
import { useAddresses } from '@/features/address/hooks/useAddresses'
import { AddressFields } from '@/features/address/components/address-fields'
import type { Address } from '@/features/address/types/address.types'
import { useModal } from '@/hooks/modal/useModal'

interface AddressFormModelProps {
  patientCardId: string
  defaultValues?: Address & { id?: string }
}

export function AddressFormModel({
  patientCardId,
  defaultValues,
}: AddressFormModelProps) {
  const { isOpen, closeModal } = useModal('address-form')
  const { handleCreate, handleUpdate, isCreating, isUpdating } = useAddresses()

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine1: defaultValues?.addressLine1 ?? '',
      addressLine2: defaultValues?.addressLine2 ?? '',
      city: defaultValues?.city ?? '',
      state: defaultValues?.state ?? '',
      country: defaultValues?.country ?? '',
      postalCode: defaultValues?.postalCode ?? '',
    },
    mode: 'onChange',
  })

  form.setValue('addressType', 'Staff')

  const isEdit = !!defaultValues?.id

  const onSubmit = async (values: AddressFormValues) => {
    try {
      toast.promise(
        async () => {
          if (isEdit && defaultValues!.id) {
            return await handleUpdate(defaultValues.id, values)
          } else {
            console.log(patientCardId)
            return await handleCreate(values)
          }
        },
        {
          loading: isEdit ? 'Updating address...' : 'Creating address...',
          success: (res: any) => {
            form.reset()
            closeModal()
            return res?.message
          },
          error: (err: any) =>
            err?.data?.message ??
            err?.message ??
            (isEdit ? 'Error updating address' : 'Error creating address'),
        }
      )
    } catch (error) {
      console.error('Address creation/updating failed', error)
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
          <DialogTitle>
            {isEdit ? 'Edit Address' : 'Create Address'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? 'Modify address details.' : 'Add a address.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-1'>
          <form
            id='address-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 px-0.5'
          >
            <FieldGroup>
              <AddressFields form={form} />
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
          <Button
            type='submit'
            form='address-form'
            disabled={isCreating || isUpdating}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
