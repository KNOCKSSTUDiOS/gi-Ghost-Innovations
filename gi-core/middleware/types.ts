import { HttpContext } from "../http/context";

export type Middleware = (
  ctx: HttpContext,
  next: () => Promise<void>
) => Promise<void> | void;

