import { Props } from './types';

export function VueIcon({ size = 48, className }: Props) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity="0.9" clipPath="url(#clip0_457_1045)">
        <path
          d="M36.6421 3.10529H45.7369L23 42.3263L0.263184 3.10529H17.6569L23 12.2L28.2295 3.10529H36.6421Z"
          fill="#41B883"
        />
        <path
          d="M0.263184 3.10529L23 42.3263L45.7369 3.10529H36.6421L23 26.6379L9.24424 3.10529H0.263184Z"
          fill="#41B883"
        />
        <path
          d="M9.24829 3.10529L23.0041 26.7516L36.6462 3.10529H28.2336L23.0041 12.2L17.6609 3.10529H9.24829Z"
          fill="#35495E"
        />
      </g>
      <defs>
        <clipPath id="clip0_457_1045">
          <rect
            width="45.4737"
            height="45.4737"
            fill="white"
            transform="translate(0.263184 0.263184)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
