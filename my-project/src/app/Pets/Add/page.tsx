import { redirect } from "next/navigation";
import AddPetForm from "@/components/pets/AddPetForm";
import CancelButton from "@/components/pets/fields/CancelButton";
import Header from "@/components/pets/fields/Header";


async function handleAddPet(formData: FormData) {
  "use server"; // Ensures function runs on the server

  const petData = {
    petType: formData.get("petType"),
    name: formData.get("name"),
    gender: formData.get("gender"),
    breed: formData.get("breed"),
    birthday: formData.get("birthday"),
    image: formData.get("image"),
  };

  console.log("Received Pet Data:", petData);
  // Save to DB here...

  redirect("/pets"); // Navigate to Pets page after submission
}

export default function AddPetPage() {
  return (
    <div className="relative flex justify-start items-start md:mt-10 min-h-screen "> 
      <div className="bg-slate-50 flex flex-col max-w-screen-md max-h-fit p-6 rounded-lg shadow-lg md:w-2/3 lg:w-1/2 md:mx-auto"> 
      <div className="flex flex-row items-center justify-between">
      <Header title="Add Pet"  />
      <CancelButton />
      </div>
        <AddPetForm action={handleAddPet} />
      </div>
    </div>
  );
}
