import React from "react";
import { Button } from "@/components/ui/button";
import type { Patient } from "@/features/patient/types/patient.types";
import { useModal } from "@/hooks/modal/useModal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Controller, type UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import type { PatientCardFormValues } from "../../validation/patient-card.schema";
import { PhoneInput } from "@/components/ui/phone-input";

interface MemberStepProps {
  form: UseFormReturn<PatientCardFormValues>;
  selectedMembers: Patient[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export const MemberStep: React.FC<MemberStepProps> = ({ form, selectedMembers, setSelectedMembers }) => {
  const {
    isOpen: isOpenMember,
    openModal: openModalMember,
    closeModal: closeModalMember,
  } = useModal("memberForm");

  const handleAddMember = async () => {
    const isValid = await form.trigger([
      "patients.0.firstName",
      "patients.0.lastName",
      "patients.0.gender",
      "patients.0.dateOfBirth",
    ]);

    if (!isValid) return;

    const patients = form.getValues("patients");
    const newMember = patients?.[0];

    if (newMember) {
      setSelectedMembers([
        ...selectedMembers,
        {
          ...newMember,
          id: "",
          patientUUID: "",
        } as Patient,
      ]);
      form.setValue("patients", []);
      closeModalMember();
    }
  };

  return (
    <>
      <div className="mt-6">
        <h3 className="text-md font-medium mb-4">Family Members</h3>
        {selectedMembers.length > 0 ? (
          <div className="space-y-4">
            {selectedMembers.map((member, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {member.firstName} {member.middleName} {member.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="capitalize">{member.gender}</span>,{" "}
                      {member.dateOfBirth &&
                        format(new Date(member.dateOfBirth), "MM/dd/yyyy")}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const updatedMembers = [...selectedMembers];
                      updatedMembers.splice(index, 1);
                      setSelectedMembers(updatedMembers);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No family members added yet.
          </p>
        )}
        <Button
          type="button"
          className="mt-4"
          onClick={() => {
            openModalMember();
          }}
        >
          Add Member
        </Button>
      </div>
      <Dialog open={isOpenMember} onOpenChange={closeModalMember}>
        <DialogContent className="sm:max-w-2xl data-[state=open]:!zoom-in-0 data-[state=open]:duration-600">
          <DialogHeader>
            <DialogTitle>Add Family Members</DialogTitle>
            <DialogDescription>Assign Departments to Staff</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="patients.0.firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <Input
                      {...field}
                      id="firstName"
                      aria-invalid={fieldState.invalid}
                      placeholder="First Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="patients.0.lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input
                      {...field}
                      id="lastName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Last Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="patients.0.middleName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="middleName">Middle Name</FieldLabel>
                    <Input
                      {...field}
                      id="middleName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Middle Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="patients.0.gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="gender">Gender</FieldLabel>
                    <Select
                      {...field}
                      aria-invalid={fieldState.invalid}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Male', 'Female'].map(
                          (gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="patients.0.dateOfBirth"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="dateOfBirth">Date of birth</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="patients.0.phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                    <PhoneInput
                      {...field}
                      id="phoneNumber"
                      aria-invalid={fieldState.invalid}
                      defaultCountry="NG"
                      placeholder="Enter a phone number"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={closeModalMember}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleAddMember}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
