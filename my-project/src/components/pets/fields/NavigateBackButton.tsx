'use client';

import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function NavigateBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className="
        bg-transparent w-6 h-6 text-gray-500 rounded-2xl shadow-md
        hover:bg-slate-700 hover:text-white transition-all
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    >
      <IoArrowBackCircleOutline className="w-6 h-6" />
    </button>
  );
}
