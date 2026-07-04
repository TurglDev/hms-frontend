// src/app/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

// Define the base query with tenant and auth awareness
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;

    // Add tenant ID from Redux or localStorage
    const tenantId =
      state.tenant?.tenant?.id || localStorage.getItem("tenantId");
    if (tenantId) {
      headers.set("X-Tenant-ID", tenantId);
    }

    // Add auth token if available
    // const token = state.auth?.token || localStorage.getItem("token");
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }

    return headers;
  },
});

// Create a shared base API slice
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Tenant", 
    "User", 
    "Auth", 
    "Role", 
    "Permission",
    "Department",
    "Staff",
    "Address",
    "NextOfKin",
    "PatientCard",
    "Patient",
    "PatientDocument",
    "Dashboard",
    "HealthRecord",
    "VitalSign",
    "Diagnosis",
    "Symptom",
    "TreatmentPlan",
    "Medication",
    "LabTest",
    "FollowUp",
  ], // customize per feature
  endpoints: () => ({}),
});
