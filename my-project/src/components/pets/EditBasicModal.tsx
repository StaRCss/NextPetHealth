import NameInputField from "./fields/NameInputField";
import {useForm, FormProvider} from "react-hook-form"
import { CircleX } from "lucide-react";

type EditBasicModalProps = {
    isOpen: boolean;
    onClose: () => void ;
    id: string;
    name: string;
    breed?: string | null;
    gender?: string | null;
    birthday?: Date;

}



export default function EditBasicModal ({isOpen, onClose, id, name , breed, gender, birthday} : EditBasicModalProps) {
    const methods = useForm();

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                <button
               className="absolute top-4 right-4 text-purple-500 hover:text-purple-700"
               onClick = { (onClose)}
                >
              <CircleX />

                </button>
                <FormProvider {...methods}>
                    <NameInputField/>
                </FormProvider>
            </div>
        </div>
    );
}
