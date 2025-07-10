// components/PetDetailsCard.tsx
"use client";

import Image from "next/image";
import { Camera, FilePenLine} from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";
import UploadImageModal from "./UploadImageModal";
import EditBasicModal from "./EditBasicModal";

type PetDetailsCardProps = {
  image?: string | null;
  name: string;
  breed?: string | null;
  birthday: Date;
  gender?: string | null;
  id: string; // Optional ID for the pet, if needed for image upload
};

export default function PetDetailsCard({
  image,
  name,
  breed,
  birthday,
  gender,
  id, // Optional ID for the pet, if needed for image upload
}: PetDetailsCardProps) {
  const age = dayjs().diff(dayjs(birthday), "year");

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center md:w-full lg:w-[40%] xl:w-[40%] bg-white border border-purple-200 rounded-lg shadow-md pb-5 ">

        {/* Edit Button */}
      <button className="flex flex-col m-2 p-1 rounded-full self-end items-center justify-center bg-white border border-[#7F56D9] text-[#7F56D9] hover:bg-[#e0d7f1] transition-colors"
      onClick = {() => setIsEditOpen(true)}
      >
        <FilePenLine size={14} />
      </button>

      {/* Profile Picture */}
      <div className="relative w-28 h-28 md:w-40 md:h-40">

      <div className="w-full h-full border-4 border-purple-300 rounded-full overflow-hidden bg-gray-200 shadow-lg">
        {image ? (
          <Image
            src={image}
            alt={`${name}'s picture`}
            width={160}
            height={160}
            className="object-cover w-full h-full"
            onError={() => console.error("Image failed to load:", image)}

          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl md:text-7xl">😻</div>
        )}
        </div>
        
        <button className="absolute -bottom-0 -right-0  bg-purple-500 border rounded-full p-2 hover:bg-purple-600 transition-colors"
        onClick={() => setIsModalOpen(true)}>
        <Camera className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Pet Name */}
      <h2 className="text-xl font-semibold text-[#53389E] mt-3">{name}</h2>

      {/* Pet Info */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 px-4 mt-2">
        <p className="bg-purple-100 text-purple-500 border border-purple-300 rounded-2xl text-sm font-semibold text-center px-3 flex items-center justify-center h-6 md:h-7 min-w-20 ">{breed}</p>
        <p className=" bg-purple-100 text-purple-500 border border-purple-300 rounded-2xl text-sm font-semibold text-center px-3 h-6 md:h-7 flex items-center justify-center min-w-20"> {age} {age === 1 ? "year" : "years"}</p>
        {gender !== null && gender !== undefined && <p className="bg-purple-100 text-purple-500 border border-purple-300 rounded-2xl text-sm  font-semibold h-6 md:h-7 px-3 min-w-20 text-center flex items-center justify-center"> {gender}</p>}
      </div>

     
        {/* Modal for Edit Form */}
        <UploadImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={name}
          image={image}
          id={id}
        />

        <EditBasicModal
          isOpen = {isEditOpen}
          onClose={() => setIsEditOpen(false)}
          id ={id}
          name ={name}
          breed ={breed}
          gender ={gender}
          birthday={birthday}
        />
    </div>
    
  );
}
