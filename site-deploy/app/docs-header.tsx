import { DocsSearch } from './docs-search';
import { searchEntries } from './docs-config';

/* eslint-disable @next/next/no-html-link-for-pages -- the shared header is rendered from the client documentation shell. */

type DocsHeaderProps = {
  home?: boolean;
  activePage?: 'documentation' | 'skillaton';
};

export function DocsHeader({ home = false, activePage }: DocsHeaderProps) {
  return (
    <header className="docs-header">
      <div className="docs-header-inner">
        <a href={home ? '#top' : '/'} className="docs-brand" aria-label="GTM OS documentation home">
          <span className="docs-brand-mark" aria-hidden="true">G/</span>
          <span>GTM OS</span>
        </a>
        <nav className="docs-header-nav" aria-label="Site navigation">
          <a href="/" aria-current={home ? 'page' : undefined}>Documentation</a>
          <a href="/skillaton" aria-current={activePage === 'skillaton' ? 'page' : undefined}>Skillathon</a>
          <DocsSearch entries={searchEntries} />
          <a href="https://github.com/teopaleface/gtm-os" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
