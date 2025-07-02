'use client'
import React , {useState} from "react";
import LoginForm from "@/components/login/LoginForm";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal/Modal";
import Image from "next/image";


export default function Login() {
const[showModal, setShowModal]= useState(false);
const[showForm, setShowForm]=useState(true);
const router= useRouter();

const handleLoginSuccess = () => {
  setShowModal(true);
  setShowForm(false);
  setTimeout(() => {
    router.push('dashboard/pets');
  }, 3000);
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 ">
     {showForm && <LoginForm onSuccess ={handleLoginSuccess} /> }
      <Modal
      isOpen={showModal}
      >
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-16">
          Login Successful! Redirecting to your dashboard...
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

      
    </div>
  );
}