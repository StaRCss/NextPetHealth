"use client";

import React, { useEffect, useRef, useState } from "react";
import { Upload, CircleX, CheckCircle } from "lucide-react";
import PetAvatar from "./PetAvatar";
import SubmitFormButton from "./FormSubmitButton";
import { imageUploadSchema } from "@/lib/validations/imageUploadSchema";

type UploadImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  image?: string | null;
  id: string;
};

export default function UploadImageModal({
  isOpen,
  onClose,
  name,
  image,
  id,
}: UploadImageModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Cleanup preview object URL
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  // Reset error when file changes
  useEffect(() => setError(null), [file]);

  // Focus trap + restore
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Focus first focusable element inside modal
    setTimeout(() => {
      modalRef.current?.focus();
    }, 10);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter(el => el.offsetParent !== null);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setPreview(null);
    setFile(null);
    setError(null);
    setSuccessfullySubmitted(false);

    // Restore focus
    setTimeout(() => previouslyFocused.current?.focus(), 0);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      setFile(selectedFile);
      setSuccessfullySubmitted(false);
      setError(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please pick an image to upload.");
      return;
    }

    const validation = imageUploadSchema.safeParse({ image: file });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessfullySubmitted(false);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("petId", id);

      const res = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      console.log("Image uploaded:", data);
      setSuccessfullySubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save image. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSave}>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Upload pet image"
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className="relative w-full max-w-md rounded-2xl bg-cardBg-light dark:bg-cardBg-dark p-6 shadow-2xl border border-purple-200/40 dark:border-zinc-700"
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 text-purple-500 hover:text-purple-700 dark:text-[#fc67fa]"
            onClick={handleClose}
          >
            <CircleX />
          </button>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <PetAvatar image={preview || image} name={name} size={100} />
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {preview ? "New Photo Preview" : image ? "Current Photo" : "No Photo"}
            </p>
          </div>

          {/* Frosted Upload Area */}
          <div className="flex justify-center w-full">
            <label
              htmlFor="pet-image"
              className="relative flex flex-col items-center justify-center w-40 h-28 md:w-52 md:h-32 rounded-2xl
              border-2 border-dashed border-purple-300 dark:border-[#fc67fa]/50
              bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md
              shadow-inner hover:shadow-lg hover:scale-[1.03] transition-all duration-300
              cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
              focus:ring-offset-white dark:focus:ring-offset-zinc-900"
            >
              <Upload className="w-6 h-6 text-purple-500 dark:text-[#f4c4f3] mb-1" />
              <p className="font-semibold text-purple-600 dark:text-[#fc67fa] text-sm">
                Upload Photo
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">From your device</p>

              <input
                id="pet-image"
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleUpload}
              />
            </label>
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-center">
            <SubmitFormButton
              submitting={isSubmitting}
              label="Save Photo"
              icon={<CheckCircle size={16} />}
            />
          </div>

          {/* Messages */}
          <div className="mt-4 text-center">
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {successfullySubmitted && (
              <p className="text-green-500 dark:text-lime-500 text-sm mt-2">
                Image uploaded successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
