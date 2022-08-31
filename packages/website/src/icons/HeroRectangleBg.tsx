import { Props } from './types';

export function HeroRectangleBg(props: Props) {
  return (
    <svg
      width="100%"
      height="298"
      viewBox="0 0 100% 298"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1141_18120)">
        <rect width="100%" height="298" fill="#699CFF" />
        <rect x="50%" width="50%" height="298" fill="#0057FF" />
      </g>
      <defs>
        <clipPath id="clip0_1141_18120">
          <rect width="100%" height="298" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
