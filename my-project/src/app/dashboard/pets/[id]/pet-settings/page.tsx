// app/dashboard/pets/[id]/settings/page.tsx
import AddPetForm from "@/components/pets/AddPetForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import NavigateBackButton from "@/components/pets/fields/NavigateBackButton";
import { z } from "zod";

// ----- Zod schema to validate route param -----
const petIdSchema = z.uuid();

export default async function PetSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ----- SESSION CHECK -----
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login");

  // ----- VALIDATE PET ID -----
  const resolvedParams = await params;
  const parsedId = petIdSchema.safeParse(resolvedParams.id);
  if (!parsedId.success) redirect("/dashboard/pets");
  const petId = parsedId.data;

  // ----- FETCH PET FROM DB -----
  const petRecord = await prisma.pet.findFirst({
    where: {
      id: petId,
      ownerId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      breed: true,
      gender: true,
      birthday: true,
    },
  });

  if (!petRecord) redirect("/dashboard/pets");

  const pet = {
    id: petRecord.id,
    name: petRecord.name,
    breed: petRecord.breed ?? null,
    gender: petRecord.gender ?? null,
    birthday: petRecord.birthday.toISOString().split("T")[0], // yyyy-mm-dd
  };

  // ----- RENDER FORM -----
  return (
    <main className="min-h-screen bg-purple-200 dark:bg-zinc-900 py-5 px-4 sm:px-6 lg:px-8 mb-14">
      <div className="max-w-3xl mx-auto md:mt-24 p-10 bg-violet-100 dark:bg-zinc-800 rounded-2xl shadow-lg">
        <div className="flex flex-row items-between w-full justify-between mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Edit{" "}
            <span className="text-purple-600 dark:text-fuchsia-400 font-bold">
              {pet.name}
            </span>
            ’s Info
          </h1>

          <NavigateBackButton />
        </div>

        <AddPetForm
          pet={{
            id: pet.id,
            name: pet.name,
            breed: pet.breed,
            gender: pet.gender,
            birthday: pet.birthday,
            role: "edit",
          }}
        />
      </div>
    </main>
  );
}
