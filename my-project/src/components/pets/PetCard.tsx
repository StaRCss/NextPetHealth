"use client"; 
import React from "react";
import Image from "next/image"; 
import Link from "next/link"; // Import Link for navigation

type PetData = {
  name: string;
  age: number;
  breed: string;
  gender?: string;
  weight?: string;
  image?: string; // Optional image property
  bgColor?: string; 
  id: string; // Add id property
};


export function PetCard({ name, age, breed, gender, weight, image, bgColor, id }: PetData) {


  return (
            <Link href={`/pets/${id}`} passHref>

    <div className="flex flex-1  min-w-[250px] max-w-sm flex-col items-center bg-slate-100 rounded-lg border-2  shadow-md m-4 dark:bg-gray-500 dark:border-gray-700">

      <div className={`flex flex-col w-full h-[280px]  ${bgColor} rounded-lg`}>
            <p className="text-xl ml-4 mt-2">
  <span className="mr-1">{gender === 'female' ? '♀️' : gender === 'male' ? '♂️' : ''}</span>
  
</p>
   
  {/* ✅ Clean circular image */}
        <div className="relative w-32 h-32 m-auto rounded-full overflow-hidden bg-cyan-500 shadow-lg mb-3 flex items-center justify-center">
          <Image
            alt={`Picture of ${name}`}
            src={image || "/cat.webp"} // fallback image
            height={100}
             width={100}
           className="object-cover w-fit h-fit rounded-full"
          />
        </div>
          <h5 className="ml-6 font-chewy text-xl font-semibold text-gray-700 tracking-widest"> {name} </h5>
          <h5 className="flex ml-6 text-gray-800 mb-4 truncate w-[90%]">
              {breed ? `${breed} ` : <span className="invisible">Placeholder</span>}
          </h5>
      </div>
      <div className="grid grid-cols-3 gap-20 px-6 py-6 items-center justify-items-center text-sm text-gray-500 dark:text-gray-400 min-h-[80px] mx-auto">
  {/* Row 1: Values with fallbacks */}
  <p>
    <strong>{age ? `${age} years` : <span className="invisible">age</span>}</strong>
  </p>
  <p>
    <strong>{gender || <span className="invisible">gender</span>}</strong>
  </p>
  <p>
    <strong>{weight || <span className="invisible">weight</span>}</strong>
  </p>

  {/* Row 2: Placeholder for future links or actions */}
  <p className="text-center text-blue-500 cursor-pointer"> {/* example for future use */}</p>
  <p className="text-center text-blue-500 cursor-pointer"></p>
  <p className="text-center text-blue-500 cursor-pointer"></p>
</div>

           
    </div>
    </Link>
  );
}

export default PetCard;