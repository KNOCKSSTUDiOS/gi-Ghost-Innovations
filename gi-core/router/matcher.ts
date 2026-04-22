export class RouteMatcher {
  match(method: string, path: string, routeMethod: string, routePath: string) {
    if (method !== routeMethod) return false;

    if (routePath === path) return true;

    const routeParts = routePath.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);

    if (routeParts.length !== pathParts.length) return false;

    for (let i = 0; i < routeParts.length; i++) {
      const rp = routeParts[i];
      const pp = pathParts[i];

      if (rp.startsWith(":")) continue;
      if (rp !== pp) return false;
    }

    return true;
  }

  extractParams(routePath: string, path: string) {
    const params: Record<string, string> = {};

    const routeParts = routePath.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);

    for (let i = 0; i < routeParts.length; i++) {
      const rp = routeParts[i];
      const pp = pathParts[i];

      if (rp.startsWith(":")) {
        const key = rp.slice(1);
        params[key] = pp;
      }
    }

    return params;
  }
}
