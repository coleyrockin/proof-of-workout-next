# POWO — Proof of Workout

A mobile-first fitness dashboard that renders a week of Apple Health data into a polished, dark-mode interface. Cardiac metrics, sleep stages, VO2 trends, workout logs, and achievements — all from real data, zero external UI libraries.

**Live:** [proof-of-workout-next.vercel.app](https://proof-of-workout-next.vercel.app)

## Tech Stack

- **Next.js 16** with App Router and static generation
- **TypeScript** end-to-end
- **Tailwind CSS v4** for design tokens and utility classes
- **Framer Motion** for scroll-triggered animations
- **Custom SVG icon system** — monoline, accessible, no icon library dependency
- **Vercel** for deployment (push-to-deploy from `main`)

## Features

- 10 data sections: Hero KPIs, Weekly Summary, Daily Breakdown, Top Workouts, Cardiac Metrics, VO2 Max Trend, Sleep Analysis, Pushup Log, Achievements, Footer
- Multi-color accent system with per-metric color coding
- Responsive 375px mobile-first layout at 430px max-width
- Horizontal scroll table for daily metrics that fits 7 columns without clipping
- Top-6 workout sort by calorie burn with activity-specific SVG icons
- Apple Health verified badge and data attribution

## Local Development

```bash
git clone https://github.com/coleyrockin/proof-of-workout-next.git
cd proof-of-workout-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/          Next.js App Router pages and global styles
components/   11 React components (Hero, DailyTable, WorkoutLog, etc.)
lib/          TypeScript types, health data, and SVG icon library
public/       Static assets
```

## What This Demonstrates

- Component architecture without a UI framework — every card, table, chart, and icon built from scratch
- Data visualization with pure SVG (VO2 trend chart, cardiac mini-charts, sleep stage bars)
- Design system thinking: consistent spacing, typography scale, color tokens, and grid patterns
- Accessibility: semantic HTML, ARIA labels on icons, structured table markup

## License

MIT
