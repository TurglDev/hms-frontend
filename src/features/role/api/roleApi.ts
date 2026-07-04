/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Role } from "../types/role.types";
import type { RoleFormValues } from "../validation/role.schema";

export const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => "/roles",
      transformResponse: (response: any) => response.data.roles,
      providesTags: ["Role"],
    }),
    createRole: builder.mutation<Role, RoleFormValues>({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation<Role, { id: string; data: RoleFormValues }>({
      query: ({ id, data }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
