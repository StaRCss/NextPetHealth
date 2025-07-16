import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import NameInputField from "./fields/NameInputField";
import { CircleX } from "lucide-react";
import type { PetFormValues } from "./AddPetForm";
import GenderCheckboxField from "./fields/GenderCheckboxField";
import BreedInputField from "./fields/BreedInputField";
import BirthdayInputField from "./fields/BirthdayInputField";

type EditBasicModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  name: string;
  breed?: string | null;
  gender?: string | null;
  birthday?: Date;
};

export default function EditBasicModal({
  isOpen,
  onClose,
  id,
  name,
  breed,
  gender,
  birthday,
}: EditBasicModalProps) {
  const methods = useForm<PetFormValues>({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset({
        name,
        breed,
        gender,
        birthday: birthday ? birthday.toISOString().substring(0, 10) : undefined,
      });
    }
  }, [isOpen, name, breed, gender, birthday, methods]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-4 right-4 text-purple-500 hover:text-purple-700"
          onClick={onClose}
          aria-label="Close Form"
        >
          <CircleX />
        </button>

        <FormProvider {...methods}>
          <form>
            <div className="flex flex-col items-center border-t border-b border-gray-300 gap-4 pb-4 mt-8">
              <NameInputField />
              <GenderCheckboxField/>
              <BreedInputField />
              <BirthdayInputField />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
