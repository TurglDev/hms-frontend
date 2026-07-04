import { baseApi } from "@/app/api/baseApi";
import type { AuthCredentials, AuthResponse, User } from "../types/auth.types";
import type { ForgotPasswordFormValues, SetPasswordFormValues } from "../validation/auth.schema";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ['Auth'],
    }),

    getProfile: builder.query<User, void>({
      query: () => "/auth/profile",
      providesTags: ['User'],
    }),

    verifyToken: builder.query<{ valid: boolean }, string>({
      query: (token) => ({
        url: '/auth/verify-token',
        params: { token },
      }),
      providesTags: ['Auth'],
    }),

    setPassword: builder.mutation<void, SetPasswordFormValues>({
      query: (body) => ({
        url: "/auth/set-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordFormValues>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    resetPassword: builder.mutation<void, SetPasswordFormValues>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useVerifyTokenQuery,
  useSetPasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
