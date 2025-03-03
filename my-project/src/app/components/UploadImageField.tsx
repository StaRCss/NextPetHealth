"use client";

import React from "react";
import { MdCloudUpload } from "react-icons/md"; // Importing an upload icon

const UploadImageField: React.FC = () => {
  return (
    <div className="flex flex-col items-start mt-4">
      <label
        htmlFor="pet-image"
        className="flex flex-col items-center justify-center w-32 h-40 sm:w-48 md:w-52 lg:w-64 bg-white rounded-[20px] border-2 border-dashed border-gray-300 cursor-pointer mb-4" aria-label="Upload Pet Image"
      >
        {/* Icon */}
        <MdCloudUpload className="text-blue-400 text-4xl mb-2" />
        {/* Text */}
        <p className="text-sm text-gray-500 select-none">Add pet image</p>
        <p className="text-xs text-pink-400 select-none">(Image only)</p>
        {/* Hidden File Input */}
        <input
          id="pet-image"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
    </div>
  );
};

export default UploadImageField;
