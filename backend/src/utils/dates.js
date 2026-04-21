export function now() {
  return new Date();
}

export function toISO(date = new Date()) {
  return date.toISOString();
}

export function fromISO(str = "") {
  return new Date(str);
}

