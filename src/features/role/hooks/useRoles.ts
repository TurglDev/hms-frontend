import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "../api/roleApi";
import type { RoleFormValues } from "../validation/role.schema";

export const useRoles = () => {

  const { data: roles = [], isLoading } = useGetRolesQuery();
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();

  const handleCreate = async (values: RoleFormValues) => {
    return await createRole(values).unwrap();
  };

  const handleUpdate = async (id: string, values: RoleFormValues) => {
    return await updateRole({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => {
    return await deleteRole(id).unwrap();
  };

  return { 
    roles,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreate,
    handleUpdate,
    handleDelete,
   };
};
