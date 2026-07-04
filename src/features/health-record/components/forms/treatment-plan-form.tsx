import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { HealthRecordFormValues } from "../../validation/health-record.schema";

interface TreatmentPlanFormProps {
  form: UseFormReturn<HealthRecordFormValues>;
}

export function TreatmentPlanForm({
  form
}: TreatmentPlanFormProps) {
  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ClipboardList className="h-5 w-5 text-primary" />
          Treatment Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="treatmentPlan"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="treatmentPlan" hidden>
                Treatment Plan
              </FieldLabel>
              <Textarea
                {...field}
                id="treatmentPlan"
                aria-invalid={fieldState.invalid}
                placeholder="Describe the treatment plan, care instructions, lifestyle recommendations..."
                className="min-h-[120px] resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
};
