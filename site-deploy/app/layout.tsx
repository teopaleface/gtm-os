import type { Metadata } from 'next';
import './globals.css';

const siteDescription =
  'A practical go-to-market workflow for turning questions into decisions, artifacts, and next actions.';

export const metadata: Metadata = {
  metadataBase: new URL('https://gtm-os.ishi-8634.chatgpt.site'),
  title: {
    default: 'GTM OS | Documentation',
    template: '%s | GTM OS',
  },
  description: siteDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'GTM OS',
    title: 'GTM OS | Documentation',
    description: siteDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GTM OS documentation: turn GTM questions into decisions.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTM OS | Documentation',
    description: siteDescription,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
