import { Disclosure } from '@headlessui/react';
import { XIcon, MenuIcon } from '@heroicons/react/outline';
import cn from 'clsx';
import { DarkModeToggle } from './DarkModeToggle';
import { HEADER_NAV_ITEMS } from '../config';
import { GitHubIcon } from '../icons';

export interface Props {
  currentPath: string;
}

export function NavBar({ currentPath }: Props) {
  return (
    <Disclosure
      as="nav"
      className="border-b border-gray-400 dark:border-gray-700"
    >
      {({ open }) => (
        <>
          <div className="max-w-screen-2xl mx-auto px-4">
            <div className="flex justify-between h-20">
              <div className="flex-shrink-0 flex items-center">
                <a href="/">
                  <span className="text-[24px] font-bold text-black dark:text-white">
                    starter.dev
                  </span>
                </a>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                {HEADER_NAV_ITEMS.map(({ title, href, Icon, isExternal }) => (
                  <a
                    key={href}
                    href={href}
                    target={isExternal ? '_blank' : '_self'}
                    className={cn(
                      't-dark dark:dark-t-light inline-flex items-center px-1 pt-2 border-b-2 border-transparent hover:border-brand-500',
                      {
                        'brand-b': currentPath === href,
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
                      href="https://github.com/thisdot/starter.dev"
                      target="_blank"
                      className="btn btn-tertiary btn-lg border-gray-600 text-gray-900 hover:bg-gray-100 dark:text-white dark:border-white dark:bg-transparent"
                    >
                      GitHub Kits Library
                      <GitHubIcon className="ml-2 text-lg" />
                    </a>
                  </div>
                </div>
                <div className="-ml-2 mr-2 flex items-center lg:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 ml-4 rounded-md t-dark dark:dark-t focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
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

          <Disclosure.Panel className="lg:hidden py-4 bg dark:dark-bg border-t border-gray-400 dark:border-gray-700 shadow">
            <div className="py-2 space-y-3">
              {HEADER_NAV_ITEMS.map(({ title, href, Icon, isExternal }) => (
                <Disclosure.Button
                  key={href}
                  as="a" // @ts-ignore
                  href={href} // @ts-ignore
                  target={isExternal ? '_blank' : '_self'}
                  className={cn(
                    'flex items-center justify-center bg dark:dark-bg t-dark dark:dark-t pl-6 pr-4 py-2 border-l-4 outline-none focus:ring-2 focus:ring-inset ring-blue-500',
                    {
                      'border-brand-500': currentPath === href,
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
            <div className="space-y-4 mx-6 my-4 text-center">
              <Disclosure.Button
                as="a" // @ts-ignore
                href="https://github.com/thisdot/starter.dev" // @ts-ignore
                target="_blank"
                className="btn btn-tertiary btn-lg border-gray-600 text-gray-900 hover:bg-gray-100 dark:text-white dark:border-white dark:bg-transparent"
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
