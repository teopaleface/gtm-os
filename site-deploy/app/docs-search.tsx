'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { SearchEntry } from './docs-config';

type DocsSearchProps = {
  entries: SearchEntry[];
};

function matchesEntry(entry: SearchEntry, tokens: string[]) {
  const haystack = `${entry.title} ${entry.section} ${entry.keywords ?? ''}`.toLowerCase();
  return tokens.every((token) => haystack.includes(token));
}

export function DocsSearch({ entries }: DocsSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const hasOpenedRef = useRef(false);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];

    return entries
      .filter((entry) => matchesEntry(entry, tokens))
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aExact = aTitle === query.trim().toLowerCase();
        const bExact = bTitle === query.trim().toLowerCase();
        return Number(bExact) - Number(aExact);
      })
      .slice(0, 8);
  }, [entries, query]);
  const activeResultIndex = Math.min(selectedIndex, Math.max(results.length - 1, 0));

  const closeSearch = () => {
    setOpen(false);
    setQuery('');
    setSelectedIndex(0);
  };

  const openSearch = () => {
    hasOpenedRef.current = true;
    setOpen(true);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch();
        return;
      }

      if (open && event.key === 'Escape') {
        event.preventDefault();
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      return;
    }

    if (hasOpenedRef.current) triggerRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const selected = resultRefs.current[activeResultIndex];
    if (open && selected) selected.scrollIntoView({ block: 'nearest' });
  }, [activeResultIndex, open]);

  const navigateTo = (href: string) => {
    closeSearch();
    window.location.assign(href);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (results.length > 0) setSelectedIndex((current) => (current + 1) % results.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (results.length > 0) setSelectedIndex((current) => (current - 1 + results.length) % results.length);
    }

    if (event.key === 'Enter' && results[activeResultIndex]) {
      event.preventDefault();
      navigateTo(results[activeResultIndex].href);
    }

  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const focusableElements = [closeRef.current, inputRef.current, ...resultRefs.current.slice(0, results.length)].filter(Boolean) as HTMLElement[];
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    if (!firstFocusable || !lastFocusable) return;

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) return;

    event.preventDefault();
    const nextIndex = event.shiftKey
      ? (currentIndex - 1 + focusableElements.length) % focusableElements.length
      : (currentIndex + 1) % focusableElements.length;
    focusableElements[nextIndex]?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="docs-search-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="docs-search-dialog"
        onClick={openSearch}
      >
        <span className="docs-search-icon" aria-hidden="true">⌕</span>
        <span>Search</span>
        <kbd>⌘K</kbd>
      </button>

      {open ? (
        <div className="docs-search-backdrop" role="presentation" onMouseDown={closeSearch}>
          <div
            id="docs-search-dialog"
            className="docs-search-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="docs-search-title"
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={handleDialogKeyDown}
          >
            <div className="docs-search-header">
              <div>
                <p className="docs-search-eyebrow">Documentation search</p>
                <h2 id="docs-search-title">Find a chapter or playbook</h2>
              </div>
              <button ref={closeRef} type="button" className="docs-search-close" onClick={closeSearch} aria-label="Close search">Esc</button>
            </div>
            <label className="docs-search-input-wrap">
              <span className="docs-search-icon" aria-hidden="true">⌕</span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search GTM OS"
                aria-label="Search GTM OS documentation"
                aria-controls="docs-search-results"
                aria-activedescendant={results[activeResultIndex] ? `search-result-${activeResultIndex}` : undefined}
                autoComplete="off"
              />
              <kbd>Esc</kbd>
            </label>
            <div id="docs-search-results" className="docs-search-results" role="listbox" aria-label="Search results">
              {query.trim() === '' ? (
                <p className="docs-search-empty">Search chapters, sections, and playbooks.</p>
              ) : results.length === 0 ? (
                <p className="docs-search-empty">No matching documentation.</p>
              ) : (
                results.map((entry, index) => (
                  <a
                    id={`search-result-${index}`}
                    ref={(element) => { resultRefs.current[index] = element; }}
                    key={`${entry.title}-${entry.href}`}
                    className={`docs-search-result${activeResultIndex === index ? ' docs-search-result-active' : ''}`}
                    href={entry.href}
                    role="option"
                    aria-selected={activeResultIndex === index}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(entry.href);
                    }}
                  >
                    <span>
                      <strong>{entry.title}</strong>
                      <small>{entry.section}</small>
                    </span>
                    <span className="docs-search-arrow" aria-hidden="true">↗</span>
                  </a>
                ))
              )}
            </div>
            <div className="docs-search-footer"><span><kbd>↑</kbd><kbd>↓</kbd> to move</span><span><kbd>Enter</kbd> to open</span></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
