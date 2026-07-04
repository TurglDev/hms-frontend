/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { PatientCard } from "../types/patient-card.types";
import type { PatientCardFormValues, UpdatePatientCardFormValues } from "../validation/patient-card.schema";
import type { PatientFormValues } from "@/features/patient/validation/patient.schema";

export const patientCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatientCards: builder.query<PatientCard[], void>({
      query: () => "/patient-cards",
      transformResponse: (response: any) => response.data.patientCards,
      providesTags: ["PatientCard"],
    }),
    getPatientCard: builder.query<PatientCard, string>({
      query: (id) => `/patient-cards/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) => [{ type: "PatientCard", id }],
    }),
    createPatientCard: builder.mutation<PatientCard, PatientCardFormValues>({
      query: (body) => ({
        url: "/patient-cards",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PatientCard"],
    }),
    updatePatientCard: builder.mutation<PatientCard, { id: string; data: UpdatePatientCardFormValues }>({
      query: ({ id, data }) => ({
        url: `/patient-cards/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PatientCard"],
    }),
    addPatientToPatientCard: builder.mutation<PatientCard, { id: string; data: PatientFormValues }>({
      query: ({ id, data }) => ({
        url: `/patient-cards/${id}/add-patient`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Patient"],
    }),
    deletePatientCard: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/patient-cards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PatientCard"],
    }),
    
  }),
});

export const {
  useGetPatientCardsQuery,
  useGetPatientCardQuery,
  useCreatePatientCardMutation,
  useUpdatePatientCardMutation,
  useAddPatientToPatientCardMutation,
  useDeletePatientCardMutation,
} = patientCardApi;
