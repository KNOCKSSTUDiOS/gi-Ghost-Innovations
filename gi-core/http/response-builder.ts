export function jsonResponse(res: any, status: number, data: any) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

export function textResponse(res: any, status: number, text: string) {
  res.writeHead(status, { "Content-Type": "text/plain" });
  res.end(text);
}

export function errorResponse(res: any, status: number, code: string) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: code }));
}

