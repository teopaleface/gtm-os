import { chapters } from './docs-config';

type SidebarProps = {
  home?: boolean;
  activeChapter?: string;
  activePage?: 'documentation' | 'skillaton' | 'support' | 'privacy' | 'terms';
  activeSection?: string;
};

function target(home: boolean, href: string) {
  if (href.startsWith('/')) return href;
  return home ? href : `/${href}`;
}

function currentValue(active: boolean, value: 'page' | 'location' = 'page') {
  return active ? value : undefined;
}

function OverviewLink({ home, activePage, mobile = false }: { home: boolean; activePage?: SidebarProps['activePage']; mobile?: boolean }) {
  const active = activePage === 'documentation';
  return (
    <a
      className={mobile ? `docs-mobile-link${active ? ' docs-mobile-link-active' : ''}` : `docs-sidebar-overview${active ? ' docs-sidebar-overview-active' : ''}`}
      href={target(home, '#top')}
      aria-current={currentValue(active)}
    >
      <span className={mobile ? 'docs-mobile-number' : 'docs-sidebar-number'}>00</span>
      <span>Overview</span>
    </a>
  );
}

function ResourceLinks({ mobile = false, activePage }: { mobile?: boolean; activePage?: SidebarProps['activePage'] }) {
  const linkClass = mobile ? 'docs-mobile-resource-link' : 'docs-sidebar-resource-link';
  return (
    <>
      <a className={linkClass} href="https://github.com/teopaleface/gtm-os" target="_blank" rel="noreferrer">
        <span>GitHub repository</span><span aria-hidden="true">↗</span>
      </a>
      <a className={`${linkClass}${activePage === 'skillaton' ? ' docs-resource-link-active' : ''}`} href="/skillaton" aria-current={currentValue(activePage === 'skillaton')}>
        <span>Skillathon</span>
      </a>
      <a className={`${linkClass}${activePage === 'support' ? ' docs-resource-link-active' : ''}`} href="/support" aria-current={currentValue(activePage === 'support')}>
        <span>Support</span>
      </a>
      <a className={`${linkClass}${activePage === 'privacy' ? ' docs-resource-link-active' : ''}`} href="/privacy" aria-current={currentValue(activePage === 'privacy')}>
        <span>Privacy</span>
      </a>
      <a className={`${linkClass}${activePage === 'terms' ? ' docs-resource-link-active' : ''}`} href="/terms" aria-current={currentValue(activePage === 'terms')}>
        <span>Terms</span>
      </a>
    </>
  );
}

function ChapterLinks({ home, activeChapter, activeSection, mobile = false }: { home: boolean; activeChapter?: string; activeSection?: string; mobile?: boolean }) {
  return (
    <>
      {chapters.map((chapter) => {
        const chapterActive = activeChapter === chapter.id;
        const chapterClass = mobile ? `docs-mobile-chapter${chapterActive ? ' docs-mobile-chapter-active' : ''}` : `docs-sidebar-chapter-link${chapterActive ? ' docs-sidebar-chapter-link-active' : ''}`;
        return (
          <div className={mobile ? 'docs-mobile-chapter-group' : 'docs-sidebar-chapter'} key={chapter.id}>
            <a className={chapterClass} href={target(home, chapter.href)} aria-current={currentValue(chapterActive, 'location')}>
              <span className={mobile ? 'docs-mobile-number' : 'docs-sidebar-number'}>{chapter.number}</span>
              <span>{chapter.label}</span>
            </a>
            {chapter.children.length > 0 ? (
              <div className={mobile ? 'docs-mobile-children' : 'docs-sidebar-children'}>
                {chapter.children.map((child) => {
                  const childActive = activeSection === child.id;
                  const childClass = mobile ? `docs-mobile-child${childActive ? ' docs-mobile-child-active' : ''}` : `docs-sidebar-child${childActive ? ' docs-sidebar-child-active' : ''}`;
                  return <a className={childClass} href={target(home, child.href)} aria-current={currentValue(childActive, 'location')} key={child.id}>{child.label}</a>;
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export function DocsSidebar({ home = false, activeChapter, activePage, activeSection }: SidebarProps) {
  const resolvedActivePage = activePage ?? (home ? 'documentation' : undefined);
  return (
    <nav className="docs-sidebar-nav" aria-label="Documentation contents">
      <p className="docs-nav-heading">Contents</p>
      <OverviewLink home={home} activePage={resolvedActivePage} />

      <p className="docs-nav-heading docs-sidebar-section-heading">Chapters</p>
      <div className="docs-sidebar-tree">
        <ChapterLinks home={home} activeChapter={activeChapter} activeSection={activeSection} />
      </div>

      <p className="docs-nav-heading docs-sidebar-section-heading">Resources</p>
      <div className="docs-sidebar-resources">
        <ResourceLinks activePage={activePage} />
        <a className="docs-sidebar-resource-link" href={target(home, '#getting-started')}>Quick start</a>
        <a className="docs-sidebar-resource-link" href={target(home, '#evidence')}>Evidence guide</a>
        <a className="docs-sidebar-resource-link" href={target(home, '#evaluation')}>Evaluation guide</a>
      </div>
    </nav>
  );
}

export function DocsMobileNav({ home = false, activeChapter, activePage, activeSection }: SidebarProps) {
  const resolvedActivePage = activePage ?? (home ? 'documentation' : undefined);
  return (
    <details className="docs-mobile-nav">
      <summary><span>Contents</span><span className="docs-mobile-nav-hint"><span>⌘K</span><span aria-hidden="true">⌄</span></span></summary>
      <div className="docs-mobile-nav-list">
        <OverviewLink home={home} activePage={resolvedActivePage} mobile />
        <p className="docs-mobile-heading">Chapters</p>
        <ChapterLinks home={home} activeChapter={activeChapter} activeSection={activeSection} mobile />
        <p className="docs-mobile-heading">Resources</p>
        <ResourceLinks mobile activePage={activePage} />
        <a className="docs-mobile-resource-link" href={target(home, '#getting-started')}>Quick start</a>
        <a className="docs-mobile-resource-link" href={target(home, '#evidence')}>Evidence guide</a>
        <a className="docs-mobile-resource-link" href={target(home, '#evaluation')}>Evaluation guide</a>
      </div>
    </details>
  );
}
