interface Patient {
  id: string;
  firstName: string;
  lastName: string;
}

interface PatientCard {
  id: string;
  fullName: string
}

export interface PatientDocument {
  id: string;
  title: string;
  note: string;
  documentDate: Date;
  category: string;
  documentCdnUrl: string;
  patient?: Patient;
  patientCard?: PatientCard;
  createdAt?: string;
}
 

