import type { Address } from "@/features/address/types/address.types";

export interface NextOfKin {
  id: string;
  fullName: string;
  relationship: string;
  phoneNumber: string;
  address: Address;
}
 