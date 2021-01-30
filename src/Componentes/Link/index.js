import React from 'react';
import NextLink from 'next/link';

// eslint-disable-next-line react/prop-types
const Link = ({ href, children, ...props }) => (
  <NextLink href={href}>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <a {...props}>
      {children}
    </a>
  </NextLink>
);

export default Link;
