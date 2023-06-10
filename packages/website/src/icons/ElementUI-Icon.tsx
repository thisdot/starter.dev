import { Props } from './types';

export function ElementUIIcon({ size = 48, className }: Props) {
  return (
    <svg
      height={size}
      viewBox="0 0 205.035 236.177"
      width="2170"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M181.518 103.129l-79 45.463v28.844l79-45.463zm-7-55.514l-72 41.434v28.844l93.498-53.805h-21.498zM103.018 0L.5 58.611 0 176.7l102.018 59.477 102.517-58.61.5-118.087zm.707 28l76.968 44.875-.377 89.096-77.347 44.218L26 161.316l.377-89.095z"
        fill="#409eff"
      />
    </svg>
  );
}
