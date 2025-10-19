"use client";

import { Camera, FilePenLine } from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";
import UploadImageModal from "./UploadImageModal";
import EditBasicModal from "./EditBasicModal";
import PetAvatar from "./PetAvatar";

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
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
<div className="flex flex-col items-center w-full bg-cardBg-light dark:bg-zinc-900 border border-purple-200 dark:border-zinc-800 rounded-2xl shadow-md p-4 relative">

      {/* Edit Button */}
      <button
        onClick={() => setIsEditOpen(true)}
        className="absolute top-3 right-3 p-2 rounded-full border border-purple-400 bg-white text-purple-600 hover:bg-purple-100 transition"
        aria-label="Edit pet details"
      >
        <FilePenLine size={16} />
      </button>

      {/* Profile Picture */}
      <div className="relative">
      <PetAvatar  image={image} name={name} size={120} />
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
      <EditBasicModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        id={id}
        name={name}
        breed={breed}
        gender={gender}
        birthday={birthday}
      />
    </div>
  );
}
