"use client";
import { useRouter } from "next/navigation";
import AddPetForm from "@/components/pets/AddPetForm";
import NavigateBackButton from "@/components/pets/fields/NavigateBackButton";
import Header from "@/components/pets/fields/Header";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import Image from "next/image";

export default function AddPetPage() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [submittedPetName, setSubmittedPetName] = useState(""); // 🆕 Track pet name
  const router = useRouter();

  const handleAddPetSuccess = (petName: string) => {
    setSubmittedPetName(petName);     // Set the pet name
    setShowForm(false);               // Hide the form
    setShowModal(true);               // Show success modal

    setTimeout(() => {
      router.push("/dashboard/pets"); // Redirect after 3s
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-purple-200 dark:bg-zinc-900 py-8 px-4 sm:px-6 lg:px-8 mb-14">
      {showForm && (
        <div className="max-w-3xl mx-auto md:mt-24 p-10 bg-violet-100 dark:bg-zinc-800 rounded-2xl shadow-lg">
          <div className="flex flex-row items-between w-full justify-between mb-8">
          <Header title="Add Cat" />
          <NavigateBackButton />
          </div>
          {/* Pass name back from form on success */}
          <AddPetForm onSuccess={handleAddPetSuccess} />
        </div>
      )}
      <Modal
        isOpen={showModal}
      >
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-16">
          {submittedPetName ? ` ${submittedPetName} added successfully!` : "Pet Added!"}
        </h2>
        <Image
          src="/petpaw.png"
          alt="Pet Paws"
          width={400}
          height={300}
        />
      </Modal>
    </main>
  );
}
