"use client";

import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";

interface UploadImageFieldProps {
  control: any; // React Hook Form control
}

const UploadImageField: React.FC<UploadImageFieldProps> = ({ control }) => {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Controller
      name="image"
      control={control}
      render={({ field: { onChange } }) => (
        <div className="flex w-1/2 flex-col items-center mt-4">
          <label
            htmlFor="pet-image"
            className="flex flex-col items-center justify-center w-32 h-40 sm:w-48 md:w-52 lg:w-64 bg-white rounded-[20px] border-2 border-dashed border-gray-300 cursor-pointer mb-4"
            aria-label="Upload Pet Image"
          >
            {preview ? (
              <img src={preview} alt="Pet Preview" className="w-full h-full object-cover rounded-[20px]" />
            ) : (
              <>
                <MdCloudUpload className="text-blue-400 text-4xl mb-2" />
                <p className="text-sm text-gray-500 select-none">Add pet image</p>
                <p className="text-xs text-pink-400 select-none">(Image only)</p>
              </>
            )}
            {/* Hidden File Input */}
            <input
              id="pet-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                onChange(file); // Update React Hook Form state
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
      )}
    />
  );
};

export default UploadImageField;
