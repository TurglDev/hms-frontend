import { skipToken } from "@reduxjs/toolkit/query";
import { useGetHealthRecordsByPatientCardIdAndPatientIdQuery } from "../api/healthRecordApi";

export const useHealthRecordsByPatientCardAndPatientQuery = (
  patientCardId?: string,
  patientId?: string
) => {
  const shouldSkip = patientCardId == null || patientId == null;

  const { data: healthRecords = [], isLoading, error } =
    useGetHealthRecordsByPatientCardIdAndPatientIdQuery(
      shouldSkip ? skipToken : { patientCardId, patientId }
    );


  return {
    healthRecords,
    isLoading,
    error,
  };
};