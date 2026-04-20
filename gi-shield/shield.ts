// G.I. SHIELD — Rate Limit Engine
// Prevents spam, overload, and abuse.

const requestCounts = new Map<string, { count: number; ts: number }>();

export function checkGiShield(userId: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const maxPerWindow = 60; // 60 requests per minute

  const entry = requestCounts.get(userId) ?? { count: 0, ts: now };

  // Reset window
  if (now - entry.ts > windowMs) {
    entry.count = 0;
    entry.ts = now;
  }

  entry.count += 1;
  requestCounts.set(userId, entry);

  // Block if exceeded
  if (entry.count > maxPerWindow) {
    return {
      allowed: false,
      message: "Too many requests. Please slow down.",
    };
  }

  return { allowed: true };
}

