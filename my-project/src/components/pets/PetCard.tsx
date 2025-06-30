"use client"; 
import React from "react";
import Image from "next/image"; 
import Link from "next/link";
import { Clock, Settings, PlusCircle, ArrowBigRightDash } from "lucide-react";
import Modal from "@/components/modal/Modal"; // Assuming you have a Modal component for success messages
import { useState } from "react";

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
  const [showModal, setShowModal] = useState(false);
  
  return (       
    <article
      className="
        flex h-full w-full flex-col items-center justify-items-center
        bg-white rounded-lg border-2 shadow-md
        dark:bg-gray-500 dark:border-gray-700
        focus-within:ring-2 focus-within:ring-[#9347e9] focus-within:ring-offset-2
        focus-within:ring-offset-white dark:focus-within:ring-offset-gray-700
        outline-none
      "
      tabIndex={-1}
      aria-label={`Pet card for ${name}`}
    >
      <div className={`flex flex-col w-full h-[200px] md:h-[240px] ${bgColor} no-underline pb-4`}>
        <Link 
          href={`/dashboard/pets/${id}`} 
          className="justify-self-end self-end m-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-[#9347e9] rounded"
          aria-label={`View details for ${name}`}
        >
          <ArrowBigRightDash aria-hidden="true" />
        </Link>
  
        {/* Circular image */}
        <div 
          className="w-24 h-24 md:w-32 md:h-32 m-auto rounded-full overflow-hidden bg-blue-400 shadow-lg flex items-center justify-center"
          aria-label={image ? `Picture of ${name}` : `No image available for ${name}`}
          role="img"
          onClick={() => setShowModal(true)} // Open modal on click
          style={{ cursor: image ? 'pointer' : 'default' }} // Change cursor if image exists
          onKeyDown={(e) => { // Open modal on Enter key
            if (e.key === 'Enter' && image) {     
              setShowModal(true);
            } else if (e.key === 'Enter') {
              e.preventDefault(); // Prevent default action if no image 
            }
          }}
          tabIndex={0} // Make div focusable

        >
          {image ? (
            <Image
              src={image}
              alt={`Picture of ${name}`}
              height={100}
              width={100}
              className="object-cover w-fit h-fit rounded-full"
              tabIndex={-1} // prevent image from being focusable, no need
            />
          ) : (
            <span className="text-7xl md:text-8xl mb-5" aria-hidden="true">😻</span>
          )}
        </div> 

        <Modal isOpen={showModal} title={`Upload image of ${name}`} description={""} img={""}/>


        <div className="flex flex-row ml-6 gap-2 items-center">
          <p className="text-xl" aria-label={gender ? `Gender: ${gender}` : "Gender unknown"}>
            <span>{gender === 'female' ? '♀️' : gender === 'male' ? '♂️' : ''}</span>
          </p>
          <h5 
            className="font-chewy text-xl text-gray-700 tracking-widest"
            tabIndex={0}
            aria-label={`Pet name: ${name}`}
          >
            {name}
          </h5>
        </div>

        <h5 
          className="flex ml-6 text-gray-800 truncate w-[90%]" 
          tabIndex={0}
          aria-label={`Breed: ${breed ?? 'Unknown'}`}
        >
          {breed ? `${breed} ` : <span className="invisible">Placeholder</span>}
        </h5>
      </div>
      
      <div className="flex justify-between self-start p-3 mb-2">
        <h4 className="text-sm font-medium flex items-center" aria-label="Today's meals">
          <Clock className="h-3.5 w-3.5 mr-1.5 text-[#9E77ED]" aria-hidden="true" />
          Today's Meals
        </h4>
      </div>
   
      <div className="space-y-2 min-h-[150px] max-h-[180px] overflow-y-auto pr-1" aria-live="polite" aria-atomic="true"></div>

      <div className="bg-[#F9F5FF] h-16 w-full p-3 md:p-4 flex justify-between">
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="md:text-sm rounded-md p-2 border border-[#9347e9] bg-white hover:bg-[#F4EBFF] text-[#232225] h-10 md:h-10 focus:outline-none focus:ring-2 focus:ring-[#9347e9] focus:ring-offset-1"
            aria-label={`View meal plan for ${name}`}
          >
            Meal Plan
          </button>

          <button
            type="button"
            className="md:text-sm flex items-center justify-center rounded-md border border-[#9347e9] bg-white hover:bg-[#F4EBFF] text-[#1c1b1d] h-10 md:h-10 w-10 focus:outline-none focus:ring-2 focus:ring-[#9347e9] focus:ring-offset-1"
            aria-label={`Settings for ${name}`}
          >
            <Settings className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="bg-[#6B3CD2] border flex items-center flex-row gap-1 rounded-md p-2 hover:bg-[#6941C6] text-white md:text-sm h-10 md:h-10 focus:outline-none focus:ring-2 focus:ring-[#4A239A] focus:ring-offset-1"
          aria-label={`Add meal for ${name}`}
        >
          <PlusCircle className="mr-1 h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
          Add Meal
        </button>
      </div>
    </article>
  );
}

export default PetCard;
