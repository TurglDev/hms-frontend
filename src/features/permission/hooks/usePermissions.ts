import {
  useGetPermissionsQuery,
} from "../api/permissionApi";

export const usePermissions = () => {

  const { data: permissions = [], isLoading } = useGetPermissionsQuery();

  return { 
    permissions,
    isLoading,
   };
};
