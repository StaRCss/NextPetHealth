'use client';

import SignupForm from "@/components/signup/SignupForm";
import LoginForm from "@/components/login/LoginForm";
import { useState } from "react";

export default function Page() {
  const [formType, setFormType] = useState<'signup' | 'login'>('signup');

  const toggleForm = () => {
    setFormType((prev) => (prev === 'signup' ? 'login' : 'signup'));
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen bg-pink-100">
      {formType === 'signup' ? <SignupForm /> : <LoginForm />}

      <button onClick={toggleForm} className="text-pink-700 font-semibold mt-4">
        {formType === 'signup'
          ? 'Already have an account? Login'
          : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}
