import { useGetTotalFemalePatientsQuery, useGetTotalMalePatientsQuery, useGetTotalPatientCardsQuery, useGetTotalPatientsQuery } from "../api/dashboardApi";

export const useDashboards = () => {

  const { data: totalPatientCard, isLoading: isLoadingPatientCard } = useGetTotalPatientCardsQuery();
  const { data: totalPatient, isLoading: isLoadingPatient } = useGetTotalPatientsQuery();
  const { data: totalMalePatient, isLoading: isLoadingMalePatient } = useGetTotalMalePatientsQuery();
  const { data: totalFemalePatient, isLoading: isLoadingFemalePatient } = useGetTotalFemalePatientsQuery();

  return { 
    totalPatientCards: totalPatientCard?.total ?? 0,
    totalPatients: totalPatient?.total ?? 0,
    totalMalePatient: totalMalePatient?.total ?? 0,
    totalFemalePatient: totalFemalePatient?.total ?? 0,
    isLoadingPatientCard,
    isLoadingPatient,
    isLoadingMalePatient,
    isLoadingFemalePatient,
  };
};
