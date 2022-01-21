import cn from 'clsx';
import { useState, useEffect, useRef } from 'react';

export interface Props {
  headers: any[];
}

export function TableOfContents({ headers }: Props) {
  const itemOffsets = useRef([]);
  const [activeId, setActiveId] = useState<string>(undefined);

  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');
      itemOffsets.current = Array.from(titles).map((title) => ({
        id: title.id,
        topOffset: title.getBoundingClientRect().top + window.scrollY,
      }));
    };

    getItemOffsets();
    window.addEventListener('resize', getItemOffsets);

    return () => {
      window.removeEventListener('resize', getItemOffsets);
    };
  }, []);

  return (
    <nav>
      <ul>
        {headers
          ?.filter(({ depth }) => depth > 1 && depth < 4)
          .map((header) => (
            <li>
              <a
                href={`#${header.slug}`}
                className={cn(
                  'block header-link py-2 px-4 hover:text-blue-500 dark:hover:text-blue-500',
                  {
                    'text-blue-500': activeId === header.slug,
                    'text-2xl font-medium t-dark dark:dark-t-light my-4':
                      header.depth === 2,
                    'text-xl text-gray-800 dark:dark-t my-3':
                      header.depth === 3,
                  }
                )}
              >
                {header.text}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
