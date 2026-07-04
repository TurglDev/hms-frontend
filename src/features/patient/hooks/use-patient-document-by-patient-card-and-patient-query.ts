import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetPatientDocumentsByPatientCardIdAndPatientIdQuery,
} from "../api/patientDocumentApi";

export const usePatientDocumentByPatientCardAndPatientQuery = (
  patientCardId?: string, 
  patientId?: string
) => {
  
  const shouldSkip = patientCardId == null || patientId == null;

  const { data: patientDocuments = [], isLoading, error } =
    useGetPatientDocumentsByPatientCardIdAndPatientIdQuery(
      shouldSkip ? skipToken : { patientCardId, patientId }
    );

  return {
    patientDocuments,
    isLoading,
    error,
  };
};