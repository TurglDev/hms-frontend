/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Eye,
  FileSpreadsheet,
  MoreVertical,
  Pencil,
  Plus,
  Trash,
  Trash2,
} from 'lucide-react'
import type { PatientDocument } from '../../types/patient-document.types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '@/hooks/modal/useModal'
import { useState } from 'react'
import { format } from 'date-fns'
import PDFViewerDialog from '@/components/ui/pdf-viewer-dialog'
import { DocumentFormModel } from '../models/document-form-model'
import { toast } from 'sonner'
import { ConfirmAlertDialog } from '@/components/ui/confirm-alert-dialog'
import { usePatientDocumentByPatientCardAndPatientQuery } from '../../hooks/use-patient-document-by-patient-card-and-patient-query'
import { usePatientDocumentMutation } from '../../hooks/use-patient-document-mutation'

interface DocumentTabProps {
  patientCardId: string
  patientId: string
}

export const DocumentTab: React.FC<DocumentTabProps> = ({
  patientCardId,
  patientId,
}) => {

  const { patientDocuments } = usePatientDocumentByPatientCardAndPatientQuery(
    patientCardId,
    patientId
  )
  const { handleDelete, isDeleting} = usePatientDocumentMutation();
  const [selectedPatientDocument, setSelectedPatientDocument] =
    useState<PatientDocument | null>(null)

  const { isOpen, openModal } = useModal('patient-document-form')
  const [openDelete, setOpenDelete] = useState(false)
  const [showViewer, setShowViewer] = useState(false)

  const onPreview = (patientDocument: PatientDocument) => {
    setSelectedPatientDocument(patientDocument)
    setShowViewer(true)
  }

  const onEdit = (patientDocument: PatientDocument) => {
    setSelectedPatientDocument(patientDocument)
    openModal()
  }

  const onDelete = (patientDocument: PatientDocument) => {
    setSelectedPatientDocument(patientDocument)
    setOpenDelete(true)
  }

  const onDeleteConfirm = () => {
    if (!selectedPatientDocument) return

    toast.promise(handleDelete(selectedPatientDocument.id), {
      loading: 'Deleting patient document...',
      success: (res: any) => {
        setOpenDelete(false)
        setSelectedPatientDocument(null)
        return res?.message ?? 'Patient document deleted successfully!'
      },
      error: (err: any) => {
        return (
          err?.data?.message ?? err?.message ?? 'Error deleting patient document'
        )
      },
    })
    setOpenDelete(false)
    setSelectedPatientDocument(null)
  }

  return (
    <Card className='relative flex flex-col gap-3 rounded-xl border bg-card py-4 text-card-foreground'>
      <CardHeader className='flex flex-row items-center justify-between px-6'>
        <CardTitle>Documents</CardTitle>
        <Button
          className='gap-3'
          variant='outline'
          size='sm'
          onClick={() => {
            setSelectedPatientDocument(null)
            openModal()
          }}
        >
          <Plus className='h-4 w-4' />
          Add
        </Button>
      </CardHeader>

      <CardContent className='px-6'>
        <div className='space-y-12'>
          {patientDocuments.length === 0 ? (
            <div className="bg-card/50 p-10 text-center text-sm text-muted-foreground">
              No documents match your filters.
            </div>
          ) : (
            <div className="overflow-hidden bg-card">
          <ul className="divide-y divide-border">
            {patientDocuments.map((patientDocument) => (
              <li
                key={patientDocument.id}
                className="flex items-center gap-4 py-3 transition hover:bg-muted/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileSpreadsheet className='h-7 w-7' />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{patientDocument.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    uploadedBy · {format(new Date(patientDocument.documentDate), 'MMM dd, yyyy')}
                  </div>
                </div>
                {patientDocument.category ? (
                  <span
                    className='hidden rounded-full px-2.5 py-0.5 text-xs font-medium sm:inline-block bg-primary/10 text-primary'
                  >
                    {patientDocument.category}
                  </span>
                ) : null }
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="More">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onPreview(patientDocument)}
                    >
                      <Eye className='h-4 w-4'/>
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit(patientDocument)}
                    >
                      <Pencil className='h-4 w-4'/>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(patientDocument)}
                      className="text-destructive"
                    >
                      <Trash2 className='h-4 w-4'/>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        </div>
          )}
          <ConfirmAlertDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            title='Delete Patient Document?'
            description='This action cannot be undone. The patient document will be permanently removed.'
            confirmText='Delete'
            Icon={Trash}
            onConfirm={onDeleteConfirm}
            variant='destructive'
            isLoading={isDeleting}
          />
        </div>
      </CardContent>
      {isOpen && (
        <DocumentFormModel
          patientId={patientId}
          patientCardId={patientCardId}
          defaultValues={selectedPatientDocument || undefined}
        />
      )}
      {selectedPatientDocument && (
        <PDFViewerDialog
          open={showViewer}
          title='Patient Document'
          description={selectedPatientDocument.title}
          url={selectedPatientDocument.documentCdnUrl}
          metadata={{
            documentDate: selectedPatientDocument?.documentDate ?? "",
            note: selectedPatientDocument?.note ?? "",
          }}
          onOpenChange={(open) => {
            setShowViewer(open)
            if (!open) setSelectedPatientDocument(null)
          }}
        />
      )}
    </Card>
  )
}
