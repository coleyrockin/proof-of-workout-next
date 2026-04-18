// lib/data.ts
import type { WeekData } from './types'

export const weekData: WeekData = {
  athlete: 'Coley',
  week: '2026-04-11 to 2026-04-17',
  generated: '2026-04-18',
  source: 'Apple HealthKit',

  weekly_summary: {
    steps_total: 55891,
    steps_avg_per_day: 7984,
    active_calories_total: 7228,
    active_calories_avg_per_day: 1033,
    resting_calories_total: 14111,
    resting_calories_avg_per_day: 2016,
    total_calories: 21339,
    exercise_minutes_total: 643,
    exercise_minutes_avg_per_day: 92,
    workout_sessions: 19,
    vo2_max: 38.33,
    vo2_max_unit: 'mL/kg/min',
    rhr_avg: 65,
    hrv_avg_ms: 60,
  },

  daily: [
    { date: '2026-04-11', steps: 9540,  active_calories: 984,  resting_calories: 1990, exercise_minutes: 81,  resting_heart_rate: 56, hrv_ms: 67.7, avg_heart_rate: 84,  walking_heart_rate: 147, respiratory_rate: 13.6, wrist_temp_c: null  },
    { date: '2026-04-12', steps: 8376,  active_calories: 1612, resting_calories: 1992, exercise_minutes: 165, resting_heart_rate: 75, hrv_ms: 46.5, avg_heart_rate: 111, walking_heart_rate: 106, respiratory_rate: 15.4, wrist_temp_c: 35.19 },
    { date: '2026-04-13', steps: 9232,  active_calories: 1031, resting_calories: 2023, exercise_minutes: 104, resting_heart_rate: 68, hrv_ms: 71.1, avg_heart_rate: 84,  walking_heart_rate: 109, respiratory_rate: 14.5, wrist_temp_c: 35.35 },
    { date: '2026-04-14', steps: 4750,  active_calories: 503,  resting_calories: 2029, exercise_minutes: 17,  resting_heart_rate: 67, hrv_ms: 71.5, avg_heart_rate: 75,  walking_heart_rate: 106, respiratory_rate: 14.9, wrist_temp_c: 34.95 },
    { date: '2026-04-15', steps: 4868,  active_calories: 727,  resting_calories: 2041, exercise_minutes: 67,  resting_heart_rate: 61, hrv_ms: 58.6, avg_heart_rate: 77,  walking_heart_rate: 104, respiratory_rate: 14.1, wrist_temp_c: 34.96 },
    { date: '2026-04-16', steps: 12482, active_calories: 1243, resting_calories: 2017, exercise_minutes: 103, resting_heart_rate: 60, hrv_ms: 43.3, avg_heart_rate: 92,  walking_heart_rate: 148, respiratory_rate: 14.3, wrist_temp_c: 35.34 },
    { date: '2026-04-17', steps: 6643,  active_calories: 1128, resting_calories: 2019, exercise_minutes: 106, resting_heart_rate: 67, hrv_ms: 60.7, avg_heart_rate: 89,  walking_heart_rate: 110, respiratory_rate: 14.9, wrist_temp_c: 35.02 },
  ],

  workouts: [
    // Apr 11 — 6 sessions
    { date: '2026-04-11', activity: 'Weight Training', duration_min: 12,  calories: 95,   distance_mi: null },
    { date: '2026-04-11', activity: 'Walking',          duration_min: 2,   calories: 9,    distance_mi: 0.08 },
    { date: '2026-04-11', activity: 'Weight Training', duration_min: 1,   calories: 14,   distance_mi: null },
    { date: '2026-04-11', activity: 'Running',          duration_min: 2,   calories: 25,   distance_mi: 0.21 },
    { date: '2026-04-11', activity: 'Walking',          duration_min: 34,  calories: 384,  distance_mi: 2.04 },
    { date: '2026-04-11', activity: 'Golf',             duration_min: 42,  calories: 205,  distance_mi: 0.35 },
    // Apr 12 — 1 session
    { date: '2026-04-12', activity: 'Golf',             duration_min: 157, calories: 1330, distance_mi: 2.29 },
    // Apr 13 — 3 sessions
    { date: '2026-04-13', activity: 'Weight Training', duration_min: 12,  calories: 88,   distance_mi: null },
    { date: '2026-04-13', activity: 'Weight Training', duration_min: 5,   calories: 30,   distance_mi: null },
    { date: '2026-04-13', activity: 'Golf',             duration_min: 51,  calories: 328,  distance_mi: 0.65 },
    // Apr 15 — 2 sessions
    { date: '2026-04-15', activity: 'Yoga',             duration_min: 32,  calories: 180,  distance_mi: null },
    { date: '2026-04-15', activity: 'Weight Training', duration_min: 4,   calories: 15,   distance_mi: null },
    // Apr 16 — 4 sessions
    { date: '2026-04-16', activity: 'Walking',          duration_min: 35,  calories: 407,  distance_mi: 2.30 },
    { date: '2026-04-16', activity: 'Weight Training', duration_min: 5,   calories: 55,   distance_mi: null },
    { date: '2026-04-16', activity: 'Walking',          duration_min: 21,  calories: 203,  distance_mi: 1.09 },
    { date: '2026-04-16', activity: 'Weight Training', duration_min: 12,  calories: 69,   distance_mi: null },
    // Apr 17 — 3 sessions
    { date: '2026-04-17', activity: 'Golf',             duration_min: 68,  calories: 557,  distance_mi: 1.07 },
    { date: '2026-04-17', activity: 'Weight Training', duration_min: 9,   calories: 85,   distance_mi: null },
    { date: '2026-04-17', activity: 'Weight Training', duration_min: 7,   calories: 58,   distance_mi: null },
  ],

  sleep: [
    // Apr 12/13 — from prior export
    { night: '2026-04-12 to 2026-04-13', bedtime: '11:37 PM', wake_time: '9:24 AM', total_min: 587, deep_min: 31,  rem_min: 104, core_min: 411, awake_min: 41 },
    // Apr 13/14 — from prior export
    { night: '2026-04-13 to 2026-04-14', bedtime: '12:18 AM', wake_time: '8:05 AM', total_min: 467, deep_min: 49,  rem_min: 127, core_min: 251, awake_min: 40 },
    // Apr 15/16 — computed from raw segments (UTC 04:56→11:51)
    { night: '2026-04-15 to 2026-04-16', bedtime: '11:56 PM', wake_time: '6:51 AM', total_min: 415, deep_min: 40,  rem_min: 73,  core_min: 268, awake_min: 34 },
    // Apr 16/17 — computed from raw segments (UTC 03:25→14:24)
    { night: '2026-04-16 to 2026-04-17', bedtime: '10:25 PM', wake_time: '9:24 AM', total_min: 659, deep_min: 56,  rem_min: 211, core_min: 361, awake_min: 31 },
  ],

  vo2_max_trend: [
    { date: '2026-02-01', value: 33.4  },
    { date: '2026-02-08', value: 34.62 },
    { date: '2026-02-15', value: 35.04 },
    { date: '2026-02-22', value: 35.82 },
    { date: '2026-03-01', value: 35.44 },
    { date: '2026-03-08', value: 35.69 },
    { date: '2026-04-07', value: 36.81 },
    { date: '2026-04-14', value: 38.33 },
  ],

  pushups: [
    { date: '2026-04-13', reps: 100 },
    { date: '2026-04-14', reps: 30 },
    { date: '2026-04-15', reps: 5 },
    { date: '2026-04-17', reps: 50 },
  ],
  pushups_weekly_total: 190,
}
