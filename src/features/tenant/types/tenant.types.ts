export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  logoUrl?: string;
  primaryColor?: string;
}

export interface TenantState {
  tenant: Tenant | null;
  loading: boolean;
  error: string | null;
}
