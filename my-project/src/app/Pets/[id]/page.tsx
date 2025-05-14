// app/pets/[id]/page.tsx

export default function PetDetailsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Pet Details</h2>
        <p>This is a dynamic page for pets. There is no ID logic right now!</p>
      </div>
    </div>
  );
}
