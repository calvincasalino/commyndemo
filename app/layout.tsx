import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dwelloo - Real Video Reviews for Real Apartments',
  description: 'Watch and share authentic video reviews of apartments and condos in South Florida',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}