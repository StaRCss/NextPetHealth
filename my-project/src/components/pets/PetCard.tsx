"use client";
import React from "react";
import Link from "next/link";
import { ArrowBigRightDash } from "lucide-react";
import PetAvatar from "./PetAvatar";

type PetData = {
  name: string;
  age: number;
  breed: string;
  gender?: string;
  image?: string;
  bgColor?: string;
  id: string;
};

export function PetCard({ name, breed, gender, image, bgColor, id }: PetData) {
  return (
    <article
      className={`
       relative flex flex-col items-center justify-center w-full h-full overflow-hidden  
        ${bgColor ?? "bg-gradient-to-b from-purple-50 to-purple-100 dark:from-[#1e1b26] dark:to-[#2a2039]"}
        border border-purple-200 dark:border-zinc-800
        rounded-2xl shadow-md hover:shadow-lg transition-all duration-300
        focus-within:ring-2 focus-within:ring-[#9347e9] focus-within:ring-offset-2
        focus-within:ring-offset-white dark:focus-within:ring-offset-zinc-900
      `}
      tabIndex={-1}
      aria-label={`Pet card for ${name}`}
    >
      {/* Top-right details link */}
      <Link
        href={`/dashboard/pets/${id}`}
        className="
          absolute top-3 right-3 p-2
          text-purple-600 dark:text-[#f4c4f3]
          hover:text-purple-800 dark:hover:text-[#fc67fa]
          transition-colors duration-200
          rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400
        "
        aria-label={`View details for ${name}`}
      >
        <ArrowBigRightDash size={20} aria-hidden="true" />
      </Link>

      {/* Pet Avatar */}
      <div className="mt-6">
        <PetAvatar image={image} name={name} size={100} />
      </div>

      {/* Pet info section */}
      <div className="flex flex-col items-center justify-center mt-4 mb-6 text-center">
        <div className="flex items-center gap-2">
          {gender && (
            <span
              className="text-xl"
              aria-label={gender ? `Gender: ${gender}` : "Gender unknown"}
            >
              {gender === "female" ? "♀️" : gender === "male" ? "♂️" : ""}
            </span>
          )}
          <h5
            className="
              font-chewy text-2xl text-gray-900 dark:text-white
              tracking-wide drop-shadow-sm
            "
            aria-label={`Pet name: ${name}`}
          >
            {name}
          </h5>
        </div>

        <p
          className="
            text-gray-600 dark:text-gray-400 text-sm mt-1
          "
          aria-label={`Breed: ${breed ?? "Unknown"}`}
        >
          {breed || "Unknown breed"}
        </p>
      </div>

    </article>
  );
}

export default PetCard;
