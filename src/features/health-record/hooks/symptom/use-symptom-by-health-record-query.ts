import { skipToken } from "@reduxjs/toolkit/query";
import { useGetSymptomsByHealthRecordIdQuery } from "../../api/symptomApi";

export const useSymptomByHealthRecordQuery = (healthRecordId?: string) => {
  
  const { data: symptoms = [], isLoading, error } =
    useGetSymptomsByHealthRecordIdQuery(
      healthRecordId ? healthRecordId : skipToken
    );

  return {
    symptoms,
    isLoading,
    error,
  };
};