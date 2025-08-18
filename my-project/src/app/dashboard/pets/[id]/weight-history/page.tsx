import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/prisma";
import WeightHistoryCard from "@/components/pets/WeightHistoryCard";

export default async function WeightHistory({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect("/auth/login");
  }

  // Validate pet ID
  const petId = params.id;
  if (!petId || typeof petId !== "string") {
    notFound();
  }

  // Fetch pet details with logs
  const pet = await prisma.pet.findUnique({
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

  if (!pet) {
    notFound();
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md h-full">
      {/* Header with Back button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{pet.name}&apos;s Weight History</h1>
        <Link
          href={`/dashboard/pets/${petId}`}
          className="px-3 py-1.5 text-sm font-medium text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
        >
          ← Back to Profile
        </Link>
      </div>

      {/* Logs */}
      <div className="space-y-4">
        {pet.weightLogs.length === 0 ? (
          <p className="text-gray-500 italic">No weight logs yet.</p>
        ) : (
          pet.weightLogs.map((log) => (
            <WeightHistoryCard
              key={log.id}
              date={log.date}
              weight={log.weight}
              unit={log.unit}
              notes={log.notes}
            />
          ))
        )}
      </div>
    </div>
  );
}
