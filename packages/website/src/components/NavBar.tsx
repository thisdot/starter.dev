import { Disclosure } from '@headlessui/react';
import { XIcon, MenuIcon } from '@heroicons/react/outline';
import cn from 'clsx';
import { DarkModeToggle } from './DarkModeToggle';
import { headerNavItems } from '../config';
import { GitHubIcon } from '../icons';

export interface Props {
  currentPath: string;
}

export function NavBar({ currentPath }: Props) {
  return (
    <Disclosure
      as="nav"
      className="border-b border-gray-200 dark:border-gray-700"
    >
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex justify-between h-20">
              <div className="flex-shrink-0 flex items-center">
                <a href="/">
                  <span className="text-[24px] font-bold text-gray-900 dark:text-white">
                    starter.dev
                  </span>
                </a>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                {headerNavItems.map(({ title, href, Icon, isExternal }) => (
                  <a
                    key={href}
                    href={href}
                    target={isExternal ? '_blank' : '_self'}
                    className={cn(
                      'text-gray-900 dark:text-gray-50 hover:dark:text-white inline-flex items-center px-1 pt-2 border-b-2 border-transparent hover:border-blue-500 hover:dark:border-gray-50',
                      {
                        'border-blue-500': currentPath === href,
                      }
                    )}
                  >
                    {title}
                    {Icon && (
                      <span className="ml-1.5">
                        <Icon />
                      </span>
                    )}
                  </a>
                ))}
              </div>
              <div className="flex items-center">
                <DarkModeToggle />
                <div className="hidden lg:ml-4 lg:flex-shrink-0 lg:flex lg:items-center">
                  <div className="flex-shrink-0">
                    <a
                      href="https://github.com"
                      target="_blank"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      GitHub Kits Library
                      <GitHubIcon className="ml-2 text-lg" />
                    </a>
                  </div>
                </div>
                <div className="-ml-2 mr-2 flex items-center lg:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 ml-4 rounded-md text-gray-800 dark:text-gray-50  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="w-5 h-5" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-600 shadow">
            <div className="py-2 space-y-3">
              {headerNavItems.map(({ title, href, Icon, isExternal }) => (
                <Disclosure.Button
                  key={href}
                  as="a" // @ts-ignore
                  href={href} // @ts-ignore
                  target={isExternal ? '_blank' : '_self'}
                  className={cn(
                    'flex items-center justify-start bg-white-50 text-gray-700 dark:text-gray-50 pl-6 pr-4 py-2 border-l-4 border-gray-200 dark:border-gray-500 outline-none focus:ring-2 focus:ring-inset ring-blue-500',
                    {
                      'border-blue-500': currentPath === href,
                    }
                  )}
                >
                  {title}
                  {Icon && (
                    <span className="ml-1.5">
                      <Icon />
                    </span>
                  )}
                </Disclosure.Button>
              ))}
            </div>
            <div className="space-y-4 mx-6 my-4">
              <Disclosure.Button
                as="a" // @ts-ignore
                href="https://github.com" // @ts-ignore
                target="_blank"
                className="p-2 inline-flex items-center justify-center w-full rounded text-white bg-green-600"
              >
                GitHub Kits Library
                <GitHubIcon className="ml-2 text-lg" />
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
