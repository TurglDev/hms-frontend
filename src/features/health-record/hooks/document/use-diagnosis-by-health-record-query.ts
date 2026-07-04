import { skipToken } from "@reduxjs/toolkit/query";
import { useGetDiagnosisByHealthRecordIdQuery } from "../../api/diagnosisApi";

export const useDiagnosisByHealthRecordQuery = (healthRecordId?: string) => {
  
  const { data: diagnosis = [], isLoading, error } =
    useGetDiagnosisByHealthRecordIdQuery(
      healthRecordId ? healthRecordId : skipToken
    );    

  return {
    diagnosis,
    isLoading,
    error,
  };
};