import { generateHeaderAnchor } from "../lib/generateHeaderAnchor";

interface Props {
  sections: string[];
  toggleNavigation: () => void;
}

export function FrameworkNavigation({ sections, toggleNavigation }: Props) {
  return (
    <nav>
      <ul>
        {sections.map(name => (
          <li>
            <a
              href={`#${generateHeaderAnchor(name)}`}
              className="t-dark dark:dark-t-light block py-2 px-8 hover:text-blue-500
                      dark:hover:text-blue-500 text-md font-sm my-4 border-l-4 border-transparent hover:border-brand-500
                      focus:text-blue-500 focus:dark:text-blue-500 focus:border-brand-500"
              onClick={toggleNavigation}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
