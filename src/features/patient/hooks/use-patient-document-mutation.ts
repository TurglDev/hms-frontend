import { useDeletePatientDocumentMutation, useUpdatePatientDocumentMutation, useUploadPatientDocumentMutation } from "../api/patientDocumentApi";
import type { PatientDocumentFormValues } from "../validation/patient-document.schema";

export const usePatientDocumentMutation = () => {

  const [uploadPatientDocument, { isLoading: isUploading }] = useUploadPatientDocumentMutation();
  const [updatePatientDocument, { isLoading: isUpdating }] = useUpdatePatientDocumentMutation();
  const [deletePatientDocument, { isLoading: isDeleting }] = useDeletePatientDocumentMutation();

  const handleUpload = async (values: PatientDocumentFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("note", values.note!);
    formData.append("documentDate", values.documentDate.toISOString());
    formData.append("patientId", values.patientId);
    formData.append("patientCardId", values.patientCardId);
    formData.append("file", values.file);
    
    return await uploadPatientDocument(formData).unwrap();
  };

  const handleUpdate = async (id: string, values: PatientDocumentFormValues) => {
    return await updatePatientDocument({ id, data: values }).unwrap();
  };

  const handleDelete = async (id: string) => deletePatientDocument(id).unwrap();

  return {
    handleUpload,
    handleUpdate,
    handleDelete,
    isUploading,
    isUpdating,
    isDeleting
  };
};
