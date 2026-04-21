export function cls(...args) {
  return args.filter(Boolean).join(" ");
}

export function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

