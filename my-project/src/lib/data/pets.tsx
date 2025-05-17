export type Pet = {
  id: string;
  petType: string;
  name: string;
  gender: string;
  breed: string;
  birthday: string;
  image?: string;
};

let pets: Pet[] = [];

export function addPet(pet: Pet) {
  pets.push(pet);
}

export function getAllPets(): Pet[] {
  return pets;
}
