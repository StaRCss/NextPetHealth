// app/dashboard/pets/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/prisma";
import PetDetailsCard from "@/components/pets/PetDetailsCard";
import QuickStats from "@/components/pets/QuickStats";
import Health from "@/components/pets/Health";
import WeightProgress from "@/components/pets/WeightProgress";
import NavigateBackButton from "@/components/pets/fields/NavigateBackButton";
import { z } from "zod";
import dayjs from "dayjs";

// ----------------- Zod schema for route param -----------------
const petIdSchema = z.string().uuid();

interface WeightLog {
  date: Date;
  weight: number;
  unit: "kg" | "lb";
  createdAt: Date;
}

export default async function PetDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // ----- SESSION CHECK -----
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login");

  // ----- VALIDATE PET ID -----
  const parsedId = petIdSchema.safeParse(params.id);
  if (!parsedId.success) notFound();
  const petId = parsedId.data;

  // ----- FETCH PET DATA (ONLY NEEDED FIELDS) -----
  const pet = await prisma.pet.findFirst({
    where: { id: petId, ownerId: session.user.id },
    select: {
      id: true,
      name: true,
      image: true,
      breed: true,
      birthday: true,
      gender: true,
      weightLogs: {
        select: {
          date: true,
          weight: true,
          unit: true,
          createdAt: true,
        },
        orderBy: { date: "desc" },
        take: 10, // last 10 logs only
      },
    },
  });

  if (!pet) notFound();

  // ----- COMPUTED DATA -----
  const latestWeightLog: WeightLog | null = pet.weightLogs[0] ?? null;

  const age = dayjs().diff(dayjs(pet.birthday), "year");

  const weightLogsForChart = pet.weightLogs.map(log => ({
    createdAt: dayjs(log.createdAt).format("MMM DD"),
    fullDate: log.date.toISOString(),
    weight: log.weight,
    unit: log.unit,
  }));

  // ----- RENDER -----
  return (
    <main className="min-h-screen bg-light-gradient dark:bg-dark-gradient px-4 py-2 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <NavigateBackButton />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 xl:gap-12 mt-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-full">
            <PetDetailsCard
              id={pet.id}
              image={pet.image}
              name={pet.name}
              breed={pet.breed}
              birthday={pet.birthday}
              gender={pet.gender}
              age={age}
            />

            <QuickStats latestWeightLog={latestWeightLog} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <Health
              id={pet.id}
              name={pet.name}
              weightLogs={pet.weightLogs.map(log => ({
                date: log.date,
                weight: log.weight,
                unit: log.unit,
              }))}
            />

            <WeightProgress petId={pet.id} data={weightLogsForChart} />
          </div>
        </div>
      </div>
    </main>
  );
}
