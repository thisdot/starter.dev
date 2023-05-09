export function LitElementIcon({ size = 48, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 200"
      width={size}
      height={size}
      className={className}
    >
      <path fill="#324fff" d="M0 80v80a70.3 70.3 0 0040-40z" />
      <path fill="#283198" d="M40 120c5.7 27.3 5.3 47 0 80L0 160z" />
      <path fill="#0ff" d="M40 120v80l40-40a149.9 149.9 0 00-40-40z" />
      <path fill="#324fff" d="M80 0v80S48.3 55.7 40 40z" />
      <path fill="#324fff" d="M40 40v80a84.8 84.8 0 0040-40z" />
      <path fill="#00e8ff" d="M80 80a182 182 0 010 80l-40-40z" />
      <path
        fill="#283198"
        d="M80 80v80c17-7.5 31.5-19 40-40-5.9-17-18.1-30.9-40-40z"
      />
      <path fill="#283198" d="M120 40v80L80 80z" />
      <path fill="#00e8ff" d="M120 120c6.1 27 4.9 53.6 0 80l-40-40z" />
      <path fill="#324fff" d="M120 120v80l40-40c-5.4-15-18.3-27.9-40-40z" />
      <path fill="#324fff" d="M160 80v80l-40-40z" />
    </svg>
  );
}
