/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Permission } from "../types/permission.types";

export const permissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<Permission[], void>({
      query: () => "/permissions",
      transformResponse: (response: any) => response.data.permissions,
      providesTags: ["Permission"],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
} = permissionApi;
