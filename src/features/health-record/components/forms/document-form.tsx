/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Plus, X } from "lucide-react";
import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import type { HealthRecordFormValues } from "../../validation/health-record.schema";
import { Button } from "@/components/ui/button";

interface DocumentFormProps {
  form: UseFormReturn<HealthRecordFormValues>;
}

export function DocumentForm({ form }: DocumentFormProps) {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "document.documents",
  });

  return (
    <Card className="gap-0">
      <CardHeader className='flex flex-row items-center justify-between gap-4 space-y-0 pb-3'>
          <div className='flex min-w-0 items-center gap-2.5'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'>
              <Paperclip className='h-4 w-4' />
            </div>
            <CardTitle className='truncate text-base font-semibold'>
              Document
            </CardTitle>
          </div>
          <div className='flex shrink-0 items-center gap-1'>
            <Button
  type="button"
  size="sm"
  onClick={(e) => {
    e.preventDefault();
    append({
      title: "",
      documentDate: new Date(),
      file: undefined as any,
    });
  }}
>
  Add
</Button>
          </div>
        </CardHeader>
      <CardContent className='flex-1 space-y-4'>
        <div className='space-y-3'>
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No documents added yet.
            </p>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-3 rounded-md border border-border bg-card p-3"
            >
              {/* Title */}
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input
                  placeholder="Document title"
                  {...register(`document.documents.${index}.title`)}
                />
              </Field>

              {/* Date */}
              <Field>
                <FieldLabel>Document Date</FieldLabel>
                <Input
                  type="date"
                  {...register(`document.documents.${index}.documentDate`, {
                    valueAsDate: true,
                  })}
                />
              </Field>

              {/* File */}
              <Field>
                <FieldLabel>File</FieldLabel>
                <Controller
                  control={control}
                  name={`document.documents.${index}.file`}
                  render={({ field }) => (
                    <Input
                      type="file"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0])
                      }
                    />
                  )}
                />
              </Field>

              {/* REMOVE */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
                 

        <Controller
          name="document.note"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel>Additional Notes</FieldLabel>

              <Textarea
                {...field}
                placeholder="Describe the document(s), source, or context…"
                className="min-h-[80px] resize-none"
              />
            </Field>
          )}
        />
                  
                </CardContent>
    </Card>
  );
}