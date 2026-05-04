// Curated dashboard import only.
// Do not paste or commit raw Apple Health exports here; keep this file limited to
// minimized fields intentionally shown in the public dashboard.

export interface ImportedDailyMetric {
  date: string
  steps: number
  active_calories_kcal: number | null
  resting_calories_kcal: number | null
  walking_running_distance_km: number
  exercise_minutes: number | null
  heart_rate_avg_bpm: number | null
  resting_heart_rate_bpm: number | null
  hrv_sdnn_ms: number | null
  walking_hr_avg_bpm: number | null
  blood_oxygen_pct: number | null
}

export interface ImportedWorkout {
  start: string
  end: string
  activity_type: string
  duration_min: number
  distance_km: number | null
  calories: number
}

export interface ImportedVO2Week {
  week_start: string
  week_end: string
  value_ml_kg_min: number
}

export interface ImportedPushupWeek {
  week: string
  total: number
  note?: string
  sessions: { date: string; reps: number }[]
}

export interface ImportedHealthExport {
  export_date: string
  period: { start: string; end: string }
  timezone: string
  source: string
  generatedBy: string
  dailyOverrides: ImportedDailyMetric[]
  vo2Max: ImportedVO2Week[]
  workouts: ImportedWorkout[]
  bodyMeasurement: {
    weight_kg: number
    measured_date: string
    note: string
  }
  pushupsManualLog: {
    note: string
    weekly: ImportedPushupWeek[]
  }
}

export const latestHealthExport: ImportedHealthExport = {
  export_date: '2026-05-03',
  period: { start: '2026-02-01', end: '2026-05-02' },
  timezone: 'America/Chicago',
  source: 'Apple Health / Apple Watch',
  generatedBy: 'Claude health_query_v0',
  dailyOverrides: [
    { date: '2026-04-26', steps: 9082, active_calories_kcal: 990.5, resting_calories_kcal: 1382.1, walking_running_distance_km: 7.541, exercise_minutes: 87, heart_rate_avg_bpm: 98.5, resting_heart_rate_bpm: 68, hrv_sdnn_ms: 54.9, walking_hr_avg_bpm: 116, blood_oxygen_pct: 96.8 },
    { date: '2026-04-27', steps: 12274, active_calories_kcal: 1515.1, resting_calories_kcal: 2009.0, walking_running_distance_km: 10.411, exercise_minutes: 142, heart_rate_avg_bpm: 100.3, resting_heart_rate_bpm: 71, hrv_sdnn_ms: 56.0, walking_hr_avg_bpm: 106, blood_oxygen_pct: 95.5 },
    { date: '2026-04-28', steps: 15337, active_calories_kcal: 433.5, resting_calories_kcal: 2049.8, walking_running_distance_km: 12.683, exercise_minutes: 23, heart_rate_avg_bpm: 88.0, resting_heart_rate_bpm: 66, hrv_sdnn_ms: 41.2, walking_hr_avg_bpm: 117, blood_oxygen_pct: 95.6 },
    { date: '2026-04-29', steps: 4203, active_calories_kcal: 595.1, resting_calories_kcal: 1993.5, walking_running_distance_km: 3.409, exercise_minutes: 35, heart_rate_avg_bpm: 86.0, resting_heart_rate_bpm: 70, hrv_sdnn_ms: 36.5, walking_hr_avg_bpm: 115, blood_oxygen_pct: 96.4 },
    { date: '2026-04-30', steps: 4037, active_calories_kcal: 328.3, resting_calories_kcal: 2026.9, walking_running_distance_km: 3.327, exercise_minutes: 12, heart_rate_avg_bpm: 80.1, resting_heart_rate_bpm: 63, hrv_sdnn_ms: 35.9, walking_hr_avg_bpm: 132, blood_oxygen_pct: 95.9 },
    { date: '2026-05-01', steps: 2846, active_calories_kcal: 1098.6, resting_calories_kcal: 1938.4, walking_running_distance_km: 2.322, exercise_minutes: 111, heart_rate_avg_bpm: 112.7, resting_heart_rate_bpm: 73, hrv_sdnn_ms: 29.8, walking_hr_avg_bpm: 132, blood_oxygen_pct: 95.9 },
    { date: '2026-05-02', steps: 11762, active_calories_kcal: null, resting_calories_kcal: 2030.1, walking_running_distance_km: 9.917, exercise_minutes: null, heart_rate_avg_bpm: null, resting_heart_rate_bpm: 73, hrv_sdnn_ms: null, walking_hr_avg_bpm: null, blood_oxygen_pct: null },
  ],
  vo2Max: [
    { week_start: '2026-02-01', week_end: '2026-02-07', value_ml_kg_min: 33.4 },
    { week_start: '2026-02-08', week_end: '2026-02-14', value_ml_kg_min: 34.62 },
    { week_start: '2026-02-15', week_end: '2026-02-21', value_ml_kg_min: 35.04 },
    { week_start: '2026-02-22', week_end: '2026-02-28', value_ml_kg_min: 35.82 },
    { week_start: '2026-03-01', week_end: '2026-03-07', value_ml_kg_min: 35.44 },
    { week_start: '2026-03-08', week_end: '2026-03-14', value_ml_kg_min: 35.69 },
    { week_start: '2026-04-05', week_end: '2026-04-11', value_ml_kg_min: 38.33 },
    { week_start: '2026-04-19', week_end: '2026-04-25', value_ml_kg_min: 36.77 },
    { week_start: '2026-04-26', week_end: '2026-05-02', value_ml_kg_min: 36.22 },
  ],
  workouts: [
    { start: '2026-05-02T22:35:48Z', end: '2026-05-02T23:24:52Z', activity_type: 'Golf', duration_min: 49.1, distance_km: 1.061, calories: 327.4 },
    { start: '2026-05-02T19:12:03Z', end: '2026-05-02T20:02:45Z', activity_type: 'Walking', duration_min: 33.1, distance_km: 3.397, calories: 261.7 },
    { start: '2026-05-01T02:17:37Z', end: '2026-05-01T02:21:11Z', activity_type: 'Yoga', duration_min: 3.6, distance_km: null, calories: 26.3 },
    { start: '2026-05-01T02:12:01Z', end: '2026-05-01T02:17:24Z', activity_type: 'Weight Training', duration_min: 5.4, distance_km: null, calories: 63.2 },
    { start: '2026-04-28T20:51:55Z', end: '2026-04-28T21:21:57Z', activity_type: 'Paddle Sports', duration_min: 30.0, distance_km: 0.764, calories: 294.9 },
    { start: '2026-04-28T19:28:12Z', end: '2026-04-28T19:52:07Z', activity_type: 'Other', duration_min: 23.9, distance_km: null, calories: 251.8 },
    { start: '2026-04-28T17:37:13Z', end: '2026-04-28T17:44:47Z', activity_type: 'Paddle Sports', duration_min: 5.0, distance_km: 0.213, calories: 39.1 },
    { start: '2026-04-27T20:27:46Z', end: '2026-04-27T21:01:31Z', activity_type: 'Walking', duration_min: 25.2, distance_km: 2.259, calories: 213.1 },
    { start: '2026-04-27T19:32:16Z', end: '2026-04-27T19:38:06Z', activity_type: 'Weight Training', duration_min: 5.8, distance_km: null, calories: 47.4 },
  ],
  bodyMeasurement: {
    weight_kg: 79.38,
    measured_date: '2026-02-24',
    note: 'Single measurement available in 3-month window',
  },
  pushupsManualLog: {
    note: 'Manually tracked; not from Apple Health',
    weekly: [
      {
        week: '2026-04-06 to 2026-04-12',
        total: 120,
        sessions: [
          { date: '2026-04-06', reps: 30 },
          { date: '2026-04-08', reps: 30 },
          { date: '2026-04-10', reps: 20 },
          { date: '2026-04-11', reps: 40 },
        ],
      },
      { week: '2026-04-13 to 2026-04-18', total: 190, sessions: [] },
      { week: '2026-04-20 to 2026-04-26', total: 100, note: 'Reduced - shoulder fatigue', sessions: [] },
    ],
  },
}
