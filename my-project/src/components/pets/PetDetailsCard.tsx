// components/PetDetailsCard.tsx
"use client";

import Image from "next/image";
import { Camera, FilePenLine,CircleX } from "lucide-react";
import dayjs from "dayjs";
import Modal from "../modal/Modal";
import { useState } from "react";


type PetDetailsCardProps = {
  image?: string | null;
  name: string;
  breed?: string | null;
  birthday: Date;
  weight?: number | null;
};

export default function PetDetailsCard({
  image,
  name,
  breed,
  birthday,
  weight,
}: PetDetailsCardProps) {
  const age = dayjs().diff(dayjs(birthday), "year");

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="flex flex-col items-center justify-center md:w-full lg:w-[40%] xl:w-[40%] bg-white border border-purple-200 rounded-lg shadow-md py-5 ">
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
        {weight !== null && weight !== undefined && <p className="bg-purple-100 text-purple-500 border border-purple-300 rounded-2xl text-sm  font-semibold h-6 md:h-7 px-3 min-w-20 text-center flex items-center justify-center"> {weight} kg</p>}
      </div>

      {/* Edit Button */}
      <button className="flex flex-row h-10 mt-4 gap-2 items-center justify-center w-[80%] bg-white border border-[#7F56D9] text-[#7F56D9] rounded hover:bg-[#e0d7f1] transition-colors">
        <FilePenLine size={18} /> Edit Basic Info
      </button>


        {/* Modal for Edit Form */}
        <Modal isOpen={isModalOpen}>
       <div className="flex flex-col items-center justify-center">
        <button className=" text-purple-500 hover:text-purple-700 self-end " onClick={() => setIsModalOpen(false)}>
        <CircleX />
            </button>
            <h2 className="text-xl font-bold text-purple-500 text-center ">
              Update {name}'s Photo
            </h2>
            <div className="w-28 h-28 border-4 border-purple-300 rounded-full overflow-hidden bg-gray-200 shadow-lg mt-4">
        {image ? (
          <Image
            src={image}
            alt={`${name}'s picture`}
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl md:text-7xl">😻</div>
        )}
        </div>
        <p className="text-gray-500 text-sm mt-2">Current Photo</p>
            <div className="flex flex-row items-center justify-evenly gap-3 w-full mt-4">
                <button className="w-32 h-24 md:w-48 md:h-28 bg-white text-purple-500 rounded-lg border border-purple-300 hover:bg-purple-100">Upload Photo</button>
                <button className="w-32 h-24 md:w-48 md:h-28 bg-white text-purple-500 rounded-lg border border-purple-300 hover:bg-purple-100">Take photo</button>

            </div>
            </div>
        </Modal>
    </div>
    
  );
}
