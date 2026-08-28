import { DocsHeader } from './docs-header';
import { DocsMobileNav, DocsSidebar } from './docs-sidebar';

/* eslint-disable @next/next/no-html-link-for-pages -- this shared documentation shell uses plain internal anchors. */

type InfoPageProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

type ResourcePage = 'support' | 'privacy' | 'terms';

function getResourcePage(eyebrow: string): ResourcePage {
  const page = eyebrow.toLowerCase();
  if (page === 'privacy' || page === 'terms') return page;
  return 'support';
}

export function InfoPage({ eyebrow, title, children, action }: InfoPageProps) {
  const activePage = getResourcePage(eyebrow);

  return (
    <div className="docs-shell min-h-screen">
      <a className="docs-skip-link" href="#main-content">Skip to content</a>
      <DocsHeader />

      <div className="docs-doc-layout docs-info-layout">
        <aside className="docs-left-sidebar">
          <DocsSidebar activePage={activePage} />
        </aside>

        <main id="main-content" className="docs-main-column" tabIndex={-1}>
          <div className="docs-article-shell docs-info-article">
            <DocsMobileNav activePage={activePage} />
            <nav className="docs-breadcrumb" aria-label="Breadcrumb">
              <a href="/">GTM OS</a>
              <span aria-hidden="true">/</span>
              <span>Resources</span>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{eyebrow}</span>
            </nav>
            <p className="docs-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <div className="docs-prose docs-info-prose">{children}</div>
            {action ? <div className="docs-info-action">{action}</div> : null}
          </div>
        </main>
      </div>
    </div>
  );
}
