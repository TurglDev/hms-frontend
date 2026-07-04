/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Patient } from "../types/patient.types";
import type { PatientFormValues } from "../validation/patient.schema";

export const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], void>({
      query: () => "/patients",
      transformResponse: (response: any) => response.data.patientCards,
      providesTags: ["Patient"],
    }),
    getPatientsByPatientCardId: builder.query<Patient[], string>({
      query: (patientCardId) => `/patients/patientCardId/${patientCardId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["Patient"],
    }),
    getPatient: builder.query<Patient, string>({
      query: (id) => `/patients/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Patient", id }],
    }),
    createPatient: builder.mutation<Patient, PatientFormValues>({
      query: (body) => ({
        url: "/patients",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Patient"],
    }),
    updatePatient: builder.mutation<Patient, { id: string; data: PatientFormValues }>({
      query: ({ id, data }) => ({
        url: `/patients/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Patient"],
    }),
    deletePatient: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Patient"],
    }),
    
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientsByPatientCardIdQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApi;
