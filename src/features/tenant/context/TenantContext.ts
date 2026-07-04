import { createContext } from "react";
import type { Tenant } from "../types/tenant.types";

export interface TenantContextValue {
  tenant: Tenant | null;
  loading: boolean;
}

export const TenantContext = createContext<TenantContextValue>({
  tenant: null,
  loading: true,
});
