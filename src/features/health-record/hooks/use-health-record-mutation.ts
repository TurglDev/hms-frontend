import { 
    useCreateHealthRecordMutation,
    useDeleteHealthRecordMutation
 } from "../api/healthRecordApi";
import type { HealthRecordFormValues } from "../validation/health-record.schema";

export const useHealthRecordMutation = () => {

  const [createHealthRecord, { isLoading: isCreating }] = useCreateHealthRecordMutation();
  const [deleteHealthRecord, { isLoading: isDeleting }] = useDeleteHealthRecordMutation();

  const handleCreate = async (values: HealthRecordFormValues) => {
    return await createHealthRecord(values).unwrap();
  };

  const handleDelete = async (id: string) => deleteHealthRecord(id).unwrap();

  return {
    handleCreate,
    handleDelete,
    isCreating,
    isDeleting
   };
};