export function asc(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function desc(a, b) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export function byKey(key, direction = "asc") {
  return (a, b) => {
    if (!a || !b) return 0;
    const av = a[key];
    const bv = b[key];

    if (direction === "asc") return asc(av, bv);
    return desc(av, bv);
  };
}
