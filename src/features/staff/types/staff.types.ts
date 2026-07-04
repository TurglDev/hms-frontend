import type { Department } from "@/features/department/types/department.types";


export interface StaffAddress {
  id: string;
}

export interface StaffNextOfKin {
  id: string;
}

export interface StaffUser {
  id: string;
}

export interface Staff {
  id: string;
  staffUUID: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email?: string;
  departments?: Department[];
  photo?: string;
  user?: StaffUser;
  address?: StaffAddress;
  nextOfKin?: StaffNextOfKin;
  createdAt?: string;
  updatedAt?: string;
}
 