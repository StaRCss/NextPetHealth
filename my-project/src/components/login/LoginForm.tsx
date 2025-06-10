'use client';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react'; // Optional: You can use any icon lib
import React, { useState } from 'react';
import {  z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm , SubmitHandler} from 'react-hook-form';
import { loginSchema } from '@/lib/validations/LoginSchema';

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps{
    onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onSuccess}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState<{ email?: string; password?: string; message?: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    
    const onLogin: SubmitHandler<LoginFormData> = async (data) => {
        setServerError({});
        setIsLoading(true);
    
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                onSuccess();

            } else {
                const errorData = await response.json();
                if (errorData.errors && typeof errorData.errors === 'object') {
                    setServerError(errorData.errors);

                } else {
                    setServerError({ message: errorData.message || 'Login failed' });
                }
            }

        } catch (error) {
            console.error('Server Error:' , error);
            setServerError({ message: 'An unexpected error occurred. Please try again later.' });
        }
        
        finally {
            setIsLoading(false);
        }
    };
    
    return (
    
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border border-muted bg-white px-6 py-12 shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back!</h2>
    
            <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                type="email"
                placeholder='Enter email'
                required
                className="w-full px-4 py-2 border rounded-lg"
                {...register('email', {
                 onChange:() => setServerError({}), // Clear server error on input change
                })}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
                {serverError.email && (
                    <p className="text-red-500 text-xs mt-1">{serverError.email}</p>    
                )}
            </div>
    
            <div className="relative">
                <label className="block text-gray-600 text-sm mb-1">Password</label>
                <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter password'
                className="w-full px-4 py-2 border rounded-lg"
                {...register('password')}
                />
                <button
                type="button"
                className="absolute right-3 top-9  text-gray-500"
                onClick={() => setShowPassword(prev => !prev)}
                aria-label= {showPassword? 'Hide Password' : 'Show Password'}
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
                {serverError.password && (
                    <p className="text-red-500 text-xs mt-1">{serverError.password}</p>
                )}
            </div>
    
            <button type="submit"
                   disabled={isLoading || Object.keys(errors).length > 0}
                   className="w-full bg-pink-500 text-white py-2 rounded-lg disabled:opacity-50 hover:bg-pink-600 transition-colors">
                  {isLoading ? 'Logging in...' : 'Login'}
            </button>
            </form>
            <p className="text-center text-gray-600 text-sm mt-4">
                Dont have an account?
                 <Link href="/signup" className="text-pink-500 hover:underline">Sign Up</Link>
                 </p>
        </div>
    );
}

export default LoginForm;