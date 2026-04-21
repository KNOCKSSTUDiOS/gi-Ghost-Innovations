import { GI } from "../gi-engine";
import type { IncomingMessage, ServerResponse } from "http";

export type GIRouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  engine: ReturnType<typeof GI>
) => Promise<void> | void;

export interface GIRouteDefinition {
  method: string;
  path: string;
  handler: GIRouteHandler;
}

export class GI_Router {
  private routes: GIRouteDefinition[] = [];

  register(method: string, path: string, handler: GIRouteHandler) {
    this.routes.push({ method: method.toUpperCase(), path, handler });
  }

  match(method: string, url: string): GIRouteDefinition | null {
    const m = method.toUpperCase();
    for (const r of this.routes) {
      if (r.method === m && r.path === url) {
        return r;
      }
    }
    return null;
  }

  async handle(req: IncomingMessage, res: ServerResponse) {
    const engine = GI();
    const route = this.match(req.method || "GET", req.url || "/");

    if (!route) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route not found" }));
      return;
    }

    try {
      await route.handler(req, res, engine);
    } catch (err: any) {
      engine.error.create("router_error", err?.message || "Unknown router error", "high", {
        cause: err
      });

      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  }
}

export function createGIRouter() {
  return new GI_Router();
}

