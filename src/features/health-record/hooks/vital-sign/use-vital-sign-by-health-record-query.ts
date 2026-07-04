import { skipToken } from "@reduxjs/toolkit/query";
import { useGetVitalSignsByHealthRecordIdQuery } from "../../api/vitalSignApi";

export const useVitalSignByHealthRecordQuery = (healthRecordId?: string) => {
  
  const { data: vitalSigns = [], isLoading, error } =
    useGetVitalSignsByHealthRecordIdQuery(
      healthRecordId ? healthRecordId : skipToken
    );

  return {
    vitalSigns,
    isLoading,
    error,
  };
};