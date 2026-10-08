const envNames = [
  "BETTER_AUTH_URL",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_MONGODB_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
] as const;

export type EnvName = (typeof envNames)[number];

export function env(name: EnvName): string | undefined {
  const value = process.env[name];
  if (typeof value !== "string" || value.length === 0) {
    return undefined;
  }
  return value;
}
