import { useState } from 'react';

export const Loader = () => {
  let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

  return (
    <div className="flex w-60 h-24  rounded-md mx-auto mt-auto">
      <div className="flex animate-pulse items-center h-full justify-center space-x-5">
        <div className="w-10 bg-red-200 h-6 rounded-md"></div>
        <div className="w-10 bg-red-200 h-6 rounded-md"></div>
        <div className="w-10 bg-red-200 h-6 rounded-md "></div>
        <div className="w-10 bg-red-200 h-6 rounded-md "></div>
      </div>
    </div>
  );
};
