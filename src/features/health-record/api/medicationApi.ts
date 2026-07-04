/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Medication } from "../types/medication.types";
import type { MedicationFormValues } from "../validation/medication.schema";

export const medicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicationsByHealthRecordId: builder.query<Medication[], string>({
      query: (healthRecordId) => `/medications/health-record/${healthRecordId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["Medication"],
    }),
    addMedication: builder.mutation<Medication, MedicationFormValues>({
      query: (body) => ({
        url: "/medications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Medication"],
    }),
    updateMedication: builder.mutation<Medication, { id: string; data: MedicationFormValues }>({
      query: ({ id, data }) => ({
        url: `/medications/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Medication"],
    }),
    deleteMedication: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/medications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medication"],
    }),
    
  }),
});

export const {
  useGetMedicationsByHealthRecordIdQuery,
  useAddMedicationMutation,
  useUpdateMedicationMutation,
  useDeleteMedicationMutation,
} = medicationApi;
