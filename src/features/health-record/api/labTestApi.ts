/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { LabTest } from "../types/lab-test.types";
import type { LabTestFormValues } from "../validation/lab-test.schema";

export const labTestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLabTestsByHealthRecordId: builder.query<LabTest[], string>({
      query: (healthRecordId) => `/lab-tests/health-record/${healthRecordId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["LabTest"],
    }),
    addLabTest: builder.mutation<LabTest, LabTestFormValues>({
      query: (body) => ({
        url: "/lab-tests",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LabTest"],
    }),
    updateLabTest: builder.mutation<LabTest, { id: string; data: LabTestFormValues }>({
      query: ({ id, data }) => ({
        url: `/lab-tests/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["LabTest"],
    }),
    deleteLabTest: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/lab-tests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LabTest"],
    }),
    
  }),
});

export const {
  useGetLabTestsByHealthRecordIdQuery,
  useAddLabTestMutation,
  useUpdateLabTestMutation,
  useDeleteLabTestMutation,
} = labTestApi;
