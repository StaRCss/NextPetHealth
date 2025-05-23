import React from "react";
import Link from "next/link";
import { LucideMenu } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function LandingNav() {
    return (
        <nav className="bg-pink-200 bg-opacity-95 shadow-md sticky top-0 z-50">
        <div className="mx-auto px-4 py-2 flex justify-between items-center">
      
          <Link href="/" >
            <img src="/catdog.png" alt="Logo" className=" h-16 w-16 md:h-20 mx-4 md:w-20 md:mx-12" />
          </Link>
      
          
          <div className="hidden md:flex gap-12 mx-12">
            <Link href="#features" className="m-auto text-lg font-semibold text-gray-700">Features</Link>
            <Link href="#about" className="m-auto text-lg font-semibold text-gray-700">About</Link>
            <Link href="#blog" className=" m-auto text-lg font-semibold text-gray-700">Blog</Link>
        
            <Link
             href="/signup"
             className="btn-donate inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white text-base font-semibold shadow-md hover:bg-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            aria-label="Get started with tracking your pet's health">
            <span>Get Started</span>
            <ChevronRight className="w-5 h-5" />
            </Link>

          </div>
      
          
          <details className="md:hidden mx-4">
            <summary className="cursor-pointer font-semibold"><LucideMenu/></summary>
            <div className="flex flex-col mt-2 gap-4">
              <Link href="#features">Features</Link>
              <Link href="#about">About</Link>
              <Link href="#blog">Blog</Link>
            </div>
          </details>
        </div>
      </nav>
      
    );
}