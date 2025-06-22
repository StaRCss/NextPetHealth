import { Controller, useFormContext } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import { PetFormValues } from "../AddPetForm";
import dayjs from "dayjs";

const BirthdayInputField: React.FC = () => {
  const { control, formState, watch } = useFormContext<PetFormValues>();
  const { errors, touchedFields, dirtyFields } = formState;

  const birthday = watch("birthday");
  const defaultBirthday = dayjs().format("YYYY-MM-DD");

  const hasError = !!errors.birthday;
  const hasTouched = touchedFields.birthday || dirtyFields.birthday;
  const isValidValue = birthday && birthday !== defaultBirthday;

  const borderColor = hasError
    ? "#EF4444" // red-500
    : hasTouched && isValidValue
    ? "#22C55E" // green-500
    : "#D1D5DB"; // gray-300

  return (
    <div className="flex flex-col items-center w-[80%] md:w-[70%] lg:w-[60%] mt-4 mb-4 select-none">
      <label
        htmlFor="birthday"
        className="block text-sm font-medium text-center text-gray-700 mb-2"
      >
        Pet Birthday
      </label>

      <Controller
        name="birthday"
        control={control}
        defaultValue={defaultBirthday}
        render={({ field }) => (
          <DatePickerInput
            dropdownType="popover"
            placeholder="Pick a date"
            value={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              const formatted = date ? dayjs(date).format("YYYY-MM-DD") : "";
              field.onChange(formatted);
            }}
            maxDate={new Date()}
            className="w-full"
            id="birthday"
            name="birthday"
            aria-label="Pet Birthday"
            aria-invalid={hasError}
            aria-describedby={hasError ? "birthday-error" : undefined}
            aria-required="true"
            role="textbox"
            inputWrapperOrder={["label", "input", "description", "error"]}
            error={hasError ? errors.birthday?.message : undefined}
            tabIndex={0}
            required
            clearable
            styles={{
              input: {
                borderRadius: "16px",
                height: "42px",
                backgroundColor: "white",
                border: `2px solid ${borderColor}`,
              },
            }}
          />
        )}
      />

      {hasError && (
        <p
          id="birthday-error"
          role="alert"
          className="mt-2 text-sm text-red-600"
          aria-live="assertive"
        >
          {errors.birthday?.message}
        </p>
      )}
    </div>
  );
};

export default BirthdayInputField;
