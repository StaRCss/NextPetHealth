import React from "react";
import Link from "next/link";

const AddPetButton: React.FC = () => {
  return (
    <Link href="/pets/Add">
      <button
        aria-label="Add a new pet"
        className="mt-4 w-12 h-12 bg-blue-500 text-white rounded-full shadow-md focus:ring-8  focus:ring-sky-500 focus:ring-opacity-50 focus:outline-none"
      >
        +
      </button>
    </Link>
  );
};

export default AddPetButton;
