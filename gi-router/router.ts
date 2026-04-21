import { IncomingMessage, ServerResponse } from "http";

type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

interface RouteEntry {
  method: string;
  path: string;
  handler: Handler;
}

export class Router {
  private routes: RouteEntry[];
  private core: any;

  constructor(core: any) {
    this.routes = [];
    this.core = core;
  }

  register(method: string, path: string, handler: Handler) {
    this.routes.push({ method, path, handler });
  }

  async handle(req: IncomingMessage, res: ServerResponse) {
    const method = req.method || "";
    const url = req.url || "";

    for (const route of this.routes) {
      if (route.method === method && route.path === url) {
        await route.handler(req, res);
        return;
      }
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  }
}

export function createRouter(core: any) {
  return new Router(core);
}
