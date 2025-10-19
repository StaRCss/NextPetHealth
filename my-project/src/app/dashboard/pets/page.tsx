// app/dashboard/pets/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import PetCard from "@/components/pets/PetCard";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";

const bgColors = [
  "bg-white dark:bg-zinc-700/50",

];

export default async function MyPetsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findFirst({
    where: { email: session.user.email },
    select : {
      id: true,
      name: true,
      email: true,
      pets: {
        select: {
          id: true,
          name: true,
          birthday: true,
          breed: true,
          gender: true,
          image: true,
     },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const userPets = user.pets;

  const petCount = userPets.length;
  const userName = session.user.name || "there";

  // Helper to calculate pet age from birthday
  const calculateAge = (birthday: Date): number => {
    const birthDate = dayjs(birthday);
    const now = dayjs();
    return now.diff(birthDate, "year");
  };

  return (
    <div className="min-h-screen bg-purple-200 dark:bg-zinc-900">
      <section className="w-full bg-blue-400 pt-10 md:pt-24 rounded-b-[40px] flex flex-col h-[120px] md:h-[230px] items-center justify-items-center">
        <p className="text-lg text-gray-800">
          Hey <span className="font-bold text-gray-900">{userName}</span>,{" "}
          {petCount} pet{petCount !== 1 ? "s are" : " is"} 🐾  waiting for you!
        </p>
      </section>

      <div
        className={`w-full px-8 md:px-24 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] justify-items-center sm:gap-8 md:gap-14 lg:gap-32 gap-y-32 mt-8 lg:mt-10 mx-auto ${
          userPets.length === 1
            ? "max-w-md"
            : userPets.length === 2
            ? "xl:max-w-screen-lg 2xl:max-w-screen-lg"
            : "max-w-screen-2xl"
        }`}
      >
        {userPets.map((pet, i) => {
          const bgColor = bgColors[i % bgColors.length];
          const age = calculateAge(pet.birthday);

          return (
            <PetCard
              key={pet.id}
              id={pet.id}
              name={pet.name}
              age={age}
              breed={pet.breed ?? "Unknown"}
              gender={pet.gender ?? "Unknown"}
              image={pet.image ?? undefined} // Optional: implement image uploads later
              bgColor={bgColor}
            />
          );
        })}
      </div>
    </div>
  );
}
