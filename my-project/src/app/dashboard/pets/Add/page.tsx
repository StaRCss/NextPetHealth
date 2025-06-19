import { redirect } from "next/navigation";
import AddPetForm from "@/components/pets/AddPetForm";
import CancelButton from "@/components/pets/fields/CancelButton";
import Header from "@/components/pets/fields/Header";


async function handleAddPet(formData: FormData) {
  "use server"; // Ensures function runs on the server

  const petData = {
    name: formData.get("name"),
    gender: formData.get("gender"),
    breed: formData.get("breed"),
    birthday: formData.get("birthday"),
  };

  console.log("Received Pet Data:", petData);
  // Save to DB here...

  redirect("/dashboard/pets"); // Navigate to Pets page after submission
}

export default function AddPetPage() {
  return (
<div className="flex md:flex-col md:items-center md:justify-center min-h-[100dvh] bg-slate-50 md:bg-sky-300" >
      <div className="bg-slate-50 flex flex-col max-w-screen-md h-fit p-6 rounded-lg md:shadow-lg w-full md:w-2/3 lg:w-1/2 "> 
      <div className="flex flex-row items-center justify-between mb-6">
      <Header title="Add Pet"  />
      <CancelButton />
      </div>
        <AddPetForm action={handleAddPet} />
      </div>
    </div>
  );
}
