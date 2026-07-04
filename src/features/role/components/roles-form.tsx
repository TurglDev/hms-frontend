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
import { useRoles } from "../hooks/useRoles";
import { toast } from "sonner";
import { roleSchema, type RoleFormValues } from "../validation/role.schema";
import { MultiSelect } from "@/components/ui/multi-select";
import { usePermissions } from "@/features/permission/hooks/usePermissions";
import type { Role } from "../types/role.types";

interface RoleFormProps {
  currentRow?: Role
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RoleForm({
  currentRow,
  open,
  onOpenChange,
}: RoleFormProps) {

  const isEdit = !!currentRow

  const { permissions } = usePermissions();

  const { handleCreate, handleUpdate, isCreating, isUpdating } = useRoles();
  
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: isEdit
      ? {
          name: currentRow.name,
          description: currentRow.description,
          permissions: currentRow.permissions?.map((p) => p.id) || [],
        } 
      : { name: "", description: "", permissions: [] },
  });

  const onSubmit = async (values: RoleFormValues) => {
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
          loading: isEdit ? 'Updating role...' : 'Creating role...',
          success: (res: any) => {
            form.reset();
            onOpenChange(false)
            return res?.message;
          },
        error: (err: any) =>
          err?.data?.message ?? err?.message ?? (isEdit ? 'Error updating role' : 'Error creating role'),
        }
      );
    } catch (error) {
      console.error("Role creation/updating failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Role" : "Create Role"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify role details and permissions.'
              : 'Set up a new role with permissions.'}
          </DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] py-1 pe-3'>
          <form 
            id='role-form'
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
                      Role Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Role Name"
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

              <Controller
                name="permissions"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="permissions">
                      Permissions
                    </FieldLabel>
                    <MultiSelect
                      id="permissions"
                      aria-invalid={fieldState.invalid}
                      options={permissions.map((permission) => ({
                        label: permission.name
                          .replace(/-/g, ' ')
                          .replace(/:/g, ' ')
                          .split(' ')
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' '),
                        value: permission.id, 
                      }))}
                      value={field.value || []}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Choose permissions..."
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
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type='submit' form='role-form'  disabled={isCreating || isUpdating}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};