'use client';
import React, { useState } from "react";
import SignupForm from "@/components/signup/SignupForm";
import Modal from "@/components/modal/Modal";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const[showModal, setShowModal] = useState(false);
  const[showForm, setShowForm] = useState(true);
  const router = useRouter();

  const handleSignupSuccess = () => {
    setShowForm(false); // Hide the signup form
    setShowModal(true);
    setTimeout(() => {
      router.push('/dashboard/pets'); // Redirect to pets dashboard after modal closes
    }, 3000); // Close modal after 3 seconds
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
     {showForm && <SignupForm onSuccess={handleSignupSuccess} />}
      <Modal isOpen={showModal} >
        <h2 className="text-3xl font-bold text-blue-600 text-center
  mb-16">
            Signup Successful! Redirecting to your dashboard... 
      </h2>
        <Image
          src="/petpaw.png"
          alt="Pet Paws"
          width={400}
          height={300}
          className="hidden md:block mt-10"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Modal>
    </div>
  );
}
