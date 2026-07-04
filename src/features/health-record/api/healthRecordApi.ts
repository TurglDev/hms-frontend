/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { HealthRecord } from "../types/health-record.types";
import type { HealthRecordFormValues } from "../validation/health-record.schema";
import type { PatientFormValues } from "@/features/patient/validation/patient.schema";

export const healthRecordApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHealthRecords: builder.query<HealthRecord[], void>({
      query: () => "/health-records",
      transformResponse: (response: any) => response.data,
      providesTags: ["HealthRecord"],
    }),
    getHealthRecordsByPatientCardId: builder.query<HealthRecord[], string>({
      query: (patientCardId) => `/health-records/patient-card/${patientCardId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["HealthRecord"],
    }),
    getHealthRecordsByPatientCardIdAndPatientId: builder.query<HealthRecord[], { patientCardId: string; patientId: string }>({
      query: ({patientCardId, patientId}) => `/health-records/patient-card/${patientCardId}/patient/${patientId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["HealthRecord"],
    }),
    getHealthRecord: builder.query<HealthRecord, string>({
      query: (id) => `/health-records/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) => [{ type: "HealthRecord", id }],
    }),
    createHealthRecord: builder.mutation<HealthRecord, HealthRecordFormValues>({
      query: (body) => ({
        url: "/health-records",
        method: "POST",
        body,
      }),
      invalidatesTags: ["HealthRecord"],
    }),
    // updateHealthRecord: builder.mutation<HealthRecord, { id: string; data: UpdateHealthRecordFormValues }>({
    //   query: ({ id, data }) => ({
    //     url: `/health-records/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["HealthRecord"],
    // }),
    addPatientToHealthRecord: builder.mutation<HealthRecord, { id: string; data: PatientFormValues }>({
      query: ({ id, data }) => ({
        url: `/health-records/${id}/add-patient`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Patient"],
    }),
    deleteHealthRecord: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/health-records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HealthRecord"],
    }),
    
  }),
});

export const {
  useGetHealthRecordsQuery,
  useGetHealthRecordsByPatientCardIdQuery,
  useGetHealthRecordsByPatientCardIdAndPatientIdQuery,
  useGetHealthRecordQuery,
  useCreateHealthRecordMutation,
  // useUpdateHealthRecordMutation,
  useAddPatientToHealthRecordMutation,
  useDeleteHealthRecordMutation,
} = healthRecordApi;
