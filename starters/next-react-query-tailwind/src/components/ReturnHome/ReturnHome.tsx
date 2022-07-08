import Link from 'next/link';

export function ReturnHome() {
  return (
    <Link href="/">
      <a className="underline text-blue-600 hover:text-blue-800 text-xl" role="link">Return Home</a>
    </Link>
  );
}
