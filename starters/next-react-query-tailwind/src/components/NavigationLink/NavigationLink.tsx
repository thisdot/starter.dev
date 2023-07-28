import Link from 'next/link';

type NavigationLinkProps = {
  to: string;
  label: string;
};

export const NavigationLink = ({ to, label }: NavigationLinkProps) => {
  return (
    <Link
      className="underline text-blue-600 hover:text-blue-800 text-xl"
      role="link"
      href={to}
    >
      {label}
    </Link>
  );
};
