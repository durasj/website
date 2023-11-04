import Link, { LinkProps } from 'next/link';
import { FC, ReactNode } from 'react';

const types = {
  light: 'bg-white/80 text-zinc-900 hover:bg-white border',
  dark: 'bg-zinc-800 text-white hover:bg-zinc-900',
  transparentDark: 'bg-white/10 text-white hover:bg-white/20',
};

interface Props extends LinkProps {
  type?: keyof typeof types;
  children: ReactNode;
}

const Button: FC<Props> = ({ children, type, ...props }) => {
  const styles = types[type || 'transparentDark'];

  return (
    <Link
      className={`rounded px-3 py-2 text-sm font-semibold shadow-sm transition-colors ${styles}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Button;
