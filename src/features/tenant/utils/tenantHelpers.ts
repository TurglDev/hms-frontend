export const getSubdomain = (): string | null => {
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length > 2) return parts[0]; // e.g. tenant.example.com
  return null;
};

export const persistTenantId = (tenantId: string) => {
  localStorage.setItem("tenantId", tenantId);
};

export const getStoredTenantId = (): string | null => {
  return localStorage.getItem("tenantId");
};
