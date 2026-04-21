import { Config } from "./modules/config";
import { Logger } from "./modules/logger";
import { Storage } from "./modules/storage";
import { Access } from "./modules/access";
import { Roles } from "./modules/roles";
import { Permissions } from "./modules/permissions";
import { Users } from "./modules/users";
import { Events } from "./modules/events";

export interface Core {
  config: Config;
  logger: Logger;
  storage: Storage;
  access: Access;
  roles: Roles;
  permissions: Permissions;
  users: Users;
  events: Events;
}

export function createCore(): Core {
  const config = new Config();
  const logger = new Logger();
  const storage = new Storage();
  const access = new Access();
  const roles = new Roles();
  const permissions = new Permissions();
  const users = new Users();
  const events = new Events();

  return {
    config,
    logger,
    storage,
    access,
    roles,
    permissions,
    users,
    events
  };
}
