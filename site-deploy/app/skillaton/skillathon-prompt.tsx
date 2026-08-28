'use client';

import { useState } from 'react';
import { skillathonTargetUrl } from './skillathon-config';

export const skillathonPrompt = `$gtm-product-page-audit

Target URL: ${skillathonTargetUrl}

You are at the repository root in a clean Codex environment.
Read only the invoked skill and \`demo/input/product-page-audit.md\`.
Confirm that the input's Target URL matches the Target URL above.
Use the committed public snapshots for this target. Do not browse, use APIs, or inspect any other path.
Write both outputs:
- \`demo/output/product-page-report.md\` for a concise, plain-language report a marketer or founder can read. Apply the skill's built-in human-writing pass and end with a pointer to the agent audit.
- \`demo/output/product-page-audit.md\` for the structured agent handoff, using the exact headings and source fields required by the skill.
Do not collapse the two outputs into one. Stop after both files are written.`;

export function SkillathonPrompt() {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(skillathonPrompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="docs-skillathon-prompt">
      <div className="docs-skillathon-prompt-header">
        <span>Paste into Codex</span>
        <button type="button" onClick={copyPrompt} aria-label="Copy the Skillathon prompt">
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <pre><code>{skillathonPrompt}</code></pre>
      <p className="docs-skillathon-copy-status" aria-live="polite">
        {copied ? 'Prompt copied.' : 'The button copies the full prompt.'}
      </p>
    </div>
  );
}
