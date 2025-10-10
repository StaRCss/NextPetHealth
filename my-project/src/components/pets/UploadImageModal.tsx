"use client";

import SubmitFormButton from "./FormSubmitButton";
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
import PetAvatar from "./PetAvatar";

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
      <div className="bg-cardBg-light dark:bg-cardBg-dark rounded-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-4 right-4 text-purple-500 hover:text-purple-700"
          onClick={() => { onClose(); setPreview(null); setError(null); setSuccessfullySubmitted(false); }}
          aria-label="Close modal"
        >
          <CircleX />
        </button>
        <div className="flex flex-col items-center">
        <PetAvatar image={preview || image} name={name} size={100} /> </div>
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

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
  <SubmitFormButton
  submitting={isSubmitting}
  label="Save Photo"
  icon={<CheckCircle size={16} />}/>
        </div>

      <div className="mt-4 text-center">
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successfullySubmitted && <p className="text-green-500 dark:text-lime-500 text-sm mt-2">Image uploaded successfully!</p>}
      </div>
      </div>
    </div>
    </form>
  );
}
