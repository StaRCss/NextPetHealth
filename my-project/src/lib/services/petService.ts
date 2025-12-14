import { PetFormValues } from "@/components/pets/AddPetForm";

// Generic error handler for fetch responses
export async function handleResponseError(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message || "Something went wrong");
  }
    return response.json();
}

// API call to get pet by ID
export async function getPetById(id: string, ownerId: string) {
  const response = await fetch(`/api/pets/${id}?ownerId=${ownerId}`, {
    method: "GET",
  });
    if (!response.ok) {
    throw new Error("Failed to fetch pet");
    }
    return response.json();
}

// API call to add a new pet
export async function addPet(data: PetFormValues) {
  const response = await fetch("/api/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
    if (!response.ok) {
    throw new Error("Failed to add pet");
    }
    return response.json();
}

// API call to edit an existing pet
export async function editPet(id: string, data: PetFormValues) {
  const response = await fetch(`/api/pets/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });   
    if (!response.ok) {
    throw new Error("Failed to edit pet");
    }
    return response.json();
}

// API call to delete a pet
export async function deletePet(id: string) {
  const response = await fetch(`/api/pets/${id}`, {
    method: "DELETE",
  });   
    if (!response.ok) {
    throw new Error("Failed to delete pet");
    }
    return response.json();
}