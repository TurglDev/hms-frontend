import { useAddDiagnosisMutation, useUpdateDiagnosisMutation, useDeleteDiagnosisMutation} from "../../api/diagnosisApi";
import type { DiagnosisFormValues } from "../../validation/diagnosis.schema";

export const useDiagnosisMutation = () => {

  const [addDiagnosis, { isLoading: isAdding }] = useAddDiagnosisMutation();
  const [updateDiagnosis, { isLoading: isUpdating }] = useUpdateDiagnosisMutation();
  const [deleteDiagnosis, { isLoading: isDeleting }] = useDeleteDiagnosisMutation();

  const handleCreate = async (values: DiagnosisFormValues) => {
    return await addDiagnosis(values).unwrap();
  };

  const handleUpdate = async (id: string, values: DiagnosisFormValues) => {
    return await updateDiagnosis({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => deleteDiagnosis(id).unwrap();

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isAdding,
    isUpdating,
    isDeleting
  };
};
