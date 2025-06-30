"use client"; 
import React from "react";
import Image from "next/image"; 
import Link from "next/link"; // Import Link for navigation
import { Clock, Settings, PlusCircle } from "lucide-react"; // Import Clock icon from lucide-react
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
    bg-white rounded-lg border-2 shadow-md 
    dark:bg-gray-500 dark:border-gray-700
  ">
            <Link href={`/dashboard/pets/${id}`} className={`flex flex-col w-full h-[200px] md:h-[240px] ${bgColor}  no-underline`}>
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
      
      
      <div className="flex justify-between self-start p-3 mb-2">
          <h4 className="text-sm font-medium flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-[#9E77ED]" />
            Today's Meals
          </h4>
        </div>
 
        <div className="space-y-2 min-h-[150px] max-h-[180px] overflow-y-auto pr-1">
</div>

 

<div className="bg-[#F9F5FF] h-16 w-[100%] p-3 md:p-4 flex justify-between">
  <div className="flex gap-2 items-center">

    {/* Button 1: Meal Plan */}
    <button
      className=" md:text-sm rounded-md p-2 border border-[#9347e9] bg-white hover:bg-[#F4EBFF] text-[#232225] h-10 md:h-10"
    >
      Meal Plan
    </button>

    {/* Button 2: Settings icon */}
    <button
      className=" md:text-sm flex items-center justify-center rounded-md border border-[#9347e9] bg-white hover:bg-[#F4EBFF] text-[#1c1b1d] h-10 md:h-10 w-10"
    >
      <Settings className="h-3.5 w-3.5 " />
    </button>
  </div>

  {/* Button 3: Add Meal */}
  <button
    className="bg-[#6B3CD2] border flex items-center flex-row gap-1 rounded-md p-2 hover:bg-[#6941C6] text-white md:text-sm h-10 md:h-10"
  >
    <PlusCircle className="mr-1 h-3 w-3 md:h-4 md:w-4" />
    Add Meal
  </button>
</div>

    </div>
    
  );
}
export default PetCard;  