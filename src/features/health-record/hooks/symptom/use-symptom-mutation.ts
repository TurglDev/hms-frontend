import { useAddSymptomMutation, useUpdateSymptomMutation, useDeleteSymptomMutation} from "../../api/symptomApi";
import type { SymptomFormValues } from "../../validation/symptom.schema";

export const useSymptomMutation = () => {

  const [addSymptom, { isLoading: isAdding }] = useAddSymptomMutation();
  const [updateSymptom, { isLoading: isUpdating }] = useUpdateSymptomMutation();
  const [deleteSymptom, { isLoading: isDeleting }] = useDeleteSymptomMutation();

  const handleCreate = async (values: SymptomFormValues) => {
    return await addSymptom(values).unwrap();
  };

  const handleUpdate = async (id: string, values: SymptomFormValues) => {
    return await updateSymptom({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => deleteSymptom(id).unwrap();

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isAdding,
    isUpdating,
    isDeleting
  };
};
