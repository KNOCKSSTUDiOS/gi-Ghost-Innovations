import jwt from "jsonwebtoken";

export function sign(payload = {}, secret = "", expiresIn = "1h") {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verify(token = "", secret = "") {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export function decode(token = "") {
  return jwt.decode(token);
}

