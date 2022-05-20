import cn from 'clsx';
import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '../icons/heroicons';

export function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isDarkModeEnabled =
      localStorage.theme === 'dark' ||
      document.documentElement.classList.contains('dark');
    setEnabled(isDarkModeEnabled);
  }, []);

  const handleChange = () => {
    if (enabled) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setEnabled(!enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={cn(
        'relative bg-gray-200 dark:bg-gray-500 inline-flex flex-shrink-0 h-8 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={cn(
          enabled ? 'translate-x-4' : 'translate-x-0',
          'pointer-events-none relative inline-block h-7 w-7 rounded-full bg-white dark:bg-gray-900 shadow transform ring-0 transition ease-in-out duration-200'
        )}
      >
        <span
          className={cn(
            enabled
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <SunIcon className="text-yellow-500 w-5 h-5" aria-hidden="true" />
        </span>
        <span
          className={cn(
            enabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <MoonIcon className="text-orange-500 w-5 h-5" />
        </span>
      </span>
    </Switch>
  );
}
