import { GI } from "../gi-engine";
import type { GI_Router } from "./gi-router";
import { createGIAdminAuth } from "../gi-engine/admin-auth";

export function registerGIRolesRoutes(router: GI_Router) {
  const engine = GI();
  const admin = createGIAdminAuth();

  // Utility: read JSON body
  async function readJSON(req) {
    return new Promise(resolve => {
      let body = "";
      req.on("data", chunk => (body += chunk));
      req.on("end", () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({});
        }
      });
    });
  }

  // Helper: protect route with rank
  function protect(requiredRank, handler) {
    return async (req, res) => {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing authorization header" }));
        return;
      }

      const token = authHeader.replace("Bearer ", "").trim();
      const payload = admin.verifyToken(token);

      if (!payload) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid admin token" }));
        return;
      }

      if (!admin.hasRank(payload.rank, requiredRank)) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Insufficient rank" }));
        return;
      }

      await handler(req, res, engine, payload);
    };
  }

  // --------------------------------------
  // CREATE ROLE
  // --------------------------------------
  router.register(
    "POST",
    "/gi/roles/create",
    protect("admin", async (req, res, engine) => {
      const data = await readJSON(req);
      const { name, description, permissions = [], inherits = [] } = data;

      if (!name || !description) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing name or description" }));
        return;
      }

      const role = engine.roles.createRole(name, description, permissions, inherits);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ role }));
    })
  );

  // --------------------------------------
  // DELETE ROLE
  // --------------------------------------
  router.register(
    "POST",
    "/gi/roles/delete",
    protect("admin", async (req, res, engine) => {
      const data = await readJSON(req);
      const { roleId } = data;

      if (!roleId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing roleId" }));
        return;
      }

      const ok = engine.roles.deleteRole(roleId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: ok }));
    })
  );

  // --------------------------------------
  // ASSIGN ROLE
  // --------------------------------------
  router.register(
    "POST",
    "/gi/roles/assign",
    protect("admin", async (req, res, engine) => {
      const data = await readJSON(req);
      const { userId, roleId } = data;

      if (!userId || !roleId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing userId or roleId" }));
        return;
      }

      const ok = engine.roles.assignRole(userId, roleId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: ok }));
    })
  );

  // --------------------------------------
  // REMOVE ROLE
  // --------------------------------------
  router.register(
    "POST",
    "/gi/roles/remove",
    protect("admin", async (req, res, engine) => {
      const data = await readJSON(req);
      const { userId, roleId } = data;

      if (!userId || !roleId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing userId or roleId" }));
        return;
      }

      const ok = engine.roles.removeRole(userId, roleId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: ok }));
    })
  );

  // --------------------------------------
  // LIST ROLES
  // --------------------------------------
  router.register(
    "GET",
    "/gi/roles/list",
    protect("developer", async (req, res, engine) => {
      const list = engine.roles.listRoles();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(list));
    })
  );

  // --------------------------------------
  // LIST USER ROLES
  // --------------------------------------
  router.register(
    "GET",
    "/gi/roles/user",
    protect("developer", async (req, res, engine) => {
      const url = new URL(req.url, "http://localhost");
      const userId = url.searchParams.get("id");

      if (!userId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing userId" }));
        return;
      }

      const list = engine.roles.listUserRoles(userId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(list));
    })
  );

  // --------------------------------------
  // EFFECTIVE PERMISSIONS
  // --------------------------------------
  router.register(
    "GET",
    "/gi/roles/effective",
    protect("developer", async (req, res, engine) => {
      const url = new URL(req.url, "http://localhost");
      const userId = url.searchParams.get("id");

      if (!userId) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Missing userId" }));
        return;
      }

      const perms = engine.roles.getUserPermissions(userId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(perms));
    })
  );
}

