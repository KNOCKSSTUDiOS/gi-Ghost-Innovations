import { createServer, IncomingMessage, ServerResponse } from "http";
import { HttpRequest, HttpResponse } from "./http";

export type RouteHandler = (
  req: HttpRequest,
  res: HttpResponse
) => Promise<void> | void;

export class HttpServer {
  private handler: RouteHandler | null = null;

  setHandler(handler: RouteHandler) {
    this.handler = handler;
  }

  listen(port: number, callback?: () => void) {
    const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
      if (!this.handler) {
        res.statusCode = 500;
        res.end("No handler registered");
        return;
      }

      const wrappedReq = new HttpRequest(req);
      (wrappedReq as any)._raw = req;

      const wrappedRes = new HttpResponse(res);

      try {
        await this.handler(wrappedReq, wrappedRes);
      } catch (err: any) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    server.listen(port, callback);
  }
}

