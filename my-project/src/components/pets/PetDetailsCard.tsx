"use client";

import Image from "next/image";
import { Camera, FilePenLine } from "lucide-react";
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
    <div className="flex flex-col items-center w-full bg-cardBg-light dark:bg-cardBg-dark border-purple-200 dark:border-neutral-800 rounded-2xl shadow-md p-4 relative">

      {/* Edit Button */}
      <button
        onClick={() => setIsEditOpen(true)}
        className="absolute top-3 right-3 p-2 rounded-full border border-purple-400 bg-white text-purple-600 hover:bg-purple-100 transition"
        aria-label="Edit pet details"
      >
        <FilePenLine size={16} />
      </button>

      {/* Profile Picture */}
      <div className="relative w-28 h-28 md:w-40 md:h-40">
        <div className="w-full h-full border-4 border-purple-300 rounded-full overflow-hidden bg-gray-200 shadow-md">
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute -bottom-1 -right-1 bg-purple-500 border border-white rounded-full p-2 hover:bg-purple-600 transition"
          aria-label="Change pet picture"
        >
          <Camera className="text-white w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Name */}
      <h2 className="text-lg md:text-xl font-semibold text-purple-500 dark:text-text-dark mt-4">{name}</h2>

      {/* Info Pills */}
      <div className="flex flex-wrap justify-center gap-2 px-4 mt-2">
        {breed && (
          <span className="px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium border border-purple-200 rounded-full">
            {breed}
          </span>
        )}
        <span className="px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium border border-purple-200 rounded-full">
          {age} {age === 1 ? "year" : "years"}
        </span>
        {gender && (
          <span className="px-3 py-1 bg-purple-100 text-purple-600 text-sm font-medium border border-purple-200 rounded-full capitalize">
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
