export function isEmail(str = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isURL(str = "") {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
