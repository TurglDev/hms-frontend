import type { Permission } from "@/features/permission/types/permission.types";
import type { Role } from "@/features/role/types/role.types";

export interface User {
  id: string;
  email: string;
  isActive: boolean;
  roles?: Role[];
  permissions?: Permission[];
}
 