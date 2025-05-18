'use client';

import React from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const CancelButton= React.memo(() => {
  const router = useRouter();

  const handleCancel = React.useCallback(() => {
    router.replace('/pets');
  }, [router]);

  return (
    <button
      onClick={handleCancel}
      aria-label="Cancel and go back to Pets" // Accessible label for screen readers
      className="bg-transparent w-6 h-6 text-gray-500 rounded-2xl shadow-md hover:bg-slate-700 hover:text-white transition-all top-6 right-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <IoArrowBackCircleOutline className="w-6 h-6" />
    </button>
  );
});

CancelButton.displayName = 'CancelButton';
export default React.memo(CancelButton);