import { useAddFollowUpMutation, useUpdateFollowUpMutation, useDeleteFollowUpMutation} from "../../api/followUpApi";
import type { FollowUpFormValues } from "../../validation/follow-up.schema";

export const useFollowUpMutation = () => {

  const [addFollowUp, { isLoading: isAdding }] = useAddFollowUpMutation();
  const [updateFollowUp, { isLoading: isUpdating }] = useUpdateFollowUpMutation();
  const [deleteFollowUp, { isLoading: isDeleting }] = useDeleteFollowUpMutation();

  const handleCreate = async (values: FollowUpFormValues) => {
    return await addFollowUp(values).unwrap();
  };

  const handleUpdate = async (id: string, values: FollowUpFormValues) => {
    return await updateFollowUp({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => deleteFollowUp(id).unwrap();

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isAdding,
    isUpdating,
    isDeleting
  };
};
