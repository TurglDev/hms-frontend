import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../api/departmentApi";
import type { DepartmentFormValues } from "../validation/department.schema";

export const useDepartments = () => {

  const { data: departments = [], isLoading } = useGetDepartmentsQuery();
  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const handleCreate = async (values: DepartmentFormValues) => {
    return await createDepartment(values).unwrap();
  };

  const handleUpdate = async (id: string, values: DepartmentFormValues) => {
    return await updateDepartment({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => {
    return await deleteDepartment(id).unwrap();
  };

  return { 
    departments,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreate,
    handleUpdate,
    handleDelete,
   };
};
