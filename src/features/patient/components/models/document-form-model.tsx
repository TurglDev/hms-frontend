/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { useModal } from '@/hooks/modal/useModal'
import { toast } from 'sonner'
import {
  patientDocumentSchema,
  type PatientDocumentFormValues,
} from '../../validation/patient-document.schema'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, FileIcon, Trash2Icon, Upload } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Dropzone,
  DropZoneArea,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from '@/components/ui/dropzone'
import { AnimatePresence, motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import type { PatientDocument } from '../../types/patient-document.types'
import { Textarea } from '@/components/ui/textarea'
import { DocumentViewer } from '@/components/document-viewer'
import { usePatientDocumentMutation } from '../../hooks/use-patient-document-mutation'

interface DocumentFormModelProps {
  patientId?: string
  patientCardId: string
  defaultValues?: PatientDocument & { id?: string }
}

export const DocumentFormModel: React.FC<DocumentFormModelProps> = ({
  patientId,
  patientCardId,
  defaultValues,
}) => {
  const { isOpen, closeModal } = useModal('patient-document-form');

  const { handleUpload, handleUpdate, isUploading, isUpdating } = usePatientDocumentMutation();
  const [previewUrl, setPreviewUrl] = React.useState<string>("");

  const form = useForm<PatientDocumentFormValues>({
    resolver: zodResolver(patientDocumentSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      documentDate: defaultValues?.documentDate ?? new Date(),
      file: undefined,
      note: defaultValues?.note ?? '',
      patientId: '',
      patientCardId: '',
    },
  })

  const isEdit = !!defaultValues?.id

  const watchedFile = form.watch('file')

  React.useEffect(() => {
    if (!watchedFile) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(watchedFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [watchedFile]);

  const MAX_FILES = 1

  const dropzone = useDropzone({
    validation: {
      maxSize: 10 * 1024 * 1024,
      maxFiles: MAX_FILES,
    },

    onDropFile: async (file) => {
      form.setValue('file', file, {
        shouldValidate: true,
        shouldDirty: true,
      })

      return {
        status: 'success',
        result: undefined,
      }
    },

    onRemoveFile: async () => {
      form.setValue('file', undefined as any, {
        shouldDirty: true,
      })
    },
  })

  const onSubmit = async (values: PatientDocumentFormValues) => {
    try {
      toast.promise(
        async () => {
          if (isEdit && defaultValues!.id) {
            return await handleUpdate(defaultValues.id, values)
          }

          if (patientId) {
            values.patientId = patientId
          }

          values.patientCardId = patientCardId

          return await handleUpload(values)
        },
        {
          loading: isEdit ? 'Updating document...' : 'Uploading document...',

          success: (res: any) => {
            closeModal()
            form.reset()

            return res?.message
          },
          error: (err: any) => {
            return err?.data?.message ?? err?.message ?? 'Error'
          },
        }
      )
    } catch (error) {
      console.error('Patient document creation/updating failed', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className='sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Document' : 'Upload Document'}
          </DialogTitle>

          <DialogDescription>
            {isEdit ? 'Modify document details.' : 'Upload a new document.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='max-h-[75vh] overflow-y-auto pr-2'>
            <FieldGroup className='grid gap-4 md:grid-cols-2'>
              <Controller
                name='title'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='title'>Title</FieldLabel>

                    <Input
                      {...field}
                      id='title'
                      placeholder='Document title'
                      autoComplete='off'
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name='documentDate'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='documentDate'>Date</FieldLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className={cn(
                            'w-full justify-start pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}

                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          captionLayout='dropdown'
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {!isEdit ? (
                <Controller
                  name='file'
                  control={form.control}
                  render={({ fieldState }) => (
                    <Field
                      className='md:col-span-2'
                      data-invalid={fieldState.invalid}
                    >
                      <div className='flex flex-col gap-3'>
                        <Dropzone {...dropzone}>
                          <div className='flex justify-between'>
                            <FieldLabel htmlFor='file'>File</FieldLabel>

                            <DropzoneMessage />
                          </div>

                          <AnimatePresence>
                            {dropzone.fileStatuses.length < 1 && (
                              <>
                                <motion.div
                                  key='dropzone'
                                  initial={{
                                    opacity: 0,
                                    y: -10,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    y: -10,
                                  }}
                                  transition={{
                                    duration: 0.2,
                                  }}
                                >
                                  <DropZoneArea className='flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 p-8 text-center transition-colors hover:bg-muted/40'>
                                    <DropzoneTrigger className='w-full bg-transparent'>
                                      <div className='flex flex-col items-center gap-2'>
                                        <div className='rounded-full bg-background p-4 shadow-sm'>
                                          <Upload className='h-6 w-6 text-muted-foreground' />
                                        </div>

                                        <div className='space-y-1'>
                                          <p className='text-sm font-medium'>
                                            Drag & drop file here
                                          </p>

                                          <p className='text-sm text-muted-foreground'>
                                            or click to browse
                                          </p>

                                          <p className='text-xs text-muted-foreground'>
                                            Max file size: 10MB
                                          </p>
                                        </div>
                                      </div>
                                    </DropzoneTrigger>
                                  </DropZoneArea>
                                </motion.div>
                              </>
                            )}

                            {dropzone.fileStatuses.length > 0 && (
                              <DropzoneFileList>
                                {dropzone.fileStatuses.map((file) => (
                                  <motion.div
                                    key={file.id}
                                    initial={{
                                      opacity: 0,
                                      y: -5,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      y: 0,
                                    }}
                                    exit={{
                                      opacity: 0,
                                      y: 5,
                                    }}
                                    layout
                                  >
                                    <DropzoneFileListItem
                                      file={file}
                                      className='p-0'
                                    >
                                      <Card>
                                        <CardContent className='flex items-center justify-between gap-4 px-4'>
                                          <div className='flex items-center gap-3'>
                                            <div className='flex h-12 w-12 items-center justify-center rounded-md bg-muted'>
                                              <FileIcon className='h-6 w-6' />
                                            </div>


                                            <div className="min-w-0">
                                              <p className='truncate text-sm font-medium text-foreground'>
                                                {file.fileName}
                                              </p>
                                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>
                                                  {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                                                </span>

                                                <span className="text-muted-foreground/40">•</span>

                                                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide">
                                                  uploaded
                                                </span>
                                              </div>
                                            </div>
                                          </div>

                                          <DropzoneRemoveFile
                                            type="button"
                                            className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-all hover:border-destructive hover:bg-destructive/10 hover:text-destructive active:scale-95"
                                          >
                                            <Trash2Icon className='h-4 w-4' />
                                          </DropzoneRemoveFile>
                                        </CardContent>
                                      </Card>
                                    </DropzoneFileListItem>
                                  </motion.div>
                                ))}
                              </DropzoneFileList>
                            )}
                          </AnimatePresence>
                        </Dropzone>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>
                    </Field>
                  )}
                />
              ) : null}

              <Controller
                name='note'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className='md:col-span-2'
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel htmlFor='note'>Document Note</FieldLabel>

                    <Textarea
                      {...field}
                      id='note'
                      rows={4}
                      placeholder='Enter document note'
                      aria-invalid={fieldState.invalid}
                      className="min-h-[100px] resize-y"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {(watchedFile || defaultValues?.documentCdnUrl) && (
              <div className='space-y-2 mt-4'>
                <div>
                  <h3 className='text-sm font-medium'>Document Preview</h3>

                  <p className='text-sm text-muted-foreground'>
                    Review the document before saving.
                  </p>
                </div>

                <DocumentViewer
                  open={isOpen}
                  className='overflow-hidden rounded-xl border'
                  showSidebar={false}
                  file={
                    watchedFile
                      ? {
                          url: previewUrl,
                          name: watchedFile.name,
                          type: watchedFile.type,
                        }
                      : {
                          name: defaultValues?.title,
                          url: defaultValues?.documentCdnUrl?? '',
                        }
                  }
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' onClick={closeModal}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              type='button'
              onClick={form.handleSubmit(onSubmit)}
              disabled={isUploading || isUpdating}
            >
              {isEdit ? 'Save Changes' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
