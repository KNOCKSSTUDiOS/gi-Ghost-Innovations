export function isObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

export function isArray(v) {
  return Array.isArray(v);
}

export function isFunction(v) {
  return typeof v === "function";
}
