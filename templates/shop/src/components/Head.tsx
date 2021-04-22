import React, { ReactNode } from 'react';
import NextHead from 'next/head';

const Head = ({
  title,
  children
}: {
  title?: string;
  children?: ReactNode;
}) => {
  return (
    <NextHead>
      <title>{title}</title>
      {children}
    </NextHead>
  );
};

export default Head;
