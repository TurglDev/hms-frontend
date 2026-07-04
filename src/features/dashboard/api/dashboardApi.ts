/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalPatientCards: builder.query<{ total: number }, void>({
      query: () => "/dashboard/total-patient-cards",
      transformResponse: (response: any) => response.data,
      providesTags: ["Dashboard"],
    }),
    getTotalPatients: builder.query<{ total: number }, void>({
      query: () => "/dashboard/total-patients",
      transformResponse: (response: any) => response.data,
      providesTags: ["Dashboard"],
    }),
    getTotalMalePatients: builder.query<{ total: number }, void>({
      query: () => "/dashboard/total-male-patients",
      transformResponse: (response: any) => response.data,
      providesTags: ["Dashboard"],
    }),
    getTotalFemalePatients: builder.query<{ total: number }, void>({
      query: () => "/dashboard/total-female-patients",
      transformResponse: (response: any) => response.data,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetTotalPatientCardsQuery,
  useGetTotalPatientsQuery,
  useGetTotalMalePatientsQuery,
  useGetTotalFemalePatientsQuery,
} = dashboardApi;
