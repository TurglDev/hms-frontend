import { useAddMedicationMutation, useUpdateMedicationMutation, useDeleteMedicationMutation} from "../../api/medicationApi";
import type { MedicationFormValues } from "../../validation/medication.schema";

export const useMedicationMutation = () => {

  const [addMedication, { isLoading: isAdding }] = useAddMedicationMutation();
  const [updateMedication, { isLoading: isUpdating }] = useUpdateMedicationMutation();
  const [deleteMedication, { isLoading: isDeleting }] = useDeleteMedicationMutation();

  const handleCreate = async (values: MedicationFormValues) => {
    return await addMedication(values).unwrap();
  };

  const handleUpdate = async (id: string, values: MedicationFormValues) => {
    return await updateMedication({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => deleteMedication(id).unwrap();

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isAdding,
    isUpdating,
    isDeleting
  };
};
