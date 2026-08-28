export type Chapter = {
  id: string;
  number: string;
  label: string;
  href: string;
  children: { id: string; label: string; href: string }[];
};

export type PageLink = {
  id: string;
  label: string;
};

export type SearchEntry = {
  title: string;
  section: string;
  href: string;
  keywords?: string;
};

export const chapters: Chapter[] = [
  {
    id: 'getting-started',
    number: '01',
    label: 'Getting started',
    href: '#getting-started',
    children: [
      { id: 'what-it-does', label: 'What it does', href: '#what-it-does' },
      { id: 'when-to-use-it', label: 'When to use it', href: '#when-to-use-it' },
      { id: 'prerequisites', label: 'Prerequisites', href: '#prerequisites' },
      { id: 'invocation-modes', label: 'Invocation modes', href: '#invocation-modes' },
    ],
  },
  {
    id: 'main-flow',
    number: '02',
    label: 'The main flow',
    href: '#main-flow',
    children: [
      { id: 'context', label: 'Context', href: '#context' },
      { id: 'tickets', label: 'Tickets', href: '#tickets' },
      { id: 'evidence', label: 'Evidence', href: '#evidence' },
      { id: 'artifacts', label: 'Artifacts and handoff', href: '#artifacts' },
    ],
  },
  { id: 'playbook-map', number: '03', label: 'The playbook map', href: '#playbook-map', children: [] },
  { id: 'live-data', number: '04', label: 'Live data and safety', href: '#live-data', children: [] },
  { id: 'evaluation', number: '05', label: 'Evaluation', href: '#evaluation', children: [] },
  { id: 'reference', number: '06', label: 'Reference', href: '#reference', children: [] },
];

export const pageLinks: PageLink[] = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'what-it-does', label: 'What it does' },
  { id: 'when-to-use-it', label: 'When to use it' },
  { id: 'prerequisites', label: 'Prerequisites' },
  { id: 'invocation-modes', label: 'Invocation modes' },
  { id: 'main-flow', label: 'The main flow' },
  { id: 'context', label: 'Context' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'artifacts', label: 'Artifacts and handoff' },
  { id: 'playbook-map', label: 'The playbook map' },
  { id: 'live-data', label: 'Live data and safety' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'reference', label: 'Reference' },
  { id: 'common-questions', label: 'Common questions' },
  { id: 'working', label: "It's working if" },
];

export const playbookGroups = [
  {
    label: 'Strategy',
    items: ['GTM strategy', 'Market research', 'Customer research', 'Market sizing', 'ICP and segmentation'],
  },
  {
    label: 'Positioning',
    items: ['Positioning', 'Messaging', 'Competitive intelligence', 'Proof gaps', 'Why now'],
  },
  {
    label: 'Demand',
    items: ['Content', 'SEO', 'AI visibility', 'Demand mining', 'Channels', 'Paid growth', 'Community', 'Partnerships', 'ABM', 'Outbound'],
  },
  {
    label: 'Revenue',
    items: ['Pricing', 'Sales enablement', 'Launch planning', 'Campaign operations'],
  },
  {
    label: 'Customer value',
    items: ['Onboarding', 'Activation', 'PLG', 'Referrals', 'Lifecycle', 'Retention', 'Churn', 'Customer success'],
  },
  {
    label: 'Learning',
    items: ['Funnel diagnostics', 'Attribution', 'Analytics', 'Forecasting', 'Experiments', 'Evals'],
  },
];

export const scoreDimensions = [
  ['Evidence quality', 'Are the sources relevant, recent, independent, and auditable?'],
  ['Decision readiness', 'Is the decision clear, with the remaining unknowns visible?'],
  ['Actionability', 'Does the next action have an owner, timing, and signal?'],
  ['Completeness', 'Are context, tickets, evidence, artifact, and handoff present?'],
] as const;

const chapterEntries: SearchEntry[] = chapters.map((chapter) => ({
  title: chapter.label,
  section: `Chapter ${chapter.number}`,
  href: `/#${chapter.id}`,
  keywords: chapter.children.map((child) => child.label).join(' '),
}));

const sectionEntries: SearchEntry[] = pageLinks
  .filter((link) => !chapters.some((chapter) => chapter.id === link.id))
  .map((link) => ({
  title: link.label,
  section: 'Documentation',
  href: `/#${link.id}`,
  keywords: link.id.replaceAll('-', ' '),
  }));

const playbookEntries: SearchEntry[] = playbookGroups.flatMap((group) =>
  group.items.map((item) => ({
    title: item,
    section: `${group.label} playbooks`,
    href: '/#playbook-map',
    keywords: `${group.label} GTM go to market specialist workflow`,
  })),
);

export const searchEntries: SearchEntry[] = [
  { title: 'Overview', section: 'Documentation', href: '/#top', keywords: 'GTM OS start introduction' },
  ...chapterEntries,
  ...sectionEntries,
  ...playbookEntries,
  { title: 'Support', section: 'Resources', href: '/support', keywords: 'help issue reporting' },
  { title: 'Skillathon', section: 'Resources', href: '/skillaton', keywords: 'live demo clean Codex product page audit' },
  { title: 'Privacy', section: 'Resources', href: '/privacy', keywords: 'privacy notice data' },
  { title: 'Terms', section: 'Resources', href: '/terms', keywords: 'terms license responsibility' },
];
