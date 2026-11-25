import { z } from 'zod';

const envSchema = z
  .object({
    SITE_URL: z.url().optional(),
    APP_ENV: z
      .enum(['development', 'staging', 'production'])
      .default('development'),
    API_URL: z.url().default('https://jsonplaceholder.typicode.com')
  })
  .refine(env => env.APP_ENV !== 'production' || env.SITE_URL, {
    message: 'Required in production: your real domain',
    path: ['SITE_URL']
  })
  .transform(env => ({
    ...env,
    SITE_URL: env.SITE_URL ?? 'http://localhost:3000'
  }));

// An unset GitHub variable arrives as an empty string: treat it as "not set"
function valueOf(value: string | undefined) {
  return value || undefined;
}

// Write each process.env.NEXT_PUBLIC_ name in full: Next.js only puts
// those values into the browser code when it sees the full name.
const result = envSchema.safeParse({
  SITE_URL: valueOf(process.env.NEXT_PUBLIC_SITE_URL),
  APP_ENV: valueOf(process.env.NEXT_PUBLIC_APP_ENV),
  API_URL: valueOf(process.env.NEXT_PUBLIC_API_URL)
});

if (!result.success) {
  throw new Error(
    `Invalid environment variables (check the NEXT_PUBLIC_ names in .env):\n${z.prettifyError(result.error)}`
  );
}

export const env = result.data;
