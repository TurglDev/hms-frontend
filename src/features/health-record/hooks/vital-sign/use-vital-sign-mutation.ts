import { useAddVitalSignMutation, useUpdateVitalSignMutation, useDeleteVitalSignMutation} from "../../api/vitalSignApi";
import type { VitalSignFormValues } from "../../validation/vital-sign.schema";

export const useVitalSignMutation = () => {

  const [addVitalSign, { isLoading: isAdding }] = useAddVitalSignMutation();
  const [updateVitalSign, { isLoading: isUpdating }] = useUpdateVitalSignMutation();
  const [deleteVitalSign, { isLoading: isDeleting }] = useDeleteVitalSignMutation();

  const handleCreate = async (values: VitalSignFormValues) => {
    return await addVitalSign(values).unwrap();
  };

  const handleUpdate = async (id: string, values: VitalSignFormValues) => {
    return await updateVitalSign({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => deleteVitalSign(id).unwrap();

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isAdding,
    isUpdating,
    isDeleting
  };
};
