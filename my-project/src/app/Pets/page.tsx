import { MdPets } from "react-icons/md"; // Import MdPets icon from react-icons
import AddPetButton from "../../components/pets/AddPetButton"; // Adjust the path based on your project structure
import PetCard from "../../components/pets/PetCard"; // Adjust the path based on your project structure

export default function MyPetsPage() {
  const numberOfPets = 3; // You can dynamically fetch the number of pets

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

      {/* Other content can go here */}
      <PetCard />

    </div>
  );
}
