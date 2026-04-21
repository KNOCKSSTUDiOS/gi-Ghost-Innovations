export function getEnv(key, fallback = null) {
  const val = process.env[key];
  return val !== undefined ? val : fallback;
}

export function requireEnv(key) {
  const val = process.env[key];
  if (val === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return val;
}
