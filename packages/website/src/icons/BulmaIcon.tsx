import { Props } from './types';

export function BulmaIcon({ size = 64, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 64"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m0 44 3.818-28L19.091 0l19.09 20-11.454 12L42 48 19.09 64 0 44Z"
        fill="#00D1B2"
      />
    </svg>
  );
}
