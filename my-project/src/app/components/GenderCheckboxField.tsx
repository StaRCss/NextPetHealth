"use client";

import React from "react";

const GenderField: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-full mt-0 mb-4 select-none">
      <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
        Gender
      </label>
      <div className="flex items-center justify-center space-x-4 sm:space-x-8">
        {/* Male Radio */}
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="gender"
            value="male"
            className="form-radio h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 "
          />
          <span className="text-gray-700">Male</span>
        </label>
        {/* Female Radio */}
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="gender"
            value="female"
            className="form-radio h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-700">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderField;
