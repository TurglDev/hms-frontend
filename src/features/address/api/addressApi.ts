/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/app/api/baseApi";
import type { Address } from "../types/address.types";
import type { AddressFormValues } from "../validation/address.schema";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddress: builder.query<Address, string>({
      query: (id) => `/addresses/${id}`,
      transformResponse: (response: any) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Address", id }],
    }),
    createAddress: builder.mutation<Address, AddressFormValues>({
      query: (body) => {
        let url: string;
        if (body.addressType === "staff") {
          url = "/addresses/staff";
        } else if (body.addressType === "patient") {
          url = "/addresses/patient";
        } else {
          throw new Error(`Unknown addressType: ${body.addressType}`);
        }

        return {
          url,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation<Address, { id: string; data: AddressFormValues }>({
      query: ({ id, data }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
} = addressApi;
