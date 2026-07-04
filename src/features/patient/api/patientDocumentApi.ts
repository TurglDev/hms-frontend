/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { PatientDocument } from "../types/patient-document.types";
import type { PatientDocumentFormValues } from "../validation/patient-document.schema";

export const patientDocumentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatientDocumentsByPatientCardId: builder.query<PatientDocument[], string>({
      query: (patientCardId) => `/patient/documents/patientCardId/${patientCardId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["PatientDocument"],
    }),
    getPatientDocumentsByPatientCardIdAndPatientId: builder.query<PatientDocument[], { patientCardId: string; patientId: string }>({
      query: ({patientCardId, patientId}) => `/patient/documents/patientCardId/${patientCardId}/patientId/${patientId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["PatientDocument"],
    }),
    getPatientDocument: builder.query<PatientDocument, string>({
      query: (id) => `/patient/documents/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) => [{ type: "PatientDocument", id }],
    }),
    uploadPatientDocument: builder.mutation<PatientDocument, FormData>({
      query: (formData) => ({
        url: "/patient/documents",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["PatientDocument"],
    }),
    updatePatientDocument: builder.mutation<PatientDocument, { id: string; data: PatientDocumentFormValues }>({
      query: ({ id, data }) => ({
        url: `/patient/documents/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PatientDocument"],
    }),
    deletePatientDocument: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/patient/documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PatientDocument"],
    }),
    
  }),
});

export const {
  useGetPatientDocumentsByPatientCardIdQuery,
  useGetPatientDocumentsByPatientCardIdAndPatientIdQuery,
  useGetPatientDocumentQuery,
  useUploadPatientDocumentMutation,
  useUpdatePatientDocumentMutation,
  useDeletePatientDocumentMutation,
} = patientDocumentApi;
