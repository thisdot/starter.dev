import { useState } from 'react';
import { XIcon, MenuIcon } from '@heroicons/react/outline';
import { FrameworkNavigation } from './FrameworkNavigation';

interface Props {
  sections: string[];
}

export default function MobileNavigation({ sections }: Props) {
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    const toggleDiv = document.querySelector('.toggleDiv');
    toggleDiv.classList.toggle('show');
    setOpen(!open);
  };

  return (
    <>
      <div
        onClick={toggleNavigation}
        className="flex fixed right-6 bottom-8 border-solid border bg-slate-50 border-gray-800 p-2 
        rounded-md lg:hidden cursor-pointer"
      >
        {!open ? (
          <>
            <MenuIcon className="w-5 h-5 mr-2" aria-hidden="true" /> Categories
          </>
        ) : (
          <>
            <XIcon className="w-5 h-5" aria-hidden="true" /> Close
          </>
        )}
      </div>
      {open ? (
        <div className=" w-full h-screen">
          <FrameworkNavigation sections={sections} toggleNavigation={toggleNavigation} />
        </div>
      ) : null}
    </>
  );
}
