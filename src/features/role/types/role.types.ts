import type { Permission } from "@/features/permission/types/permission.types";

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions?: Permission[];
  createdAt?: string;
  updatedAt?: string;
}
 