'use client';

import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <button
      type="button"
      className=" h-12 w-2/5 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      Submit
    </button>
  );
};

export default SubmitButton;
