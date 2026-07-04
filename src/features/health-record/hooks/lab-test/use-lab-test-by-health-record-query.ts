import { skipToken } from "@reduxjs/toolkit/query";
import { useGetLabTestsByHealthRecordIdQuery } from "../../api/labTestApi";

export const useLabTestByHealthRecordQuery = (healthRecordId?: string) => {

  const { data: labTests = [], isLoading, error } =
    useGetLabTestsByHealthRecordIdQuery(
      healthRecordId ? healthRecordId : skipToken
    );  

  return {
    labTests,
    isLoading,
    error,
  };
};