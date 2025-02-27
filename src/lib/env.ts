import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  VITE_SITE_URL: z.string().url().default('http://localhost:5173'),
});

export const env = envSchema.parse(import.meta.env);