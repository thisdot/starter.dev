import { Props } from './types';

export function VuetifyIcon({ size = 48, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 432 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M219.897 103.248L146.523 230.363L216 350.772L308.021 191.386L400 32H261.005L219.897 103.248Z"
        fill="#1697F6"
      />
      <path
        d="M124.021 191.386L128.84 199.768L197.478 80.8258L225.68 32H216H32L124.021 191.386Z"
        fill="#AEDDFF"
      />
      <path
        d="M261.005 32C295.785 146.458 216 350.772 216 350.772L146.523 230.363L261.005 32Z"
        fill="#1867C0"
      />
      <path
        d="M225.68 32C79.1426 32 128.84 199.768 128.84 199.768L225.68 32Z"
        fill="#7BC6FF"
      />
    </svg>
  );
}
