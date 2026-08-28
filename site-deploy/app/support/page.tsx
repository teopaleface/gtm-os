import type { Metadata } from 'next';
import { InfoPage } from '../info-page';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Support and issue reporting for GTM OS.',
  alternates: {
    canonical: '/support',
  },
  openGraph: {
    type: 'website',
    url: '/support',
    siteName: 'GTM OS',
    title: 'Support | GTM OS',
    description: 'Support and issue reporting for GTM OS.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'GTM OS support' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support | GTM OS',
    description: 'Support and issue reporting for GTM OS.',
    images: ['/og-image.png'],
  },
};

export default function SupportPage() {
  return (
    <InfoPage eyebrow="Support" title="Need a hand?" action={<a className="docs-primary-link" href="https://github.com/teopaleface/gtm-os/issues" target="_blank" rel="noreferrer">Open a GitHub issue <span aria-hidden="true">↗</span></a>}>
      <p>Open an issue in the public repository with the request, the output shape, and the smallest fixture that shows the problem. Remove credentials and private customer data first.</p>
      <p>For a playbook change, include the prompt that exposed the gap and the result you expected. That gives the next change something concrete to test.</p>
    </InfoPage>
  );
}
