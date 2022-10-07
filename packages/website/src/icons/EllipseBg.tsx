import { Props } from './types';

export function EllipseBg(props: Props) {
  return (
    <svg
      width="926"
      height="464"
      viewBox="0 0 926 464"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        opacity="0.2"
        cx="463"
        cy="463"
        r="463"
        fill="url(#paint0_radial_1141_18124)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_1141_18124"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(463 463) rotate(90) scale(463)"
        >
          <stop stopColor="#E3F6FE" />
          <stop offset="1" stopColor="#95DFFF" />
        </radialGradient>
      </defs>
    </svg>
  );
}
