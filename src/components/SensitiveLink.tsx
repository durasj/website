'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

/**
 * Simple sensitive link protection by delaying rendering - spam bots are too busy to wait
 */
const SensitiveLink: FC<{
  link: string;
  className?: string;
  children: ReactNode;
}> = ({ link, className, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 3 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <a href={link} className={className}>
      {children}
    </a>
  );
};

export default SensitiveLink;
