import {
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useDeactivateAccountMutation,
  useActivateAccountMutation,
  useDeleteAccountMutation,
} from "../api/userApi";
import type { UserFormValues } from "../validation/user.schema";

export const useUsers = (id?: string) => {

  const { data: user } = useGetUserQuery(id!, { skip: !id });
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();
  const [deactivateAccount, { isLoading: isDeactivating }] = useDeactivateAccountMutation();
  const [activateAccount, { isLoading: isActivating }] = useActivateAccountMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const handleCreate = async (values: UserFormValues) => {
    return await createUser(values).unwrap();
  };

  const handleUpdate = async (id: string, values: UserFormValues) => {
    return await updateUser({ id, data: values }).unwrap();
  };

  const handleResetPassword = async (id: string) => {
    return await resetPassword(id).unwrap();
  };

  const handleDeactivateAccount = async (id: string) => {
    return await deactivateAccount(id).unwrap();
  };

  const handleActivateAccount = async (id: string) => {
    return await activateAccount(id).unwrap();
  };

  const handleDeleteAccount = async (id: string) => {
    return await deleteAccount(id).unwrap();
  };

  return { 
    user,
    isCreating,
    isUpdating,
    isResetting,
    isDeactivating,
    isActivating,
    isDeleting,
    handleCreate,
    handleUpdate,
    handleResetPassword,
    handleDeactivateAccount,
    handleActivateAccount,
    handleDeleteAccount,
   };
};
