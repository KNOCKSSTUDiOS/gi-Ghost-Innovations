export class HttpRequest {
  method: string;
  path: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: any;

  constructor(method: string, path: string, headers: Record<string, string>, query: Record<string, string>, body: any) {
    this.method = method;
    this.path = path;
    this.headers = headers;
    this.query = query;
    this.body = body;
  }
}

