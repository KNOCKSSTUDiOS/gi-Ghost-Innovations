export function now() {
  return new Date().toISOString();
}

export function format(date = new Date()) {
  return new Date(date).toISOString();
}

export function timestamp() {
  return Date.now();
}
