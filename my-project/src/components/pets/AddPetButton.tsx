import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react"; // Importing the Plus icon from lucide-react
const AddPetButton: React.FC = () => {
  return (
    <Link href="/dashboard/pets/Add">
      <button
        aria-label="Add a new pet"
        className=" w-10 h-10 md:w-14 md:h-14 bg-blue-500 text-white rounded-full shadow-md focus:ring-8  focus:ring-sky-500 focus:ring-opacity-50 focus:outline-none"
      >
        <Plus className="text-red-500 w-10 h-10 m-auto" />

      </button>
    </Link>
  );
};

export default AddPetButton;
