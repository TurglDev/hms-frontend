import { useGetPatientQuery } from "../api/patientApi";

export const usePatientQuery = (id: string) => {
  const {
    data,
    isLoading,
    error,
  } = useGetPatientQuery(id, {
    skip: !id,
  });

  return {
    patient: data ?? null,
    isLoading,
    error,
  };
};