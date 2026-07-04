import { skipToken } from "@reduxjs/toolkit/query";
import { useGetFollowUpsByHealthRecordIdQuery } from "../../api/followUpApi";

export const useFollowUpByHealthRecordQuery = (healthRecordId?: string) => {
  
  const { data: followUps = [], isLoading, error } =
    useGetFollowUpsByHealthRecordIdQuery(
      healthRecordId ? healthRecordId : skipToken
    );  

  return {
    followUps,
    isLoading,
    error,
  };
};