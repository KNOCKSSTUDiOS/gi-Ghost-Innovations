import path from "path";

export function join(...args) {
  return path.join(...args);
}

export function normalize(p = "") {
  return path.normalize(p);
}

export function ensureSlash(p = "") {
  if (!p.endsWith("/")) return p + "/";
  return p;
}
