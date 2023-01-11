import { Props } from './types';

export function VuetifyIcon({ size = 48, className }: Props) {
  return (
    <svg
        width={size}
        height={size} 
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 2187.5 2500"
        viewBox="0 0 2187.5 2500"
        className={className}
    >
        <path d="m1093.8 0h-511l511 1208" fill="#1697f6"/>
        <path d="m1093.8 1562.5v937.5l-1093.8-2135.5h573zm0-1562.5h511l-511 1208" fill="#7bc6ff"/>
        <path d="m1614.5 364.5h573l-1093.7 2135.5v-937.5z" fill="#aeddff"/>
    </svg>
  )
}