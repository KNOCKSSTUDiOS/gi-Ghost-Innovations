export function merge(target = {}, source = {}) {
  return { ...target, ...source };
}

export function deepClone(obj = {}) {
  return JSON.parse(JSON.stringify(obj));
}

export function keys(obj = {}) {
  return Object.keys(obj);
}
