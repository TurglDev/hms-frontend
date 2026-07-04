/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Symptom } from "../types/symptom.types";
import type { SymptomFormValues } from "../validation/symptom.schema";

export const symptomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSymptomsByHealthRecordId: builder.query<Symptom[], string>({
      query: (healthRecordId) => `/symptoms/health-record/${healthRecordId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["Symptom"],
    }),
    addSymptom: builder.mutation<Symptom, SymptomFormValues>({
      query: (body) => ({
        url: "/symptoms",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Symptom"],
    }),
    updateSymptom: builder.mutation<Symptom, { id: string; data: SymptomFormValues }>({
      query: ({ id, data }) => ({
        url: `/symptoms/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Symptom"],
    }),
    deleteSymptom: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/symptoms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Symptom"],
    }),
    
  }),
});

export const {
  useGetSymptomsByHealthRecordIdQuery,
  useAddSymptomMutation,
  useUpdateSymptomMutation,
  useDeleteSymptomMutation,
} = symptomApi;
