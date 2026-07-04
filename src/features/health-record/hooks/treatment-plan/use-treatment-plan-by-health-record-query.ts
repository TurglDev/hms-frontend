import { skipToken } from "@reduxjs/toolkit/query";
import { useGetTreatmentPlansByHealthRecordIdQuery } from "../../api/treatmentPlanApi";

export const useTreatmentPlanByHealthRecordQuery = (healthRecordId?: string) => {
  
  const { data: treatmentPlans = [], isLoading, error } =
    useGetTreatmentPlansByHealthRecordIdQuery(
      healthRecordId ? healthRecordId : skipToken
    );

  return {
    treatmentPlans,
    isLoading,
    error,
  };
};