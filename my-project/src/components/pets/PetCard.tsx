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

export function PetCard({ name, breed, gender, weight, image, bgColor, id }: PetData) {

  return (
          
    <div className="
    flex 
    h-[300px] md:h-[350px] 
    w-[80%] sm:w-[65%] md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-[90%] 
    flex-col items-center justify-center
    bg-slate-100 rounded-lg border-2 shadow-md m-4 
    dark:bg-gray-500 dark:border-gray-700
  ">
            <Link href={`/dashboard/pets/${id}`} className={`flex flex-col w-full h-[200px] md:h-[240px] ${bgColor} rounded-lg no-underline`}>
            <div>   
            <p className="text-2xl ml-2 mt-2">
            <span className="mr-1">{gender === 'female' ? '♀️' : gender === 'male' ? '♂️' : ''}</span>
            </p>
   
  {/* ✅ Clean circular image */}
       <div className=" w-24 h-24 md:w-32 md:h-32 m-auto rounded-full overflow-hidden bg-blue-400 shadow-lg  flex items-center justify-center">
  {image ? (
    <Image
     src={image}
     alt={`Picture of ${name}`}
     height={100}
     width={100}
     className="object-cover w-fit h-fit rounded-full"
    />
  ) : (
    <span className="text-7xl md:text-8xl mb-5">😻</span> // Emoji fallback (can change to 🐱, 🐶, 🐕, etc.)
  )}
</div>
        
          <h5 className="ml-6 mt-1 font-chewy text-xl text-gray-700 tracking-widest"> {name} </h5>
          <h5 className="flex ml-6 text-gray-800 truncate w-[90%]">
              {breed ? `${breed} ` : <span className="invisible">Placeholder</span>}
          </h5>
      </div></Link>
      
<div className="flex flex-col gap-1 w-full items-center justify-center m-auto text-sm text-gray-500 dark:text-gray-400">

  {/* Row 1: Values with fallbacks */}
 <Link
    href={`/dashboard/pets/${id}/weight`}
    className="flex justify-evenly w-full items-center gap-3 p-1 border-2 rounded-xl border-blue-300 bg-blue-100 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 "
  >
    <span role="image" aria-label="weight" className="text-2xl">⚖️</span>
    {weight || <span className="text-2xl">-</span>}
  </Link>

 <Link
    href={`/dashboard/pets/${id}/logs`}
    className="flex justify-evenly w-full items-center gap-3 p-1 border-2 rounded-xl border-blue-300 bg-blue-100  text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 "
  >
    <span role="image" aria-label="logs" className="text-2xl">📝</span>
    {weight || <span className="opacity-0">weight</span>}
  </Link>
</div>        
    </div>
    
  );
}

export default PetCard;  