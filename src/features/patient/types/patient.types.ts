interface PatientCard {
  id: string,
  patientCardUUID: string;
  cardType: string;
}

export interface Patient {
  id: string;
  patientUUID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  dateOfBirth: Date;
  phoneNumber?: string;
  patientCard: PatientCard;
  createdAt?: string;
  updatedAt?: string;
}
 



