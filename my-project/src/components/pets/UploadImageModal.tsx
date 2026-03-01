"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
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

  // ✅ Stable close handler (fixes lint + prevents stale closures)
  const handleClose = useCallback(() => {
    onClose();
    setPreview(null);
    setFile(null);
    setError(null);
    setSuccessfullySubmitted(false);

    setTimeout(() => previouslyFocused.current?.focus(), 0);
  }, [onClose]);

  // Cleanup preview object URL
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  // Reset error when file changes
  useEffect(() => {
    setError(null);
  }, [file]);

  // Focus trap + ESC handling
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

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

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (!selectedFile) return;

    setPreview(URL.createObjectURL(selectedFile));
    setFile(selectedFile);
    setSuccessfullySubmitted(false);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please pick an image to upload.");
      return;
    }

    const validation = imageUploadSchema.safeParse({
      image: file,
      petId: id,
    });

    if (!validation.success) {
      setError("Invalid image upload data.");
      console.error(validation.error.flatten());
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

      if (!res.ok) throw new Error("Upload failed");

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Upload pet image"
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className="relative w-full max-w-md rounded-2xl bg-cardBg-light dark:bg-cardBg-dark p-6 shadow-2xl"
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={handleClose}
            className="absolute right-4 top-4 text-purple-500 hover:text-purple-700"
          >
            <CircleX />
          </button>

          <div className="mb-6 flex flex-col items-center">
            <PetAvatar image={preview || image} name={name} size={100} />
            <p className="mt-2 text-sm text-gray-500">
              {preview ? "New Photo Preview" : image ? "Current Photo" : "No Photo"}
            </p>
          </div>

          <div className="flex justify-center">
            <label className="relative flex h-32 w-52 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-300">
              <Upload className="mb-1 h-6 w-6 text-purple-500" />
              <p className="text-sm font-semibold text-purple-600">Upload Photo</p>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0"
                onChange={handleUpload}
              />
            </label>
          </div>

          <div className="mt-6 flex justify-center">
            <SubmitFormButton
              submitting={isSubmitting}
              label="Save Photo"
              icon={<CheckCircle size={16} />}
            />
          </div>

          <div className="mt-4 text-center">
            {error && <p className="text-sm text-red-500">{error}</p>}
            {successfullySubmitted && (
              <p className="text-sm text-green-500">Image uploaded successfully!</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
