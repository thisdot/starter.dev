import { Props } from "./types";

export function AngularIcon({ size = 48, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 39 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.526367 6.70556L19.051 0.105286L38.0745 6.5882L34.9943 31.0972L19.051 39.9269L3.35716 31.2145L0.526367 6.70556Z"
        fill="#E23237"
      />
      <path
        d="M38.0828 6.5882L19.0593 0.105286V39.9269L35.0026 31.1119L38.0828 6.5882V6.5882Z"
        fill="#B52E31"
      />
      <path
        d="M19.0857 4.7533L7.54272 30.4357L11.8548 30.3624L14.1723 24.5687H24.5273L27.0648 30.4357L31.1862 30.509L19.0857 4.7533ZM19.1152 12.9817L23.0166 21.1366H15.6829L19.1152 12.9817Z"
        fill="white"
      />
    </svg>
  );
}
