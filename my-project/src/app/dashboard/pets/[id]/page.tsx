import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";
import PetDetailsCard from "@/components/pets/PetDetailsCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QuickStats from "@/components/pets/QuickStats";
import Health from "@/components/pets/Health";
import { z } from "zod";

const petIdSchema = z.string().uuid();

export default async function PetDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) redirect("/auth/login");

  // Validate the pet ID param
  const parsedId = petIdSchema.safeParse(params.id);
  if (!parsedId.success) {
    notFound();
  }
  const petId = parsedId.data;

  let pet;
  try {
    pet = await prisma.pet.findUnique({
      where: {
        id: petId,
        ownerId: session.user.id,
      },
    });
  } catch (error) {
    console.error("DB query error:", error);
    redirect("/error");
  }

  if (!pet) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5FF] to-white px-6 md:px-10 lg:px-20 xl:px-40 py-10">
      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/pets"
          className="text-[#7F56D9] hover:bg-[#F9F5FF] p-2 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#53389E]">
            {pet.name}&rsquo;s Profile
          </h1>
          <p className="text-[#9E77ED] text-sm md:text-base">
            Complete health & nutrition overview
          </p>
        </div>
      </div>

      {/* Responsive Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <PetDetailsCard
            image={pet.image}
            name={pet.name}
            breed={pet.breed}
            birthday={pet.birthday}
            gender={pet.gender}
            id={pet.id}
          />
          <QuickStats weight={pet.weight} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <Health weight={pet.weight} />
        </div>
      </div>
    </div>
  );
}
