'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { DocsHeader } from './docs-header';
import { chapters, pageLinks, playbookGroups, scoreDimensions } from './docs-config';
import { DocsMobileNav, DocsSidebar } from './docs-sidebar';

function Code({ children }: { children: ReactNode }) {
  return <code className="docs-inline-code">{children}</code>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="docs-section-label">{children}</p>;
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="docs-arrow-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span><span aria-hidden="true">↗</span>
    </a>
  );
}

function ReadingProgress({ progress, activeChapter }: { progress: number; activeChapter: string }) {
  const chapter = chapters.find((item) => item.id === activeChapter) ?? chapters[0];
  return (
    <div className="docs-progress-block">
      <div className="docs-progress-heading"><span>Reading progress</span><strong>{progress}%</strong></div>
      <div className="docs-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Reading progress">
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="docs-progress-caption"><span>Chapter {chapter.number}</span><span>{chapter.label}</span></p>
    </div>
  );
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [activeSection, setActiveSection] = useState(pageLinks[0].id);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveChapter(visible[0].target.id);
      },
      { rootMargin: '-14% 0px -68% 0px', threshold: 0 },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -64% 0px', threshold: 0 },
    );

    chapters.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) chapterObserver.observe(section);
    });
    pageLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      chapterObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const activeChapterIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeChapter));
  const nextChapter = chapters[activeChapterIndex + 1];

  return (
    <div className="docs-shell min-h-screen">
      <a className="docs-skip-link" href="#main-content">Skip to content</a>
      <DocsHeader home />

      <div id="top" className="docs-doc-layout">
        <aside className="docs-left-sidebar">
          <DocsSidebar home activePage="documentation" activeChapter={activeChapter} activeSection={activeSection} />
        </aside>

        <main id="main-content" className="docs-main-column" tabIndex={-1}>
          <div className="docs-article-shell">
            <nav className="docs-breadcrumb" aria-label="Breadcrumb">
              <a href="#top">GTM OS</a>
              <span aria-hidden="true">/</span>
              <span>Documentation</span>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Overview</span>
            </nav>

            <DocsMobileNav home activePage="documentation" activeChapter={activeChapter} activeSection={activeSection} />
            <div className="docs-inline-progress"><ReadingProgress progress={progress} activeChapter={activeChapter} /></div>

            <article className="docs-prose">
              <header className="docs-hero">
                <div className="docs-hero-meta"><span>A practical GTM workflow</span><span aria-hidden="true">·</span><span>Six chapters · about 8 minutes</span></div>
                <h1>Turn GTM questions into decisions.</h1>
                <p>GTM OS maps the missing work, routes each ticket to the right playbook, and returns an evidence-backed next action.</p>
                <div className="docs-hero-byline"><span className="docs-hero-mark" aria-hidden="true">G/</span><span>Public documentation for Codex</span></div>
              </header>

              <div className="docs-callout">
                <div className="docs-callout-header"><span>Install the plugin</span><ArrowLink href="https://github.com/teopaleface/gtm-os">View the repository</ArrowLink></div>
                <div className="docs-callout-body">
                  <div>
                    <p className="docs-callout-path">github.com/teopaleface/gtm-os</p>
                    <p>Add the plugin, then use <Code>gtm-orchestrator</Code> when the question spans multiple GTM disciplines.</p>
                  </div>
                  <a className="docs-primary-link" href="https://github.com/teopaleface/gtm-os#the-short-version" target="_blank" rel="noreferrer">Read the setup</a>
                </div>
              </div>

              <section id="getting-started" className="docs-section">
                <SectionLabel>Chapter 1</SectionLabel>
                <h2>Getting started</h2>

                <div id="what-it-does" className="docs-subsection">
                  <h3>What it does</h3>
                  <p>GTM OS is a skills-only plugin for Codex. Bring a product, an audience, or a growth decision. The orchestrator identifies what is missing, creates a short queue of work, routes each ticket to a focused playbook, collects evidence when the decision needs it, and returns an artifact the team can use.</p>
                  <p>The handoff keeps the same shape across the lifecycle: context, ticket, evidence, artifact, evaluation, and next action. The question can be about positioning, acquisition, activation, retention, or measurement.</p>
                </div>

                <div id="when-to-use-it" className="docs-subsection">
                  <h3>When to use it</h3>
                  <p>Use the front door when the question crosses more than one GTM discipline or you are not sure what to ask for first.</p>
                  <div className="docs-card-grid docs-card-grid-two">
                    <div className="docs-card"><p className="docs-card-kicker">Good fit</p><p>&quot;Who should we target first, and what would make them try this?&quot;</p></div>
                    <div className="docs-card"><p className="docs-card-kicker">Direct fit</p><p>&quot;Write three onboarding emails for users who reached the first value moment.&quot;</p></div>
                  </div>
                  <p>The first question needs research, ICP, positioning, and an experiment, so it belongs with the orchestrator. The second is already specific enough for a lifecycle playbook.</p>
                </div>

                <div id="prerequisites" className="docs-subsection">
                  <h3>Prerequisites</h3>
                  <p>You do not need a CRM connection, a data warehouse, or an API key to start. A useful first run needs:</p>
                  <ul>
                    <li>the product or offer in plain language;</li>
                    <li>the decision you need to make;</li>
                    <li>known constraints, such as market, timing, budget, or compliance;</li>
                    <li>any sources you already trust.</li>
                  </ul>
                  <p>Live sources improve a source-dependent answer, but the skill shows the evidence gap when it cannot verify a claim.</p>
                </div>

                <div id="invocation-modes" className="docs-subsection">
                  <h3>Invocation modes</h3>
                  <div className="docs-table-wrap">
                    <table>
                      <thead><tr><th>Entry point</th><th>Use it when</th><th>What it does</th></tr></thead>
                      <tbody>
                        <tr><td><Code>gtm-orchestrator</Code></td><td>The request is broad, unclear, or cross-functional.</td><td>Runs intake, ticketing, routing, evidence, artifact, and evaluation.</td></tr>
                        <tr><td>Named playbook</td><td>The job is already clear.</td><td>Runs one specialist workflow, such as <Code>gtm-positioning</Code> or <Code>gtm-retention</Code>.</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p>The orchestrator is the only model-invoked skill. Specialist playbooks are explicit by design. That keeps the default context small and makes each playbook easier to test.</p>
                </div>
              </section>

              <section id="main-flow" className="docs-section">
                <SectionLabel>Chapter 2</SectionLabel>
                <h2>The main flow</h2>
                <p>The flow is progressive. It asks for the smallest missing piece before it creates more work. If the decision can be made from what is already known, it does not create a research project for its own sake.</p>

                <div id="context" className="docs-subsection docs-numbered">
                  <span className="docs-number">01</span>
                  <div><h3>Context</h3><p>Capture the product, audience, decision, constraints, and known facts. Separate facts from assumptions and hypotheses. This gives the rest of the run something stable to refer to.</p></div>
                </div>
                <div id="tickets" className="docs-subsection docs-numbered">
                  <span className="docs-number">02</span>
                  <div><h3>Tickets</h3><p>Turn missing decisions into named tickets with a type, owner, evidence need, blocker, and acceptance criteria. Tickets stay small enough to resolve in one focused session.</p><div className="docs-code-block"><span className="docs-code-key">ticket</span>: define-first-ICP<br /><span className="docs-code-key">type</span>: decision<br /><span className="docs-code-key">acceptance</span>: one segment with evidence and a testable reason to believe</div></div>
                </div>
                <div id="evidence" className="docs-subsection docs-numbered">
                  <span className="docs-number">03</span>
                  <div><h3>Evidence</h3><p>Use a source when a claim depends on the outside world. Record the URL, publisher, publication date when available, access date, and the claim it supports. A source list without claim mapping is not enough.</p><p>When the evidence bar is missed, the output says <Code>INSUFFICIENT_EVIDENCE</Code> and names the next source or interview that would change the decision.</p></div>
                </div>
                <div id="artifacts" className="docs-subsection docs-numbered">
                  <span className="docs-number">04</span>
                  <div><h3>Artifacts and handoff</h3><p>Resolve the ticket into something concrete: an ICP, message map, channel plan, battlecard, launch brief, lifecycle sequence, dashboard brief, or experiment. Finish with the decision, confidence, open questions, and next action.</p></div>
                </div>
                <div className="docs-flow-line" aria-label="The GTM OS flow"><span>context</span><b>→</b><span>ticket</span><b>→</b><span>evidence</span><b>→</b><span>artifact</span><b>→</b><span>eval</span></div>
              </section>

              <section id="playbook-map" className="docs-section">
                <SectionLabel>Chapter 3</SectionLabel>
                <h2>The playbook map</h2>
                <p>There is one front door and a complete set of specialist routes behind it. Each route has a narrow job. The catalog is public, so you can inspect the available coverage before you start.</p>
                <div className="docs-list-grid">
                  {playbookGroups.map((group) => (
                    <div key={group.label} className="docs-list-card">
                      <h3>{group.label}</h3>
                      <ul>{group.items.map((item) => <li key={item}><span aria-hidden="true">·</span>{item}</li>)}</ul>
                    </div>
                  ))}
                </div>
                <div className="docs-section-link"><ArrowLink href="https://github.com/teopaleface/gtm-os/blob/main/references/playbook-catalog.md">Open the full playbook catalog</ArrowLink></div>
              </section>

              <section id="live-data" className="docs-section">
                <SectionLabel>Chapter 4</SectionLabel>
                <h2>Live data and safety</h2>
                <p>Research is optional until the decision depends on a fact outside the working context. When it does, use a primary source or a connected data source and say exactly what it supports.</p>
                <div className="docs-table-wrap">
                  <table>
                    <thead><tr><th>Situation</th><th>Default behavior</th></tr></thead>
                    <tbody>
                      <tr><td>A public fact is current or niche</td><td>Research it and attach the source URL and access date.</td></tr>
                      <tr><td>The workspace contains enough evidence</td><td>Use it first and label outside claims separately.</td></tr>
                      <tr><td>A source is blocked or ambiguous</td><td>Record the blocker. Do not turn a guess into a fact.</td></tr>
                      <tr><td>An action would contact people or publish</td><td>Prepare the work, then ask for approval before sending or publishing.</td></tr>
                    </tbody>
                  </table>
                </div>
                <p>Credentials, private data, and connector tokens do not belong in the repository. The plugin can produce a research brief or an outreach draft without sending anything.</p>
              </section>

              <section id="evaluation" className="docs-section">
                <SectionLabel>Chapter 5</SectionLabel>
                <h2>Evaluation</h2>
                <p>Evaluation is part of the workflow, not a final decoration. The result should make it easy to see what is known, what is inferred, and what still needs proof.</p>
                <div className="docs-table-wrap">
                  <table>
                    <thead><tr><th>Dimension</th><th>Question</th><th>Scale</th></tr></thead>
                    <tbody>{scoreDimensions.map(([label, text]) => <tr key={label}><td>{label}</td><td>{text}</td><td><Code>0–5</Code></td></tr>)}</tbody>
                  </table>
                </div>
                <div className="docs-card-grid docs-card-grid-three">
                  <div className="docs-card docs-status-card docs-status-card-draft"><p className="docs-card-kicker">Draft</p><p>The artifact is useful, but a required decision or source is still open.</p></div>
                  <div className="docs-card docs-status-card docs-status-card-ready"><p className="docs-card-kicker">Ready</p><p>The evidence, decision, next action, and handoff meet the bar.</p></div>
                  <div className="docs-card docs-status-card docs-status-card-insufficient"><p className="docs-card-kicker">Insufficient evidence</p><p>A source-dependent decision cannot be defended yet.</p></div>
                </div>
                <p>The repository includes positive and negative fixtures for schema validation, evidence quality, blockers, scoring, and handoff shape. Run them with <Code>python3 scripts/run_evals.py</Code>.</p>
              </section>

              <section id="reference" className="docs-section">
                <SectionLabel>Chapter 6</SectionLabel>
                <h2>Reference</h2>

                <div id="common-questions" className="docs-subsection">
                  <h3>Common questions</h3>
                  <div className="docs-faq">
                    <details open><summary>Does this replace specialist playbooks?</summary><p>No. The orchestrator chooses a route for broad work. A named playbook remains available when you already know the job.</p></details>
                    <details><summary>Does it need an API connection?</summary><p>No. Connections add live evidence; they are not a prerequisite for the workflow.</p></details>
                    <details><summary>Can it stop before making a recommendation?</summary><p>Yes. It can return a blocker or <Code>INSUFFICIENT_EVIDENCE</Code> when the available information does not support a responsible answer.</p></details>
                    <details><summary>Does it send outreach or publish campaigns?</summary><p>No by default. It prepares artifacts and waits for approval before an external action.</p></details>
                  </div>
                </div>

                <div id="working" className="docs-subsection">
                  <h3>It&apos;s working if</h3>
                  <ul className="docs-checklist">
                    <li>The first response makes the decision and missing context visible.</li>
                    <li>Every ticket has a clear acceptance criterion.</li>
                    <li>Claims that need outside proof point to sources.</li>
                    <li>The artifact is specific enough for a human to use.</li>
                    <li>The next action has a signal, an owner, or a clear human step.</li>
                  </ul>
                </div>

                <div className="docs-subsection">
                  <h3>Related reading</h3>
                  <div className="docs-related-grid">
                    <a className="docs-related-link" href="https://github.com/teopaleface/gtm-os/blob/main/README.md" target="_blank" rel="noreferrer"><span>README</span><span aria-hidden="true">↗</span></a>
                    <a className="docs-related-link" href="https://github.com/teopaleface/gtm-os/blob/main/docs/spec.md" target="_blank" rel="noreferrer"><span>Workflow spec</span><span aria-hidden="true">↗</span></a>
                    <a className="docs-related-link" href="https://github.com/teopaleface/gtm-os/blob/main/references/evidence-policy.md" target="_blank" rel="noreferrer"><span>Evidence policy</span><span aria-hidden="true">↗</span></a>
                    <a className="docs-related-link" href="https://github.com/teopaleface/gtm-os/blob/main/evals/cases.json" target="_blank" rel="noreferrer"><span>Eval fixtures</span><span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              </section>
            </article>

            <footer className="docs-footer">
              <p>GTM OS · an early public workflow for Codex</p>
              <nav aria-label="Footer navigation">
                <a href="https://github.com/teopaleface/gtm-os" target="_blank" rel="noreferrer">GitHub</a>
                <a href="/support">Support</a>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
              </nav>
            </footer>
          </div>
        </main>

        <aside className="docs-right-sidebar">
          <div className="docs-right-inner">
            <ReadingProgress progress={progress} activeChapter={activeChapter} />
            <nav className="docs-toc" aria-label="On this page">
              <p className="docs-nav-heading">On this page</p>
              <div className="docs-toc-list">
                {pageLinks.map((link) => {
                  const active = activeSection === link.id;
                  return <a key={link.id} className={`docs-page-link${active ? ' docs-page-link-active' : ''}`} href={`#${link.id}`} aria-current={active ? 'location' : undefined}>{link.label}</a>;
                })}
              </div>
            </nav>
            <nav className="docs-next-chapter" aria-label="Next chapter">
              <p className="docs-nav-heading">Next</p>
              {nextChapter ? (
                <a href={`#${nextChapter.id}`}><span>Chapter {nextChapter.number}</span><strong>{nextChapter.label}</strong><b aria-hidden="true">→</b></a>
              ) : (
                <a href="#top"><span>Documentation</span><strong>Back to overview</strong><b aria-hidden="true">↑</b></a>
              )}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
