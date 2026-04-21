export function status(res, code = 200) {
  res.statusCode = code;
  return res;
}

export function json(res, data = {}) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

export function send(res, body = "") {
  res.end(body);
}
