import { Props } from './types';

export function ChakraIcon({ className, size = 48 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
    >
      <circle cx="24" cy="24" r="20" fill="#4db6ac" />
      <path
        fill="#fff"
        d="M33.357,21.5h-8.882c-0.187,0-0.308-0.198-0.222-0.365l5.03-9.745 c0.13-0.253-0.195-0.492-0.398-0.293l-14.2,13.974c-0.159,0.157-0.048,0.428,0.175,0.428H24.2c0.202,0,0.32,0.227,0.205,0.393 l-7.126,10.265c-0.17,0.245,0.154,0.528,0.374,0.327l15.873-14.55C33.694,21.78,33.585,21.5,33.357,21.5z"
      />
    </svg>
  );
}
