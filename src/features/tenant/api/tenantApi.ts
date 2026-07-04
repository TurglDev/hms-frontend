import { baseApi } from "@/app/api/baseApi";
import type { Tenant } from "../types/tenant.types";

export const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTenantBySubdomain: builder.query<Tenant, string>({
      query: (subdomain) => `/tenants/${subdomain}`,
      providesTags: ["Tenant"],
    }),
  }),
});

export const { useGetTenantBySubdomainQuery } = tenantApi;
