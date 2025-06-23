"use client";
import { useRouter } from "next/navigation";
import AddPetForm from "@/components/pets/AddPetForm";
import CancelButton from "@/components/pets/fields/CancelButton";
import Header from "@/components/pets/fields/Header";
import { useState } from "react";
import Modal from "@/components/modal/Modal";

export default function AddPetPage() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();

  const handleAddPetSuccess = () => {
    setShowForm(false); // Hide the form
    setShowModal(true); // Show success modal
    setTimeout(() => {
      router.push('/dashboard/pets'); // Redirect after 3 seconds
    }, 3000);
  };


  return (
    <div className="flex md:flex-col md:items-center md:justify-center min-h-[100dvh] bg-slate-50 md:bg-purple-100">
      {showForm &&
        <div className="bg-slate-50 flex flex-col max-w-screen-md h-fit p-6 rounded-lg md:shadow-lg w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-row items-center justify-between mb-6">
            <Header title="Add Cat" />
            <CancelButton />
          </div>
          <AddPetForm onSuccess={handleAddPetSuccess} />
        </div>}
      <Modal
        isOpen={showModal}
        title="Thanks!"
        description="Your cat has been successfully added!"
        img="/petpaw.png"
      />
    </div>
  );
}
