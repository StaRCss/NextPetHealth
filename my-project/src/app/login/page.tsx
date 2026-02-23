'use client'

import Link from 'next/link'
import { LoginForm } from '@/components/login/LoginForm'
import { AuthBackground } from '@/components/ui/AuthBackground'
import { Cat } from 'lucide-react'

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex flex-col p-6 md:p-10">
      <AuthBackground image="/login-illu.jpg" />

      {/* Header */}
      <header className="flex items-center gap-2">
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
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
