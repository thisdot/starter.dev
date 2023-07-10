import { Props } from './types';

export function AxiosIcon({ size = 800, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280.000000 280.000000"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g
        transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)"
        fill="#671cdf"
        stroke="none"
      >
        <path
          d="M1533 2257 l-72 -52 -1 -739 0 -738 28 18 c24 16 132 103 198 159 13
11 73 61 133 110 l110 90 -154 3 -155 3 0 599 c0 330 -3 600 -7 599 -5 0 -40
-24 -80 -52z"
        />
        <path
          d="M1224 2012 c-50 -42 -130 -108 -179 -147 -48 -38 -96 -78 -106 -87
-10 -9 -30 -25 -45 -35 -28 -18 -27 -18 121 -23 l150 -5 5 -613 5 -612 78 61
77 62 0 738 c0 407 -3 739 -7 738 -5 0 -49 -35 -99 -77z"
        />
      </g>
    </svg>
  );
}
