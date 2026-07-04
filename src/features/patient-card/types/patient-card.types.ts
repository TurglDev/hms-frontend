export interface PatientCardAddress {
  id: string;
}
export interface PatientCardNextOfKin {
  id: string;
}

export interface Patient {
  id: string;
}

export interface PatientCard {
  id: string;
  patientCardUUID: string;
  fullName: string;
  cardType: string;
  phoneNumber?: string;
  email?: string;
  address?: PatientCardAddress;
  nextOfKin?: PatientCardNextOfKin;
  patients?: Patient;
  createdAt?: string;
  updatedAt?: string;
}
 

