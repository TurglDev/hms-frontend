/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Department } from "../types/department.types";
import type { DepartmentFormValues } from "../validation/department.schema";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
      transformResponse: (response: any) => response.data.departments,
      providesTags: ["Department"],
    }),
    createDepartment: builder.mutation<Department, DepartmentFormValues>({
      query: (body) => ({
        url: "/departments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation<Department, { id: string; data: DepartmentFormValues }>({
      query: ({ id, data }) => ({
        url: `/departments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
