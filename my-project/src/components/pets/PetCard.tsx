"use client"; 
import React from "react";
import Image from "next/image"; 

type PetData = {
  name: string;
  age: number;
  breed: string;
  weight?: string;
  image?: string; // Optional image property
};

const colors =[
  "bg-pink-200"
]

export function PetCard({ name, age, breed, weight, image }: PetData) {


  return (

    <div className="flex flex-1 min-w-[250px] max-w-sm flex-col items-center bg-slate-100 rounded-lg shadow-md m-4 dark:bg-gray-500 dark:border-gray-700">
        
      <div className={`flex flex-col w-full items-center ${colors} rounded-lg pt-8`}>

                 {/* ✅ Clean circular image */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-cyan-500 shadow-lg mb-3 flex items-center justify-center">
          <Image
            alt={`Picture of ${name}`}
            src={image || "/cat.webp"} // fallback image
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
          <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-900">{name}</h5>
      </div>
          <div className="grid grid-cols-3 gap-10 m-8 items-center text-sm text-gray-500 dark:text-gray-400">
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Breed:</strong> {breed}</p>
            {weight && <p><strong>Weight:</strong> {weight}</p>}
          </div>       
    </div>
  );
}

export default PetCard;