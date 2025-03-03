import { MdPets } from "react-icons/md"; // Import MdPets icon from react-icons
import AddPetButton from "../components/AddPetButton"; // Adjust the path based on your project structure

export default function MyPetsPage() {
  const numberOfPets = 3; // You can dynamically fetch the number of pets

  return (
    <div className="min-h-screen">
      {/* Top Section with Pets Info */}
      <section className="w-full h-[25vh] bg-blue-400 p-6 rounded-b-[40px] flex items-center justify-between ">
        
        {/* Left Side (Icon + Pets + Text) */}
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
          <MdPets className="w-8 h-8 text-pink-300 mr-2" /> {/* Paw Icon */}
           <h2 className="text-3xl text-white font-bold">Pets</h2>
           </div>
            <p className="text-lg text-white">Your<span className="text-pink-300 text-2xl font-bold"> {numberOfPets} pets </span> are waiting for you!</p>
          </div>

        {/* Right Side (Button) */}
            <AddPetButton />

      </section>

      {/* Other content can go here */}
    </div>
  );
}
