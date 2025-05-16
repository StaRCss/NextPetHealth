import PetCard from "../../components/pets/PetCard"; // Adjust the path based on your project structure
import Footer from "@/components/landing/footer/Footer";

const pets = [
  { id: "1", name: "Tata", age: 5, gender:"female", breed: "European", weight: "125.8kg", image: "/tata.webp" },
  {id:"2", name: "Pourpourichos", age: 7, gender: "male", breed: "" , weight: "7kg" },
  {id:"3", name: "Mousoudio", age: 3, breed: "Orange Crazy Playfull Kitten", gender: "male", weight: "23.5kg" },
  {id:"4", name: "Moudis", age: 5, gender:"male", breed: "Best Cat Of The World", weight: "3.5kg" },
  {id:"5", name: "Baris", age: 7.5, breed: "Tubby Fat Orange", weight: "8kg", gender:"male" },
];

const bgColors = [
  "bg-fuchsia-300",
  "bg-purple-300",
  "bg-teal-300",
  "bg-red-300",
  "bg-orange-300",
];


export default function MyPetsPage() {
  const numberOfPets = pets.length; // You can dynamically fetch the number of pets

  return (
    <div className="min-h-screen  bg-gradient-to-b from-sky-100 to-blue-100">
      {/* Top Section Add Pet Button */}
      <section className="w-full bg-blue-400 pt-10 md:pt-24 rounded-b-[40px] flex flex-col h-[150px] md:h-[250px]">
      

        {/* Bot Side (Icon + Pets + Text) */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center mt-4 gap-x-3">
         <span className="text-orange-500 text-2xl font-bold" >{numberOfPets} </span> 
           <h2 className="text-2xl text-white font-bold">Pets</h2>
           <span className="text-3xl mr-2 rotate-6" role="img" aria-label="paw prints">🐾</span> {/* Paw Emoji */}
          </div>
            <p className="text-lg text-gray-800"> are waiting for you!</p>
          </div>

      </section>

        {/* Map through the pets array and render PetCard for each pet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 gap-0 md:gap-4 lg:gap-6">
        {/* Map through the pets array and render PetCard for each pet */}

          {pets.map((pet) => {
           const bgColor = bgColors[parseInt(pet.id) % bgColors.length]; 
           return(
          <PetCard key={pet.id} name={pet.name} age={pet.age} breed={pet.breed} gender={pet.gender} weight={pet.weight} image={pet.image} bgColor={bgColor} id={pet.id}/>
        );
    })}
      </div>
      <Footer />
    </div>
  );
}
