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
        topOffset: title.getBoundingClientRect().top,
      }));
    };

    const handleNavScroll = () => {
      let current = ''
      itemOffsets.current.forEach(item => {
        if (scrollY >= item.topOffset - 160) {
          current = item.id;
        }
      })
      setActiveId(current);
    }

    document.addEventListener('scroll', handleNavScroll);

    getItemOffsets();
    window.addEventListener('resize', getItemOffsets);

    return () => {
      window.removeEventListener('resize', getItemOffsets);
      document.addEventListener('scroll', handleNavScroll)
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
                  'block header-link py-2 px-4 hover:text-blue-500 dark:hover:text-blue-500 border-r-2 border-transparent hover:border-brand-500',
                  {
                    'dark:text-[#95DFFF] dark:border-[#95DFFF] text-blue-500 border-brand-500': activeId === header.slug,
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
