import { IncomingMessage, ServerResponse } from "http";

export class HttpRequest {
  method: string;
  url: string;
  headers: Record<string, string | string[] | undefined>;
  body: Buffer | null = null;

  constructor(req: IncomingMessage) {
    this.method = req.method || "";
    this.url = req.url || "";
    this.headers = req.headers;
  }

  async readBody(): Promise<Buffer> {
    if (this.body) return this.body;

    const chunks: Buffer[] = [];
    for await (const chunk of reqStream(this)) {
      chunks.push(chunk);
    }
    this.body = Buffer.concat(chunks);
    return this.body;
  }
}

async function* reqStream(req: HttpRequest) {
  const raw = (req as any)._raw as IncomingMessage;
  for await (const chunk of raw) {
    yield chunk;
  }
}

export class HttpResponse {
  private res: ServerResponse;

  constructor(res: ServerResponse) {
    this.res = res;
  }

  status(code: number) {
    this.res.statusCode = code;
    return this;
  }

  header(key: string, value: string) {
    this.res.setHeader(key, value);
    return this;
  }

  json(data: any) {
    this.res.setHeader("Content-Type", "application/json");
    this.res.end(JSON.stringify(data));
  }

  text(data: string) {
    this.res.setHeader("Content-Type", "text/plain");
    this.res.end(data);
  }

  send(data: any) {
    this.res.end(data);
  }
}
