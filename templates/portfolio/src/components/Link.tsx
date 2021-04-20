import NextLink from 'next/link';
import React, { useMemo } from 'react';

const Link = ({
  href,
  as,
  children,
  ...rest
}: {
  href: string;
  as?: string;
  children: React.ReactNode;
}) => {
  const _as = useMemo(() => {
    let baseURIAs = as || href;
    if (baseURIAs.startsWith('/')) {
      baseURIAs = '.' + href;
      if (typeof document !== 'undefined')
        baseURIAs = new URL(baseURIAs, document.baseURI).href;
    }
    return baseURIAs;
  }, [as, href]);
  return (
    <NextLink {...rest} href={href} as={_as}>
      {children}
    </NextLink>
  );
};

export default React.memo(Link);
