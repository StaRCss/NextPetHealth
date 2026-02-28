'use client';
import React, { useState } from "react";
import SignupForm from "@/components/signup/SignupForm";
import Modal from "@/components/modal/Modal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AuthBackground } from "@/components/ui/AuthBackground";
import { Cat } from 'lucide-react';

export default function SignupPage() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();

  const handleSignupSuccess = () => {
    setShowForm(false); // Hide the signup form
    setShowModal(true);
    setTimeout(() => {
      router.push('/dashboard/pets'); // Redirect to pets dashboard after modal closes
    }, 3000); // Close modal after 3 seconds
  };

  return (
    <main className="relative min-h-screen flex flex-col p-6 md:p-10">
      <AuthBackground image="/login-illu.jpg" />

      {/* Header */}
      <header className="flex items-center gap-2 mb-8">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex items-center gap-2 font-medium"
        >
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <Cat className="h-4 w-4" />
          </div>
          <span className="text-lg">My Pet Health App</span>
        </Link>
      </header>

      {/* Form */}
      <section className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          {showForm && <SignupForm onSuccess={handleSignupSuccess} />}
        </div>
      </section>

      {/* Modal */}
      <Modal isOpen={showModal}>
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-16">
          Signup Successful! Redirecting to your dashboard...
        </h2>
        <Image
          src="/petpaw.png"
          alt="Pet Paws"
          width={400}
          height={300}
          className="hidden md:block mt-10"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Modal>
    </main>
  );
}