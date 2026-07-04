import {
  useGetNextOfKinQuery,
  useCreateNextOfKinMutation,
  useUpdateNextOfKinMutation,
} from "../api/nextOfKinApi";
import type { NextOfKinFormValues } from "../validation/next-of-kin.schema";

export const useNextOfKin = (id?: string) => {

  const { data: nextOfKin } = useGetNextOfKinQuery(id!, { skip: !id });
  const [createNextOfKin, { isLoading: isCreating }] = useCreateNextOfKinMutation();
  const [updateNextOfKin, { isLoading: isUpdating }] = useUpdateNextOfKinMutation();

  const handleCreate = async (values: NextOfKinFormValues) => {
    return await createNextOfKin(values).unwrap();
  };

  const handleUpdate = async (id: string, values: NextOfKinFormValues) => {
    return await updateNextOfKin({ id, data: values }).unwrap();
  };

  return { 
    nextOfKin,
    isCreating,
    isUpdating,
    handleCreate,
    handleUpdate,
   };
};
