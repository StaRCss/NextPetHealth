"use client";

import Image from "next/image";
import { Upload, CircleX, CheckCircle } from "lucide-react";
import { imageUploadSchema } from "@/lib/validations/imageUploadSchema";

type UploadImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  image?: string | null;
  id: string; // Optional ID for the pet, if needed for image upload
};

import React, { useState, useEffect } from "react";

export default function UploadImageModal({ isOpen, onClose, name, image,id }: UploadImageModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);


  useEffect(() => {
    if (!preview) return;
    // Cleanup function
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);
  

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
        setSuccessfullySubmitted(false);
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
      setError(validation.error.issues[0].message);
      return;
    }

    try{
        setIsSubmitting(true);
        setError(null);
        setSuccessfullySubmitted(false);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("petId", id); // Include the pet ID if needed
    
        const response = await fetch("/api/image-upload", {
            method: "POST",
            body: formData,
        });
    
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }
    
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        setSuccessfullySubmitted(true);
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
          onClick={() => { onClose(); setPreview(null); setError(null); setSuccessfullySubmitted(false); }}
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
        <p className="text-gray-500 text-sm text-center mt-2">
          {preview ? "New Photo Preview" : image ? "Current Photo" : "No Photo "}
        </p>
        <div className="flex flex-row items-center justify-evenly gap-3 w-full mt-6">
          <label className="flex flex-col items-center justify-center w-32 h-24 md:w-48 md:h-28 bg-white text-purple-500 rounded-lg border border-purple-300 hover:bg-purple-100 cursor-pointer">
            <Upload className="w-6 h-6" />
            <p className="font-semibold">Upload Photo</p>
            <p className="text-xs text-gray-500">From your device</p>
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>

        
        </div>
      <button
  type="submit"
  aria-label="Save changes"
  disabled={(!preview && !image) || isSubmitting || successfullySubmitted}
  className={`mt-6 w-full text-white py-2 rounded-lg transition-colors
    ${successfullySubmitted
      ? "bg-green-400 cursor-not-allowed"
      : isSubmitting
      ? "bg-purple-300 cursor-not-allowed"
      : "bg-purple-500 hover:bg-purple-600"}
  `}
>
  {successfullySubmitted ? (
    <span className="flex flex-row items-center justify-center gap-2">
      <CheckCircle className="w-5 h-5" />
      Saved
    </span>
  ) : (
    "Save changes"
  )}
</button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successfullySubmitted && <p className="text-green-500 text-sm mt-2">Image uploaded successfully!</p>}
      </div>
    </div>
    </form>
  );
}
