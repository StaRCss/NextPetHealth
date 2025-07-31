import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import NameInputField from "./fields/NameInputField";
import { CircleX, CheckCircle } from "lucide-react";
import type { PetFormValues } from "./AddPetForm";
import GenderCheckboxField from "./fields/GenderCheckboxField";
import BreedInputField from "./fields/BreedInputField";
import BirthdayInputField from "./fields/BirthdayInputField";
import {petFormSchema} from "@/lib/validations/PetFormSchema";

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
        mode: "onSubmit", // 👈 this shows validation errors on submit
    resolver: zodResolver(petFormSchema),

  });
  const { isSubmitting } = methods.formState;
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

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

  const handleSave = async (formData: PetFormValues) => {
    try {
      setSuccessfullySubmitted(false);
      console.log("Form submitted with data:", formData);
      const response = await fetch(`/api/pets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Pet updated successfully");
        setSuccessfullySubmitted(true);
        onClose();
      } else {
        console.error("Failed to update pet");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
          <form onSubmit={methods.handleSubmit(handleSave)}>
            <div className="flex flex-col items-center border-t border-b border-gray-300 gap-4 pb-4 mt-8">
              <NameInputField />
              <GenderCheckboxField/>
              <BreedInputField />
              <BirthdayInputField />
                   <button
  type="submit"
  aria-label="Save changes"
  disabled={ isSubmitting || successfullySubmitted}
  className={`mt-6 w-full text-white py-2 rounded-lg transition-colors
    ${successfullySubmitted
      ? "bg-green-400 cursor-not-allowed"
      : isSubmitting
      ? "bg-purple-300 cursor-not-allowed"
      : "bg-purple-500 hover:bg-purple-600"}
  `}
>
  {successfullySubmitted ? (
    <span className="flex flex-row items-center justify-center gap-2">
      <CheckCircle className="w-5 h-5" />
      Saved
    </span>
  ) : (
    "Save changes"
  )}
</button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
