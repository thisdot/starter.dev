import React from 'react';
import { Open_Sans } from 'next/font/google';

const opensans = Open_Sans({ subsets: ['latin'], weight: 'variable' });

export const withFontDecorator = (Story, context) => {
  document.body.classList.add(opensans.className);
  return <Story {...context} />;
};
