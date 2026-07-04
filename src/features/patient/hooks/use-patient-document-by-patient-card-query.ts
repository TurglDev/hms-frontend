import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetPatientDocumentsByPatientCardIdQuery,
} from "../api/patientDocumentApi";

export const usePatientDocumentByPatientCardQuery = (
  patientCardId?: string, 
) => {

  const { data: patientDocuments = [], isLoading, error } =
    useGetPatientDocumentsByPatientCardIdQuery(
      patientCardId ? patientCardId : skipToken
    );

  return {
    patientDocuments,
    isLoading,
    error,
  };
};