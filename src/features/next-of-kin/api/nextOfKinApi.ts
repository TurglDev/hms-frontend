/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { NextOfKin } from "../types/next-of-kin.types";
import type { NextOfKinFormValues } from "../validation/next-of-kin.schema";

export const nextOfKinApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNextOfKin: builder.query<NextOfKin, string>({
      query: (id) => `/next-of-kins/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) => [{ type: "NextOfKin", id }],
    }),
    createNextOfKin: builder.mutation<NextOfKin, NextOfKinFormValues>({
      query: (body) => {
        let url: string;
        if (body.nextOfKinType === "staff") {
          url = "/next-of-kins/staff";
        } else if (body.nextOfKinType === "patient") {
          url = "/next-of-kins/patient";
        } else {
          throw new Error(`Unknown nextOfKinType: ${body.nextOfKinType}`);
        }

        return {
          url,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["NextOfKin"],
    }),
    updateNextOfKin: builder.mutation<NextOfKin, { id: string; data: NextOfKinFormValues }>({
      query: ({ id, data }) => ({
        url: `/next-of-kins/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["NextOfKin"],
    }),
  }),
});

export const {
  useGetNextOfKinQuery,
  useCreateNextOfKinMutation,
  useUpdateNextOfKinMutation,
} = nextOfKinApi;
