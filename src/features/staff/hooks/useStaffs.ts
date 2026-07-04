import {
  useGetStaffsQuery,
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useAssignDepartmentsMutation,
} from "../api/staffApi";
import type { AssignDepartmentsFormValues, StaffFormValues, UpdateStaffFormValues } from "../validation/staff.schema";

export const useStaffs = (id?: string) => {

  const { data: staffs = [], isLoading } = useGetStaffsQuery();
  const { data: staff } = useGetStaffQuery(id!, { skip: !id });
  const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
  const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();
  const [assignDepartments, { isLoading: isAssigning }] = useAssignDepartmentsMutation();
  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation();
  

  const handleCreate = async (values: StaffFormValues) => {
    return await createStaff(values).unwrap();
  };

  const handleUpdate = async (id: string, values: UpdateStaffFormValues) => {
    return await updateStaff({ id, data: values }).unwrap();
  };

  const handleAssignDepartment = async (id: string, values: AssignDepartmentsFormValues) => {
    return await assignDepartments({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => {
    return await deleteStaff(id).unwrap();
  };

  return { 
    staffs,
    staff,
    isLoading,
    isCreating,
    isUpdating,
    isAssigning,
    isDeleting,
    handleCreate,
    handleUpdate,
    handleAssignDepartment,
    handleDelete,
   };
};
