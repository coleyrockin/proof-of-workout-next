# POWO Security Best Practices Report

Generated: 2026-05-03
Updated: 2026-05-04

## Executive Summary

POWO is a static Next.js 16 / React 19 dashboard with no API routes, no Server Actions, no auth, no database, no form submission, and no direct user-input handling. That keeps the classic web vulnerability surface small. I did not find evidence of raw HTML injection, dynamic code execution, token storage, unsafe redirects, postMessage handling, service workers, file uploads, CORS, or server-side request handling.

The meaningful security and privacy work is: avoid publishing sensitive Apple Health-derived data unintentionally and address the current dependency advisory path. The initial low-risk hardening pass added baseline response headers and removed the runtime Google Fonts dependency.

## Scope and Evidence

- Framework/language: Next.js, React, TypeScript, Tailwind/PostCSS.
- Evidence: `package.json` lines 11-25 declare `next`, `react`, `react-dom`, TypeScript, Tailwind, and PostCSS dependencies.
- App surface: only App Router page/layout/error/not-found/image files are present; no `route.ts`, `middleware.ts`, `proxy.ts`, API routes, or backend handlers were found.
- CI surface: `.github/workflows/ci.yml` lines 21-31 uses `npm ci`, lint, typecheck, and build.

## Critical Findings

None found.

## High Findings

None found.

## Medium Findings

### SEC-001: Public bundle contains personal health and injury data

- Rule ID: REACT-CONFIG-001 / privacy data minimization
- Severity: Medium
- Location: `lib/data.ts` lines 4-25, 367, 386
- Evidence:
  - `lib/data.ts` line 6 stores owner name.
  - `lib/data.ts` lines 14-18 store age band and weight.
  - `lib/data.ts` lines 21-23 store current physical constraints.
  - `lib/data.ts` line 367 stores shoulder fatigue notes.
  - `lib/data.ts` line 386 stores Apple Health sleep coverage notes.
- Impact: Anything in `lib/data.ts` is shipped in the static/client-rendered app bundle or otherwise exposed by the public site. If the dashboard is public, viewers can extract health, weight, sleep, injury, and activity details even if a future UI hides them.
- Fix: Before adding new data, define a publishable dataset boundary. Keep raw Apple Health exports outside the repo, generate a sanitized `lib/data.ts`, and strip or generalize sensitive fields that are not required for the public story.
- Mitigation: Add a data-ingestion checklist or validation script that fails when fields such as exact owner name, weight, injury notes, medical-like notes, or full raw export details are present without an explicit `public_ok` marker.
- False positive notes: This may be intentionally public portfolio data. If so, document that consent and publication intent clearly so future agents do not accidentally expand the data exposure.

### SEC-002: `npm audit` reports a moderate advisory through Next.js/PostCSS

- Rule ID: REACT-SUPPLY-001 / NEXT-SUPPLY-001
- Severity: Medium
- Location: `package.json` line 13
- Evidence:
  - `package.json` line 13 pins `next` to `16.2.4`.
  - `npm audit --audit-level=moderate` reports `postcss <8.5.10` via `node_modules/next/node_modules/postcss`, advisory `GHSA-qx2v-qp2m-jg93`.
  - The audit output says the suggested `npm audit fix --force` would install `next@9.3.3`, which is a breaking and unsafe downgrade path.
- Impact: The advisory describes XSS through unescaped `</style>` in PostCSS stringify output. The practical exploitability appears low for this app because POWO does not stringify attacker-controlled CSS, but the dependency tree still has a known advisory.
- Fix: Do not run `npm audit fix --force`. Upgrade Next.js to a patched compatible release once available and re-run `npm audit`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- Mitigation: Add dependency scanning to CI or enable Dependabot/GitHub security alerts so framework advisories are surfaced automatically.
- False positive notes: This is dependency-level risk, not evidence of an exploitable route in this app.

## Low Findings

### SEC-003: Production security headers were not configured in the app

- Rule ID: REACT-HEADERS-001 / NEXT-HEADERS-001
- Severity: Low
- Location: `next.config.ts` lines 3-5
- Status: Fixed in the 2026-05-04 hardening pass.
- Evidence:
  - The original `next.config.ts` contained no `headers()` configuration.
  - `curl -I http://localhost:3000` showed `X-Powered-By: Next.js` and did not show CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, or `frame-ancestors`.
- Impact: Missing browser-enforced hardening leaves less defense-in-depth if future changes introduce untrusted rendering, third-party scripts, or URL-driven features. `X-Powered-By` also exposes implementation details.
- Fix: Added `poweredByHeader: false` and global `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-Frame-Options` headers in `next.config.ts`.
- Mitigation: Consider adding a CSP later after verifying the exact deployed Next.js script/style requirements. I did not add a broad `unsafe-inline` CSP in this pass because a weak CSP could give false confidence and a strict CSP can break App Router rendering without nonce work.
- False positive notes: Local dev headers are not always the production header posture. Verify the deployed site response headers before treating this as production-confirmed.

### SEC-004: Runtime Google Fonts stylesheet was a third-party resource without app-level integrity/governance

- Rule ID: JS-SUPPLY-001 / REACT-SRI-001
- Severity: Low
- Location: `app/layout.tsx` lines 39-45
- Status: Fixed in the 2026-05-04 hardening pass.
- Evidence:
  - The original `app/layout.tsx` lines 40-45 preconnected to Google domains and loaded a Google Fonts stylesheet directly.
  - ESLint also warns at `app/layout.tsx` line 42 that custom fonts should not be added this way in the app.
- Impact: The browser makes runtime requests to Google for font CSS/assets, which has privacy and supply-chain implications. It also bypasses Next.js font self-hosting benefits.
- Fix: Migrated `Bebas Neue`, `DM Mono`, and `DM Sans` to `next/font/google` and wired them through the existing CSS font tokens.
- Mitigation: Re-check the deployed page source/headers after release to confirm no browser requests to Google Fonts remain.
- False positive notes: This is not an immediate vulnerability by itself; it is a supply-chain and privacy hardening issue.

## Positive Findings

- No `dangerouslySetInnerHTML`, `innerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, or `new Function` usage was found in app code.
- No `localStorage` or `sessionStorage` token/session pattern was found.
- No `postMessage` handling was found.
- No service worker registration was found.
- No server routes, API handlers, Server Actions, middleware/proxy, file upload, CORS, SSRF, SQL, or command-execution surface was found.
- External link in `components/Footer.tsx` line 25 uses `target="_blank"` with `rel="noopener noreferrer"`, which is the correct tabnabbing mitigation.
- CI uses `npm ci` rather than `npm install` for reproducible installs.

## Recommended Fix Order

1. Sanitize/minimize the new Apple Health data before it enters `lib/data.ts`.
2. Track and patch the Next/PostCSS advisory without using the unsafe forced downgrade path.
3. Add or verify production security headers.
4. Move Google Fonts to `next/font/google`.

## Verification Performed

- `npm run lint`: passed with one existing font-loading warning.
- `npx tsc --noEmit`: passed.
- `npm audit --audit-level=moderate`: reported two moderate dependency findings through Next/PostCSS.
- `curl -I http://localhost:3000`: confirmed local dev response headers do not include explicit hardening headers.
