import http, { IncomingMessage, ServerResponse } from "http";
import { Core } from "../core";
import { jsonResponse } from "../http/response-builder";

export class Server {
  private core: Core;
  private server: http.Server;

  constructor(core: Core) {
    this.core = core;

    this.server = http.createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        try {
          await this.core.router.handle(req, res);
        } catch (err: any) {
          jsonResponse(res, 500, { error: "internal" });
        }
      }
    );
  }

  listen(port: number) {
    this.server.listen(port);
    this.core.logger.log("server_start", { port });
  }
}

