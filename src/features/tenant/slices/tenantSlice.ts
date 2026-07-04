// src/features/tenant/slices/tenantSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TenantState, Tenant } from "../types/tenant.types";

const initialState: TenantState = {
  tenant: null,
  loading: true,
  error: null,
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Tenant>) => {
      state.tenant = action.payload;
      state.loading = false;
      localStorage.setItem("tenantId", action.payload.id);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTenant, setLoading, setError } = tenantSlice.actions;
export default tenantSlice.reducer;
