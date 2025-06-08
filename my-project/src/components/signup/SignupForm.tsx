'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signUpSchema } from "@/lib/validations/SignUpSchema"; // Import your Zod schema
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';



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

  const[isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<{email?:string, password?:string, message?:string}>({});

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    setIsLoading(true);
    setServerError({}); // Reset server errors

    // Log the data to console for debugging
    console.log('Submitting signup data:', data);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/dashboard/pets'); 

      } else {
        const errorData = await response.json();
              // Check if errors were returned from Zod validation
      if (errorData.errors && typeof errorData.errors === 'object') {
       setServerError(errorData.errors); // like { email: 'Already taken' }
      } else {
        setServerError({ message: errorData.message || 'Signup failed' });
      }
    
      }
    } catch (error) {
      console.error('Signup error:', error);
      setServerError({ message: 'An unexpected error occurred. Please try again later.' });
    }
    finally{
      setIsLoading(false);
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
              onChange={() => setServerError({})}
              
              // Clear server error on input change
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            {serverError.email && <p className="text-red-500 text-sm">{serverError.email}</p>}
            {serverError.message && <p className="text-red-500 text-sm">{serverError.message}</p>}

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
            {serverError.password && <p className="text-red-500 text-sm">{serverError.password}</p>}
          </div>
          <button
            type="submit"
            disabled={isLoading || Object.keys(serverError).length > 0}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
          </p>
      </div>
    </div>
  );
};

export default SignupForm;
