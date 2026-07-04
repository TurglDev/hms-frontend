import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pill, Search, X } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { HealthRecordFormValues } from "../../validation/health-record.schema";
import React from "react";

interface MedicationsFormProps {
  form: UseFormReturn<HealthRecordFormValues>;
}

export function MedicationsForm({
  form
}: MedicationsFormProps) {
  const [input, setInput] = React.useState("");
  

  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Pill className="h-5 w-5 text-primary" />
          Prescribed Medications
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Controller
            name="medications.medications"
            control={form.control}
            render={({ field }) => {

            const addMedication = () => {
              if (!input.trim()) return;
              const updated = [...(field.value || []), input.trim()];
              field.onChange(updated);
              setInput("");
            };

            const removeMedication = (item: string) => {
              const updated = field.value?.filter(
                (d: string) => d !== item
              );
              field.onChange(updated);
            };

            return (
              <Field>
                <FieldLabel>Medication</FieldLabel>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  
                  <Input
                    value={input}
                    placeholder="Type medication and press Enter"
                    className="pl-9"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addMedication();
                      }
                    }}
                  />
                </div>
                
                {!field.value?.length || field.value?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {field.value?.map((item: string) => (
                      <Badge
                        key={item}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {item}

                        <button
                          type="button"
                          onClick={() => removeMedication(item)}
                          className="ml-1 hover:bg-muted rounded p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <Controller
                  name="medications.medicationNote"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Additional Notes</FieldLabel>

                      <Textarea
                        {...field}
                        placeholder="Enter additional diagnostic notes..."
                        className="min-h-[80px] resize-none"
                      />
                    </Field>
                  )}
                />
              </Field>
            );
          }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
