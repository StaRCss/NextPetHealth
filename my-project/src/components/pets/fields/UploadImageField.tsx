"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";
import Image from "next/image";

const UploadImageField : React.FC = () => {
  const { control, watch, formState:{errors} } = useFormContext();
  const file = watch("imageFile");
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <Controller
      name="imageFile"
      control={control}
      render={({ field: { onChange } }: { field: { onChange: (value: File | null) => void } }) => (
        <div className="flex w-1/2 flex-col items-center mt-4">
          <label
            htmlFor="pet-image"
            className="flex flex-col items-center justify-center w-32 h-40 sm:w-48 md:w-52 lg:w-64 bg-white rounded-[20px] border-2 border-dashed border-gray-300 cursor-pointer mb-4"
            aria-label="Upload Pet Image"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Pet Preview"
                className="w-full h-full object-cover rounded-[20px]"
                loading="lazy"
                width={256}
                height={256}
              />
            ) : (
              <>
                <MdCloudUpload className="text-blue-500 text-4xl mb-2" />
                <p className="text-sm text-gray-800 select-none">Add pet image</p>
                <p className="text-xs text-pink-800 select-none">(Image only)</p>
              </>
            )}
            <input
              id="pet-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                onChange(selectedFile);
              }}
            />
                     {errors.imageFile && (
  <p className="text-red-500 text-sm">{typeof errors.imageFile?.message === "string" ? errors.imageFile.message : ""}</p>
)}
          </label>
        </div>
      )}
    />
  )}


export default UploadImageField;
