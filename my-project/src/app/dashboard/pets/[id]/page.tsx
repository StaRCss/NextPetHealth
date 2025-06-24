// app/pets/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions" // adjust path if needed
import { prisma } from "@/lib/prisma"; // singleton Prisma instance
import Image from "next/image";
import dayjs from "dayjs";

type PetDetailsPageProps = {
  params: {
    id: string;
  };
};

export default async function PetDetailsPage({ params }: PetDetailsPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/login");

  const {id} = params;

  const pet = await prisma.pet.findUnique({
    where: {id},
  });

  if (!pet) notFound();

  const age = dayjs().diff(dayjs(pet.birthday), "year");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 to-blue-100">
      <div className="flex flex-row items-center justify-between p-4 md:px-16 w-full h-16 md:h-32 md:mt-20">
        <h5 className="font-chewy text-2xl md:text-4xl font-semibold text-gray-700 tracking-widest">
          {pet.name}'s profile
        </h5>
        <div className="flex flex-row gap-3 md:gap-4">
          <button className="bg-blue-500 h-8 w-8 md:h-10 md:w-10 rounded-lg md:text-3xl">✏️</button>
          <button className="bg-blue-500 h-8 w-8 md:h-10 md:w-10 rounded-lg md:text-3xl">📤</button>
        </div>
      </div>

      <div className="flex flex-row bg-blue-400 h-[35vh] items-center">
        <div className="flex w-1/2 h-full bg-slate-300 justify-center items-center">
          {pet.image ? (
            <Image
              src={pet.image}
              alt={`Picture of ${pet.name}`}
              height={100}
              width={100}
              className="object-cover rounded-full w-36 h-36 md:w-52 md:h-52 shadow-lg"
            />
          ) : (
            <span className="text-8xl mb-5">😻</span>
          )}
        </div>

        <div className="flex flex-col bg-pink-200 h-full w-1/2 gap-1 items-start justify-center p-4">
          {pet.breed && (
            <p className="text-gray-800">{pet.breed},</p>
          )}
          {pet.gender && (
            <p className="text-pink-500 text-lg font-semibold tracking-wide">
              {pet.gender}
              <span className="rotate-6">
                {pet.gender === "female" ? "♀️" : pet.gender === "male" ? "♂️" : ""}
              </span>
            </p>
          )}
          <p className="text-gray-800">
            {age} years old {pet.neutered && "• neutered"} {pet.weight ? `and weights ${pet.weight} kg` : ""}.
          </p>
        </div>
      </div>
    </div>
  );
}