import type { MarkdownHeader } from '../types';
import { useState, useRef, useEffect } from 'react';
import cn from 'clsx';

export interface Props {
  headers: MarkdownHeader[];
}

export function TableOfContents({ headers }: Props) {
  const itemOffsets = useRef([]);
  const [activeId, setActiveId] = useState<string>(undefined);

  useEffect(() => {
    const getItemOffsets = () => {
      const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');
      itemOffsets.current = Array.from(titles).map((title) => ({
        id: title.id,
        topOffset: title.getBoundingClientRect().top,
      }));
    };

    const handleNavScroll = () => {
      let activeId: string | undefined = undefined;
      itemOffsets.current?.forEach((item) => {
        if (scrollY >= item.topOffset - 160) {
          activeId = item.id;
        }
      });
      setActiveId(activeId);
    };

    getItemOffsets();

    document.addEventListener('scroll', handleNavScroll);
    document.addEventListener('resize', getItemOffsets);

    return () => {
      document.removeEventListener('scroll', handleNavScroll);
      document.removeEventListener('resize', getItemOffsets);
    };
  }, [itemOffsets]);

  const handleClick = (id: string) => {
    itemOffsets.current?.forEach((item) => {
      if (item.id === id) {
        window.scrollTo(0, item.topOffset - 145);
      }
    });
  };

  return (
    <nav>
      <ul>
        {headers
          .filter(({ depth }) => depth > 1 && depth < 4)
          .map((header) => (
            <li key={header.slug}>
              <a
                onClick={() => handleClick(header.slug)}
                className={cn(
                  'block header-link py-2 px-4 cursor-pointer hover:text-blue-500 dark:hover:text-blue-500 border-r-2 border-transparent hover:border-brand-500',
                  {
                    'dark:text-[#95DFFF] dark:border-[#95DFFF] text-blue-500 border-brand-500':
                      activeId === header.slug,
                    'text-[22px] leading-8 font-semibold t-dark dark:dark-t-light my-4':
                      header.depth === 2,
                    'text-[18px] leading-6 text-gray-800 dark:dark-t my-3':
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
