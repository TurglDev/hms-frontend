import {
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
  useVerifyTokenQuery,
} from "../api/authApi";
import  { type ForgotPasswordFormValues, type LoginFormValues, type SetPasswordFormValues } from "../validation/auth.schema";

export const useAuths = (token?: string) => {

  //const { data: user, isLoading, refetch } = useGetProfileQuery();
  const [ login ] = useLoginMutation();
  const [ logout ] = useLogoutMutation();
  const {
    data: verifyData,
    isLoading: isVerifyingToken,
  } = useVerifyTokenQuery(token!, {
    skip: !token,
  })
  const [ setPassword ] = useSetPasswordMutation();
  const [ forgotPassword ] = useForgotPasswordMutation();
  const [ resetPassword ] = useResetPasswordMutation();

  const handleLogin = async (values: LoginFormValues) => {
    return await login(values).unwrap();
  };

  const handleLogout = async () => {
    return await logout().unwrap();
  };

  const handleSetPassword = async (values: SetPasswordFormValues) => {
    return await setPassword(values).unwrap();
  };

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    return await forgotPassword(values).unwrap();
  };

  const handleResetPassword = async (values: SetPasswordFormValues) => {
    return await resetPassword(values).unwrap();
  };


  return {
    handleLogin,
    handleLogout,
    verifyToken: verifyData,
    isVerifyingToken,
    handleSetPassword,
    handleForgotPassword,
    handleResetPassword,
  };
};
