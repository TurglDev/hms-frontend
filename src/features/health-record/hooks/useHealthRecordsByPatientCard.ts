import { useGetHealthRecordsByPatientCardIdQuery } from "../api/healthRecordApi";

export const useHealthRecordsByPatientCard = (patientCardId?: string) => {
  const { data: healthRecords = [], isLoading, error } =
    useGetHealthRecordsByPatientCardIdQuery(patientCardId ?? "", {
      skip: !patientCardId,
    });

  return {
    healthRecords,
    isLoading,
    error,
  };
};