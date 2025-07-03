"use client";

import Image from "next/image";
import { Camera, Upload, CircleX } from "lucide-react";
import { imageUploadSchema } from "@/lib/validations/imageUploadSchema";

type UploadImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  image?: string | null;
};

import React, { useState, useEffect } from "react";

export default function UploadImageModal({ isOpen, onClose, name, image }: UploadImageModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

 useEffect(() => {
setError(null);
  }, [file]);

  if (!isOpen) return null;

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);
        setFile(selectedFile);
    }
  };
    // Add a handler for saving the image
    const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically handle the save logic, e.g., 
    if (!file) return;

    // Validate the file type and size if needed
    const validation = imageUploadSchema.safeParse({ image: file });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    try{
        setIsSubmitting(true);
        setError(null);
        setSuccessfullySubmitted(false);
    
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", name);
    
        const response = await fetch("/api/pets/upload-image", {
            method: "POST",
            body: formData,
        });
    
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }
    
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        
        setSuccessfullySubmitted(true);
        setPreview(null); // Clear preview after successful upload

    } 
    catch (error) {
      console.error("Error saving image:", error);
      setError("Failed to save image. Please try again.");
      
    }
    finally {
        setIsSubmitting(false);
    }
};


  return (
    <form onSubmit={handleSave}>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-4 right-4 text-purple-500 hover:text-purple-700"
          onClick={() => { onClose(); setPreview(null); setError(null); }}
          
          aria-label="Close modal"
        >
          <CircleX />
        </button>
        <div className="w-28 h-28 border-4 border-purple-300 rounded-full overflow-hidden bg-gray-200 shadow-lg mx-auto">
          {preview ? (
            <Image
              src={preview}
              alt={`${name}'s new picture`}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          ) : image ? (
            <Image
              src={image}
              alt={`${name}'s picture`}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-6xl md:text-7xl">😻</div>
          )}
        </div>
        <p className="text-gray-500 text-sm text-center mt-2">Current Photo</p>
        <div className="flex flex-row items-center justify-evenly gap-3 w-full mt-6">
          <label className="flex flex-col items-center justify-center w-32 h-24 md:w-48 md:h-28 bg-white text-purple-500 rounded-lg border border-purple-300 hover:bg-purple-100 cursor-pointer">
            <Upload className="w-6 h-6" />
            <p className="font-semibold">Upload Photo</p>
            <p className="text-xs text-gray-500">From your device</p>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>



          <button className="flex flex-col items-center justify-center w-32 h-24 md:w-48 md:h-28 bg-white text-purple-500 rounded-lg border border-purple-300 hover:bg-purple-100">
            <Camera className="w-6 h-6" />
            <p className="font-semibold">Take Photo</p>
            <p className="text-xs text-gray-500">Use your camera</p>
          </button>
        </div>
        <button className="mt-6 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed "
          type="submit"
          aria-label="Save changes"
          disabled={!preview && !image || isSubmitting }
          >
            Save Changes
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successfullySubmitted && <p className="text-green-500 text-sm mt-2">Image uploaded successfully!</p>}
      </div>
    </div>
    </form>
  );
}
