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
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { useDepartments } from "../hooks/useDepartments";
import { toast } from "sonner";
import { departmentSchema, type DepartmentFormValues } from "../validation/department.schema";
import type { Department } from "../types/department.types";

interface DepartmentFormProps {
  currentRow?: Department
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DepartmentForm({
  currentRow,
  open,
  onOpenChange,
}: DepartmentFormProps) {

  const isEdit = !!currentRow

  const { handleCreate, handleUpdate, isCreating, isUpdating } = useDepartments();
  
  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: isEdit
      ? {
          name: currentRow.name,
          description: currentRow.description
        } 
      : { name: "", description: "" },
  });

  const onSubmit = async (values: DepartmentFormValues) => {
    try {
      toast.promise(
        async () => {
          if (isEdit && currentRow.id) {
            return await handleUpdate(currentRow.id, values);
          } else {
            return await handleCreate(values);
          }
        },
        {
          loading: isEdit ? 'Updating department...' : 'Creating department...',
          success: (res: any) => {
            form.reset();
            onOpenChange(false)
            return res?.message;
          },
          error: (err: any) =>
            err?.data?.message ?? err?.message ?? (isEdit ? 'Error updating department' : 'Error creating department'),
        }
      );
    } catch (error) {
      console.error("Department creation/updating failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Department" : "Create Department"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify department details and permissions.'
              : 'Set up a new department with permissions.'}
          </DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] py-1 pe-3'>
          <form 
            id='user-form'
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4 px-0.5"
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">
                      Department Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Department Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="description"
                        placeholder="I'm having an issue with the login button on mobile."
                        rows={3}
                        className="min-h-12 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value?.length}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
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
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type='submit' form='user-form'  disabled={isCreating || isUpdating}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};