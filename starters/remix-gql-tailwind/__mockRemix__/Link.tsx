import React from 'react';

interface MockLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  to: string;
}

export const Link = ({ to, children, ...props }: MockLinkProps) => {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
};
