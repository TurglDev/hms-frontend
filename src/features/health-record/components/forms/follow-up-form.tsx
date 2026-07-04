import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { CalendarClock, CalendarIcon } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { HealthRecordFormValues } from "../../validation/health-record.schema";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

interface FollowUpFormProps {
  form: UseFormReturn<HealthRecordFormValues>;
}

const quickPresets = [
  { label: "1 Week", value: 7 },
  { label: "2 Weeks", value: 14 },
  { label: "1 Month", value: 30 },
  { label: "3 Months", value: 90 },
];

export function FollowUpForm({
  form
}: FollowUpFormProps) {

  const followUpDate = form.watch("followUp.followUpDate");

  const setQuickDate = (days: number) => {
    form.setValue("followUp.followUpDate", addDays(new Date(), days));
  };

  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarClock className="h-5 w-5 text-primary" />
          Follow-up
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Controller
            name="followUp.followUpDate"
            control={form.control}
            render={({ fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="followUp">Follow-up Date</FieldLabel>
                <div className="flex flex-wrap gap-2">
                  {quickPresets.map((preset) => (
                    <Button
                      key={preset.label}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickDate(preset.value)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
                        !followUpDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {followUpDate ? format(followUpDate, "PPP") : "Select custom date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={followUpDate}
                      onSelect={(date) => form.setValue("followUp.followUpDate", date)}
                      disabled={(date) => date < new Date()}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="space-y-2">
          <Controller
            name="followUp.followUpNote"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="followUpNotes">
                  Follow-up Notes
                </FieldLabel>
                <Textarea
                  {...field}
                  id="followUpNotes"
                  aria-invalid={fieldState.invalid}
                  placeholder="Instructions for follow-up visit..."
                  className="min-h-[80px] resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
