import { skipToken } from "@reduxjs/toolkit/query";
import { useGetHealthRecordQuery } from "../api/healthRecordApi";

export const useHealthRecordQuery = (id: string) => {

  const { data: healthRecord, isLoading, error } =
    useGetHealthRecordQuery(
      id ? id : skipToken
    );

  return {
    healthRecord,
    isLoading,
    error,
  };
};