'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

const LoginForm: React.FC = () => {
    const router = useRouter();
    
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
    
        try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
            console.log('✅ Login success');
            router.push('/dashboard/pets'); 
        } else {
            const err = await response.json();
            console.error('❌ Login error:', err);
            alert(err.message || 'Login failed');
        }
        } catch (error) {
        console.error('❌ Network error:', error);
        alert('Something went wrong');
        }
    };
    
    return (
        <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
    
            <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-gray-600 text-sm mb-1">Email</label>
                <input
                type="email"
                name="email"
                placeholder='Enter email'
                required
                className="w-full px-4 py-2 border rounded-lg"
                />
            </div>
    
            <div>
                <label className="block text-gray-600 text-sm mb-1">Password</label>
                <input
                type="password"
                name="password"
                placeholder='Enter password'
                required
                className="w-full px-4 py-2 border rounded-lg"
                />
            </div>
    
            <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg">
                Login
            </button>
            </form>
            <p className="text-center text-gray-600 text-sm mt-4">
                Dont have an account?
                 <Link href="/signup" className="text-pink-500 hover:underline">Sign Up</Link>
                 </p>
        </div>
        </div>
    );
}

export default LoginForm;