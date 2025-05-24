import React from "react";
import Link from "next/link";
import { LucideMenu } from "lucide-react";
import GetStarted from "./getstarted";

const NavLinks = [
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
  { href: "#blog", label: "Blog" },
]

export default function LandingNav() {
    return (
        <nav className="bg-pink-200 bg-opacity-95 shadow-md sticky top-0 z-50">
        <div className="mx-auto px-4 py-2 flex justify-between items-center">
      
          <Link href="/" >
            <img src="/catdog.png" alt="Logo" className=" h-16 w-16 md:h-20 mx-4 md:w-20 md:mx-12" />
          </Link>
               
          <div className="hidden md:flex gap-12 mx-12">
            {NavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-semibold text-gray-700 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          <GetStarted/>
          </div>
      
          <details className="md:hidden mx-4">
            <summary className="cursor-pointer font-semibold"><LucideMenu/></summary>
            <div className="flex flex-col mt-2 gap-4">
              {NavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-semibold text-gray-700 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              ))}
              
            </div>
          </details>
        </div>
      </nav>
      
    );
}