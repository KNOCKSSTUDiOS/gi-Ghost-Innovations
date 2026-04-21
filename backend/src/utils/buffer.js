export function toUtf8(str = "") {
  return Buffer.from(str, "utf8");
}

export function fromUtf8(buf) {
  return Buffer.from(buf).toString("utf8");
}

export function concat(list = []) {
  return Buffer.concat(list);
}

