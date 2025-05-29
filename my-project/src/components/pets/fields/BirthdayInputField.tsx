import { Controller, useFormContext } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import { PetFormValues } from "../AddPetForm"; // Adjust path if needed
import dayjs from "dayjs";

const BirthdayInputField: React.FC = () => {
  const { control } = useFormContext<PetFormValues>();

  if (!control) return null;

  return (
    <div className="flex flex-col items-center w-1/2 mt-4 select-none">
         <label
        htmlFor="pet-name"
        className="block text-sm font-medium text-center text-gray-700 mb-2 select-none"
      >
        Pet Birthday
      </label>
      <Controller
        name="birthday"
        control={control}
        defaultValue={dayjs().format("YYYY-MM-DD")} // ← default today
        render={({
          field: { value, onChange },
        }: {
          field: {
            value: string;
            onChange: (value: string | null) => void;
          };
        }) => (
          
          <DatePickerInput
            dropdownType="modal"       
            placeholder="Pick a date"
            value={value ? new Date(value) : null}
            onChange={(date) => {
              const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
              onChange(formattedDate);
            }}
            maxDate={new Date()} // ← No future dates
            className="w-full"
            styles={{
              input: {
                borderRadius: "16px",
                height: "42px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default BirthdayInputField;
