"use client";

import { Camera, FilePenLine } from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";
import UploadImageModal from "./UploadImageModal";
import PetAvatar from "./PetAvatar";
import Link from "next/link";

type PetDetailsCardProps = {
  image?: string | null;
  name: string;
  breed?: string | null;
  birthday: Date;
  gender?: string | null;
  age?: number;
  id: string;
};

export default function PetDetailsCard({
  image,
  name,
  breed,
  birthday,
  gender,
  id,
}: PetDetailsCardProps) {
  const age = dayjs().diff(dayjs(birthday), "year");
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
<div className="flex flex-col items-center w-full bg-cardBg-light dark:bg-zinc-900 border border-purple-200 dark:border-zinc-800 rounded-2xl shadow-md p-4 relative">

      {/* Edit Button */}
      <Link
  href={{
   pathname: `/dashboard/pets/${id}/pet-settings`,
   query: {
    pet:JSON.stringify({ 
      id,
      name,
       breed,
        birthday: birthday.toISOString().split("T")[0],
         gender, 
         age }),
   }
  }}
  className="absolute top-3 right-3 btn-circle"
  aria-label="Edit pet details"
>
  <FilePenLine size={16} />
</Link>


      {/* Profile Picture */}
      <div className="relative">
      <PetAvatar  image={image} name={name} size={100} />
      {/* Change Picture Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-circle absolute -bottom-1 -right-1"
        aria-label="Change pet picture"
      >
        <Camera className=" w-5 h-5 md:w-6 md:h-6" />
      </button>
      </div>
      {/* Name */}
      <h1 className="text-lg md:text-xl font-semibold text-purple-500 dark:text-text-dark mt-4">{name}</h1>

      {/* Info Pills */}
      <div className="flex flex-wrap justify-center gap-2 px-4 mt-2">
        {breed && (
          <span className="pill min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
         {breed}
          </span>
        )}
          <span className="pill min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
         {age} {age === 1 ? "year" : "years"}
        </span>
        {gender && (
          <span className="pill min-w-[60px] sm:min-w-[70px] md:min-w-[80px]">
          {gender}
          </span>
        )}
      </div>

      {/* Modals */}
      <UploadImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        image={image}
        id={id}
      />
    </div>
  );
}
