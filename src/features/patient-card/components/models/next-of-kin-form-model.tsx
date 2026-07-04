/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
	Dialog, 
	DialogContent, 
	DialogDescription, 
	DialogFooter, 
	DialogHeader, 
	DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FieldGroup,
} from "@/components/ui/field"
import { toast } from "sonner";
import { nextOfKinSchema, type NextOfKinFormValues } from "@/features/next-of-kin/validation/next-of-kin.schema";
import { useNextOfKin } from "@/features/next-of-kin/hooks/useNextOfKin";
import type { NextOfKin } from "@/features/next-of-kin/types/next-of-kin.types";
import { NextOfKinFields } from "@/features/next-of-kin/components/next-of-kin-fields";
import { useModal } from "@/hooks/modal/useModal";

interface NextOfKinFormModelProps {
  patientCardId: string,
  defaultValues?: NextOfKin & { id?: string };
}

export function NextOfKinFormModel({
  patientCardId,
  defaultValues,
}: NextOfKinFormModelProps) {

  const { isOpen, closeModal } = useModal("next-of-kin-form");
  const { handleCreate, handleUpdate, isCreating, isUpdating } = useNextOfKin();
  
  const form = useForm<NextOfKinFormValues>({
    resolver: zodResolver(nextOfKinSchema),
    defaultValues: defaultValues 
      || {
        fullName: '',
        relationship: '',
        phoneNumber: '',
      },
      mode: 'onChange',
  });

  form.setValue("nextOfKinType", "PatientCard");

  const isEdit = !!defaultValues?.id;

  const onSubmit = async (values: NextOfKinFormValues) => {
    try {
      toast.promise(
        async () => {
          if (isEdit && defaultValues!.id) {
            return await handleUpdate(defaultValues.id, values);
          } else {
            console.log(patientCardId);
            return await handleCreate(values);
          }
        },
        {
          loading: isEdit ? 'Updating next of kin...' : 'Creating next of kin...',
          success: (res: any) => {
            form.reset();
            closeModal()
            return res?.message;
          },
        error: (err: any) =>
          err?.data?.message ?? err?.message ?? (isEdit ? 'Error updating next of kin' : 'Error creating next of kin'),
        }
      );
    } catch (error) {
      console.error("Next of kin creation/updating failed", error);
    }
  };

  return (
    <Dialog 
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        closeModal();
      }}
    >
      <DialogContent className="sm:max-w-3xl data-[state=open]:!zoom-in-0 data-[state=open]:duration-600">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Next of kin" : "Create Next of kin"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify next of kin details.'
              : 'Add next of kin details.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-1'>
          <form 
            id="next-of-kin-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-0.5"
          >
            <FieldGroup>
              <NextOfKinFields 
                form={form}
                addressFieldsRequired={false}
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              form.reset();
              closeModal();
            }}
          >
            Cancel
          </Button>
          <Button type='submit' form='next-of-kin-form'  disabled={isCreating || isUpdating}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};