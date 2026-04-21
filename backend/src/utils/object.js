export function deepMerge(target = {}, source = {}) {
  const out = { ...target };

  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];

    if (isObject(tv) && isObject(sv)) {
      out[key] = deepMerge(tv, sv);
    } else {
      out[key] = sv;
    }
  }

  return out;
}

export function omit(obj = {}, keys = []) {
  const out = {};
  for (const k of Object.keys(obj)) {
    if (!keys.includes(k)) out[k] = obj[k];
  }
  return out;
}

export function pick(obj = {}, keys = []) {
  const out = {};
  for (const k of keys) {
    if (obj[k] !== undefined) out[k] = obj[k];
  }
  return out;
}

function isObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}
