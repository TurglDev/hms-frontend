/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
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
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { toast } from "sonner";
import { assignDepartmentsSchema, type AssignDepartmentsFormValues } from "@/features/staff/validation/staff.schema";
import { useDepartments } from "@/features/department/hooks/useDepartments";
import { MultiSelect } from "@/components/ui/multi-select";
import { useStaffs } from "../../hooks/useStaffs";
import type { Department } from "@/features/department/types/department.types";
import { useModal } from "@/hooks/modal/useModal";

interface AssignDepartmentFormModelProps {
  staffId: string,
  defaultValues?: Department[];
}

export function AssignDepartmentFormModel({
  staffId,
  defaultValues,
}: AssignDepartmentFormModelProps) {
  
  const { isOpen, closeModal } = useModal("assign-department-form");
  const { departments } = useDepartments();
  const { handleAssignDepartment, isAssigning } = useStaffs();
  
  const form = useForm<AssignDepartmentsFormValues>({
    resolver: zodResolver(assignDepartmentsSchema),
    defaultValues: {
      departments: defaultValues?.map((dept) => dept.id) || [],
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: AssignDepartmentsFormValues) => {
    try {
      toast.promise(
        async () => {
          return await handleAssignDepartment(staffId, values);
        },
        {
          loading: 'Assigning Departments...',
          success: (res: any) => {
            form.reset();
            closeModal()
            return res?.message;
          },
        error: (err: any) =>
          err?.data?.message ?? err?.message ?? "Error assigning departments",
        }
      );
    } catch (error) {
      console.error("Assign departments failed", error);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={() => {
        form.reset()
        closeModal()
      }}
    >
      <DialogContent className="sm:max-w-3xl data-[state=open]:!zoom-in-0 data-[state=open]:duration-600">
        <DialogHeader>
          <DialogTitle>Assign Departments</DialogTitle>
          <DialogDescription>
            Assign Departments to Staff
          </DialogDescription>
        </DialogHeader>
        <div className='py-1'>
          <form 
            id="assign-department-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-0.5"
          >
            <FieldGroup>
              <Controller
                name="departments"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="departments">
                      Departments
                    </FieldLabel>
                    <MultiSelect
                      id="departments"
                      aria-invalid={fieldState.invalid}
                      options={departments.map((department) => ({
                        label: department.name,
                        value: department.id, 
                      }))}
                      value={field.value || []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Choose departments..."
                      variant="inverted"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
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
          <Button type='submit' form='assign-department-form' disabled={isAssigning}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};