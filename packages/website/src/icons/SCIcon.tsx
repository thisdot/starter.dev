import { Props } from './types';

export function SCIcon({ size = 48, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <text x="2" y="20">
        💅
      </text>
    </svg>
  );
}
