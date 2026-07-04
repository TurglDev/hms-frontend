/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { TreatmentPlan } from "../types/treatment-plan.types";
import type { TreatmentPlanFormValues } from "../validation/treatment-plan.schema";

export const treatmentPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTreatmentPlansByHealthRecordId: builder.query<TreatmentPlan[], string>({
      query: (healthRecordId) => `/treatment-plans/health-record/${healthRecordId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["TreatmentPlan"],
    }),
    addTreatmentPlan: builder.mutation<TreatmentPlan, TreatmentPlanFormValues>({
      query: (body) => ({
        url: "/treatment-plans",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TreatmentPlan"],
    }),
    updateTreatmentPlan: builder.mutation<TreatmentPlan, { id: string; data: TreatmentPlanFormValues }>({
      query: ({ id, data }) => ({
        url: `/treatment-plans/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TreatmentPlan"],
    }),
    deleteTreatmentPlan: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/treatment-plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TreatmentPlan"],
    }),
    
  }),
});

export const {
  useGetTreatmentPlansByHealthRecordIdQuery,
  useAddTreatmentPlanMutation,
  useUpdateTreatmentPlanMutation,
  useDeleteTreatmentPlanMutation,
} = treatmentPlanApi;
