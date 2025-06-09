'use client';
import React, { useState } from "react";
import SignupForm from "@/components/signup/SignupForm";
import Modal from "@/components/modal/Modal";
import { useRouter } from "next/navigation";
import { title } from "process";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     {showForm && <SignupForm onSuccess={handleSignupSuccess} />}
      <Modal isOpen={showModal} 
      title="Thanks!" 
       description="Your account successfully created!"
       img="/petpaw.png"/>
    </div>
  );
}
