import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use(config => {
  const tenantId = localStorage.getItem("tenantId"); // Or from TenantContext
  if (tenantId) {
    config.headers["X-Tenant-ID"] = tenantId;
  }
  return config;
});
