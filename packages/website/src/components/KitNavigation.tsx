import cn from 'clsx';
import { Header } from './MobileNavigation';

interface Props {
  headers: Header[];
  toggleNavigation: () => void;
}

export function KitNavigation({ headers, toggleNavigation }: Props) {
  return (
    <nav>
      <ul>
        {headers.filter(({ depth }) => depth > 1 && depth < 4)
          .map((header) => (
            <li>
              <a
                href={`#${header.slug}`}
                className={cn(
                  'block header-link py-2 px-4 border-l-4 border-transparent hover:border-brand-500 hover:text-blue-500 dark:hover:text-blue-500',
                  {
                    'text-xl font-medium t-dark dark:dark-t-light my-4':
                      header.depth === 2,
                    'text-md pl-10 text-gray-800 dark:dark-t my-3':
                      header.depth === 3,
                  }
                )}
                onClick={toggleNavigation}
              >
                {header.text}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
