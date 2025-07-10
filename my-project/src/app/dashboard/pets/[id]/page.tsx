// app/pets/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions"; // adjust path if needed
import { prisma } from "@/lib/prisma"; // singleton Prisma instance
import PetDetailsCard from "@/components/pets/PetDetailsCard"; // adjust path if needed
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QuickStats from "@/components/pets/QuickStats";

export default async function PetDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/login");

  const { id } = params;

  let pet;
  try {
  pet = await prisma.pet.findUnique({
    where: { 
    id , 
    ownerId : session.user.id ,
    },
  });
  } 
  
  catch (error)
  {
    console.log ("DB query error:" , error);
    redirect ("/error");
  }

  if (!pet) notFound();

  return (
    <div className="min-h-screen flex flex-col gap-3 bg-gradient-to-b from-[#F9F5FF] to-white md:pt-20 mx-6 md:mx-10 lg:mx-20 xl:mx-40">
      {/* Header */}
      <div className="flex flex-row items-center gap-4 justify-start md:w-full lg:w-[40%] xl:w-[40%] py-2 ">

        <Link
          href="/dashboard/pets"
          className="text-[#7F56D9] hover:bg-[#F9F5FF] p-2 rounded-full"
        >
          <button className="text-[#7F56D9] hover:bg-[#F9F5FF] p-2 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#53389E] ">
            {pet.name}&rsquo;s Profile
          </h1>
          <p className="text-[#9E77ED] text-sm md:text-base">
            Complete health & nutrition overview
          </p>
          
        </div>
      </div>

      {/* Pet Details Card */}
      <PetDetailsCard
        image={pet.image}
        name={pet.name}
        breed={pet.breed}
        birthday={pet.birthday}
        gender={pet.gender}
        id={pet.id} // Pass the pet ID to the PetDetailsCard
      />
      <QuickStats
      weight={pet.weight}
      />
    </div>
  );
}
