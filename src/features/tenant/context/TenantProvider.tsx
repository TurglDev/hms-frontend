import React, { useEffect } from "react";
import { TenantContext } from "./TenantContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetTenantBySubdomainQuery } from "../api/tenantApi";
import { setTenant, setLoading, setError } from "../slices/tenantSlice";
import { getSubdomain, persistTenantId } from "../utils/tenantHelpers";

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subdomain = getSubdomain();
  const isDev = import.meta.env.DEV;

  const { data: tenant, isLoading, isError } = useGetTenantBySubdomainQuery(
    subdomain ?? "",
    { skip: !subdomain }
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
      return;
    }

    if (isError) {
      dispatch(setError("Failed to load tenant"));

      //if (!isDev) navigate(RoutePaths.TENANT_NOT_FOUND);
      return;
    }

    if (!tenant && !isLoading) {
      dispatch(setError("Tenant not found"));
      //if (!isDev) navigate(RoutePaths.TENANT_NOT_FOUND);
      return;
    }

    if (tenant) {
      dispatch(setTenant(tenant));
      persistTenantId(tenant.id);
    }
  }, [tenant, isLoading, isError, dispatch, navigate, isDev]);

  return (
    <TenantContext.Provider value={{ tenant: tenant ?? null, loading: isLoading }}>
      {children}
    </TenantContext.Provider>
  );
};
