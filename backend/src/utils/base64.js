export function encode(str = "") {
  return Buffer.from(str, "utf8").toString("base64");
}

export function decode(b64 = "") {
  return Buffer.from(b64, "base64").toString("utf8");
}

