'use client'
import React , {useState} from "react";
import LoginForm from "@/components/login/LoginForm";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal/Modal";


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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
     {showForm && <LoginForm onSuccess ={handleLoginSuccess} /> }
      <Modal
      isOpen={showModal}
      title="Wlcome Back!"
      description=""
      img="/petpaw.png"
      />

      
    </div>
  );
}