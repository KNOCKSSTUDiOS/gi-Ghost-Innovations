export function filter(obj = {}, allowed = []) {
  const out = {};
  for (const key of allowed) {
    if (obj[key] !== undefined) {
      out[key] = obj[key];
    }
  }
  return out;
}

