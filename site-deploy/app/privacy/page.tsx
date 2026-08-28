import type { Metadata } from 'next';
import { InfoPage } from '../info-page';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy notice for GTM OS.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    type: 'website',
    url: '/privacy',
    siteName: 'GTM OS',
    title: 'Privacy | GTM OS',
    description: 'Privacy notice for GTM OS.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'GTM OS privacy notice' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy | GTM OS',
    description: 'Privacy notice for GTM OS.',
    images: ['/og-image.png'],
  },
};

export default function PrivacyPage() {
  return (
    <InfoPage eyebrow="Privacy" title="Privacy notice">
      <p>GTM OS is a public skills package. The repository does not collect prompts, customer records, connector credentials, or analytics by itself.</p>
      <p>When you use Codex, ChatGPT, a connected app, or a data provider with the skills, that service&apos;s own privacy terms apply. Keep private data in the approved service and do not commit it to this repository.</p>
      <p>This page is a plain-language notice for the public project. If the project adds hosted collection in the future, this notice will be updated before that collection starts.</p>
    </InfoPage>
  );
}
