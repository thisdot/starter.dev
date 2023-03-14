import './globals.scss';
import { Open_Sans } from 'next/font/google';

const opensans = Open_Sans({ subsets: ['latin'], weight: 'variable' });

// Static metadata
export const metadata = {
  title: {
    default: 'next13-zustand-bulma',
    template: '%s | next13-zustand-bulma',
  },
  description: 'next13-zustand-bulma starter kit - starter.dev',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={opensans.className} lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="columns">
          <div className="column" />
          <div className="column is-two-thirds">{children}</div>
          <div className="column" />
        </div>
      </body>
    </html>
  );
}
