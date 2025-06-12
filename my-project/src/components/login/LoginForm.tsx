'use client';

import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/LoginSchema';
import { signIn } from 'next-auth/react';

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onLogin: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setServerError(null);

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      onSuccess(); // trigger modal + navigation
    } else {
      setServerError('Invalid email or password.');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border bg-white px-6 py-12 shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>

      <form onSubmit={handleSubmit(onLogin)} className="w-full space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded-lg"
            {...register('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-lg"
            {...register('password')}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide Password' : 'Show Password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Server Error */}
        {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{' '}
        <Link href="/signup" className="text-pink-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
