import {
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "../api/addressApi";
import type { AddressFormValues } from "../validation/address.schema";

export const useAddresses = (id?: string) => {

  const { data: address } = useGetAddressQuery(id!, { skip: !id });
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

  const handleCreate = async (values: AddressFormValues) => {
    return await createAddress(values).unwrap();
  };

  const handleUpdate = async (id: string, values: AddressFormValues) => {
    return await updateAddress({ id, data: values }).unwrap();
  };

  return { 
    address,
    isCreating,
    isUpdating,
    handleCreate,
    handleUpdate,
   };
};
