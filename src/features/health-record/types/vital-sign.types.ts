
export interface VitalSign{
  id: string;
  temperature?: number;
  bloodPressure?: string;
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  vitalSignNote?: string;
  recordedAt: Date;
}
 

