// app/dashboard/pets/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import PetCard from "../../../components/pets/PetCard"; // adjust path

const pets = [
  { id: "1", ownerEmail: "user@example.com", name: "Tata", age: 5, gender:"female", breed: "European", weight: "1285.8kg", image: "/tata.webp" },
  { id: "2", ownerEmail: "user@hhhhh.com", name: "Tata", age: 5, gender:"female", breed: "European", weight: "1285.8kg", image: "" },
  { id: "3", ownerEmail: "user@exaaaample.com", name: "Tata", age: 5, gender:"female", breed: "European", weight: "1285.8kg", image: "" },
  { id: "4", ownerEmail: "user@exampkkle.com", name: "Tata", age: 5, gender:"female", breed: "European", weight: "1285.8kg", image: "" },
  { id: "5", ownerEmail: "user@exattmple.com", name: "Tata", age: 5, gender:"female", breed: "European", weight: "1285.8kg", image: "" },

];

const bgColors = [
  "bg-fuchsia-300",
  "bg-purple-300",
  "bg-teal-300",
  "bg-red-300",
  "bg-orange-300",
];

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type Session = {
  user?: SessionUser;
};

export default async function MyPetsPage() {



  const session: Session | null = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }
  
  // Filter pets for logged in user (by email)

  const petCount = pets.length;
  const userName = session.user.name || "there";

  return (
    <div className="min-h-screen bg-purple-100">
      <section className="w-full bg-blue-400 pt-10 md:pt-24 rounded-b-[40px] flex flex-col h-[120px] md:h-[230px] items-center justify-items-center ">
          <p className="text-lg text-gray-800">
            Hey <span className="font-bold text-gray-900">{userName}</span>, {petCount} pet{petCount !== 1 ? "s" : ""} 🐾 are waiting for you!
          </p>
        
      </section>

      <div
  className={`
    w-full
    px-6
    grid 
    grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] 
    justify-items-center 
    gap-10 md:gap-10 lg:gap-10 
    mt-4 lg:mt-10 xl:mt-5 
    mx-auto
    ${pets.length === 1 ? 'max-w-md' : pets.length === 2 ? 'xl:max-w-screen-lg 2xl:max-w-screen-lg' : 'max-w-screen-2xl'}
  `}
>
        {pets.map((pet, i) => {
          const bgColor = bgColors[i % bgColors.length];
          return (
            <PetCard
              key={pet.id}
              id={pet.id}
              name={pet.name}
              age={pet.age}
              breed={pet.breed}
              gender={pet.gender}
              image={pet.image}
              bgColor={bgColor}
            />
          );
        })}
      </div>

    </div>
  );
}