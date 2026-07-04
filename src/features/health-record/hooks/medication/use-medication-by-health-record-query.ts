import { skipToken } from "@reduxjs/toolkit/query";
import { useGetMedicationsByHealthRecordIdQuery } from "../../api/medicationApi";

export const useMedicationByHealthRecordQuery = (healthRecordId?: string) => {

  const { data: medications = [], isLoading, error } =
    useGetMedicationsByHealthRecordIdQuery(
      healthRecordId ? healthRecordId : skipToken
    );  
    
  return {
    medications,
    isLoading,
    error,
  };
};