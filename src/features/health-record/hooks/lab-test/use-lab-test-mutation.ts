import { useAddLabTestMutation, useUpdateLabTestMutation, useDeleteLabTestMutation} from "../../api/labTestApi";
import type { LabTestFormValues } from "../../validation/lab-test.schema";

export const useLabTestMutation = () => {

  const [addLabTest, { isLoading: isAdding }] = useAddLabTestMutation();
  const [updateLabTest, { isLoading: isUpdating }] = useUpdateLabTestMutation();
  const [deleteLabTest, { isLoading: isDeleting }] = useDeleteLabTestMutation();

  const handleCreate = async (values: LabTestFormValues) => {
    return await addLabTest(values).unwrap();
  };

  const handleUpdate = async (id: string, values: LabTestFormValues) => {
    return await updateLabTest({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => deleteLabTest(id).unwrap();

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isAdding,
    isUpdating,
    isDeleting
  };
};
