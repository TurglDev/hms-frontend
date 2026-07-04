
import { useEffect, useState } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { StaffFormValues } from "../../validation/staff.schema";
import { useDepartments } from "@/features/department/hooks/useDepartments";
import { useRoles } from "@/features/role/hooks/useRoles";
import { usePermissions } from "@/features/permission/hooks/usePermissions";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { UserPlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

type SystemUserStepProps = {
  form: UseFormReturn<StaffFormValues>
}

export function SystemUserStep({ form }: SystemUserStepProps) {

  const [systemUser, setSystemUser] = useState(false);

  const { departments } = useDepartments();
  const { roles } = useRoles();
  const { permissions } = usePermissions();

  const watchedRoles = form.watch("user.roles");
  const selectedRoleIds = React.useMemo(() => watchedRoles || [], [watchedRoles]);
  
  useEffect(() => {
    const selectedRolesObjects = roles.filter(role => selectedRoleIds.includes(role.id));
    const rolePermissionIds = selectedRolesObjects.flatMap(role =>
      (role.permissions || []).map(p => p.id)
    );

    const currentPermissions = form.getValues("user.permissions") || [];
    const newPermissions = currentPermissions.filter(
      id => !rolePermissionIds.includes(id)
    );

    if (newPermissions.length !== currentPermissions.length) {
      form.setValue("user.permissions", newPermissions);
    }
  }, [selectedRoleIds, roles, form]);

  const selectedRolesObjects = roles.filter(role => selectedRoleIds.includes(role.id));
  const rolePermissionIds = selectedRolesObjects.flatMap(role =>
    (role.permissions || []).map(p => p.id)
  );
  
  return (
    <>
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
                className="min-h-[50px]"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="user.systemUser"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field 
              data-invalid={fieldState.invalid} 
              className="grid grid-cols-1 md:grid-cols-5 items-center justify-between gap-4 rounded-lg border p-4 col-span-full bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-1 md:col-span-4">
                <FieldLabel className="text-base font-medium flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Create System User
                </FieldLabel>
                <FieldDescription>
                  {field.value
                    ? 'Staff will receive login credentials via email'
                    : 'No Staff System account will be created'}
                </FieldDescription>
              </div>


              <div className="flex items-center gap-2">
                <Switch
                  id="system-user-toggle"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    setSystemUser(checked);
                    if(!checked) {
                      form.clearErrors("email");
                    }
                  }}
                  className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                />
                <FieldLabel htmlFor="system-user-toggle" className="text-sm font-medium">
                  {field.value ? 'Enabled' : 'Disabled'}
                </FieldLabel>
              </div>
            </Field>
          )}
        />
        
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">
                Email
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="you@example.com"
                autoComplete="off"
                className="min-h-[50px]"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {systemUser && (
          <Tabs defaultValue="roles" className="justify-between rounded-lg border p-4 bg-card  hover:shadow-md transition-shadow w-full">
            <TabsList className="mb-4 p-0">
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="roles">
              <Controller
                name="user.roles"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="roles" hidden>Roles</FieldLabel>
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
                name="user.permissions"
                control={form.control}
                render={({ field, fieldState }) => {
                  const availablePermissions = permissions.filter(
                    (p) => !rolePermissionIds.includes(p.id)
                  );
                  return (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="permissions" hidden>Permissions</FieldLabel>
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
        )}
      </>
  )
}