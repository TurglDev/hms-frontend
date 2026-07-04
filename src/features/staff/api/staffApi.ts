/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Staff } from "../types/staff.types";
import type { AssignDepartmentsFormValues, StaffFormValues, UpdateStaffFormValues } from "../validation/staff.schema";

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffs: builder.query<Staff[], void>({
      query: () => "/staffs",
      transformResponse: (response: any) => response.data.staffs,
      providesTags: ["Staff"],
    }),
    getStaff: builder.query<Staff, string>({
      query: (id) => `/staffs/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Staff", id }],
    }),
    createStaff: builder.mutation<Staff, StaffFormValues>({
      query: (body) => ({
        url: "/staffs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: builder.mutation<Staff, { id: string; data: UpdateStaffFormValues }>({
      query: ({ id, data }) => ({
        url: `/staffs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    assignDepartments: builder.mutation<Staff, { id: string, data: AssignDepartmentsFormValues }>({
      query: ({id, data}) => ({
        url: `/staffs/${id}/departments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/staffs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),
    
  }),
});

export const {
  useGetStaffsQuery,
  useGetStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useAssignDepartmentsMutation,
  useDeleteStaffMutation,
} = staffApi;
