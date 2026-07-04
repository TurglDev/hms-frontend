/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { VitalSign } from "../types/vital-sign.types";
import type { VitalSignFormValues } from "../validation/vital-sign.schema";

export const vitalSignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVitalSignsByHealthRecordId: builder.query<VitalSign[], string>({
      query: (healthRecordId) => `/vital-signs/health-record/${healthRecordId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["VitalSign"],
    }),
    addVitalSign: builder.mutation<VitalSign, VitalSignFormValues>({
      query: (body) => ({
        url: "/vital-signs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["VitalSign"],
    }),
    updateVitalSign: builder.mutation<VitalSign, { id: string; data: VitalSignFormValues }>({
      query: ({ id, data }) => ({
        url: `/vital-signs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["VitalSign"],
    }),
    deleteVitalSign: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/vital-signs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VitalSign"],
    }),
    
  }),
});

export const {
  useGetVitalSignsByHealthRecordIdQuery,
  useAddVitalSignMutation,
  useUpdateVitalSignMutation,
  useDeleteVitalSignMutation,
} = vitalSignApi;
