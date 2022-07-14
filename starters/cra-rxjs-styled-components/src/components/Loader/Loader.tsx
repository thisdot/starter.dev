import { useState } from 'react';

export const Loader = () => {
  return (
    <div
      data-testid="loader"
      className="flex w-60 h-24  rounded-md mx-auto mt-auto"
    >
      <div className="flex animate-pulse items-center h-full justify-center space-x-5">
        <div className="w-60 bg-gray-200 h-6 rounded-md"></div>
      </div>
    </div>
  );
};
