/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { User } from "../types/user.types";
import type { UserFormValues } from "../validation/user.schema";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<User, UserFormValues>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<User, { id: string; data: UserFormValues }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}/reset-password`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    deactivateAccount: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}/deactivate-account`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    activateAccount: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}/activate-account`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    deleteAccount: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}/soft-delete`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useDeactivateAccountMutation,
  useActivateAccountMutation,
  useDeleteAccountMutation,
} = userApi;
