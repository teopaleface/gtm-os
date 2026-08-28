import type { Metadata } from 'next';
import { DocsHeader } from '../docs-header';
import { DocsMobileNav, DocsSidebar } from '../docs-sidebar';
import { SkillathonPrompt } from './skillathon-prompt';
import { skillathonTargetUrl } from './skillathon-config';

/* eslint-disable @next/next/no-html-link-for-pages -- the shared documentation shell uses plain internal anchors. */

export const metadata: Metadata = {
  title: 'Skillathon demo',
  description: 'Run the GTM OS product-page audit in a clean Codex environment.',
};

export default function SkillathonPage() {
  return (
    <div className="docs-shell min-h-screen">
      <a className="docs-skip-link" href="#main-content">Skip to content</a>
      <DocsHeader activePage="skillaton" />

      <div className="docs-doc-layout docs-info-layout">
        <aside className="docs-left-sidebar">
          <DocsSidebar activePage="skillaton" />
        </aside>

        <main id="main-content" className="docs-main-column" tabIndex={-1}>
          <div className="docs-article-shell docs-info-article docs-skillathon-article">
            <DocsMobileNav activePage="skillaton" />
            <nav className="docs-breadcrumb" aria-label="Breadcrumb">
              <a href="/">GTM OS</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Skillathon</span>
            </nav>

            <p className="docs-eyebrow">Live demo</p>
            <h1>Run it in a clean Codex.</h1>
            <div className="docs-prose docs-info-prose">
              <p>Open the repository at its root, paste the prompt below, and wait for three outputs. One is a short report for a person. One is the structured audit an agent can use for follow-up. The third contains the full score table and arithmetic. The prompt names the target page and uses committed public snapshots. No API key, MCP server, or login is needed.</p>
            </div>

            <SkillathonPrompt />

            <div className="docs-skillathon-facts">
              <div>
                <p className="docs-card-kicker">Target</p>
                <p>
                  <a className="docs-inline-code docs-skillathon-target-link" href={skillathonTargetUrl} target="_blank" rel="noreferrer" title={skillathonTargetUrl}>
                    Skullcandy Crusher ANC 2 <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
              <div>
                <p className="docs-card-kicker">Output</p>
                <p><code className="docs-inline-code">product-page-report.md</code><br /><code className="docs-inline-code">product-page-audit.md</code><br /><code className="docs-inline-code">product-page-score.md</code></p>
              </div>
              <div>
                <p className="docs-card-kicker">Result</p>
                <p>A plain-language decision first, then a page score or <code className="docs-inline-code">UNSCORABLE</code> with the evidence handoff.</p>
              </div>
            </div>

            <a className="docs-primary-link docs-skillathon-repository-link" href="https://github.com/teopaleface/gtm-os" target="_blank" rel="noreferrer">
              Open the repository <span aria-hidden="true">↗</span>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
