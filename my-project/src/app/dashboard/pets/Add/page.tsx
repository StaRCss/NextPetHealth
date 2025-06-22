"use client";
import type { PetFormValues } from "@/components/pets/AddPetForm";
import { useRouter } from "next/navigation";
import AddPetForm from "@/components/pets/AddPetForm";
import CancelButton from "@/components/pets/fields/CancelButton";
import Header from "@/components/pets/fields/Header";

export default function AddPetPage() {
  const router = useRouter();

  async function handleAddPet(data: PetFormValues): Promise<void> {
    console.log("Form data received on client:", data);

    // TODO: Replace this with real API call later, e.g.:
    // await fetch('/api/pets', { method: 'POST', body: JSON.stringify(data) });

    // Simulate async delay
    await new Promise((res) => setTimeout(res, 1000));

    // Redirect after successful submission
    router.push("/dashboard/pets");
  }

  return (
    <div className="flex md:flex-col md:items-center md:justify-center min-h-[100dvh] bg-slate-50 md:bg-purple-100">
      <div className="bg-slate-50 flex flex-col max-w-screen-md h-fit p-6 rounded-lg md:shadow-lg w-full md:w-2/3 lg:w-1/2">
        <div className="flex flex-row items-center justify-between mb-6">
          <Header title="Add Cat" />
          <CancelButton />
        </div>
        <AddPetForm action={handleAddPet} />
      </div>
    </div>
  );
}
