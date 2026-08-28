import type { Metadata } from 'next';
import { InfoPage } from '../info-page';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for GTM OS.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    type: 'website',
    url: '/terms',
    siteName: 'GTM OS',
    title: 'Terms | GTM OS',
    description: 'Terms of use for GTM OS.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'GTM OS terms of use' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms | GTM OS',
    description: 'Terms of use for GTM OS.',
    images: ['/og-image.png'],
  },
};

export default function TermsPage() {
  return (
    <InfoPage eyebrow="Terms" title="Terms of use">
      <p>GTM OS is provided under the MIT License. It is an early workflow and does not replace legal, financial, security, or commercial judgment.</p>
      <p>Check sources before publishing claims or making decisions. You are responsible for permissions, privacy, consent, outreach, spend, and any action taken from an output.</p>
      <p>The skills are provided as-is. See the repository license and issue tracker for updates, limitations, and corrections.</p>
    </InfoPage>
  );
}
