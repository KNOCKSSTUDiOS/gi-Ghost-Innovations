import { randomBytes } from "./crypto.js";

export function nanoid(size = 21) {
  return randomBytes(size).slice(0, size);
}

export function shortID(size = 8) {
  return randomBytes(size).slice(0, size);
}

export function timestampID(prefix = "") {
  return `${prefix}${Date.now()}${shortID(6)}`;
}

