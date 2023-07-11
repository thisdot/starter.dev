import { Props } from './types';

export function BriefcaseIcon({ size = 800, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="briefcase" clipPath="url(#clip0_1684_48599)">
        <path
          id="Vector"
          d="M21.606 5.44558H16.4371V3.36274C16.4371 2.371 15.6302 1.56421 14.6385 1.56421H9.36111C8.36937 1.56421 7.56253 2.371 7.56253 3.36274V5.44558H2.39359C1.07684 5.44558 0.00554568 6.51687 0.00554568 7.83363C0.00554568 9.0297 -0.116946 10.1038 0.789437 11.3118C1.30226 11.9953 2.00698 12.4828 2.82738 12.7216L10.7941 15.0412C11.5828 15.2708 12.4166 15.2709 13.2054 15.0412L21.1721 12.7216C21.9925 12.4828 22.6973 11.9953 23.2101 11.3118C24.1206 10.0984 23.994 9.01322 23.994 7.83363C23.994 6.51687 22.9228 5.44558 21.606 5.44558ZM9.08595 3.36274C9.08595 3.21102 9.20939 3.08762 9.36111 3.08762H14.6385C14.7902 3.08762 14.9137 3.21107 14.9137 3.36274V5.44558H9.08595V3.36274Z"
          fill="currentColor"
        />
        <path
          id="Vector_2"
          d="M21.5983 14.1851C13.0053 16.687 13.1165 16.7376 12.0001 16.7376C10.8916 16.7376 11.1546 16.7335 2.40186 14.1851C1.479 13.9164 0.661689 13.4211 0.00585938 12.7383V20.0486C0.00585938 21.3653 1.0771 22.4366 2.39391 22.4366H21.6063C22.923 22.4366 23.9943 21.3653 23.9943 20.0486V12.7383C23.3385 13.4211 22.5212 13.9164 21.5983 14.1851Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1684_48599">
          <rect width="24" height="24" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}
