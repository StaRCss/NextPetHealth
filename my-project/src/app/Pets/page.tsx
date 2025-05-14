import { MdPets } from "react-icons/md"; // Import MdPets icon from react-icons
import AddPetButton from "../../components/pets/AddPetButton"; // Adjust the path based on your project structure
import PetCard from "../../components/pets/PetCard"; // Adjust the path based on your project structure


const pets = [
  { id: "1", name: "Tata", age: 5, breed: "European", weight: "5kg", image: "/tata.webp" },
  {id:"2", name: "Pour", age: 7, breed: "European" , weight: "5kg" },
  {id:"3", name: "Mousoudio", age: 3, breed: "European Shorthaired Orange ", weight: "3.5kg" },
  {id:"4", name: "Mousoudio", age: 3, breed: "European Shorthaired Orange ", weight: "3.5kg" },
  {id:"5", name: "Mousoudio", age: 3, breed: "European Shorthaired Orange ", weight: "3.5kg" },
];

const bgColors = [
  "bg-pink-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-orange-200",
];


export default function MyPetsPage() {
  const numberOfPets = pets.length; // You can dynamically fetch the number of pets

  return (
    <div className="min-h-screen">
      {/* Top Section Add Pet Button */}
      <section className="w-full bg-blue-400 p-4 rounded-b-[40px] flex flex-col md:mt-20">
        <div className="flex justify-end items-start">
            <AddPetButton /></div>

        {/* Bot Side (Icon + Pets + Text) */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center">
         <span className="text-pink-300 text-3xl font-bold" >{numberOfPets} </span> 
           <h2 className="text-3xl text-white font-bold">Pets</h2>
            <MdPets className="w-8 h-8 text-pink-300 mr-2" /> {/* Paw Icon */}
          </div>
            <p className="text-lg text-white"> are waiting for you!</p>
          </div>

      </section>

        {/* Map through the pets array and render PetCard for each pet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  p-4 gap-4">
        {/* Map through the pets array and render PetCard for each pet */}

          {pets.map((pet, index) => {
           const bgColor = bgColors[index % bgColors.length]; 
           return(
          <PetCard key={index} name={pet.name} age={pet.age} breed={pet.breed} weight={pet.weight} image={pet.image} bgColor={bgColor}/>
        );
    })}
      </div>
    </div>
  );
}
