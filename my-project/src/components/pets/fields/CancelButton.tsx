'use client';

import React from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const CancelButton: React.FC = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.replace('/Pets');
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-transparent w-6 h-6 text-gray-500 rounded-2xl shadow-md hover:bg-slate-700 hover:text-white transition-all top-6 right-4"
    >
      <IoArrowBackCircleOutline className="w-6 h-6" />
    </button>
  );
};

export default React.memo(CancelButton);