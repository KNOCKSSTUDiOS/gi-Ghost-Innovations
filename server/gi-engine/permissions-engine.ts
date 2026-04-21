import { GI } from "./index";

export interface GIPermissionRecord {
  id: string;
  name: string;
  description: string;
}

export interface GIUserPermissions {
  [userId: string]: string[]; // array of permission IDs
}

export class GI_PermissionsEngine {
  private engine = GI();
  private file = "permissions.json";

  private permissions: Record<string, GIPermissionRecord> = {};
  private userPermissions: GIUserPermissions = {};

  constructor() {
    this.load();
  }

  // --------------------------------------
  // LOAD FROM STORAGE
  // --------------------------------------
  private load() {
    try {
      if (this.engine.storage.exists(this.file)) {
        const data = this.engine.storage.readJSON(this.file);
        this.permissions = data.permissions || {};
        this.userPermissions = data.userPermissions || {};
      }
    } catch {
      this.permissions = {};
      this.userPermissions = {};
    }
  }

  // --------------------------------------
  // SAVE TO STORAGE
  // --------------------------------------
  private save() {
    this.engine.storage.writeJSON(
      this.file,
      {
        permissions: this.permissions,
        userPermissions: this.userPermissions
      },
      true
    );
  }

  // --------------------------------------
  // CREATE PERMISSION
  // --------------------------------------
  createPermission(name: string, description: string) {
    const id = this.engine.crypto.uuid();

    const perm: GIPermissionRecord = {
      id,
      name,
      description
    };

    this.permissions[id] = perm;
    this.save();

    return perm;
  }

  // --------------------------------------
  // LIST PERMISSIONS
  // --------------------------------------
  listPermissions() {
    return Object.values(this.permissions);
  }

  // --------------------------------------
  // ASSIGN PERMISSION TO USER
  // --------------------------------------
  assignPermission(userId: string, permissionId: string) {
    if (!this.permissions[permissionId]) return false;

    if (!this.userPermissions[userId]) {
      this.userPermissions[userId] = [];
    }

    if (!this.userPermissions[userId].includes(permissionId)) {
      this.userPermissions[userId].push(permissionId);
    }

    this.save();
    return true;
  }

  // --------------------------------------
  // REMOVE PERMISSION FROM USER
  // --------------------------------------
  removePermission(userId: string, permissionId: string) {
    if (!this.userPermissions[userId]) return false;

    this.userPermissions[userId] = this.userPermissions[userId].filter(
      p => p !== permissionId
    );

    this.save();
    return true;
  }

  // --------------------------------------
  // LIST USER PERMISSIONS
  // --------------------------------------
  listUserPermissions(userId: string) {
    return this.userPermissions[userId] || [];
  }

  // --------------------------------------
  // CHECK PERMISSION
  // --------------------------------------
  hasPermission(userId: string, permissionName: string) {
    const perms = this.listUserPermissions(userId);
    for (const id of perms) {
      const perm = this.permissions[id];
      if (perm && perm.name === permissionName) return true;
    }
    return false;
  }
}

export function createGIPermissionsEngine() {
  return new GI_PermissionsEngine();
}

