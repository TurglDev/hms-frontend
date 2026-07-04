
interface Diagnosis {
  diagnosis: string[];
  diagnosisNote?: string;
  recordedAt: Date;
}

interface Symptoms {
  symptoms?: string;
  symptomsNote?: string;
}

interface Medications {
  medications?: string;
  medicationNote?: string;
}

interface LabTests {
  labTests?: string;
  medicationNote?: string;
}

interface FollowUp {
  followUpDate?: Date;
  followUpNote?: string;
}

interface PatientCard {
  patientCardUUID: string;
}

interface Patient {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  bloodGroup: string;
}

export interface HealthRecord {
  id: string;
  healthRecordNo: string;
  patientCard?: PatientCard;
  patient?: Patient;
  diagnosis?: Diagnosis[];
  symptoms?: Symptoms[];
  treatmentPlan?: string;
  medications?: Medications[];
  labTests?: LabTests[];
  followUp?: FollowUp[];
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}
 


