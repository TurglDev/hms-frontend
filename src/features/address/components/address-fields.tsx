/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox"; 
import { Country, State } from 'country-state-city';

type AddressFieldProps = {
  form: any;
	fieldName?: string;
};

export function AddressFields({
  form,
	fieldName
}: AddressFieldProps) {
	
	const countries = useMemo(() => Country.getAllCountries(), []);

  const selectedCountry = form.watch(fieldName ? `${fieldName}.country` : "country");
  const states = useMemo(() => {
    return selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  }, [selectedCountry]);

  return (
    <>
      <div className="">
      <Controller
        name={fieldName ? fieldName+".addressLine1" : "addressLine1"}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="mb-2">
            <FieldLabel htmlFor="addressLine1">Address</FieldLabel>
            <Input
              {...field}
              id="addressLine1"
              aria-invalid={fieldState.invalid}
              placeholder="Street address"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name={fieldName ? fieldName+".addressLine2" : "addressLine2"}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="addressLine2" hidden>Address Line 2</FieldLabel>
            <Input
              {...field}
              id="addressLine2"
              aria-invalid={fieldState.invalid}
              placeholder="Apartment, suite, unit (optional)"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name={fieldName ? `${fieldName}.country` : "country"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Combobox
                value={field.value || ""}
                onChange={(value) => {
                  field.onChange(value); // update RHF
                  form.setValue(fieldName ? `${fieldName}.state` : "state", ""); // reset dependent state
                }}
                options={countries.map((c) => ({
                  label: c.name,
                  value: c.isoCode,
                }))}
                placeholder="Select Country"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={fieldName ? `${fieldName}.state` : "state"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="state">State</FieldLabel>
              <Combobox
                value={field.value || ""}
                onChange={field.onChange}
                disabled={!selectedCountry}
                options={states.map((s) => ({
                  label: s.name,
                  value: s.isoCode,
                }))}
                placeholder="Select State"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        
        <Controller
					name={fieldName ? fieldName+".city" : "city"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                {...field}
                id="city"
                aria-invalid={fieldState.invalid}
                placeholder="City"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
					name={fieldName ? fieldName+".postalCode" : "postalCode"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="postalCode">Postal Code</FieldLabel>
              <Input
                {...field}
                id="postalCode"
                aria-invalid={fieldState.invalid}
                placeholder="Postal Code"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </>
  );
}
