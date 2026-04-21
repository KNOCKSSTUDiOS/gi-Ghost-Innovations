export function get(key = "", fallback = null) {
  return process.env[key] ?? fallback;
}

export function required(key = "") {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function bool(key = "", fallback = false) {
  const value = process.env[key];
  if (value === undefined) return fallback;
  return value === "true" || value === "1";
}
