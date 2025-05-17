// app/pets/[id]/page.tsx
import Image from "next/image"; 


// mockPet.ts
 const mockPet = {
  id: "123",
  name: "Tata",
  petType: "cat",
  image: "/tata.webp",
  gender: "female",
  birthday: "2020-03-15",
  breed: "European Shorthair Orange Tubby",
  age: 3,
  weight: "4.2kg",
  neutered: true,
  bio: "Loves sunbathing and tuna treats.",
};


export default function PetDetailsPage(name: string, image: string, gender:string) {

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 to-blue-100">
      <div className="flex flex-row items-center justify-between p-4 md:px-16 w-full h-16 md:h-32 md:mt-20 ">
                 <h5 className=" font-chewy text-2xl md:text-4xl font-semibold text-gray-700 tracking-widest"> {mockPet.name}'s profile </h5>
                 <div className="flex flex-row gap-3 md:gap-4">
                 <button className="bg-blue-500 h-8 w-8 md:h-10 md:w-10 rounded-lg md:text-3xl">✏️</button>
                 <button className="bg-blue-500 h-8 w-8 md:h-10 md:w-10 rounded-lg md:text-3xl">📤 </button>
                 </div>                            
      </div>
       <div className="flex flex-row bg-blue-400 h-[35vh] items-center ">
        <div className="flex w-1/2 h-full bg-slate-300 justify-center items-center">
        {mockPet.image ? (
          <Image
            src={mockPet.image}
            alt={`Picture of ${mockPet.name}`}
            height={100}
            width={100}
            className="object-cover rounded-full w-36 h-36 md:w-52 md:h-52 lg:h-52 lg:w-52 shadow-lg "
            style={{ borderRadius: "50%" }} // Ensures the image is circular
          />
        ) : (
          <span className="text-8xl mb-5">😻</span> // Emoji fallback (can change to 🐱, 🐶, 🐕, etc.)
        )}
        </div>
        <div className="flex flex-col bg-pink-200 h-full w-1/2 gap-1 items-start justify-center">
          <p className=" text-gray-800">{mockPet.breed},</p>
            <p className="text-pink-500 text-lg font-semibold tracking-wide">{mockPet.gender}
           <span className="rotate-6">{mockPet.gender === 'female' ? '♀️' : mockPet.gender === 'male' ? '♂️' : ''}</span> {mockPet.petType}</p>
          <p className=" text-gray-800 "> {mockPet.age} years old {mockPet.neutered} and weights {mockPet.weight}</p>  
        </div>
        
        
        </div>
      </div>
    
  );
}
