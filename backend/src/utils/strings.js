export function capitalize(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camel(str = "") {
  return str
    .toLowerCase()
    .replace(/[-_](.)/g, (_, c) => c.toUpperCase());
}

export function snake(str = "") {
  return str
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "");
}

