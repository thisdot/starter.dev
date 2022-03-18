import { useState } from 'react';
import { XIcon, MenuIcon } from '@heroicons/react/outline';

interface Props {
  sections: string[];
}

export default function MobileNavigation({ sections }: Props) {
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    const frameworksDiv = document.querySelector('.toggleDiv');
    frameworksDiv.classList.toggle('show');
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
        <div className=" w-full h-screen overflow-visible">
          <nav>
            <ul>
              {sections.map((name) => (
                <li>
                  <a
                    href={`#${name.split(' ').join('').toLowerCase()}`}
                    className="t-dark dark:dark-t-light block py-2 px-8 hover:text-blue-500 
                      dark:hover:text-blue-500 text-md font-sm my-4 border-l-2 border-transparent hover:border-brand-500 
                      focus:text-blue-500 focus:dark:text-blue-500 focus:border-brand-500"
                    onClick={toggleNavigation}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
