import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import SensitiveLink from '@/components/SensitiveLink';

const openSans = Open_Sans({
  subsets: ['latin'],
  preload: true,
  display: 'block',
});

export const metadata: Metadata = {
  title: 'Jakub Duras - Software Engineer',
  description:
    'Focused on cross-platform JavaScript development with proper software engineering and usable design. Open-source enthusiast.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col justify-between min-h-screen ${openSans.className}`}
      >
        {children}

        <footer className="flex flex-col items-center justify-center mt-8 pb-12">
          <p className="mt-8">Feel free to get in touch with me.</p>

          <div className="mt-6 flex items-center justify-center gap-x-8">
            <a
              href="https://www.linkedin.com/in/jduras/"
              className="text-sm py-4 hover:underline font-semibold leading-6"
            >
              LinkedIn
            </a>

            <SensitiveLink
              link="mailto:jakub@duras.me"
              className="text-sm py-4 font-semibold leading-6"
            >
              jakub@duras.me
            </SensitiveLink>

            <SensitiveLink
              link="tel:+421917432974"
              className="text-sm py-4 font-semibold leading-6"
            >
              +421 917 432 974
            </SensitiveLink>
          </div>

          <p className="mt-8 text-sm text-center">
            Copyright Jakub Duras. Code of this website is licensed under the
            MIT License and available at{' '}
            <a
              href="https://github.com/durasj/website"
              className="hover:underline leading-6"
            >
              GitHub
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
