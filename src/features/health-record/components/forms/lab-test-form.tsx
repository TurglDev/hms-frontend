import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, TestTube, X } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { HealthRecordFormValues } from "../../validation/health-record.schema";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface LabTestFormProps {
  form: UseFormReturn<HealthRecordFormValues>;
}

export function LabTestForm({
  form
}: LabTestFormProps) {
  const [input, setInput] = React.useState("");
  
  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TestTube className="h-5 w-5 text-primary" />
          Lab Tests & Procedures
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Controller
            name="labTests.labTests"
            control={form.control}
            render={({ field }) => {

            const addLabTest = () => {
              if (!input.trim()) return;
              const updated = [...(field.value || []), input.trim()];
              field.onChange(updated);
              setInput("");
            };

            const removeLabTest = (item: string) => {
              const updated = field.value?.filter(
                (d: string) => d !== item
              );
              field.onChange(updated);
            };

            return (
              <Field>
                <FieldLabel>Lab Test & Procedure</FieldLabel>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  
                  <Input
                  value={input}
                    placeholder="Type lab tests & procedures and press Enter"
                    className="pl-9"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addLabTest();
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
                          onClick={() => removeLabTest(item)}
                          className="ml-1 hover:bg-muted rounded p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <Controller
                  name="labTests.labTestNote"
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
