# Health Export Ingestion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ingest the May 3 Apple Health export into the POWO dashboard without replacing the app's richer typed schema.

**Architecture:** Add a small imported-export patch and a normalizer that merges it with the existing `HealthData` object. The normalizer recalculates summaries, monthly stats, workout summaries, VO2 progression, and profile/body values while preserving app-only sleep and profile context.

**Tech Stack:** Next.js App Router, React, TypeScript.

---

### Task 1: Import And Normalize Latest Health Export

**Files:**
- Create: `lib/imported-health-export.ts`
- Create: `lib/normalize-health-export.ts`
- Modify: `lib/data.ts`
- Modify: `components/WeeklySummary.tsx`
- Modify: `components/Awards.tsx`
- Modify: `app/layout.tsx`

- [x] Add a compact source-backed patch for the latest export metadata, Apr 26-May 2 daily rows, Apr 27-May 2 workouts, weekly VO2 values, body measurement, and manual pushup log.
- [x] Add a normalizer that trims the base data to Feb 1-May 2, fixes historical shifted load/cardiac fields where the new export makes the alignment clear, applies latest daily rows, merges latest workouts, and recalculates derived data.
- [x] Wire `lib/data.ts` so `healthData` is exported from the normalizer.
- [x] Replace stale static labels for period length, activity type count, pushup totals, and metadata workout count.
- [x] Verify with `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
