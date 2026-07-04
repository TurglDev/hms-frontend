/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Diagnosis } from "../types/diagnosis.types";
import type { DiagnosisFormValues } from "../validation/diagnosis.schema";

export const diagnosisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiagnosisByHealthRecordId: builder.query<Diagnosis[], string>({
      query: (healthRecordId) => `/diagnosis/health-record/${healthRecordId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["Diagnosis"],
    }),
    addDiagnosis: builder.mutation<Diagnosis, DiagnosisFormValues>({
      query: (body) => ({
        url: "/diagnosis",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Diagnosis"],
    }),
    updateDiagnosis: builder.mutation<Diagnosis, { id: string; data: DiagnosisFormValues }>({
      query: ({ id, data }) => ({
        url: `/diagnosis/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Diagnosis"],
    }),
    deleteDiagnosis: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/diagnosis/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Diagnosis"],
    }),
    
  }),
});

export const {
  useGetDiagnosisByHealthRecordIdQuery,
  useAddDiagnosisMutation,
  useUpdateDiagnosisMutation,
  useDeleteDiagnosisMutation,
} = diagnosisApi;
