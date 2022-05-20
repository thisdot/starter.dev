import { useState } from 'react';
import { XIcon, MenuIcon } from '../icons/heroicons';
import { FrameworkNavigation } from './FrameworkNavigation';
import { KitNavigation } from './KitNavigation';

export type Header = {
  depth: number;
  slug: string;
  text: string;
};

interface Props {
  sections?: string[];
  headers?: Header[];
}

export default function MobileNavigation({ sections, headers }: Props) {
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    const toggleDivList = document.querySelectorAll('.toggleDiv');
    toggleDivList.forEach((item) => item.classList.toggle('show'));
    setOpen(!open);
  };

  const getLabel = () => {
    if (!open) {
      return (
        <>
          <MenuIcon className="w-5 h-5 mr-2" aria-hidden="true" />{' '}
          {(sections && `Categories`) || (headers && `Overview`)}
        </>
      );
    }
    return (
      <>
        <XIcon className="w-5 h-5" aria-hidden="true" /> Close
      </>
    );
  };

  return (
    <>
      <div
        onClick={toggleNavigation}
        className="flex fixed right-6 bottom-8 border-solid border bg-slate-50
         border-gray-800 p-2
        rounded-md lg:hidden cursor-pointer z-30"
      >
        {getLabel()}
      </div>
      {open && (
        <div className=" w-full bg dark:dark-bg  z-20 absolute top-[81px] h-screen">
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
      )}
    </>
  );
}
