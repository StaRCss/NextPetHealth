"use client"; 
import React from "react";
import Image from "next/image"; 
import Link from "next/link"; // Import Link for navigation

type PetData = {
  name: string;
  age: number;
  breed: string;
  gender?: string;
  image?: string; // Optional image property
  bgColor?: string; 
  id: string; // Add id property
};

export function PetCard({ name, breed, gender, image, bgColor, id }: PetData) {

  return (       
    <div className="
    flex 
    h-[100%] md:h-[100%] 
    w-[100%]
    flex-col items-center justify-items-center
    bg-slate-100 rounded-lg border-2 shadow-md 
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
         
    </div>
    
  );
}
export default PetCard;  