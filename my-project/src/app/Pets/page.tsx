import { MdPets } from "react-icons/md"; // Import MdPets icon from react-icons
import AddPetButton from "../../components/pets/AddPetButton"; // Adjust the path based on your project structure
import PetCard from "../../components/pets/PetCard"; // Adjust the path based on your project structure


const pets = [
  { id: "1", name: "Tata", age: 5, gender:"female", breed: "European", weight: "5kg", image: "/tata.webp" },
  {id:"2", name: "Pour", age: 7, gender: "male", breed: "Σκατενιος Γατος" , weight: "7kg" },
  {id:"3", name: "Mousoudio", age: 3, breed: "Orange Crazy Playfull Kitten", gender: "male", weight: "3.5kg" },
  {id:"4", name: "Moudis", age: 5, gender:"male", breed: "Best Cat Of The World", weight: "3.5kg" },
  {id:"5", name: "Baris", age: 7.5, breed: "Tubby Fat Orange", weight: "8kg", gender:"male" },
];

const bgColors = [
  "bg-pink-200",
  "bg-fuchsia-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-orange-200",
];


export default function MyPetsPage() {
  const numberOfPets = pets.length; // You can dynamically fetch the number of pets

  return (
    <div className="min-h-screen  bg-gradient-to-b from-blue-200 to-blue-100">
      {/* Top Section Add Pet Button */}
      <section className="w-full bg-blue-400 pt-24 rounded-b-[40px] flex flex-col h-[200px]">
      

        {/* Bot Side (Icon + Pets + Text) */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center mt-4 gap-x-4">
         <span className="text-orange-500 text-3xl font-bold" >{numberOfPets} </span> 
           <h2 className="text-3xl text-white font-bold">Pets</h2>
            <MdPets className="w-8 h-8 text-fuchsia-200 mr-2" /> {/* Paw Icon */}
          </div>
            <p className="text-lg text-gray-800"> are waiting for you!</p>
          </div>

      </section>

        {/* Map through the pets array and render PetCard for each pet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  p-4 gap-4">
        {/* Map through the pets array and render PetCard for each pet */}

          {pets.map((pet) => {
           const bgColor = bgColors[parseInt(pet.id) % bgColors.length]; 
           return(
          <PetCard key={pet.id} name={pet.name} age={pet.age} breed={pet.breed} gender={pet.gender} weight={pet.weight} image={pet.image} bgColor={bgColor} id={pet.id}/>
        );
    })}
      </div>
    </div>
  );
}
