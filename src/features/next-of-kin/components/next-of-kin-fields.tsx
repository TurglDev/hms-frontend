/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { AddressFields } from "@/features/address/components/address-fields";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type NextOfKinFieldsProps = {
  form: any;
	fieldName?: string;
  addressFieldsRequired: boolean;
};

export function NextOfKinFields({
  form,
	fieldName,
  addressFieldsRequired
}: NextOfKinFieldsProps) {
  return (
    <>
      <Controller
        name={fieldName ? fieldName+".fullName" : "fullName"}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="nextOfKinFullName">
              Next of kin Name
            </FieldLabel>
            <Input
              {...field}
              id="nextOfKinFullName"
              aria-invalid={fieldState.invalid}
              placeholder="Full Name"
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name={fieldName ? fieldName+".relationship" : "relationship"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="nextOfKinRelationship">
                Relationship
              </FieldLabel>
              <Select
                  {...field}
                  aria-invalid={fieldState.invalid}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                <SelectTrigger>
                  <SelectValue placeholder="Select a relationship" />
                </SelectTrigger>
                <SelectContent>
                  {['Father', 'Mother', 'Son', 'Daughter', 'Sibling', 'Others'].map(
                    (relationship) => (
                      <SelectItem key={relationship} value={relationship}>
                        {relationship}
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
          name={fieldName ? fieldName+".phoneNumber" : "phoneNumber"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="nextOfKinPhoneNumber">
                Phone Number
              </FieldLabel>
              <PhoneInput 
                {...field} 
                id="nextOfKinPhoneNumber"
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


      {addressFieldsRequired && (
        <AddressFields 
          form={form} 
          fieldName={fieldName ? fieldName+".address" : "address"}
        />
      )}
    </>
  );
}
