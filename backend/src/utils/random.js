export function int(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function range(count = 1, min = 0, max = 100) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(int(min, max));
  }
  return arr;
}

export function pick(list = []) {
  if (!Array.isArray(list) || list.length === 0) return null;
  return list[int(0, list.length - 1)];
}
