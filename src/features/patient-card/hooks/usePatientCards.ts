import type { PatientFormValues } from "@/features/patient/validation/patient.schema";
import {
  useGetPatientCardsQuery,
  useGetPatientCardQuery,
  useCreatePatientCardMutation,
  useUpdatePatientCardMutation,
  useDeletePatientCardMutation,
  useAddPatientToPatientCardMutation,
} from "../api/patientCardApi";
import type { PatientCardFormValues, UpdatePatientCardFormValues } from "../validation/patient-card.schema";

export const usePatientCards = (id?: string) => {

  const { data: patientCards = [], isLoading } = useGetPatientCardsQuery();
  const { data: patientCard } = useGetPatientCardQuery(id!, { skip: !id });
  const [createPatientCard, { isLoading: isCreating }] = useCreatePatientCardMutation();
  const [updatePatientCard, { isLoading: isUpdating }] = useUpdatePatientCardMutation();
  const [addPatientToPatientCard, { isLoading: isAdding }] = useAddPatientToPatientCardMutation();
  const [deletePatientCard, { isLoading: isDeleting }] = useDeletePatientCardMutation();
  
  const handleCreate = async (values: PatientCardFormValues) => {
    return await createPatientCard(values).unwrap();
  };

  const handleUpdate = async (id: string, values: UpdatePatientCardFormValues) => {
    return await updatePatientCard({ id, data: values }).unwrap();
  };
  const handleAddPatient = async (id: string, values: PatientFormValues) => {
    return await addPatientToPatientCard({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => {
    return await deletePatientCard(id).unwrap();
  };

  return { 
    patientCards,
    patientCard,
    isLoading,
    isCreating,
    isUpdating,
    isAdding,
    isDeleting,
    handleCreate,
    handleUpdate,
    handleAddPatient,
    handleDelete,
   };
};
