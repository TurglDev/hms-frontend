/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { FollowUp } from "../types/follow-up.types";
import type { FollowUpFormValues } from "../validation/follow-up.schema";

export const followUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFollowUpsByHealthRecordId: builder.query<FollowUp[], string>({
      query: (healthRecordId) => `/follow-ups/health-record/${healthRecordId}`,
      transformResponse: (response: any) => response.data,
      providesTags: ["FollowUp"],
    }),
    addFollowUp: builder.mutation<FollowUp, FollowUpFormValues>({
      query: (body) => ({
        url: "/follow-ups",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FollowUp"],
    }),
    updateFollowUp: builder.mutation<FollowUp, { id: string; data: FollowUpFormValues }>({
      query: ({ id, data }) => ({
        url: `/follow-ups/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FollowUp"],
    }),
    deleteFollowUp: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/follow-ups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FollowUp"],
    }),
    
  }),
});

export const {
  useGetFollowUpsByHealthRecordIdQuery,
  useAddFollowUpMutation,
  useUpdateFollowUpMutation,
  useDeleteFollowUpMutation,
} = followUpApi;
