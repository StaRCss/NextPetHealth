'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signUpSchema } from "@/lib/validations/SignUpSchema"; // Import your Zod schema
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';



type SignUpSchema = z.infer<typeof signUpSchema>;

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('✅ Signup success');
        router.push('/dashboard/pets'); 
      } else {
        const err = await response.json();
        console.error('❌ Signup error:', err);
        alert(err.message || 'Signup failed');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder='Enter email'
              {...register('email')}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder='Create password'
              {...register('password')}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
