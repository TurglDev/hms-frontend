import { skipToken } from '@reduxjs/toolkit/query'
import type { PatientFormValues } from '../validation/patient.schema'
import {
  useGetPatientsQuery,
  useGetPatientsByPatientCardIdQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} from '../api/patientApi'



export const usePatients = (
  patientId?: string,
  patientCardId?: string,
  options?: { enabled?: boolean }
) => {

  const enabled = options?.enabled ?? true

  const shouldFetchList =
    enabled && !patientId && !patientCardId

  const shouldFetchByCard =
    enabled && !!patientCardId

  const shouldFetchSingle =
    enabled && !!patientId

  // List (index pages only)
  const {
    data: patients = [],
    isLoading: isPatientsLoading,
  } = useGetPatientsQuery(undefined, {
    skip: !shouldFetchList,
  })

  // Patients by patientCard
  const {
    data: patientsByPatientCard = [],
    isFetching: isPatientsByCardLoading,
  } = useGetPatientsByPatientCardIdQuery(
    shouldFetchByCard ? patientCardId! : skipToken
  )
  
  // Single patient
  const {
    data: patient,
    isLoading: isPatientLoading,
  } = useGetPatientQuery(
    shouldFetchSingle ? patientId! : skipToken
  )


  // Mutations
  const [createPatient, { isLoading: isCreating }] =
    useCreatePatientMutation()

  const [updatePatient, { isLoading: isUpdating }] =
    useUpdatePatientMutation()

  const [deletePatient, { isLoading: isDeleting }] =
    useDeletePatientMutation()

  // Handlers
  const handleCreate = async (values: PatientFormValues) => {
    return createPatient(values).unwrap()
  }

  const handleUpdate = async (id: string, values: PatientFormValues) => {
    return updatePatient({ id, data: values }).unwrap()
  }

  const handleDelete = async (id: string) => {
    return deletePatient(id).unwrap()
  }

  return {
    // data
    patients,
    patientsByPatientCard,
    patient,

    // loading states
    isPatientsLoading,
    isPatientsByCardLoading,
    isPatientLoading,
    isCreating,
    isUpdating,
    isDeleting,

    // actions
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}
