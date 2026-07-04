import {
  useCreateHealthRecordMutation
} from "../api/healthRecordApi";
import type { HealthRecordFormValues } from "../validation/health-record.schema";

export const useHealthRecords = () => {

  const [createHealthRecord, { isLoading: isCreating }] = useCreateHealthRecordMutation();

  const handleCreate = async (values: HealthRecordFormValues) => {
    return await createHealthRecord(values).unwrap();
  };

  return {
    isCreating,
    handleCreate
   };
};
