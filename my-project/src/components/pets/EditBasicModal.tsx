

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
    if (!isOpen) return null; // <-- this is the fix

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">

            </div>
        </div>
    );
}
