// components/ui/Modal.tsx
import React from 'react';
import Image from 'next/image';

type ModalProps = {
  isOpen: boolean;
   title:string;
    description:string;
    img: string;
}


const Modal: React.FC<ModalProps> = ({ isOpen,title, description, img }) => {
    // If you want to control the modal visibility, you can use the isOpen prop
    if (!isOpen) return null; // Don't render anything if modal is not open

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-lime-200 rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl text-blue-500 font-semibold ">{title}</h2>
     <p className="text-gray-700 ">{description}</p>
        
        <Image
          src={img}
           alt="Modal Image"
           width={400}
            height={300}
            className="w-full h-auto rounded-lg mb-4"
        />
      </div>
    </div>
  );
};

export default Modal;
