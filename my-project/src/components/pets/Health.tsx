'use client';
import React from "react";
import { ScanHeart } from "lucide-react";
import WeightInputField from "./fields/WeightInputField";

import { useForm, Control } from "react-hook-form";

type HealthProps = {
  weight: number | null;
};

const Health: React.FC<HealthProps> = ({ weight }) => {
  const methods = useForm({
    defaultValues: {
      petWeight: weight || "",
    },
  });

  return (
            <div className="flex flex-col md:w-full lg:w-[40%] xl:w-[40%] bg-white border border-purple-200 rounded-lg shadow-md py-2 h-32 md:h-52 lg:h-56 xl:h-60">
    <div className="flex flex-row gap-3 items-start justify-start text-purple-500 px-4">
                <ScanHeart />
                <h2 className="text md:text-2xl font-semibold">Health Information</h2>
    </div>
      {/* Health details based on weight */}
      <div className="flex flex-col px-4">
        {weight != null ? ( 
             <p className="text-lg md:text-xl text-purple-500">
            Current Weight: {weight} kg
          </p>
        ): (
          <p className="text-lg md:text-xl text-purple-500">    
             No weight data available yet
            </p>
          )}
      </div>
      <WeightInputField name="petWeight" control={methods.control} />
    </div>
  );
};
                                                                                                                                                              
export default Health;