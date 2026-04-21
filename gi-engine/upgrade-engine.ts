import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface GIUpgrade {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  applied: boolean;
  payload: any;
}

export interface GIUpgradeConfig {
  file?: string;
}

export class GI_UpgradeEngine {
  file: string;
  upgrades: GIUpgrade[];

  constructor(config: GIUpgradeConfig = {}) {
    this.file = config.file || path.join(process.cwd(), "gi-upgrades.json");
    this.upgrades = this.load();
  }

  load(): GIUpgrade[] {
    try {
      if (!fs.existsSync(this.file)) return [];
      const raw = fs.readFileSync(this.file, "utf8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  save() {
    fs.writeFileSync(this.file, JSON.stringify(this.upgrades, null, 2));
  }

  createUpgrade(title: string, description: string, payload: any) {
    const upgrade: GIUpgrade = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: Date.now(),
      applied: false,
      payload
    };

    this.upgrades.push(upgrade);
    this.save();
    return upgrade;
  }

  listUpgrades() {
    return this.upgrades;
  }

  getUpgrade(id: string) {
    return this.upgrades.find(u => u.id === id) || null;
  }

  summarize(id: string) {
    const upgrade = this.getUpgrade(id);
    if (!upgrade) return null;

    return {
      id: upgrade.id,
      title: upgrade.title,
      description: upgrade.description,
      applied: upgrade.applied,
      createdAt: upgrade.createdAt,
      payloadKeys: Object.keys(upgrade.payload || {})
    };
  }

  applyUpgrade(id: string, engine: any) {
    const upgrade = this.getUpgrade(id);
    if (!upgrade) return { ok: false, error: "Upgrade not found" };
    if (upgrade.applied) return { ok: false, error: "Upgrade already applied" };

    try {
      if (typeof upgrade.payload === "object") {
        for (const key of Object.keys(upgrade.payload)) {
          engine.core.set(key, upgrade.payload[key]);
        }
      }

      upgrade.applied = true;
      this.save();

      return { ok: true, upgrade };
    } catch (err: any) {
      return { ok: false, error: err?.message || "Unknown error" };
    }
  }
}

export function createGIUpgradeEngine(config: GIUpgradeConfig = {}) {
  return new GI_UpgradeEngine(config);
}

