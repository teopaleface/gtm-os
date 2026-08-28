# GTM OS user capability settings

This file is the local, human-editable switchboard for production skills.
Change only the values in the YAML block. Keep the defaults disabled when a
run must stay offline or deterministic.

```yaml
apify: disabled
browser: disabled
computer_use: disabled
```

## Settings

- `apify: enabled` permits the bounded Apify adapter only when
  `APIFY_ENABLED=true` and `APIFY_TOKEN` are also configured locally. The
  token never belongs in this file.
- `browser: enabled` permits the available Browser capability for a public
  page when a snapshot is missing or a live check is explicitly useful. Follow
  the Browser skill's surface-selection and authentication rules.
- `computer_use: enabled` permits Computer Use only for visual or interactive
  page state that a normal web/browser read cannot capture. It does not grant
  permission to log in, type secrets, submit forms, publish, or edit anything.

When a capability is `disabled` or unavailable, use the next permitted
non-interactive source or the supplied snapshot. If no permitted source can
answer the question, return `NEEDS_INPUT` or `INSUFFICIENT_EVIDENCE` instead
of silently enabling a capability.

This file is a preference and safety gate, not authorization for an external
state change. Keep the product-page audit read-only and public-data-only.
