'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function NavigateBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className="
        relative flex items-center justify-center
        w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
        rounded-full
        text-gray-700 dark:text-gray-200
        bg-white dark:bg-gray-800
        overflow-hidden
        transition-all duration-200 ease-in-out
        hover:text-gray-900 dark:hover:text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
      "
    >
      {/* Hover/ripple overlay */}
      <span className="absolute inset-0 bg-gray-200 dark:bg-gray-700 opacity-0 hover:opacity-30 transition-opacity duration-300 rounded-full"></span>

      {/* Icon */}
      <ChevronLeft className="z-10 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </button>
  );
}
