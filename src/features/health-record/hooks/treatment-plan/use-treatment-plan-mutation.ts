import { useAddTreatmentPlanMutation, useUpdateTreatmentPlanMutation, useDeleteTreatmentPlanMutation} from "../../api/treatmentPlanApi";
import type { TreatmentPlanFormValues } from "../../validation/treatment-plan.schema";

export const useTreatmentPlanMutation = () => {

  const [addTreatmentPlan, { isLoading: isAdding }] = useAddTreatmentPlanMutation();
  const [updateTreatmentPlan, { isLoading: isUpdating }] = useUpdateTreatmentPlanMutation();
  const [deleteTreatmentPlan, { isLoading: isDeleting }] = useDeleteTreatmentPlanMutation();

  const handleCreate = async (values: TreatmentPlanFormValues) => {
    return await addTreatmentPlan(values).unwrap();
  };

  const handleUpdate = async (id: string, values: TreatmentPlanFormValues) => {
    return await updateTreatmentPlan({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => deleteTreatmentPlan(id).unwrap();

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isAdding,
    isUpdating,
    isDeleting
  };
};
