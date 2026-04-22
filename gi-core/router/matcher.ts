import { RouteDefinition } from "./route";
import { RouteMatcher } from "./matcher";
import { MiddlewareStack } from "../middleware/stack";
import { HttpContext } from "../http/context";

export class AdvancedRouter {
  private routes: RouteDefinition[] = [];
  private matcher = new RouteMatcher();

  register(def: RouteDefinition) {
    this.routes.push(def);
  }

  async handle(ctx: HttpContext) {
    const { method, path } = ctx.req;

    for (const route of this.routes) {
      const matched = this.matcher.match(method, path, route.method, route.path);
      if (!matched) continue;

      const params = this.matcher.extractParams(route.path, path);
      ctx.set("params", params);

      const stack = new MiddlewareStack();

      if (route.middlewares) {
        for (const mw of route.middlewares) {
          stack.use(mw as any);
        }
      }

      await stack.run(ctx, async () => {
        await route.handler(ctx);
      });

      return;
    }

    ctx.res.status(404).text("Not Found");
  }
}
