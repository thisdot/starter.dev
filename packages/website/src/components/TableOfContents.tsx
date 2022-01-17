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
    <nav className="sticky top-0 p-8 border-r min-h-screen overflow-y-auto">
      <ul>
        {headers
          ?.filter(({ depth }) => depth > 1 && depth < 4)
          .map((header) => (
            <li
              style={{
                marginLeft: `${header.depth - 2}rem`,
              }}
              className={cn('header-link my-2', {
                'text-blue-500': activeId === header.slug,
                'text-2xl': header.depth === 1,
                'text-xl': header.depth === 2,
              })}
            >
              <a href={`#${header.slug}`}>{header.text}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
