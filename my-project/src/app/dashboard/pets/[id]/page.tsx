// app/dashboard/pets/[id]/page.tsx
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
import dayjs from "dayjs";
import WeightProgress from "@/components/pets/WeightProgress";

const petIdSchema = z.string().uuid();

export default async function PetDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) redirect("/auth/login");

  // Validate pet ID
  const parsedId = petIdSchema.safeParse(params.id);
  if (!parsedId.success) notFound();
  const petId = parsedId.data;

  // Fetch pet with weight logs
  const pet = await prisma.pet.findFirst({
    where: {
      id: petId,
      ownerId: session.user.id,
    },
    include: {
      weightLogs: {
        orderBy: { date: "desc" },
      },
    },
  });

  if (!pet) notFound();

  // Compute latest weight
  const latestWeightLog = pet.weightLogs[0] ?? null;

  // Compute age
  const age = dayjs().diff(dayjs(pet.birthday), "year");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5FF] to-white py-10 px-4 sm:px-6 lg:px-8 mb-14">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto mb-8 md:mt-10">
        <div className="flex items-center gap-4">
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
      </div>

      {/* Two-Column Layout */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 xl:gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-full">
            <PetDetailsCard
              image={pet.image}
              name={pet.name}
              breed={pet.breed}
              birthday={pet.birthday}
              gender={pet.gender}
              age={age}
              id={pet.id}
            />
            
              <QuickStats
                latestWeightLog={latestWeightLog ?? null}
/>
        
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
          
              <Health
                id={pet.id}
                weight={latestWeightLog?.weight ?? null}
                unit={latestWeightLog?.unit ?? "kg"}
                name={pet.name}
                weightLogs={pet.weightLogs} // pass all logs for charts
              />
              <WeightProgress
                data ={pet.weightLogs.map(log => ({
                date: dayjs(log.date).format("MMM DD"),
                weight: log.weight,
                unit: log.unit,
              })) ?? [] }
              />
          </div>
        </div>
      </div>
    </div>
  );
}
