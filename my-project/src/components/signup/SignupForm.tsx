'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signUpSchema } from "@/lib/validations/SignUpSchema";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from "next-auth/react";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SignupFormProps {
  onSuccess: () => void;
}

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger, // to manually trigger validation
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
   reValidateMode: 'onChange', // Re-validate on change to clear errors as user types
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<{ email?: string; password?: string; message?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    setIsLoading(true);
    setServerError({});

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const loginResult = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (loginResult?.ok) {
          onSuccess();
        } else {
          setServerError({ message: "Signup succeeded but login failed." });
        }
      } else {
        const errorData = await response.json();
        if (errorData.errors && typeof errorData.errors === 'object') {
          setServerError(errorData.errors);
        } else {
          setServerError({ message: errorData.message || 'Signup failed' });
        }
      }
    } catch (error) {
      console.error('Server error:', error);
      setServerError({ message: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Sign up to get started
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name or Nickname</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                onChange: () => setServerError({}),
              })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create password"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-7 text-muted-foreground"
              aria-label={showPassword ? 'Hide Password' : 'Show Password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/*Confirm Password */}
          <div className="flex flex-col gap-1 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
             <Input
              id="confirmPassword"
             type={showConfirmPassword ? "text" : "password"}
             placeholder="Confirm your password"
             {...register("confirmPassword", {
             onChange: () => {
             setServerError({});
            trigger("confirmPassword"); // re-validate immediately
    },
  })}
/>
      {errors.confirmPassword && (
  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
)}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(prev => !prev)}
              className="absolute right-3 top-7 text-muted-foreground"
              aria-label={showConfirmPassword ? 'Hide Confirm Password' : 'Show Confirm Password'}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

            {/* Server Error */}
          {serverError.message && (
            <p className="text-sm text-destructive text-center">{serverError.message}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || Object.keys(serverError).length > 0}
          >
            {isLoading ? 'Creating Account…' : 'Create Account'}
          </Button>
        </form>

         <Button variant="outline" type="button" className="w-full mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignupForm;