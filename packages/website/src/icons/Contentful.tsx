import { Props } from './types';

export function ContentfulIcon({ className, size = 48 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 150"
      className={className}
      width={size}
      height={size}
    >
      <circle cx="75" cy="75" r="75" style="fill:#fff"/>
      <path d="M60.2 92.1a24.4 24.4 0 0 1 0-34.6 9.6 9.6 0 0 0-13.7-13.6 43.7 43.7 0 0 0 0 61.9A9.6 9.6 0 0 0 60.3 92Z" style="fill:#ffd75f"/>
      <path d="M60.2 57.5a24.5 24.5 0 0 1 34.7 0 9.6 9.6 0 1 0 13.6-13.6 43.9 43.9 0 0 0-62 0 9.6 9.6 0 1 0 13.7 13.6Z" style="fill:#4fb5e1"/>
      <path d="M94.9 92.1a24.5 24.5 0 0 1-34.7 0 9.6 9.6 0 1 0-13.6 13.7 43.9 43.9 0 0 0 62 0A9.6 9.6 0 0 0 94.9 92Z" style="fill:#f05751"/>
      <path d="M60.2 57.5a9.6 9.6 0 1 1 0-13.6 9.6 9.6 0 0 1 0 13.6Z" style="fill:#0681b6"/>
      <path d="M60.2 105.8a9.6 9.6 0 1 1 0-13.7 9.6 9.6 0 0 1 0 13.7Z" style="fill:#cd4739"/>
      <path d="M60 91.8a24.5 24.5 0 0 1 .1-34.6 9.6 9.6 0 1 0-13.5-13.6 43.7 43.7 0 0 0-.2 61.8A9.6 9.6 0 1 0 60 91.8Z" style="fill:#ffda00"/>
      <path d="M60.2 57.2a24.5 24.5 0 0 1 34.5.1 9.6 9.6 0 1 0 13.7-13.5 43.5 43.5 0 0 0-61.7-.3 9.6 9.6 0 0 0 13.5 13.7Z" style="fill:#67b3ff"/>
      <path d="M94.7 92a24.4 24.4 0 0 1-17.3 7A24.1 24.1 0 0 1 60 91.8a9.6 9.6 0 1 0-13.6 13.6 43.6 43.6 0 0 0 61.7.2A9.6 9.6 0 0 0 94.7 92Z" style="fill:#eb5a68"/>
      <path d="M60.2 57.2a9.6 9.6 0 1 1 0-13.5 9.6 9.6 0 0 1 0 13.5Z" style="fill:#47a1ff"/>
      <path d="M60 105.4a9.6 9.6 0 1 1 0-13.6 9.6 9.6 0 0 1 0 13.6Z" style="fill:#d5465f"/>
    </svg>
  );
}