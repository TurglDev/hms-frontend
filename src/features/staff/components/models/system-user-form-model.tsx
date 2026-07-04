/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
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
import { useModal } from "@/hooks/modal/useModal";
import { toast } from "sonner";
import { userSchema, type UserFormValues } from "@/features/user/validation/user.schema";
import { useUsers } from "@/features/user/hooks/useUsers";
import { MultiSelect } from "@/components/ui/multi-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoles } from "@/features/role/hooks/useRoles";
import { usePermissions } from "@/features/permission/hooks/usePermissions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { User } from "@/features/user/types/user.types";

interface SystemUserFormModelProps {
  staffId: string,
  defaultValues?: User & { id?: string };
}

export function SystemUserFormModel({
  staffId,
  defaultValues,
}: SystemUserFormModelProps) {

  const { isOpen, closeModal } = useModal("system-user-form");
  const { roles } = useRoles();
  const { permissions } = usePermissions();
  const { handleCreate, handleUpdate, isCreating, isUpdating } = useUsers();
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { 
      email: defaultValues?.email ?? "",
      roles: defaultValues?.roles?.map(role => typeof role === 'string' ? role : role.id) ?? [],
      permissions: defaultValues?.permissions?.map(permission => typeof permission === 'string' ? permission : permission.id) ?? [],
    },
    mode: 'onChange',
  });

  const watchedRoles = form.watch("roles");
  const selectedRoleIds = React.useMemo(() => watchedRoles || [], [watchedRoles]);
  
  useEffect(() => {
    const selectedRolesObjects = roles.filter(role => selectedRoleIds.includes(role.id));
    const rolePermissionIds = selectedRolesObjects.flatMap(role =>
      (role.permissions || []).map(p => p.id)
    );
  
    const currentPermissions = form.getValues("permissions") || [];
    const newPermissions = currentPermissions.filter(
      id => !rolePermissionIds.includes(id)
    );
  
    if (newPermissions.length !== currentPermissions.length) {
      form.setValue("permissions", newPermissions);
    }
  }, [selectedRoleIds, roles, form]);
  
  const selectedRolesObjects = roles.filter(role => selectedRoleIds.includes(role.id));
  const rolePermissionIds = selectedRolesObjects.flatMap(role =>
    (role.permissions || []).map(p => p.id)
  );

  const isEdit = !!defaultValues?.id;
  
  const onSubmit = async (values: UserFormValues) => {
    try {
      toast.promise(
        async () => {
          if (isEdit && defaultValues!.id) {
            return await handleUpdate(defaultValues.id, values);
          } else {
            console.log(staffId);
            return await handleCreate(values);
          }
        },
        {
          loading: isEdit ? 'Updating system user...' : 'Creating system user...',
          success: (res: any) => {
            form.reset();
            closeModal()
            return res?.message;
          },
        error: (err: any) =>
          err?.data?.message ?? err?.message ?? (isEdit ? 'Error updating system user' : 'Error creating system user'),
        }
      );
    } catch (error) {
      console.error("System user creation/updating failed", error);
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
          <DialogTitle>{isEdit ? "Edit System User" : "Create System User"}</DialogTitle>
          <DialogDescription>
            {isEdit
            ? 'Modify system user details.'
            : 'Create a system user.'}
          </DialogDescription>
        </DialogHeader>
        <div className='py-1'>
        <form 
          id="system-user-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 px-0.5"
        >
          <FieldGroup>
            <Tabs defaultValue="roles" className="justify-between rounded-lg border p-4 bg-card  hover:shadow-md transition-shadow w-full">
              <TabsList className="mb-4 p-0">
                <TabsTrigger value="roles">Roles</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>

              <TabsContent value="roles">
                <Controller
                  name="roles"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="roles">Roles</FieldLabel>
                      <MultiSelect
                        id="roles"
                        aria-invalid={fieldState.invalid}
                        options={roles.map((role) => ({
                          label: role.name,
                          value: role.id,
                        }))}
                        value={field.value || []}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Choose roles..."
                        variant="inverted"
                        className="min-h-[50px]"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </TabsContent>

              <TabsContent value="permissions">
                <Controller
                  name="permissions"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const availablePermissions = permissions.filter(
                      (p) => !rolePermissionIds.includes(p.id)
                    );
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="permissions">Permissions</FieldLabel>
                        {availablePermissions.length > 0 ? (
                        <div className='flex flex-wrap items-center gap-2'>
                          {availablePermissions.map(permission => (
                            <Badge key={permission.name} variant='secondary' className='relative gap-2 rounded-sm px-3 py-1.5'>
                              <Checkbox
                                id={permission.name}
                                checked={field.value?.includes(permission.id) || false}
                                onCheckedChange={(checked) =>
                                  checked
                                    ? field.onChange([...(field.value || []), permission.id])
                                    : field.onChange(
                                        (field.value || []).filter((value) => value !== permission.id)
                                      )
                                }
                                className='data-[state=unchecked]:hidden'
                              />
                              <label htmlFor={permission.name} className='cursor-pointer select-none after:absolute after:inset-0'>
                                {
                                  permission.name
                                    .replace(/-/g, ' ')
                                    .replace(/:/g, ' ')
                                    .split(' ')
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')
                                }
                              </label>
                            </Badge>
                          ))}
                        </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No permissions available. Selected roles include all permissions.
                          </p>
                        )}
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                      );
                  }}
                />
              </TabsContent>
            </Tabs>
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
          <Button type='submit' form='system-user-form' disabled={isCreating || isUpdating}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};