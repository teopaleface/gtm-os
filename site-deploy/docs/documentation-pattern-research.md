# Research: documentation-site patterns for the GTM OS redesign

Scope: extract information architecture, navigation, and density patterns from mature official documentation sites so GTM OS can become a clear, useful documentation site without copying Matt Pocock's layout.

## Short summary

The strongest recurring signals are:

- a persistent but hierarchical sidebar rather than a flat menu;
- a visible chapter or section path, usually through anchors or breadcrumbs;
- search that is easy to find and has a keyboard shortcut;
- current context in the header, such as a version, product area, or breadcrumb;
- simple progress cues through current states, badges, next steps, or completion language;
- native disclosure for secondary material;
- high information density with calm typography and predictable spacing.

## Comparison

| Site | Sidebar / information architecture | Chapter / section navigation | Local navigation | Progress / completion cues | Responsive behavior | Search / versioning | Accessibility | Sources |
|---|---|---|---|---|---|---|---|---|
| Stripe Docs | Large hierarchical sidebar with groups and subgroups; API reference pages use version badges and resource categories. | Domain tabs in the header plus page-specific sidebar navigation. | Reference pages expose ordered sections and clear subtopics. | Current-state and version badges distinguish stable, preview, and newer surfaces. | Mobile navigation collapses behind a control; desktop keeps the sidebar and full header. | Header search with a visible `Search` label and `/` shortcut; version context is exposed in the docs UI. | Skip link, semantic tabs, and labelled controls. | [Dispute reason code categories](https://docs.stripe.com/disputes/categories), [PaymentIntents list reference](https://docs.stripe.com/api/payment_intents/list?lang=java) |
| Vercel Docs | Global areas such as Build, Deploy, and Manage sit above a semantic page sidebar. | The global menu handles broad areas; breadcrumbs keep the current page visible on smaller screens. | Cross-links and related-page panels provide a path through the documentation graph. | Related pages and link context help users understand where to go next. | Desktop uses a sticky sidebar; mobile switches to a compact menu and breadcrumb. | `Search Docs` with a `⌘ K` shortcut; some pages expose version history or filters. | Skip link, focus states, and menu controls with expanded/collapsed state. | [Query](https://vercel.com/docs/query), [Storage overview](https://vercel.com/docs/storage) |
| Supabase Docs | The home page is a category hub covering frameworks, backend services, client libraries, migrations, and self-hosting. | Guides use explicit `Get started` and `Next steps` paths. | Long pages keep their structure through clear headings and contextual links. | The hub acts as a launcher; individual pages make the first action explicit. | Desktop uses top navigation and a sidebar; mobile reduces navigation to disclosures and cards. | Search is available in the header and many pages provide multiple entry points. | Skip-to-content behavior, semantic headings, and ordinary text links. | [Supabase Docs](https://supabase.com/docs), [Auth](https://supabase.com/docs/guides/auth), [Tables](https://supabase.com/docs/guides/database/tables) |
| Tailwind CSS Docs | Dense but carefully grouped sidebar covering setup, concepts, layout, typography, and utilities. | Header version context and breadcrumbs keep the user oriented. | The current page shows its path, such as `Getting started` to a specific guide. | Version switcher and `New` badges communicate state without adding visual noise. | Desktop keeps a sticky sidebar; mobile uses search, menu, and breadcrumb controls. | Fast search with `⌘K` / `Ctrl K`; the active version is visible in the header. | Clear focus rings, keyboard-friendly controls, and usable code-block affordances. | [Installation with Vite](https://tailwindcss.com/docs/installation/using-vite) |
| MDN | Deep navigation is divided into categories; long branches use `details` and `summary`. | Learning paths separate guides, how-tos, and reference material. | `In this article` gives each page an explicit local table of contents. | Experimental and deprecated labels communicate maturity and status. | Navigation compresses while preserving the page title, local path, and article structure. | Site-wide search is visible; HTML, CSS, and JavaScript remain first-class top-level areas. | Skip-to-content behavior, native disclosures, and semantic HTML navigation. | [MDN](https://developer.mozilla.org/en-US/), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development) |

## Actionable patterns for GTM OS

1. Keep the desktop sidebar persistent, hierarchical, and short. Groups and subgroups scale better than a flat list as the content grows.
2. Keep the current context visible near the header or page title. For GTM OS, that can be a chapter indicator or a current phase label.
3. Add search only when it is real and useful, with one visible shortcut instead of decorative UI.
4. Use native `details` and `summary` for secondary explanations and exceptions.
5. On mobile, collapse navigation chrome while keeping the title, breadcrumb, and current path visible.
6. Give sections a small progress signal such as `Current`, `Next`, `Try this`, or `Done when`.
7. Keep density high through typography and spacing, not through decorative cards or extra borders.
8. Borrow the mechanics that help orientation, not the visual structure of any one reference site.

## What the redesign uses

- six short chapter groups with one consistent hierarchy;
- chapter numbers and titles on one baseline;
- child links aligned with chapter titles rather than with a second, unrelated rail;
- the same sidebar structure on the main documentation page and supporting pages;
- a compact mobile chapter disclosure;
- a page-level table of contents and scroll progress indicator already present in the main flow.

## Sources

- [Stripe Docs: Dispute reason code categories](https://docs.stripe.com/disputes/categories)
- [Stripe API reference: List PaymentIntents](https://docs.stripe.com/api/payment_intents/list?lang=java)
- [Vercel Docs: Query](https://vercel.com/docs/query)
- [Vercel Docs: Storage overview](https://vercel.com/docs/storage)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Tables](https://supabase.com/docs/guides/database/tables)
- [Tailwind CSS Docs: Installation with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [MDN](https://developer.mozilla.org/en-US/)
- [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development)
