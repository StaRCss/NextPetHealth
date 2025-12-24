import AddPetForm from "@/components/pets/AddPetForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import NavigateBackButton from "@/components/pets/fields/NavigateBackButton";

export default async function PetSettingsPage({ searchParams, params }: any) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login");

  // 1. Read "pet" from URL query (stringified object)
  let petFromQuery = null;

  if (searchParams?.pet) {
    try {
      petFromQuery = JSON.parse(searchParams.pet);
      console.log("Loaded pet from query:", petFromQuery);
    } catch (e) {
      console.error("Invalid pet JSON in query");
    }
  }

  // 2. If query pet missing → fetch from DB as fallback 
  let pet = null;

  if (petFromQuery) {
    // Use query directly — ZERO extra API calls
    pet = {
      id: params.id,
      name: petFromQuery.name,
      breed: petFromQuery.breed ?? null,
      gender: petFromQuery.gender ?? null,
      birthday: petFromQuery.birthday, // already ISO yyyy-mm-dd
    };
  } else {
    // Fallback: server fetch (rare)
    const petRecord = await prisma.pet.findFirst({
      where: {
        id: params.id,
        ownerId: session.user.id,
      },
    });

    if (!petRecord) redirect("/dashboard/pets");

    pet = {
      id: petRecord.id,
      name: petRecord.name,
      breed: petRecord.breed,
      gender: petRecord.gender,
      birthday: petRecord.birthday.toISOString().split("T")[0],
    };

    console.log("Loaded pet from DB:", pet);
  }

  // 3. Render form with final merged pet
  return (
    <main className="min-h-screen bg-purple-200 dark:bg-zinc-900 py-5 px-4 sm:px-6 lg:px-8 mb-14">
              <div className="max-w-3xl mx-auto md:mt-24 p-10 bg-violet-100 dark:bg-zinc-800 rounded-2xl shadow-lg">
                          <div className="flex flex-row items-between w-full justify-between">

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
