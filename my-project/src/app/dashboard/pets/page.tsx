// app/dashboard/pets/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import PetCard from "../../../components/pets/PetCard"; // adjust path
import Footer from "@/components/landing/footer/Footer";

const pets = [
  { id: "1", ownerEmail: "user@example.com", name: "Tata", age: 5, gender:"female", breed: "European", weight: "1285.8kg", image: "/tata.webp" },
  { id: "2", ownerEmail: "user@example.com", name: "Pourpourichos", age: 7, gender: "male", breed: "" , weight: "7kg" },
  { id: "3", ownerEmail: "other@example.com", name: "Mousoudio", age: 3, breed: "Orange Crazy Playfull Kitten", gender: "male", weight: "23.5kg" },
  { id: "4", ownerEmail: "user@example.com", name: "Moudis", age: 5, gender:"male", breed: "Best Cat Of The World", weight: "3.5kg" },
  { id: "5", ownerEmail: "user@example.com", name: "Baris", age: 7.5, breed: "Tubby Fat Orange", weight: "8kg", gender:"male" },
  { id: "6", ownerEmail: "other@example.com", name: "Rocky", age: 3, breed: "Labrador Retriever orange with white tail" }
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
  const session = await getServerSession(authOptions as any) as Session;

  if (!session?.user?.email) {
    redirect("/login");
  }
  
  // Filter pets for logged in user (by email)

  const petCount = pets.length;
  const userName = session.user.name || "there";

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-100">
      <section className="w-full bg-blue-400 pt-10 md:pt-24 rounded-b-[40px] flex flex-col h-[150px] md:h-[250px] items-center justify-center">
          <p className="text-lg text-gray-800">
            Hey <span className="font-bold text-gray-900">{userName}</span>, your {petCount} pet{petCount !== 1 ? "s" : ""} 🐾 are waiting for you!
          </p>
        
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 gap-0 md:gap-4 lg:gap-6">
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
              weight={pet.weight}
              image={pet.image}
              bgColor={bgColor}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
