import { useState } from 'react';
import { XIcon, MenuIcon } from '@heroicons/react/outline';
import { FrameworkNavigation } from './FrameworkNavigation';
import { KitNavigation } from './KitNavigation';

interface Props {
  sections?: string[];
  headers?: any;
}

export default function MobileNavigation({ sections, headers }: Props) {
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    const toggleDivList = document.querySelectorAll('.toggleDiv');
    toggleDivList.forEach((item) => item.classList.toggle('show'));
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
            <MenuIcon className="w-5 h-5 mr-2" aria-hidden="true" />{' '}
            {(sections && `Categories`) || (headers && `Overview`)}
          </>
        ) : (
          <>
            <XIcon className="w-5 h-5" aria-hidden="true" /> Close
          </>
        )}
      </div>
      {open ? (
        <div className=" w-full h-screen">
          {(sections && (
            <FrameworkNavigation
              sections={sections}
              toggleNavigation={toggleNavigation}
            />
          )) ||
            (headers && (
              <KitNavigation
                headers={headers}
                toggleNavigation={toggleNavigation}
              />
            ))}
        </div>
      ) : null}
    </>
  );
}
